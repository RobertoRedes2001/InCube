package florida.es.arduino;

import static com.mongodb.client.model.Filters.eq;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.json.JSONObject;

import com.fazecast.jSerialComm.SerialPort;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class GestorHTTP implements HttpHandler { 
	
	//PETICIONES: http://localhost:5000/test?codigo=1 (1-10)
	// 1 - apagar
	// 2 - encender
	// 3 - abrir puerta (servo a 0)
	// 4 - cerrar puerta (servo a 180)
	// 5 - Luz Azul
	// 6 - Luz Amarilla
	// 7 - Luz Naranja
	// 8 - Luz Roja
	// 9 - leer luz
	// 10 - leer temperatura
	
	GestorArduino gestorArduino;
	static MongoClient mongoClient = null;
	static MongoDatabase database = null;
	static MongoCollection<Document> users = null;
	static MongoCollection<Document> light = null;
	static MongoCollection<Document> temperature = null;
	static boolean resultado;
	
	GestorHTTP(SerialPort chosenPort) {
		obrirConexio();
		gestorArduino = new GestorArduino(chosenPort);
	}
	
	
	// Conexions
	public static void obrirConexio() {
		try {
			mongoClient = new MongoClient("localhost", 27017);
			database = mongoClient.getDatabase("InCube");
			users = database.getCollection("users");
			light = database.getCollection("light");
			temperature = database.getCollection("temperature");
			Thread.sleep(1000);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void tancarConexio() {
		try {
			mongoClient.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
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
		System.out.println("Recibida URI tipo GET: " + httpExchange.getRequestURI().toString().split("=")[1]);
		try {
			Integer.parseInt(httpExchange.getRequestURI().toString().split("=")[1]);
			resultado = true;
			return httpExchange.getRequestURI().toString().split("\\?")[1].split("=")[1].toString();
		} catch (NumberFormatException excepcion) {
			resultado = false;
			String tipo = httpExchange.getRequestURI().toString().split("/")[2].split("\\?")[0];
			switch (tipo) {
			case "users": {
				String queryKey = httpExchange.getRequestURI().toString().split("\\?")[1].split("=")[0];
				if (queryKey.equals("user")) {
					String queryUser = httpExchange.getRequestURI().toString().split("=")[1];
					return tipo+";"+queryUser;
				} else {
					return tipo+";"+httpExchange.getRequestURI().toString() ;
				}
			}
			case "temperature": {
				String queryKey = httpExchange.getRequestURI().toString().split("\\?")[1].split("=")[0];
				if (queryKey.equals("date")) {
					String queryTemperature = httpExchange.getRequestURI().toString().split("=")[1];
					return tipo+";"+queryTemperature;
				} else {
					return tipo+";"+httpExchange.getRequestURI().toString() ;
				}
			}
			case "light": {
				String queryKey = httpExchange.getRequestURI().toString().split("\\?")[1].split("=")[0];
				if (queryKey.equals("date")) {
					String queryLight = httpExchange.getRequestURI().toString().split("=")[1];
					return tipo+";"+queryLight;
				} else {
					return tipo+";"+httpExchange.getRequestURI().toString() ;
				}
			}
			default:
				return tipo+";"+httpExchange.getRequestURI().toString() ;
			}
		}
		
		
	}
	
	//FIN BLOQUE REQUEST
	
	
	//INICIO BLOQUE RESPONSE
	
	private void handleGetResponse(HttpExchange httpExchange, String requestParamValue)  throws  IOException {
		
		System.out.println("El servidor pasa a procesar la peticion GET: " + requestParamValue);
		String[] arrayRespuestas = {"","","","", "","","","", "Medida luz: ","Medida temperatura (C): "};
		
		//Ejemplo de respuesta: el servidor devuelve al cliente un HTML simple:
		if(resultado) {
			OutputStream outputStream = httpExchange.getResponseBody();
			int codigoInstruccion = Integer.parseInt(requestParamValue);
			String respuestaArduino = gestorArduino.gestionaInstruccion(codigoInstruccion);
			String htmlResponse = "<html><body><h1>Codigo " + codigoInstruccion + " enviado a Arduino<br>Respuesta Arduino: " + arrayRespuestas[codigoInstruccion-1] + respuestaArduino + "</h1></body></html>";
			httpExchange.sendResponseHeaders(200, htmlResponse.length());
	        outputStream.write(htmlResponse.getBytes());
	        outputStream.flush();
	        outputStream.close();
	        System.out.println("Devuelve respuesta HTML: " + htmlResponse);
		}else {
			String response = buildJsonResponse(requestParamValue.split(";"));
			System.out.println(response);
			try {
				httpExchange.sendResponseHeaders(200, response.length());
				httpExchange.getResponseBody().write(response.getBytes());
				httpExchange.getResponseBody().close();
			} catch (IOException e) {

			}
		}
        
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
	
	private String buildJsonResponse(String[] data) {
		switch (data[0]) {
		case "users":
			Bson queryUser = eq("user", data[1]);
			MongoCursor<Document> cursorUser = users.find(queryUser).iterator();
			String jsonUser = "[";
			while (cursorUser.hasNext()) {
				JSONObject obj = new JSONObject(cursorUser.next().toJson());
				jsonUser += "{";
				jsonUser += "\"user\":\"" + obj.getString("user") + "\",";
				jsonUser += "\"pass\":\"" + obj.getString("pass") + "\"";
				jsonUser += "}";
				if (cursorUser.hasNext()) {
					jsonUser += ",";
				}
			}
			jsonUser += "]";

			return jsonUser;

		case "temperature":

			Bson queryTemperature = eq("date", data[1]);
			MongoCursor<Document> cursorTemperature = temperature.find(queryTemperature).iterator();
			String jsonTemperature = "[";
			while (cursorTemperature.hasNext()) {
				jsonTemperature += "{";
				JSONObject objTemp = new JSONObject(cursorTemperature.next().toJson());
				jsonTemperature += "\"temperature\":\"" + objTemp.getString("temperature") + "\",";
				jsonTemperature += "\"date\":\"" + objTemp.getString("date") + "\",";
				jsonTemperature += "\"register\":\"" + objTemp.getString("register") + "\",";
				jsonTemperature += "\"user\":\"" + objTemp.getString("user") + "\"";
				jsonTemperature += "}";
				if (cursorTemperature.hasNext()) {
					jsonTemperature += ",";
				}
			}
			jsonTemperature += "]";
			return jsonTemperature;

		case "light":
			Bson queryLight = eq("date", data[1]);
			MongoCursor<Document> cursorLight = light.find(queryLight).iterator();
			String jsonLight = "[";
			while (cursorLight.hasNext()) {
				jsonLight += "{";
				JSONObject obj = new JSONObject(cursorLight.next().toJson());
				jsonLight += "\"level\":\"" + obj.getString("level") + "\",";
				jsonLight += "\"date\":\"" + obj.getString("date") + "\",";
				jsonLight += "\"register\":\"" + obj.getString("register") + "\",";
				jsonLight += "\"user\":\"" + obj.getString("user") + "\"";
				jsonLight += "}";
				if (cursorLight.hasNext()) {
					jsonLight += ",";
				}
			}
			jsonLight += "]";

			return jsonLight;

		default:
			return "[{Err: " + data[1] + " not found}]";
		}

	}
	
	//FIN BLOQUE RESPONSE
	
}

