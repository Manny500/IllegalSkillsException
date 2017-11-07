package com.revature.test;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.revature.dao.IllegalDaoImp;
import com.revature.domain.Lane;

//@ContextConfiguration(locations = "classpath:/static/features/beans-test.xml")
@ContextConfiguration
(
  {
   "file:src/main/webapp/WEB-INF/beans-test.xml"
   }
)
@RunWith(SpringJUnit4ClassRunner.class)
public class TestIllegalDao {

	@Autowired
	private IllegalDaoImp dao;
	
	
	
	@Test
	@Transactional
	@Rollback(true)
	public void testCreateLanes() {
		int id = 500;
		Lane lane = new Lane(id,"Information Technology");
		dao.createLane(lane);
		
		List<Lane> lanes = dao.getAllLanes(id);
		Assert.assertEquals(lane.getlTitle(), lanes.get(0).getlTitle());
	}
}
