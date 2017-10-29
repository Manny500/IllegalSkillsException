package com.revature.exception;

public class CannotAuthenticateException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public CannotAuthenticateException() {

		System.out.println("Wrong username or password entered.");
	}
}
