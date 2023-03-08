package com.defectTracking.Services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.defectTracking.Dao.UserRepository;
import com.defectTracking.Entity.User;
import com.defectTracking.Services.ILoginService;

@Component
public class LoginServiceImpl implements ILoginService {

	@Autowired
	private UserRepository repository;

	@Override
	public User loginById(String userName, String password) {

		User u1 = repository.findByUsernameAndPassword(userName, password);
		return u1;
	}
}
