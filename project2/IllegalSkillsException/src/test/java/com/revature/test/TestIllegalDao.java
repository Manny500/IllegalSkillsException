package com.revature.test;


import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.revature.dao.IllegalDaoImp;
import com.revature.domain.Board;
import com.revature.domain.Card;
import com.revature.domain.Lane;
import com.revature.domain.TV2User;
import com.revature.domain.Task;
import com.revature.service.AppService;

//@ContextConfiguration(locations = "classpath:/static/features/beans-test.xml")
@ContextConfiguration({ "file:src/main/webapp/WEB-INF/beans-test.xml" })
@RunWith(SpringJUnit4ClassRunner.class)
public class TestIllegalDao {

	@Autowired
	private IllegalDaoImp dao;
	@Autowired
	private AppService service;

	@Test
	@Transactional
	@Rollback(true)
	public void testCreateLanes() {
		Lane lane = new Lane("Information Technology");
		dao.createLane(lane);
		Lane newLane = dao.getLane(lane);
		Assert.assertEquals(lane.getlTitle(), newLane.getlTitle());
	}

	@Test
	@Transactional
	@Rollback(true)
	public void testCreateBoards() {
		Board board = new Board("John Snow's Trello");
		dao.createBoard(board);

		Board newBoard = dao.getBoard(board);
		Assert.assertEquals(board.getbTitle(), newBoard.getbTitle());
	}

	@Test
	@Transactional
	@Rollback(true)
	public void testCreateCards() {
		Card card = new Card("User can watch a movie");
		dao.createCard(card);

		Card newCard = dao.getCard(card);

		Assert.assertEquals(card.getcTitle(), newCard.getcTitle());
	}

	@Test
	@Transactional
	@Rollback(true)
	public void testCreateTasks() {
		Task task = new Task("Dao methods");
		dao.createTask(task);

		Task newTask = dao.getTask(task);

		Assert.assertEquals(task.getTaskCard(), newTask.getTaskCard());
	}

	@Test
	@Transactional
	@Rollback(true)
	public void testValidateLogin() {
		TV2User user = new TV2User("b", "b");
		TV2User user2 = new TV2User(21, "bob", "Thunder", "b", "b", 2, "test@yahoo.com", 0);
		// Assert.assertNotEquals(user2, service.validateLogin(user));
		Assert.assertEquals(user2.getUserId(), service.validateLogin(user).getUserId());
	}

	@Test
	@Transactional
	@Rollback(true)
	public void testGetUsers() {
		TV2User user = new TV2User(557, "John", "Cena", "j", "c", 1, "123@gmail.com", 0);
		dao.createUser(user); // create a User and update

		// TV2User user2 = new TV2User(21,"bob","Thunder","b","b",2,"test@yahoo.com",0);
		Assert.assertEquals("John", dao.getUser(user).getFirstName());
		// Assert.assertEquals(user2.getUserId(),
		// service.validateLogin(user).getUserId());
	}
	
	@Test
	@Transactional
	@Rollback(true)
	public void testGetLanes() {
		Lane lane = new Lane(55,"Trello lane");
		dao.createLane(lane); // create a User and update

		// TV2User user2 = new TV2User(21,"bob","Thunder","b","b",2,"test@yahoo.com",0);
		Assert.assertEquals("Trello lane", dao.getLane(lane).getlTitle());
		// Assert.assertEquals(user2.getUserId(),
		// service.validateLogin(user).getUserId());
	}

	@Test
	@Transactional
	@Rollback(true)
	public void testMergeUser() {
		TV2User user = new TV2User(557, "John", "Cena", "j", "c", 1, "123@gmail.com", 0);
		dao.createUser(user); // create a User and update
		dao.mergeUser(new TV2User(557, "John", "Cena", "j", "c", 1, "456@gmail.com", 0)); // update the password

		Assert.assertEquals("456@gmail.com", dao.getUser(user).getEmail());
	}

//	@Test
//	@Transactional
//	@Rollback(true)
//	public void testGetAllBoards() {
//
//		TV2User user = new TV2User("junit", "junit"); // userName, password
//		Board board = new Board("Junit Testing Board", user);
//		dao.createBoard(board);
//
//		List<Board> boards = dao.getAllBoards();
//		Assert.assertEquals(board.getbTitle(), boards.get(0).getbTitle());
//	}

}
