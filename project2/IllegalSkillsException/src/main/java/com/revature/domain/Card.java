package com.revature.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="CARD")
public class Card implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="C_ID")
	private int cId;
	
//	@Column(name="L_ID")
//	private int lId;
	
	@Column(name="C_VERIFY")
	private int cVerify;
	
	@Column(name="C_WORTH")
	private int cWorth;
	
	@Column(name="C_TITLE")
	private String cTitle;
	
	@Column(name="C_DESCRIPTION")
	private String cDescription;
	
	
	@ManyToOne
	@JoinColumn(name="L_ID")
	private Lane cardLane;
	
	@OneToMany(mappedBy = "taskCard", fetch = FetchType.EAGER)
	Set<Task> tasks = new HashSet<Task>();

	public Card() {
		super();
	}





	public Card(int cId, int cVerify, int cWorth, String cTitle, String cDescription, Lane cardLane, Set<Task> tasks) {
		super();
		this.cId = cId;
		this.cVerify = cVerify;
		this.cWorth = cWorth;
		this.cTitle = cTitle;
		this.cDescription = cDescription;
		this.cardLane = cardLane;
		this.tasks = tasks;
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

	public Lane getCardLane() {
		return cardLane;
	}

	public void setCardLane(Lane cardLane) {
		this.cardLane = cardLane;
	}

	public Set<Task> getTasks() {
		return tasks;
	}

	public void setTasks(Set<Task> tasks) {
		this.tasks = tasks;
	}





//	@Override
//	public String toString() {
//		return "Card [cId=" + cId + ", cVerify=" + cVerify + ", cWorth=" + cWorth + ", cTitle=" + cTitle
//				+ ", cDescription=" + cDescription + ", cardLane=" + cardLane + ", tasks=" + tasks + "]";
//	}

	
	
	
}
