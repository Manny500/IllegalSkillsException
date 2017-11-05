package com.revature.domain;

import java.util.ArrayList;
import com.revature.domain.Card;
import com.revature.domain.Lane;
import com.revature.domain.Task;

public class LaneDTO {

	private ArrayList<Lane> lanes;
	private ArrayList<Card> cards;
	private ArrayList<Task> tasks;

	public LaneDTO() {
		super();
	}

	public LaneDTO(ArrayList<Card> cards) {
		super();
		this.cards = cards;
	}

	public LaneDTO(ArrayList<Lane> lanes, ArrayList<Card> cards, ArrayList<Task> tasks) {
		super();
		this.lanes = lanes;
		this.cards = cards;
		this.tasks = tasks;
	}

	public ArrayList<Lane> getLanes() {
		return lanes;
	}

	public void setLanes(ArrayList<Lane> lanes) {
		this.lanes = lanes;
	}

	public ArrayList<Card> getCards() {
		return cards;
	}

	public void setCards(ArrayList<Card> cards) {
		this.cards = cards;
	}

	public ArrayList<Task> getTasks() {
		return tasks;
	}

	public void setTasks(ArrayList<Task> tasks) {
		this.tasks = tasks;
	}

}