package com.defectTracking.Controller.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.defectTracking.Controller.IRoleController;
import com.defectTracking.Dao.RoleRepository;
import com.defectTracking.Entity.Role;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class RoleControllerImpl implements IRoleController {

	@Autowired
	public RoleRepository roleRepository;

	@Override
	public Role createrole(Role role) {
		roleRepository.save(role);
		return role;
	}

	@Override
	public List<Role> getRoles() {
		return (List<Role>) roleRepository.findAll();
	}

	@Override
	public void delete(int id) {
		roleRepository.deleteById(id);
	}
}
