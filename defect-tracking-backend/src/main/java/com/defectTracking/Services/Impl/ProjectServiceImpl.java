package com.defectTracking.Services.Impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.defectTracking.Dao.ProjectRepository;
import com.defectTracking.Entity.Project;
import com.defectTracking.Services.IProjectService;

@Service
public class ProjectServiceImpl implements IProjectService {

	@Autowired
	public ProjectRepository projectRepository;

	@Override
	public Project createProject(Project project) {
		Project u1 = null;
		try {
			u1 = projectRepository.save(project);
			return u1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return u1;
	}

	@Override
	public List<Project> getProjects() {
		List<Project> projectList = null;
		try {
			projectList = (List<Project>) projectRepository.findAll();
			return projectList;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return projectList;
	}

	@Override
	public Optional<Project> getById(int id) {
		Optional<Project> u = projectRepository.findById(id);
		return u;
	}

	@Override
	public String deleteProject(int id) {
		try {
			projectRepository.deleteById(id);
		} catch (Exception e) {
			System.out.println(e);
		}
		return "done";
	}

	@Override
	public Project updateProject(Project projectNew, int userId) {
		Project projectOld = null;
		try {
			Optional<Project> u = projectRepository.findById(userId);
			projectOld = u.get();
			projectOld.setCreatedTime(projectOld.getCreatedTime());
			if (projectNew.getProjectName() == null)
				projectOld.setProjectName(projectOld.getProjectName());
			else
				projectOld.setProjectName(projectNew.getProjectName());
			 DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
				Date ct=new Date();
				projectOld.setModifiedTime(dateFormat.format(ct));
			if (projectNew.getDescription() == null)
				projectOld.setDescription(projectOld.getDescription());
			else
				projectOld.setDescription(projectNew.getDescription());
			projectRepository.save(projectOld);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return projectOld;
	}

	@Override
	public Project getByProjectName(String projectName) {
		Project found = projectRepository.findProjectByName(projectName);
		return found;
	}

}
