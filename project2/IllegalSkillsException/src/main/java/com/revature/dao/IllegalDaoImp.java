package com.revature.dao;


import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.revature.domain.TV2User;


@Repository
public class IllegalDaoImp implements IllegalDao {
	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public TV2User getUser(TV2User user) {

		Session session = sessionFactory.getCurrentSession();
        Criteria crit = session.createCriteria(TV2User.class);
        crit.add(Restrictions.like("userName", user.getUserName()));
        return (TV2User)crit.uniqueResult();
	}

}
