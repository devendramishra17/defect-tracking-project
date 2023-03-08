package com.defectTracking.Controller.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.defectTracking.Controller.IAdminController;
import com.defectTracking.Entity.Status;
import com.defectTracking.Entity.User;
import com.defectTracking.Services.IStatusService;
import com.defectTracking.Services.IUserService;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class AdminControllerImpl implements IAdminController {

	@Autowired
	private IUserService userService;

	@Autowired
	private IStatusService statusService;

	@Override
	public ResponseEntity<User> createUser(User user) {
		try {
			userService.createUser(user);
			return ResponseEntity.status(HttpStatus.CREATED).build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<List<User>> getUsers(String username) {
		List<User> list = userService.getAllUserExcept(username);
		if (list.size() <= 0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(list);
	}

	@Override
	public ResponseEntity<Optional<User>> getUserByID(int id) {
		Optional<User> user = userService.getById(id);
		if (user == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		return ResponseEntity.of(Optional.of(user));
	}

	@Override
	public String deleteUser(int id) {
		userService.deleteUser(id);
		return "done";
	}

	@Override
	public User Update(User user, int id) {
		userService.updateUser(user, id);
		return user;
	}

	@Override
	public User getByUsername(String username) {
		
		User found = userService.getByUsername(username);
		try {
		if (found != null)
			return found;
		else
			return null;
		}catch (Exception e) {
            return null;
		}
	}

	@Override
	public User getIDByUsername(String username) {
		User found = userService.getByUsername(username);
		if (found != null)
			return found;
		else
			return null;
	}

	@Override
	public List<User> getDeveloper() {
		return userService.getDeveloper();

	}

	@Override
	public List<Status> getStatus() {
		return statusService.getStatus();
	}

}
