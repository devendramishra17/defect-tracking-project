package com.defectTracking.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.defectTracking.Entity.Project;

public interface IProjectController {

	@PostMapping(value = "/create")
	ResponseEntity<Project> createProject(@RequestBody Project project);

	@GetMapping("/projects")
	ResponseEntity<List<Project>> getProjects();

	@GetMapping("/project/{id}")
	ResponseEntity<Optional<Project>> getProjectByID(@PathVariable("id") int id);

	@DeleteMapping("/deleteproject/{id}")
	String deleteUser(@PathVariable("id") int id);

	@PutMapping("/updateproject/{id}")
	Project Update(@RequestBody Project project, @PathVariable("id") int id);

	@GetMapping("/getprojectname/{projectName}")
	Project getProjectName(@PathVariable("projectName") String projectName);

	
}
