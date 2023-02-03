package florida.es.arduino;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.net.InetSocketAddress;
import java.util.Scanner;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

import com.fazecast.jSerialComm.SerialPort;
import com.sun.net.httpserver.HttpServer;

public class Servidor {

    public static void main(String[] args) throws Exception {
    	
    	System.out.println("Arranca el servidor");
    	
    	//String rutaFicheroConfiguracion = args[0];  //Pasar como parametro la ruta del fichero de configuracion
    	String rutaFicheroConfiguracion = "config.txt";
    	File ficheroConfiguracion = new File(rutaFicheroConfiguracion);
    	FileReader fr = new FileReader(ficheroConfiguracion);
    	BufferedReader br = new BufferedReader(fr);
    	String host = br.readLine().split("=")[1];
    	System.out.println("IP: " + host);
    	int puerto = Integer.parseInt(br.readLine().split("=")[1]);
    	System.out.println("Puerto TCP: " + puerto);
    	String rutaRespuesta = br.readLine().split("=")[1];   
    	System.out.println("Ruta contexto: " + rutaRespuesta);
    	
    	InetSocketAddress direccionTCPIP = new InetSocketAddress(host,puerto);
    	int backlog = Integer.parseInt(br.readLine().split("=")[1]); //Numero de conexiones pendientes que el servidor puede mantener en cola
    	HttpServer servidor = HttpServer.create(direccionTCPIP, backlog);
    	
    	SerialPort[] portNames = SerialPort.getCommPorts();
    	System.out.println("Puertos serie disponibles:");
		for (int i = 0; i < portNames.length; i++) {
			System.out.println((i+1) + ": " + portNames[i].getSystemPortName());
		}
		if (portNames.length == 0) {
			System.out.println("No se han encontrado puertos");
			return;
		}
		Scanner teclado = new Scanner(System.in);
		System.out.print("Seleccionar puerto serie: ");
		int numeroPuerto = Integer.parseInt(teclado.nextLine());
		SerialPort chosenPort = SerialPort.getCommPort(portNames[numeroPuerto-1].getSystemPortName());
		chosenPort.setComPortTimeouts(SerialPort.TIMEOUT_SCANNER, 0, 0);
		if (chosenPort.openPort()) {
			System.out.println("Puerto serie abierto");
		} else {
			System.out.println("Error abriendo puerto serie");
		}
    	
    	GestorHTTP gestorHTTP = new GestorHTTP(chosenPort);   //Clase que gestionara los GETs, POSTs, etc.
    	servidor.createContext(rutaRespuesta, gestorHTTP);   //Crea un contexto, asocia la ruta al gestor HTTP
    	
    	int numThreads = Integer.parseInt(br.readLine().split("=")[1]);
    	ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor)Executors.newFixedThreadPool(numThreads);
    	servidor.setExecutor(threadPoolExecutor); 
    	
    	servidor.start();
    	System.out.println("Servidor HTTP arranca en el puerto TCP " + puerto);
    	br.close();
    	
    }

}