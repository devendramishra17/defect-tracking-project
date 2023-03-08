package com.defectTracking.Controller.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.defectTracking.Controller.ILoginController;
import com.defectTracking.Entity.JwtRequest;
import com.defectTracking.Entity.JwtResponse;
import com.defectTracking.Entity.User;
import com.defectTracking.Helper.jwtUtil;
import com.defectTracking.Services.CustomUserDetailsService;
import com.defectTracking.Services.IUserService;
import com.defectTracking.SwaggerConfig.RSA;

@RestController
@CrossOrigin(origins = "*")
public class LoginControllerImpl implements ILoginController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	private jwtUtil jwtUtil;

	@Autowired
	private IUserService userServices;
	
	@Autowired
	private RSA rsa;

	@Override
	public ResponseEntity<?> generateToken(JwtRequest jwt) throws Exception {
		try {
			rsa.initFromStrings();
			String decryptpassword = rsa.decrypt(jwt.getPassword()); 
			this.authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(jwt.getUsername(), decryptpassword));
		} catch (UsernameNotFoundException e) {
			throw new Exception("invalid ");
		}
		UserDetails details = this.customUserDetailsService.loadUserByUsername(jwt.getUsername());
		String token = this.jwtUtil.generateToken(details);
		User user = userServices.getByUsername(details.getUsername());
		return ResponseEntity.ok(new JwtResponse(token, user.getRole()));
	}

}
