package com.defectTracking.Services;

import java.util.ArrayList;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.defectTracking.Dao.UserRepository;
import com.defectTracking.Entity.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User u = repository.findByUsername(username);
		if (Objects.nonNull(u)) {

			return new org.springframework.security.core.userdetails.User(u.getUsername(), u.getPassword(),
					new ArrayList<>());
		} else
			throw new UsernameNotFoundException("not username");
	}

}
