package florida.es.mongo;

public class Pruebas {

	public static void main(String[] args) {

		String hola = "usu";
		boolean resultado;
		try {
			Integer.parseInt(hola);
			resultado = true;
		} catch (NumberFormatException excepcion) {
			resultado = false;
		}

		if (resultado) {
			System.out.println("Soy un numero");
		} else {
			System.out.println("Soy un string");
		}

	}

}
