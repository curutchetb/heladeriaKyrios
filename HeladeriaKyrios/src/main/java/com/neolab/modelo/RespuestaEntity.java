package com.neolab.modelo;

import org.springframework.stereotype.Component;

@Component
public class RespuestaEntity {

	private String mensaje;

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
}
