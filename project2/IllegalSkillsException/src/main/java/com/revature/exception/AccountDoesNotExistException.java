package com.revature.exception;

public class AccountDoesNotExistException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public AccountDoesNotExistException() {

		System.out.println("The account in question does not exist in our records.");

	}

}