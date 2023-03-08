package com.defectTracking.Services;

import java.util.List;
import java.util.Optional;

import com.defectTracking.Entity.User;

public interface IUserService {

	User createUser(User user);

	List<User> getAllUserExcept(String username);

	Optional<User> getById(int id);

	String deleteUser(int id);

	User updateUser(User user, int userId);

	User getByUsername(String username);

	List<User> getDeveloper();

}
