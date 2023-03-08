package com.defectTracking.Controller.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.defectTracking.Controller.IProjectController;
import com.defectTracking.Entity.Project;
import com.defectTracking.Services.IProjectService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/project")
public class ProjectControllerImpl implements IProjectController {

	@Autowired
	private IProjectService projectService;

	@Override
	public ResponseEntity<Project> createProject(Project project) {
		try {
			projectService.createProject(project);
			return ResponseEntity.status(HttpStatus.CREATED).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<List<Project>> getProjects() {
		List<Project> list = projectService.getProjects();
		if (list.size() <= 0) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(list);
	}

	@Override
	public ResponseEntity<Optional<Project>> getProjectByID(int id) {
		Optional<Project> user = projectService.getById(id);
		if (user == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		return ResponseEntity.of(Optional.of(user));
	}

	@Override
	public String deleteUser(int id) {
		projectService.deleteProject(id);
		return "done";
	}

	@Override
	public Project Update(Project project, int id) {
		projectService.updateProject(project, id);
		return project;
	}

	@Override
	public Project getProjectName(String projectName) {
		Project found = projectService.getByProjectName(projectName);
		if (found != null)
			return found;
		else
			return null;
	}

}
