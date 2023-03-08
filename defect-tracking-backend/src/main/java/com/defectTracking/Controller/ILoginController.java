package com.defectTracking.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.defectTracking.Entity.JwtRequest;

@CrossOrigin("*")
public interface ILoginController {

	@PostMapping("/login")
	ResponseEntity<?> generateToken(@RequestBody JwtRequest jwt) throws Exception;
}
