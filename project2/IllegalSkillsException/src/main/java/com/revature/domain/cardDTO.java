package com.revature.domain;


public class cardDTO {
	private int cId;

	private int cVerify;

	private int cWorth;

	private String cTitle;

	private String cDescription;
	
	private int laneId;

	public cardDTO() {}
	
	public cardDTO(int cId, int cVerify, int cWorth, String cTitle, String cDescription, int laneId) {
		super();
		this.cId = cId;
		this.cVerify = cVerify;
		this.cWorth = cWorth;
		this.cTitle = cTitle;
		this.cDescription = cDescription;
		this.laneId = laneId;
	}



	public int getcId() {
		return cId;
	}

	public void setcId(int cId) {
		this.cId = cId;
	}

	public int getcVerify() {
		return cVerify;
	}

	public void setcVerify(int cVerify) {
		this.cVerify = cVerify;
	}

	public int getcWorth() {
		return cWorth;
	}

	public void setcWorth(int cWorth) {
		this.cWorth = cWorth;
	}

	public String getcTitle() {
		return cTitle;
	}

	public void setcTitle(String cTitle) {
		this.cTitle = cTitle;
	}

	public String getcDescription() {
		return cDescription;
	}

	public void setcDescription(String cDescription) {
		this.cDescription = cDescription;
	}

	public int getLaneId() {
		return laneId;
	}

	public void setLaneId(int laneId) {
		this.laneId = laneId;
	} 
	
	
}
