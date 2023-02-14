package florida.es.arduino;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

import com.fazecast.jSerialComm.SerialPort;
import com.sun.net.httpserver.HttpServer;

public class Servidor {

	static ServerSocket socketEscucha = null;
	static Socket cliente = null;

	public static void main(String[] args) throws IOException {
		
		try {

			try {
				/*
				 * @param ServerSocket
				 * Starts the client-server connection
				 */
				System.out.println("Awaiting for Client to connect...");
				socketEscucha = new ServerSocket(5001);
				cliente = socketEscucha.accept();
				System.out.println("Arduino Client connected");

			} catch (IOException e) {
				e.printStackTrace();
			}
			
			/*
			 * @param String
			 * @param File
			 * @param FileReader
			 * @param BufferReader
			 * @param Integer
			 * Reads the config.txt archive.
			 * */
			String rutaFicheroConfiguracion = "config.txt";
			File ficheroConfiguracion = new File(rutaFicheroConfiguracion);
			FileReader fr = new FileReader(ficheroConfiguracion);
			BufferedReader br = new BufferedReader(fr);
	
			String host = br.readLine().split("=")[1];
			int puerto = Integer.parseInt(br.readLine().split("=")[1]);
			String contexto = br.readLine().split("=")[1];
			int backlog = Integer.parseInt(br.readLine().split("=")[1]);
			int numHilos = Integer.parseInt(br.readLine().split("=")[1]);
			
			System.out.println("IP: " + host);
			System.out.println("TCP Port: " + puerto);
			
			/*
			 * @param InetSocketAddress
			 * @param HttpServer
			 * @param ThreadPoolExecutor
			 * Launch the Server
			 * */
			InetSocketAddress direccionTCPIP = new InetSocketAddress(host, puerto);
			HttpServer servidor = HttpServer.create(direccionTCPIP, backlog);
			GestorHTTP gestorHTTP = new GestorHTTP(cliente);
			servidor.createContext(contexto, gestorHTTP);
			
			ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor) Executors.newFixedThreadPool(numHilos);
			servidor.setExecutor(threadPoolExecutor);
			servidor.start();
			System.out.println("HTTP Server launched on Port " + puerto);

		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}
