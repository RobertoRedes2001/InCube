package florida.es.arduino;

import java.io.PrintWriter;
import java.util.Scanner;

import com.fazecast.jSerialComm.SerialPort;

public class GestorArduino {

	SerialPort chosenPort;
	PrintWriter output;
	Scanner input;
	
	GestorArduino(SerialPort chosenPort) {
		this.chosenPort = chosenPort;
		output = new PrintWriter(chosenPort.getOutputStream());
		input = new Scanner(chosenPort.getInputStream());
	}
	
	String gestionaInstruccion(int codigoInstruccion) {
		String respuesta = "null";
		try {
			output.print(String.valueOf(codigoInstruccion));
			output.flush();
			if (codigoInstruccion >= 5) {  //Si el codigo es igual o mayor que 5 hay lectura desde el Arduino a Java
				respuesta = input.nextLine();
			}
		} catch (Exception e) {
			e.printStackTrace();
			respuesta = "ERROR: " + e.getMessage();
		}
		return respuesta;
	}
	
	void cerrarGestor() {
		chosenPort.closePort();
		output.close();
		input.close();
	}

}
