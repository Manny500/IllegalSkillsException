package com.revature.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revature.dao.IllegalDao;
import com.revature.domain.Board;
import com.revature.domain.Card;
import com.revature.domain.Lane;
import com.revature.domain.TV2User;
import com.revature.domain.Task;

@Service(value = "AppService")
@Transactional
public class AppService {

	private TV2User user;

	@Autowired
	private IllegalDao dao;

	public TV2User validateLogin(TV2User us) {

		user = dao.getUserByUsername(us);

		if (user == null) {

			// Create custom exception delete print out
			return null;
			// throw new AccountDoesNotExistException();

		} else if (user.getPassword().equals(us.getPassword())) {

			return user;

		} else {

			return null;
			// throw new CannotAuthenticateException();
		}
	}

	// CREATE
	public void createUser(TV2User user) {
		dao.createUser(user);
	}

	public void createBoard(Board board) {
		dao.createBoard(board);
	}

	public void createLane(Lane lane) {
		dao.createLane(lane);
	}

	public void createCard(Card card) {
		dao.createCard(card);
	}

	public void createTask(Task task) {
		dao.createTask(task);
	}

	// READ
	public TV2User getUser(TV2User user) {
		return dao.getUser(user);
	}
	
	public List<TV2User> getAllUsers(){
		return dao.getAllUsers();
	}

	public TV2User getUserByUsername(TV2User user) {
		return dao.getUserByUsername(user);
	}

	public Board getBoard(Board board) {
		return dao.getBoard(board);
	}

	public Lane getLane(Lane lane) {
		return dao.getLane(lane);
	}

	public Card getCard(Card card) {
		return dao.getCard(card);
	}

	public Task getTask(Task task) {
		return dao.getTask(task);
	}

	// UPDATE
	public void updateUser(TV2User user) {
		dao.updateUser(user);
	}

	public void updateBoard(Board board) {
		dao.updateBoard(board);
	}

	public void updateLane(Lane lane) {
		dao.updateLane(lane);
	}

	public void updateCard(Card card) {
		dao.createCard(card);
	}

	public void updateTask(Task task) {
		dao.updateTask(task);
	}

	// DELETE
	public void deleteUser(TV2User user) {
		dao.deleteUser(user);
	}

	public void deleteBoard(Board board) {
		dao.deleteBoard(board);
	}

	public void deleteLane(Lane lane) {
		dao.deleteLane(lane);
	}

	public void deleteCard(Card card) {
		dao.deleteCard(card);
	}

	public void deleteTask(Task task) {
		dao.deleteTask(task);
	}

}