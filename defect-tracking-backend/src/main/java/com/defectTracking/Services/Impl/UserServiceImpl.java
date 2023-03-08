package com.defectTracking.Services.Impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.defectTracking.Dao.UserRepository;
import com.defectTracking.Entity.User;
import com.defectTracking.Services.IUserService;
import com.defectTracking.SwaggerConfig.RSA;

@Component
public class UserServiceImpl implements IUserService {

	@Autowired
	public UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RSA rsa;

	@Override
	public User createUser(User user) {
		try {
			rsa.initFromStrings();
			String decryptpassword = rsa.decrypt(user.getPassword());
			User userToBeInserted = new User();
			userToBeInserted.setFirstname(user.getFirstname());
			userToBeInserted.setLastname(user.getLastname());
			userToBeInserted.setAssignto(user.getAssignto());
			userToBeInserted.setCreatedtime(user.getCreatedtime());
			userToBeInserted.setCreatorid(user.getCreatorid());
			userToBeInserted.setPassword(passwordEncoder.encode(decryptpassword));
			userToBeInserted.setCreatoridticket(user.getCreatoridticket());
			userToBeInserted.setId(user.getId());
			userToBeInserted.setModifiedtime(user.getModifiedtime());
			userToBeInserted.setProject(user.getProject());
			userToBeInserted.setRole(user.getRole());
			userToBeInserted.setUsername(user.getUsername());
			userToBeInserted.setUserid(user.getUserid());
			User u1 = userRepository.save(userToBeInserted);
			return u1;
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public List<User> getAllUserExcept(String username) {
		return (List<User>) userRepository.findAllExcept(username);

	}

	@Override
	public Optional<User> getById(int id) {
		Optional<User> u = userRepository.findById(id);
		return u;
	}

	@Override
	public String deleteUser(int id) {
		try {
			userRepository.deleteById(id);
		} catch (Exception e) {
			System.out.println(e);
		}
		return "done";

	}

	@Override
	public User updateUser(User user, int userId) {
		Optional<User> u = userRepository.findById(userId);
		User userOld = u.get();
		// setting created time
		userOld.setCreatedtime(userOld.getCreatedtime());
		// setting first name if changed else setting old name
		if (user.getFirstname() != null)
			userOld.setFirstname(user.getFirstname());
		else
			userOld.setFirstname(userOld.getFirstname());
		// setting last name if changed else setting old name
		if (user.getLastname() != null)
			userOld.setLastname(user.getLastname());
		else
			userOld.setLastname(userOld.getLastname());
		// setting username if changed else setting old name
		if (user.getUsername() != null)
			userOld.setUsername(user.getUsername());
		else
			userOld.setUsername(userOld.getUsername());
		// modified time is always setting

		// setting password if changed else setting old name
		if (user.getPassword() != null)
			userOld.setPassword(user.getPassword());
		else
			userOld.setPassword(userOld.getPassword());
		// //setting role if changed else setting old name
		if (user.getRole().size() != 0)
			userOld.setRole(user.getRole());
		else
			userOld.setRole(userOld.getRole());

		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date ct = new Date();
		userOld.setModifiedtime(dateFormat.format(ct));
		userRepository.save(userOld);

		return userOld;
	}

	@Override
	public User getByUsername(String username) {
		return userRepository.findByUniqueUsername(username);

	}

	@Override
	public List<User> getDeveloper() {
		return userRepository.findByRole();

	}
}
