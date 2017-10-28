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
@Table(name="LANE")
public class Lane implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="L_ID")
	private int lId;
	
	@Id
	@Column(name="B_ID")
	private int bId;
	
	@Id
	@Column(name="L_TITLE")
	private String lTitle;
	
	
	@ManyToOne
	@JoinColumn(name="B_ID")
	private Board laneBoard;
	
	@OneToMany(mappedBy = "cardLane", fetch = FetchType.EAGER)
	Set<Card> Cards = new HashSet<Card>();

	public Lane() {
		super();
	}

	public Lane(int lId, int bId, String lTitle, Board laneBoard, Set<Card> cards) {
		super();
		this.lId = lId;
		this.bId = bId;
		this.lTitle = lTitle;
		this.laneBoard = laneBoard;
		Cards = cards;
	}

	public int getlId() {
		return lId;
	}

	public void setlId(int lId) {
		this.lId = lId;
	}

	public int getbId() {
		return bId;
	}

	public void setbId(int bId) {
		this.bId = bId;
	}

	public String getlTitle() {
		return lTitle;
	}

	public void setlTitle(String lTitle) {
		this.lTitle = lTitle;
	}

	public Board getLaneBoard() {
		return laneBoard;
	}

	public void setLaneBoard(Board laneBoard) {
		this.laneBoard = laneBoard;
	}

	public Set<Card> getCards() {
		return Cards;
	}

	public void setCards(Set<Card> cards) {
		Cards = cards;
	}

	@Override
	public String toString() {
		return "Lane [lId=" + lId + ", bId=" + bId + ", lTitle=" + lTitle + ", laneBoard=" + laneBoard + ", Cards="
				+ Cards + "]";
	}
	
	
}
