package com.neolab.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="pedidos")
public class PedidoEntity {

	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_pedido;
	
	@Column
	private int id_repartidor;
	
	@Column
	private String tipo_helado;
	
	@Column
	private String adicional;
	
	@Column
	private String fecha;
	
	@Column
	private int caja;

	@Column
	private String mes;
	
	public int getId() {
		return id_pedido;
	}

	public void setId(int id) {
		this.id_pedido = id;
	}

	public int getIdRepartidor() {
		return id_repartidor;
	}

	public void setIdRepartidor(int idRepartidor) {
		this.id_repartidor = idRepartidor;
	}

	public String getTipoHelado() {
		return tipo_helado;
	}

	public void setTipoHelado(String tipoHelado) {
		this.tipo_helado = tipoHelado;
	}

	public String getAdicional() {
		return adicional;
	}

	public void setAdicional(String adicional) {
		this.adicional = adicional;
	}

	public String getFecha() {
		return fecha;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public int getCaja() {
		return caja;
	}

	public void setCaja(int caja) {
		this.caja = caja;
	}

	public String getMes() {
		return mes;
	}

	public void setMes(String mes) {
		this.mes = mes;
	}
	
	
	

}
