package com.revature.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revature.dao.IllegalDao;
import com.revature.domain.TV2User;

@Service(value="AppService")
@Transactional
public class AppService {
	
	
	private TV2User user;
	
	@Autowired
	private IllegalDao dao;
	
	public TV2User validateLogin(TV2User us) {
		
		user = dao.getUser(us);
		
		System.out.println(user);
		
		if (user == null) {

			// Create custom exception delete print out
			return null;
			// throw new AccountDoesNotExistException();
			
		}else if (user.getPassword().equals(us.getPassword())) {
			
			return user;

		} else {

			return null;
			// throw new CannotAuthenticateException();
		}
	}

}
