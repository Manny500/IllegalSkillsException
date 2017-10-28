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
	
	@Id
	@Column(name="l_ID")
	private int lId;
	
	@Id
	@Column(name="C_VERIFY")
	private int cVerify;
	
	@Id
	@Column(name="C_WORTH")
	private int cWorth;
	
	@Id
	@Column(name="C_TITLE")
	private  String cTitle;
	
	@Id
	@Column(name="C_DESCRIPTION")
	private String cDescription;
	
	
	@ManyToOne
	@JoinColumn(name="L_ID")
	private Lane cardLane;
	
	@OneToMany(mappedBy = "TaskCard", fetch = FetchType.EAGER)
	Set<Task> tasks = new HashSet<Task>();

	public Card() {
		super();
	}

	public int getcId() {
		return cId;
	}

	public void setcId(int cId) {
		this.cId = cId;
	}

	public int getlId() {
		return lId;
	}

	public void setlId(int lId) {
		this.lId = lId;
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

	@Override
	public String toString() {
		return "Card [cId=" + cId + ", lId=" + lId + ", cVerify=" + cVerify + ", cWorth=" + cWorth + ", cTitle="
				+ cTitle + ", cDescription=" + cDescription + ", cardLane=" + cardLane + ", tasks=" + tasks + "]";
	}
	
	
	
	
}
