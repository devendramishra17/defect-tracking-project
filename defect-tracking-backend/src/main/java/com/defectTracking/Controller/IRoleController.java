package com.defectTracking.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.defectTracking.Entity.Role;

public interface IRoleController {

	@DeleteMapping("/deleterole/{id}")
	void delete(@PathVariable("id") int id);

	@GetMapping("/getrole")
	List<Role> getRoles();

	@PostMapping("/createrole")
	Role createrole(Role role);

}
