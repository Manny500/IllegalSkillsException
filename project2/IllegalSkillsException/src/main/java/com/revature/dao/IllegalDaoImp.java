package com.revature.dao;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.revature.domain.Board;
import com.revature.domain.Card;
import com.revature.domain.Lane;
import com.revature.domain.TV2User;
import com.revature.domain.Task;

@Repository
public class IllegalDaoImp implements IllegalDao {
	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void createUser(TV2User user) {
		Session session = sessionFactory.getCurrentSession();
		session.save(user);
	}

	@Override
	public void createBoard(Board board) {
		Session session = sessionFactory.getCurrentSession();
		session.save(board);
	}

	@Override
	public void createLane(Lane lane) {
		Session session = sessionFactory.getCurrentSession();
		session.save(lane);
	}

	@Override
	public void createCard(Card card) {
		Session session = sessionFactory.getCurrentSession();
		session.save(card);
	}

	@Override
	public void createTask(Task task) {
		Session session = sessionFactory.getCurrentSession();
		session.save(task);
	}

	@Override
	public TV2User getUser(TV2User user) {
		Session session = sessionFactory.getCurrentSession();
		return (TV2User) session.get(TV2User.class, user.getUserId());
	}

	public TV2User getUserByUsername(TV2User user) {
		Session session = sessionFactory.getCurrentSession();
		Criteria crit = session.createCriteria(TV2User.class);
		crit.add(Restrictions.like("userName", user.getUserName()));
		return (TV2User) crit.uniqueResult();
	}

	@Override
	public Board getBoard(Board board) {
		Session session = sessionFactory.getCurrentSession();
		return (Board) session.get(Board.class, board.getbId());
	}

	@Override
	public Lane getLane(Lane lane) {
		Session session = sessionFactory.getCurrentSession();
		return (Lane) session.get(Lane.class, lane.getlId());
	}

	@Override
	public Card getCard(Card card) {
		Session session = sessionFactory.getCurrentSession();
		return (Card) session.get(Card.class, card.getcId());
	}

	@Override
	public Task getTask(Task task) {
		Session session = sessionFactory.getCurrentSession();
		return (Task) session.get(Task.class, task.gettId());
	}

	@Override
	public void updateUser(TV2User user) {
		Session session = sessionFactory.getCurrentSession();
		session.update(user);
	}

	@Override
	public void updateBoard(Board board) {
		Session session = sessionFactory.getCurrentSession();
		session.update(board);
	}

	@Override
	public void updateLane(Lane lane) {
		Session session = sessionFactory.getCurrentSession();
		session.update(lane);
	}

	@Override
	public void updateCard(Card card) {
		Session session = sessionFactory.getCurrentSession();
		session.update(card);
	}

	@Override
	public void updateTask(Task task) {
		Session session = sessionFactory.getCurrentSession();
		session.update(task);
	}

	@Override
	public void deleteUser(TV2User user) {
		Session session = sessionFactory.getCurrentSession();
		session.delete(user);

	}

	@Override
	public void deleteBoard(Board board) {
		Session session = sessionFactory.getCurrentSession();
		session.delete(board);
	}

	@Override
	public void deleteLane(Lane lane) {
		Session session = sessionFactory.getCurrentSession();
		session.delete(lane);

	}

	@Override
	public void deleteCard(Card card) {
		Session session = sessionFactory.getCurrentSession();
		session.delete(card);
	}

	@Override
	public void deleteTask(Task task) {
		Session session = sessionFactory.getCurrentSession();
		session.delete(task);
	}

}