package com.neolab.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.neolab.repository.RepartidorRepository;

import com.neolab.modelo.RespuestaEntity;

import com.neolab.entity.RepartidorEntity;

@CrossOrigin
@RestController
public class RepartidorControlador {
	
	@Autowired
	private RepartidorRepository repository;
	
	@Autowired
	private RespuestaEntity respuesta;
	

	@PostMapping("/guardarRepartidor")
	public ResponseEntity<?> guardarRepartidor(@RequestBody RepartidorEntity repartidor){
		this.repository.save(repartidor);
		this.respuesta.setMensaje("Guardado!!");
		return ResponseEntity.ok(this.respuesta);
		}
	
	@GetMapping("repartidor/{id}")
	public ResponseEntity<?> getPersona(@PathVariable("id") int id){
		
		try {
			return ResponseEntity.ok(this.repository.findById(id).get());
		} catch (Exception e) {
			this.respuesta.setMensaje("id " + id + ", no fue encontrado en la base de datos");
			return ResponseEntity.ok(this.respuesta);
		}	
	}
	
	@GetMapping("/todosRepartidores")
	public ResponseEntity<?> getAllPersona() {
	
		try {
			return ResponseEntity.ok(this.repository.findAll());
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	 
	@GetMapping("borrarRepartidor/{id}")
	public ResponseEntity<?> deletePersona(@PathVariable("id") int id){
		
		
		try {
			this.repository.deleteById(id);
			this.respuesta.setMensaje("Borrado");
			return ResponseEntity.ok(this.respuesta.getMensaje());
		} catch (Exception e) {
			this.respuesta.setMensaje("no se puede borrar el id " + id + " porque no existe o ya fue borrado");
			return ResponseEntity.ok(this.respuesta.getMensaje());
		}
		
		
	}
}
