package com.revature.domain;


public class taskDTO {
	
	private int tId;

	private int tComplete;

	private String tInfo;
	
	private int cardId;
	
	public taskDTO() {}
	
	

	public taskDTO(int tId, int tComplete, String tInfo, int cardId) {
		super();
		this.tId = tId;
		this.tComplete = tComplete;
		this.tInfo = tInfo;
		this.cardId = cardId;
	}



	public int gettId() {
		return tId;
	}

	public void settId(int tId) {
		this.tId = tId;
	}

	public int gettComplete() {
		return tComplete;
	}

	public void settComplete(int tComplete) {
		this.tComplete = tComplete;
	}

	public String gettInfo() {
		return tInfo;
	}

	public void settInfo(String tInfo) {
		this.tInfo = tInfo;
	}

	public int getCardId() {
		return cardId;
	}

	public void setCardId(int cardId) {
		this.cardId = cardId;
	}
	
	

}
