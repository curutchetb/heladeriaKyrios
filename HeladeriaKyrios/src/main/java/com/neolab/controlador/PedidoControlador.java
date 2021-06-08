package com.neolab.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.neolab.entity.PedidoEntity;
import com.neolab.modelo.RespuestaEntity;
import com.neolab.repository.PedidoRepository;

@CrossOrigin
@RestController
public class PedidoControlador {

	@Autowired
	private PedidoRepository repository;
	
	@Autowired
	private RespuestaEntity respuesta;
	
	@PostMapping("/enviarPedido")
	public ResponseEntity<?> enviarPedido(@RequestBody PedidoEntity pedido){
		this.repository.save(pedido);
		this.respuesta.setMensaje("Guardado!!");
		return ResponseEntity.ok(this.respuesta);
		}
	
	@GetMapping("/informe")
	public ResponseEntity<?> getAllPersona() {
	
		try {
			return ResponseEntity.ok(this.repository.findAll());
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	
}
