package com.revature.domain;

public class BoardDTO {
	private String lTitle;
	
	private int bId;
	
	public BoardDTO() {
		// TODO Auto-generated constructor stub
	}

	public BoardDTO(String lTitle, int bId) {
		super();
		this.lTitle = lTitle;
		this.bId = bId;
	}

	public String getlTitle() {
		return lTitle;
	}

	public void setlTitle(String lTitle) {
		this.lTitle = lTitle;
	}

	public int getbId() {
		return bId;
	}

	public void setbId(int bId) {
		this.bId = bId;
	}
	
	
}