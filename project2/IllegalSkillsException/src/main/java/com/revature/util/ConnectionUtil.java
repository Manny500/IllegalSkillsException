package com.revature.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionUtil {

	public static Connection getConnection() throws SQLException {
		String url = "jdbc:oracle:thin:@octcat.ckqf8rreyjxi.us-east-2.rds.amazonaws.com:1521:ORCL";
		String username = "octcat_user";
		String password = "p4ssw0rd";

		return DriverManager.getConnection(url, username, password);
	}
}
