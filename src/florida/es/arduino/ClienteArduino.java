package florida.es.arduino;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.PrintWriter;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.Scanner;

import com.fazecast.jSerialComm.SerialPort;

public class ClienteArduino {

	public static void main(String[] args) throws IOException {
		
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
		GestorArduino gestorArduino = new GestorArduino(chosenPort);
		
		System.out.println("CLIENTE >>> Generando conexion con (SERVIDOR)");

		InetSocketAddress direccion = new InetSocketAddress("54.198.123.240", 5001); 

		Socket servidor = new Socket();
		servidor.connect(direccion);
		System.out.println("CLIENTE >>> Conexion establecida");
		InputStream is = servidor.getInputStream(); 
		InputStreamReader isr = new InputStreamReader(is); 
		BufferedReader bf = new BufferedReader(isr); 
		PrintWriter pw = new PrintWriter(servidor.getOutputStream());
		while(true) {
			String codigo = bf.readLine();
			System.out.println(codigo);
			int codigoInstruccion = Integer.parseInt(codigo);
			String respuestaArduino = gestorArduino.gestionaInstruccion(codigoInstruccion);
			System.out.println(respuestaArduino);
			pw.write(respuestaArduino + "\n");
			pw.flush();
		}
	}

}
