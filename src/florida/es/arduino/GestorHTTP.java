package florida.es.arduino;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

import com.fazecast.jSerialComm.SerialPort;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class GestorHTTP implements HttpHandler { 
	
	//PETICIONES: http://localhost:5000/test?codigo=1 (1-6)
	// 1 - apagar
	// 2 - encender
	// 3 - abrir puerta (servo a 0)
	// 4 - cerrar puerta (servo a 180)
	// 5 - leer luz
	// 6 - leer temperatura
	
	GestorArduino gestorArduino;
	
	GestorHTTP(SerialPort chosenPort) {
		gestorArduino = new GestorArduino(chosenPort);
	}
	
	@Override    
	public void handle(HttpExchange httpExchange) throws IOException {
		
		//Habilitar accesos CORS (intercambio de recursos de origen cruzado) para peticiones POST, PUT y DELETE
		httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
		httpExchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		httpExchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
		if (httpExchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) { //Caso PUT y DELETE se pide antes confirmacion desde cliente
			httpExchange.sendResponseHeaders(204, -1);  //Codigo Ok, no devuelve contenido, preparado para POST, PUT o DELETE
			return;
		}
		
		System.out.print("Peticion recibida: Tipo ");
		String requestParamValue=null; 
		if("GET".equalsIgnoreCase(httpExchange.getRequestMethod())) { 
			System.out.println("GET");
			requestParamValue = handleGetRequest(httpExchange);
			handleGetResponse(httpExchange,requestParamValue); 
		} else {
			System.out.println("DESCONOCIDA");
		}
		
	}
	
	
	//INICIO BLOQUE REQUEST
	
	
	private String handleGetRequest(HttpExchange httpExchange) {
		System.out.println("Recibida URI tipo GET: " + httpExchange.getRequestURI().toString());
		return httpExchange.getRequestURI().toString().split("\\?")[1].split("=")[1];
	}
	
	//FIN BLOQUE REQUEST
	
	
	//INICIO BLOQUE RESPONSE
	
	private void handleGetResponse(HttpExchange httpExchange, String requestParamValue)  throws  IOException {
		
		System.out.println("El servidor pasa a procesar la peticion GET: " + requestParamValue);
		String[] arrayRespuestas = {"","","","","Medida luz: ","Medida temperatura (C): "};
		
		//Ejemplo de respuesta: el servidor devuelve al cliente un HTML simple:
		OutputStream outputStream = httpExchange.getResponseBody();
		int codigoInstruccion = Integer.parseInt(requestParamValue);
		String respuestaArduino = gestorArduino.gestionaInstruccion(codigoInstruccion);
		String htmlResponse = "<html><body><h1>Codigo " + codigoInstruccion + " enviado a Arduino<br>Respuesta Arduino: " + arrayRespuestas[codigoInstruccion-1] + respuestaArduino + "</h1></body></html>";
		httpExchange.sendResponseHeaders(200, htmlResponse.length());
        outputStream.write(htmlResponse.getBytes());
        outputStream.flush();
        outputStream.close();
        System.out.println("Devuelve respuesta HTML: " + htmlResponse);
        
        //TODO: en vez del string htmlResponse anterior con la pagina web simple, se podria incluir 
        // en dicho string cualquier otro string (tipo JSON, por ejemplo) que el cliente haya solicitado
        // a traves de la peticion Axios de Javascript. Por tanto, podria ser necesario llamar desde este
        // este metodo a lo/s metodo/s necesario/s para acceder a una base de datos como las que hemos
        // trabajado en el modulo de Acceso a Datos.
        
        //NOTA: se puede incluir tambien un punto de control antes de enviar el codigo resultado de la
        // operacion en el header (httpExchange.sendResponseHeaders(CODIGOHTTP, {})). Por ejemplo, si
        // hay un error se enviarian codigos del tipo 400, 401, 403, 404, etc.
        // https://developer.mozilla.org/es/docs/Web/HTTP/Status
        
	}
	
	
	//FIN BLOQUE RESPONSE
	
}

