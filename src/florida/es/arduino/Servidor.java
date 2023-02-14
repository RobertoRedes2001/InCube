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
				socketEscucha = new ServerSocket(5001);
				cliente = socketEscucha.accept();
				System.out.println("Cliente arduino conectado");

			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			String rutaFicheroConfiguracion = "config.txt";
			File ficheroConfiguracion = new File(rutaFicheroConfiguracion);
			FileReader fr = new FileReader(ficheroConfiguracion);
			BufferedReader br = new BufferedReader(fr);
			
			//LECTURA CONFIG
			
			String host = br.readLine().split("=")[1];
			int puerto = Integer.parseInt(br.readLine().split("=")[1]);
			String contexto = br.readLine().split("=")[1];
			int backlog = Integer.parseInt(br.readLine().split("=")[1]);
			int numHilos = Integer.parseInt(br.readLine().split("=")[1]);
			int intervalo = Integer.parseInt(br.readLine().split("=")[1]);
			
			System.out.println("IP: " + host);
			System.out.println("Puerto TCP: " + puerto);
			InetSocketAddress direccionTCPIP = new InetSocketAddress(host, puerto);
			HttpServer servidor = HttpServer.create(direccionTCPIP, backlog);
			
			
			GestorHTTP gestorHTTP = new GestorHTTP(cliente);
			servidor.createContext(contexto, gestorHTTP);
			
			ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor) Executors.newFixedThreadPool(numHilos);
			servidor.setExecutor(threadPoolExecutor);
			servidor.start();
			System.out.println("Servidor HTTP arranca en el puerto " + puerto);

		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}
