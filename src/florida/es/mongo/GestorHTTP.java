package florida.es.mongo;

import java.awt.geom.QuadCurve2D;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Properties;
import java.util.Scanner;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.json.JSONObject;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.*;

public class GestorHTTP implements HttpHandler {
	static MongoClient mongoClient = null;
	static MongoDatabase database = null;
	static MongoCollection<Document> users = null;
	static MongoCollection<Document> light = null;
	static MongoCollection<Document> temperature = null;

	@Override
	public void handle(HttpExchange httpExchange) throws IOException {
		obrirConexio();
		String[] requestParamValue = null;
		if ("GET".equals(httpExchange.getRequestMethod())) {
			requestParamValue = handleGetRequest(httpExchange);
			handleGETResponse(httpExchange, requestParamValue);
		}
		tancarConexio();
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

	// *** GET *** //
	// Metodes de les peticions GET //

	private String[] handleGetRequest(HttpExchange httpExchange) {
		
		String tipo = httpExchange.getRequestURI().toString().split("/")[2].split("\\?")[0];
		switch (tipo) {
		case "users": {
			// String queryKey =
			// httpExchange.getRequestURI().toString().split("\\?")[1].split("=")[0];
			String queryUser = httpExchange.getRequestURI().toString().split("=")[1];
			String[] dataUser = { tipo, queryUser };
			return dataUser;
		}
		case "temperature": {
			// String queryKey =
			// httpExchange.getRequestURI().toString().split("\\?")[1].split("=")[0];
			String queryTemperature = httpExchange.getRequestURI().toString().split("=")[1];
			String[] dataTemperature = { tipo, queryTemperature };
			return dataTemperature;
		}
		case "light": {
			// String queryKey =
			// httpExchange.getRequestURI().toString().split("\\?")[1].split("=")[0];
			String queryLight = httpExchange.getRequestURI().toString().split("=")[1];
			String[] dataLight = { tipo, queryLight };
			return dataLight;
		}
		default:
			String[] dataError = { tipo };
			return dataError;
		}
	}

	private void handleGETResponse(HttpExchange httpExchange, String[] requestParamValue) {
		String response = buildJsonResponse(requestParamValue);
		System.out.println(response);
		try {
			httpExchange.sendResponseHeaders(200, response.length());
			httpExchange.getResponseBody().write(response.getBytes());
			httpExchange.getResponseBody().close();
		} catch (IOException e) {

		}
	}

	private String buildJsonResponse(String[] data) {
		switch (data[0]) {
		case "users":

			MongoCursor<Document> cursorUser = users.find().iterator();
			String jsonUser = "[";
			while (cursorUser.hasNext()) {
				JSONObject obj = new JSONObject(cursorUser.next().toJson());
				jsonUser += "{";
				jsonUser += "\"user\":\"" + obj.getString("user") + "\",";
				jsonUser += "\"pass\":\"" + obj.getString("pass") + "\",";
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
				
				JSONObject obj = new JSONObject(cursorTemperature.next().toJson());
				jsonTemperature += "\"temperature\":\"" + obj.getString("temperature") + "\",";
				jsonTemperature += "\"date\":\"" + obj.getString("date") + "\",";
				jsonTemperature += "\"register\":\"" + obj.getString("register") + "\",";
				jsonTemperature += "\"user\":\"" + obj.getString("user") + "\"";
				jsonTemperature += "}";
				if (cursorTemperature.hasNext()) {
					jsonTemperature += ",";
				}
			}
			jsonTemperature += "]";
			return jsonTemperature;

		case "light":
			Bson queryLight = eq("date", data[1]);
			MongoCursor<Document> cursorLight = light.find().iterator();
			String jsonLight = "[";
			while (cursorLight.hasNext()) {
				jsonLight += "{";
				JSONObject obj = new JSONObject(cursorLight.next().toJson());
				jsonLight += "\"level\":\"" + obj.getString("level") + "\",";
				jsonLight += "\"date\":\"" + obj.getString("date") + "\",";
				jsonLight += "\"register\":\"" + obj.getString("register") + "\",";
				jsonLight += "\"user\":\"" + obj.getString("user") + "\",";
				jsonLight += "}";
				if (cursorLight.hasNext()) {
					jsonLight += ",";
				}
			}
			jsonLight += "]";

			return jsonLight;

		default:
			return "[{Err:" + data[0] + " not found}]";
		}

	}

}
