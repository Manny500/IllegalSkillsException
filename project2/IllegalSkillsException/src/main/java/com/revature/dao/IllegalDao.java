package com.revature.dao;

import java.util.List;

import com.revature.domain.Board;
import com.revature.domain.Card;
import com.revature.domain.Lane;
import com.revature.domain.TV2User;
import com.revature.domain.Task;

public interface IllegalDao {

	// CREATE
	public void createUser(TV2User user);

	public void createBoard(Board board);

	public void createLane(Lane lane);

	public void createCard(Card card);

	public void createTask(Task task);

	// READ
	public TV2User getUser(TV2User user);

	public List<TV2User> getAllUsers();

	public TV2User getUserByUsername(TV2User user);

	public Board getBoard(Board board);

	public Lane getLane(Lane lane);

	public Card getCard(Card card);

	public Task getTask(Task task);

	// UPDATE
	public void updateUser(TV2User user);

	public void updateBoard(Board board);

	public void updateLane(Lane lane);

	public void updateCard(Card card);

	public void updateTask(Task task);

	// DELETE
	public void deleteUser(TV2User user);

	public void deleteBoard(Board board);

	public void deleteLane(Lane lane);

	public void deleteCard(Card card);

	public void deleteTask(Task task);

}