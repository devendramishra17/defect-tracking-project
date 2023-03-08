package com.defectTracking.Services;

import java.util.List;
import java.util.Optional;

import com.defectTracking.Entity.Project;

public interface IProjectService {

	Project createProject(Project project);

	List<Project> getProjects();

	Optional<Project> getById(int id);

	String deleteProject(int id);

	Project updateProject(Project projectNew, int userId);

	Project getByProjectName(String projectName);

	

}
