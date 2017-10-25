package com.revature.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.revature.domain.TV2User;
import com.revature.util.ConnectionUtil;

public class IllegalDaoImp implements IllegalDao {

	@Override
	public TV2User getUser(String username) {

		TV2User user = new TV2User();

		try (Connection connection = ConnectionUtil.getConnection();) {

			String sql = "SELECT TV2_ID, TV2_FN, TV2_LS, TV2_USERNAME, TV2_PASSWORD, RT_ID, TV2_EMAIL FROM TV2_USER WHERE TV2_USERNAME = ?";
			PreparedStatement ps = connection.prepareStatement(sql);
			ps.setString(1, username);

			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				user.setUserId(rs.getInt("TV2_ID"));
				user.setFirstName(rs.getString("TV2_FN"));
				user.setLastName(rs.getString("TV2_LS"));
				user.setUserName(rs.getString("TV2_USERNAME"));
				user.setPassword(rs.getString("TV2_PASSWORD"));
				user.setRoleType(rs.getInt("RT_ID"));
				user.setEmail(rs.getString("TV2_EMAIL"));
			}

			return user;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return user;
	}

}
