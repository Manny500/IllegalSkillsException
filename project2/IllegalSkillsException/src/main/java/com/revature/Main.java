package com.revature;

import com.revature.dao.IllegalDao;
import com.revature.dao.IllegalDaoImp;
import com.revature.domain.TV2User;

public class Main {
	
	public static void main(String[] args) {


		IllegalDao dao = new IllegalDaoImp();
		
		TV2User user = new TV2User();
		
		user.setFirstName("bob");
		user.setLastName("hi");
		user.setUserName("h");
		user.setPassword("h");
		
		dao.createUser(user);
	}

}