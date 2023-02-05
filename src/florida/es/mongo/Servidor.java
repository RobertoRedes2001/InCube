package florida.es.mongo;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import java.net.InetSocketAddress;

import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

import com.sun.net.httpserver.HttpServer;

public class Servidor {
	public static void main(String[] args) throws IOException {

		try {
			String rutaFicheroConfiguracion = "config.txt";
	    	File ficheroConfiguracion = new File(rutaFicheroConfiguracion);
	    	FileReader fr = new FileReader(ficheroConfiguracion);
	    	BufferedReader br = new BufferedReader(fr);
	    	String host = br.readLine().split("=")[1];
	    	System.out.println("IP: " + host);
	    	int puerto = Integer.parseInt(br.readLine().split("=")[1]);
	    	System.out.println("Puerto TCP: " + puerto); 
			InetSocketAddress direccionTCPIP = new InetSocketAddress(host, puerto);
			int backlog = 0;
			HttpServer servidor = HttpServer.create(direccionTCPIP, backlog);
			GestorHTTP gestorHTTP = new GestorHTTP();
			String rutaRespuesta = "/api";
			servidor.createContext(rutaRespuesta, gestorHTTP);
			ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor) Executors.newFixedThreadPool(10);
			servidor.setExecutor(threadPoolExecutor);
			servidor.start();
			System.out.println("Servidor HTTP arranca en el puerto " + puerto);

		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}
