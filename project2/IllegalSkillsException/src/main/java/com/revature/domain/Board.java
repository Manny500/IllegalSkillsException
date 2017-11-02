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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "BOARD")
public class Board implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "B_ID")
	private int bId;

	@Column(name = "B_TITLE")
	private String bTitle;

	@Column(name = "TOTAL")
	private int total;

	@Column(name = "TEAM")
	private int team;

	@ManyToOne
	@JoinColumn(name = "TV2_ID")
	private TV2User boardUser;

	@JsonIgnore
	@OneToMany(mappedBy = "laneBoard", fetch = FetchType.EAGER)
	Set<Lane> lanes = new HashSet<Lane>();

	public Board() {
		super();
	}

	public Board(int bId, String bTitle, int total, TV2User boardUser, Set<Lane> lanes) {
		super();
		this.bId = bId;
		this.bTitle = bTitle;
		this.total = total;
		this.boardUser = boardUser;
		this.lanes = lanes;
	}

	public Board(int bId, String bTitle, int total, int team, TV2User boardUser, Set<Lane> lanes) {
		super();
		this.bId = bId;
		this.bTitle = bTitle;
		this.total = total;
		this.team = team;
		this.boardUser = boardUser;
		this.lanes = lanes;
	}

	public int getbId() {
		return bId;
	}

	public void setbId(int bId) {
		this.bId = bId;
	}

	public String getbTitle() {
		return bTitle;
	}

	public void setbTitle(String bTitle) {
		this.bTitle = bTitle;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public TV2User getBoardUser() {
		return boardUser;
	}

	public void setBoardUser(TV2User boardUser) {
		this.boardUser = boardUser;
	}

	public Set<Lane> getLanes() {
		return lanes;
	}

	public void setLanes(Set<Lane> lanes) {
		this.lanes = lanes;
	}

	public int getTeam() {
		return team;
	}

	public void setTeam(int team) {
		this.team = team;
	}

}