package florida.es.arduino;

import static com.mongodb.client.model.Filters.eq;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

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
	
	/**
	 * @param MongoClient
	 * @param MongoDatabase
	 * @param MongoCollection<Document>
	 * @param boolean
	 * @param Integer
	 * @param Socket
	 * @param InputStream
	 * @param InputStreamReader
	 * @param BufferedReader
	 * @param PrintWriter
	 * We create the static parameters that will be needed in order to run the API. 
	 */
	static MongoClient mongoClient = null;
	static MongoDatabase database = null;
	static MongoCollection<Document> users = null;
	static MongoCollection<Document> light = null;
	static MongoCollection<Document> temperature = null;
	static boolean resultado;
	static Integer intervalo = 5000;
	static Integer registros = 20;
	Socket cliente = null;
	InputStream is = null;
	InputStreamReader isr = null;
	BufferedReader bf = null;
	PrintWriter pw = null;
	
	GestorHTTP(Socket cliente) {
		obrirConexio();
		
		this.cliente = cliente;
		try {
			this.is = cliente.getInputStream();
			this.isr = new InputStreamReader(is);
			this.bf = new BufferedReader(isr);
			this.pw = new PrintWriter(cliente.getOutputStream());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	
	// Opening the connection with the MongoDB Database
	public static void obrirConexio() {
		try {
			mongoClient = new MongoClient("172.31.51.196", 27017);
			database = mongoClient.getDatabase("InCube");
			users = database.getCollection("users");
			light = database.getCollection("light");
			temperature = database.getCollection("temperature");
			Thread.sleep(1000);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	// Closing the connection with the MongoDB Database
	public static void tancarConexio() {
		try {
			mongoClient.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * @param httpExchange
	 * @param IOException
	 * @return
	 */
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
		}else if ("POST".equalsIgnoreCase(httpExchange.getRequestMethod())) {
			System.out.println("POST");
			requestParamValue = handlePostRequest(httpExchange);
			handlePostResponse(httpExchange, requestParamValue);
		}else {
			System.out.println("DESCONOCIDA");
		}
		
	}
	
	
	//INICIO BLOQUE REQUEST
	
	/**
	 * 
	 * @param httpExchange
	 * @return
	 */
	private String handleGetRequest(HttpExchange httpExchange) {
		//Checking the URI of the GET
		System.out.println("Received URI type GET: " + httpExchange.getRequestURI().toString().split("=")[1]);
		try {
			/**
			 * @param Integer Parsed
			 * @param Boolean
			 * @return String
			 * In case the petition is numeric we generate a Arduino code petition and return it
			 */
			Integer.parseInt(httpExchange.getRequestURI().toString().split("=")[1]);
			resultado = true;
			return httpExchange.getRequestURI().toString().split("\\?")[1].split("=")[1].toString();
		} catch (NumberFormatException excepcion) {
			/**
			 * @param Boolean
			 * @param String
			 * @return String
			 * In case the petition is not a number, we send it to a switch and then filter 
			 * in order of the type of the petition.
			 */
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
	
	/**
	 * 
	 * @param httpExchange
	 * @return
	 */
	private String handlePostRequest(HttpExchange httpExchange) {
		
		System.out.println("Received URI type POST: " + httpExchange.getRequestBody().toString());
		InputStream is = httpExchange.getRequestBody();
		InputStreamReader isr = new InputStreamReader(is);
		BufferedReader br = new BufferedReader(isr);
		StringBuilder sb = new StringBuilder();
		String line;
		
		try {
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
			br.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println(sb);
		return sb.toString();
	}
	
	//FIN BLOQUE REQUEST
	
	
	//INICIO BLOQUE RESPONSE
	
	/** 
	 * @param httpExchange
	 * @param requestParamValue
	 * @throws IOException
	 * If Result is True, we will process what kind of response will receive the Arduino. 
	 * If Result is False, we will make the Api of the Type of petition avaliable.
	 */
	private void handleGetResponse(HttpExchange httpExchange, String requestParamValue)  throws  IOException {
		
		System.out.println("The server will process the petition GET: " + requestParamValue);
		
		System.out.println("OK");
	
		if(resultado) {
			String respuestaArduino = "";
			int opcion = Integer.parseInt(requestParamValue);
			if (opcion == 11) {
				pw.write(opcion+";"+intervalo+";"+registros+"\n");
				pw.flush();
			}
			else {
			pw.write(opcion+"\n");
			pw.flush();
			}
			if (opcion == 9 || opcion == 10) {
				respuestaArduino = bf.readLine();
				System.out.println("-->Arduino Response: "+respuestaArduino+"\n-->Instruction Code: "+opcion);
				
				if (opcion ==9) {
					String timeStomp = new SimpleDateFormat("HH:mm").format(new java.util.Date());
					String dateStomp = new SimpleDateFormat("dd-MM-yyyy").format(new java.util.Date());
					Document insercion = new Document("level", respuestaArduino)
							.append("date", dateStomp)
							.append("register", timeStomp)
							.append("user", "roberto");
					light.insertOne(insercion);
					System.out.println("Light: "+respuestaArduino);
				}
				
				else if (opcion == 10) {
					String timeStomp = new SimpleDateFormat("HH:mm").format(new java.util.Date());
					String dateStomp = new SimpleDateFormat("dd-MM-yyyy").format(new java.util.Date());
					Document insercion = new Document("temperature", respuestaArduino)
							.append("date", dateStomp)
							.append("register", timeStomp)
							.append("user", "roberto");
					temperature.insertOne(insercion);
					System.out.println("Temperature: "+respuestaArduino);
				}
			}
			
			
			else if (opcion == 11) {
				
				ArrayList<String> valores = new ArrayList<String>();
				
				while (bf.readLine() != "") {
					String nuevoValor = bf.readLine();
					valores.add(nuevoValor);
					System.out.println("Ultimo registro: "+ nuevoValor+"\nCantidad de registros: "+valores.size());
					
					String lux = nuevoValor.split(";")[0];
					String temp = nuevoValor.split(";")[1];
					System.out.println("Insercion bucle "+nuevoValor);
					
					String timeStompL = new SimpleDateFormat("HH:mm").format(new java.util.Date());
					String dateStompL = new SimpleDateFormat("dd-MM-yyyy").format(new java.util.Date());
					Document insercionL = new Document("level", lux)
							.append("date", dateStompL)
							.append("register", timeStompL)
							.append("user", "roberto");
					light.insertOne(insercionL);
					
					String timeStompT = new SimpleDateFormat("HH:mm").format(new java.util.Date());
					String dateStompT = new SimpleDateFormat("dd-MM-yyyy").format(new java.util.Date());
					Document insercionT = new Document("temperature", temp)
							.append("date", dateStompT)
							.append("register", timeStompT)
							.append("user", "roberto");
					temperature.insertOne(insercionT);
					
				}
			}
			
			
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
        
	}
	
	/**
	 * 
	 * @param httpExchange
	 * @param requestParamValue
	 * @throws IOException
	 * Recived data from the React App is processed in a POST petition
	 * and then sended to the MongoDB Database.
	 */
	private void handlePostResponse(HttpExchange httpExchange, String requestParamValue) throws IOException{

		System.out.println("POST: " + requestParamValue);
		
		String userNew = requestParamValue.split(";")[0];
		String passNew = requestParamValue.split(";")[1];
		
		try {
			Integer intervalo1 = Integer.parseInt(userNew);
			Integer registros1 = Integer.parseInt(passNew);
			System.out.println("Check: >>>"+userNew+"__"+passNew);
			pw.write(11+";"+intervalo1+";"+registros1+"\n");
			pw.flush();
			ArrayList<String> valores = new ArrayList<String>();
			
			while (bf.readLine() != "") {
				String nuevoValor = bf.readLine();
				valores.add(nuevoValor);
				System.out.println("Last register: "+ nuevoValor+"\nQuantity of Registers: "+valores.size());
				
				String lux = nuevoValor.split(";")[0];
				String temp = nuevoValor.split(";")[1];
				System.out.println("Loop Insertion "+nuevoValor);
				
				String timeStompL = new SimpleDateFormat("HH:mm").format(new java.util.Date());
				String dateStompL = new SimpleDateFormat("dd-MM-yyyy").format(new java.util.Date());
				Document insercionL = new Document("level", lux)
						.append("date", dateStompL)
						.append("register", timeStompL)
						.append("user", "roberto");
				light.insertOne(insercionL);
				
				String timeStompT = new SimpleDateFormat("HH:mm").format(new java.util.Date());
				String dateStompT = new SimpleDateFormat("dd-MM-yyyy").format(new java.util.Date());
				Document insercionT = new Document("temperature", temp)
						.append("date", dateStompT)
						.append("register", timeStompT)
						.append("user", "roberto");
				temperature.insertOne(insercionT);
				
			}
		} catch (NumberFormatException excepcion) {
			if (passNew.equals("true")||passNew.equals("false")) {
				
				if (passNew.equals("true")) {
					System.out.println("ModificaBoolUser"+userNew);
					
					users.updateOne(eq("user", userNew), new Document("$set",
						new Document("bool", "true")));
				}
				if (passNew.equals("false")) {
			
				System.out.println("ModificaBoolUser"+userNew);
			
				users.updateOne(eq("user", userNew), new Document("$set",
					new Document("bool", "false")));
				}
				else {
					
					
					System.out.println("NUEVOUSUARIO"+userNew+"__"+passNew);
					
					Document insercion = new Document("user",userNew)
							.append("pass",passNew)
							.append("bool","true");
					users.insertOne(insercion);
					
					}
				}
			}
		
		
		
		
	}
	
	/**
	 * 
	 * @param data
	 * @return jsonArchive
	 * In orther to make the data accesible, we will build a Json string depending the type of the data.
	 */
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

