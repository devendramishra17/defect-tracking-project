package com.defectTracking.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.defectTracking.Entity.Status;
import com.defectTracking.Entity.User;

@CrossOrigin(origins = "*")
public interface IAdminController {

	@PostMapping("/createuser")
	ResponseEntity<User> createUser(@RequestBody User user);

	@GetMapping("/users/{username}")
	ResponseEntity<List<User>> getUsers(@PathVariable("username") String username);

	@GetMapping("/user/{id}")
	ResponseEntity<Optional<User>> getUserByID(@PathVariable("id") int id);

	@DeleteMapping("/delete/{id}")
	String deleteUser(@PathVariable("id") int id);

	@PutMapping("/updateuser/{id}")
	User Update(@RequestBody User user, @PathVariable("id") int id);

	@GetMapping("/getIdbyusername/{username}")
	User getIDByUsername(@PathVariable("username") String username);

	@GetMapping("/getbyusername/{username}")
	User getByUsername(@PathVariable("username") String username);

	@GetMapping("/getdeveloper")
	List<User> getDeveloper();

	@GetMapping("/getstatus")
	List<Status> getStatus();

}
