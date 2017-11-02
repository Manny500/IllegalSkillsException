package com.revature.exception;

public class InputTypeNotAllowedException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InputTypeNotAllowedException() {
		System.out.println("Cannot recognize input type.");
	}

}