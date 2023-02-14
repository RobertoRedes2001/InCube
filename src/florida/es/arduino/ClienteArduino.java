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

	// PETICIONES: http://54.198.123.240:5001/test?codigo=1 (1-10)
	// 1 - Turn Off
	// 2 - Turn On
	// 3 - Open Door (servo a 0)
	// 4 - Close Door (servo a 180)
	// 5 - Blue Light
	// 6 - Yellow Light
	// 7 - Orange Light
	// 8 - Red Light
	// 9 - Read Light
	// 10 - Read Temperature
	
	static int intervalo=5000;
	static int registros=20;

	public static void main(String[] args) throws IOException, InterruptedException {
		/*
		 * @param Array of SerialPort
		 * loop of avaliable ports 
		 * */
		SerialPort[] portNames = SerialPort.getCommPorts();
		System.out.println("Serial ports avaliables:");
		for (int i = 0; i < portNames.length; i++) {
			System.out.println((i + 1) + ": " + portNames[i].getSystemPortName());
		}
		/*
		 * @return
		 * If no port is avaliable
		 * */
		if (portNames.length == 0) {
			System.out.println("No port found.");
			return;
		}
		Scanner teclado = new Scanner(System.in);
		System.out.print("Select a Serial port: ");
		/*
		 * @param Integer
		 * @param SerialPort
		 * Open a port. 
		 * */
		int numeroPuerto = Integer.parseInt(teclado.nextLine());
		SerialPort chosenPort = SerialPort.getCommPort(portNames[numeroPuerto - 1].getSystemPortName());
		chosenPort.setComPortTimeouts(SerialPort.TIMEOUT_SCANNER, 0, 0);
		if (chosenPort.openPort()) {
			System.out.println("Serial Port open");
		} else {
			System.out.println("Error opening the Serial port");
		}
		GestorArduino gestorArduino = new GestorArduino(chosenPort);

		System.out.println("CLIENT >>> Generating connection with (SERVER)");
		
		/*
		 * @param InetSocketAddres
		 * @param Socket
		 * @param InputStream
		 * @param InputStreamReader
		 * @param BufferedReader
		 * @param PrintWriter
		 * Generates a connection between Client and Server.
		 * */
		
		InetSocketAddress direccion = new InetSocketAddress("54.198.123.240", 5001);

		Socket servidor = new Socket();
		servidor.connect(direccion);
		System.out.println("CLIENT >>> Conexion stablished");
		InputStream is = servidor.getInputStream();
		InputStreamReader isr = new InputStreamReader(is);
		BufferedReader bf = new BufferedReader(isr);
		PrintWriter pw = new PrintWriter(servidor.getOutputStream());
		while (true) {
			String codigo = bf.readLine();
			System.out.println("CLIENT >>> " + codigo);
			int codigoInstruccion = Integer.parseInt(codigo.split(";")[0]);
			/*
			 * @param Integer
			 * if the code is 11 generates a reading loop of both temperature and light.
			 * else makes a simple read of light or temperature.
			 * */
			if (codigoInstruccion == 11) {
				intervalo = Integer.parseInt(codigo.split(";")[1]);
				registros = Integer.parseInt(codigo.split(";")[2]);
				int cont = registros;
				System.out.println("CLIENT >>> Iniciating loop of "+registros+" registers with an interval of "+intervalo+"ms");
				while (cont>0) {
					String respuestaArduinoUno = gestorArduino.gestionaInstruccion(9);
					String respuestaArduinoDos = gestorArduino.gestionaInstruccion(10);
					
					System.out.println(respuestaArduinoUno + " ; " + respuestaArduinoDos+" "+cont);
					pw.write(respuestaArduinoUno+";"+respuestaArduinoDos+"\n");
					pw.flush();
					cont--;
					Thread.sleep(intervalo);
				}
				System.out.println("CLIENT >>>Loop ended.");
			
			} else {
				String respuestaArduino = gestorArduino.gestionaInstruccion(codigoInstruccion);
				System.out.println("CLIENT >>> " + respuestaArduino);
				if (codigoInstruccion == 9 || codigoInstruccion == 10) {
					pw.write(respuestaArduino + "\n");
					pw.flush();
				}
			}

		}
	}

}
