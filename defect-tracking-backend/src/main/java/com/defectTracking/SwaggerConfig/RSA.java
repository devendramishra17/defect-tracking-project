package com.defectTracking.SwaggerConfig;

import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

import javax.crypto.Cipher;

import org.springframework.stereotype.Component;

@Component
public class RSA {

	private PrivateKey privateKey;
	private PublicKey publicKey;
	
	private static final String PUBLIC_KEY_STRING="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3wNII83VEnFP34MbWRubsl5T8LfNdGSaSoj+vZ2CPBkT9GPIrg5bign4zrqXVzq1CHmBJY++JXnUuJzBmf+UKm8zGeLNu5G50UwOSB78jkwTb66hC6Bz1sK3+7UE4HCeuvY3eBY01cSaM/l+9DoY3ICcO5+6+7hYMoBiH1RQO9wIDAQAB";
	private static final String PRIVATE_KEY_STRING="MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALfA0gjzdUScU/fgxtZG5uyXlPwt810ZJpKiP69nYI8GRP0Y8iuDluKCfjOupdXOrUIeYElj74ledS4nMGZ/5QqbzMZ4s27kbnRTA5IHvyOTBNvrqELoHPWwrf7tQTgcJ669jd4FjTVxJoz+X70OhjcgJw7n7r7uFgygGIfVFA73AgMBAAECgYBdwPXpNz6X+SMmj/sjjR15jYWofVF0KMbzffD8b8RmdQ5yDG5TIVq0y1vUxsE6K69e0tzR1Tl8X0NufvRE9/BF752Q0VufVYKLTYNEcfD/JoytsMOXHMl0OUpoK8bdw5oVr/UbQ6iM4BMGLOProg4qf3vq0a1RoR7a2BkZsZdPgQJBAPurGReHyMIFRKCBwWkbNZYGsHp6gZpW53h5KZ3cDnPLprnl7Io0mMiKIW5q3a8LCSmaoaC1bS6jfPehEAZTcFcCQQC66nl3ECyQfT0cL4N/5fYrFUIbpt+SlMI8cWVg61wjMWCzWq9vhtmQjofEfbIkSW1H0i+HQd5ibINizEBvNrJhAkEA8LRy6ViLoVacjs/MBxVpKTb4sAxfzRh1h3qLXVrNz97mdkL8/CrWPmgvFYbMxNDPUKV/FVCxPrxLmCTKSOKhPQJBAIMJyLfg3e0577Kn2L+8fxT7JUpvdcO0iGuJb/I/bmu5vTpf9Cfy2OoQEjx9hnsMAxHb17gyRG6p9n44BWAyb2ECQH19gswPBaX21FZ1Jxp/QxhilIVCYay7uwq+sIIAs6CpZ4Zpr7qA1MK1ZN+2YyJE7Fl/Q/vm+3x40/hIZuaAjfo="; 
	
	public void init() {
		try {
			KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
			generator.initialize(1024);
			KeyPair pair = generator.generateKeyPair();
			privateKey = pair.getPrivate();
			publicKey = pair.getPublic();
		} catch (Exception e) {
		}
	}
	
	public void initFromStrings() {
		try {
			X509EncodedKeySpec keySpecPublic = new X509EncodedKeySpec(decode(PUBLIC_KEY_STRING));
			PKCS8EncodedKeySpec keySpecPrivate = new PKCS8EncodedKeySpec(decode(PRIVATE_KEY_STRING));
			
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			
			publicKey = keyFactory.generatePublic(keySpecPublic);
			privateKey = keyFactory.generatePrivate(keySpecPrivate);
		} catch (Exception e) {
		}
	}
	
	public void printKeys() {
		System.out.println("PRIVATE KEY : "+encode(privateKey.getEncoded()));
		System.out.println("PUBLIC KEY : "+encode(publicKey.getEncoded()));
	}
	
	public String encrypt(String password) throws Exception {
		byte[] passwordToBytes = password.getBytes();
		Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
		cipher.init(Cipher.ENCRYPT_MODE, publicKey);
		byte[] encryptedBytes = cipher.doFinal(passwordToBytes);
		return encode(encryptedBytes);
	}

	private String encode(byte[] data) {
		return Base64.getEncoder().encodeToString(data);
	}
	
	public String decrypt(String encryptPassword) throws Exception {
		byte[] encryptedBytes = decode(encryptPassword);
		Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
		cipher.init(Cipher.DECRYPT_MODE, privateKey);
		byte[] decryptedPassword = cipher.doFinal(encryptedBytes);
		return new String(decryptedPassword,"UTF8");
	}
	
	private byte[] decode(String data) {
		return Base64.getDecoder().decode(data);
	}
}
