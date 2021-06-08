package com.neolab.modelo;

import java.sql.Date;

public class Pedido {

	private int nroPedido;
	private int id;
	private String tipoHelado;
	private String adicional;
	private Date fecha;

	public int getNroPedido() {
		return nroPedido;
	}

	public void setNroPedido(int nroPedido) {
		this.nroPedido = nroPedido;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTipoHelado() {
		return tipoHelado;
	}

	public void setTipoHelado(String tipoHelado) {
		this.tipoHelado = tipoHelado;
	}

	public String getAdicional() {
		return adicional;
	}

	public void setAdicional(String adicional) {
		this.adicional = adicional;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	
}
