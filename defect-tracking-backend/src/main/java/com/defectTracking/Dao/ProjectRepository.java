package com.defectTracking.Dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.defectTracking.Entity.Project;

public interface ProjectRepository extends CrudRepository<Project, Integer> {

	@Query("select p from Project p where p.projectName = :m order by createdTime desc")
	Project findProjectByName(@Param("m") String projectName);

}
