package com.revature.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.sym.Name1;
import com.revature.domain.Board;
import com.revature.domain.Card;
import com.revature.domain.Lane;
import com.revature.domain.LaneDTO;
import com.revature.domain.TV2User;
import com.revature.domain.Task;
import com.revature.service.AppService;

@RestController
public class RestCtrl {

	@Autowired
	private AppService service;

	@RequestMapping(value = { "/chart" }, method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public JSONObject chart(HttpServletRequest request) {

		// client wants the bankUser that at this point should be stored in the session
		// HttpSession session = request.getSession();
		//
		// TV2User clientUser = (TV2User) session.getAttribute("user");
		//
		JSONParser parser = new JSONParser();
		JSONObject json2 = null;

		String json = "{ \"Afghanistan\" : [{\"Date\" : 1999,\"Imports\" :15,\"Exports\" :20},{\"Date\" : 2000,\"Imports\" :40,\"Exports\" :115}]}";
		System.out.println(json);
		try {
			json2 = (JSONObject) parser.parse(json);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return json2;
	}

	@RequestMapping(value = { "/profile" }, method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<TV2User> profile(HttpServletRequest request) {
		System.out.println("ResponseEntity<TV2User> profile");
		// client wants the bankUser that at this point should be stored in the session
		HttpSession session = request.getSession();

		TV2User clientUser = (TV2User) session.getAttribute("user");
		return new ResponseEntity<TV2User>(clientUser, HttpStatus.OK);
	}

	@RequestMapping(value = {
			"/updateProfile" }, method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<TV2User> updateProfile(@RequestBody TV2User user, HttpServletRequest request) {
		System.out.println("ResponseEntity<TV2User> updateProfile");
		// client wants the bankUser that at this point should be stored in the session
		HttpSession session = request.getSession();

		TV2User clientUser = (TV2User) session.getAttribute("user");

		user.setUserId(clientUser.getUserId());
		user.setRoleType(clientUser.getRoleType());
		user.setTeamId(clientUser.getTeamId());

		if (user.getFirstName() == null || user.getFirstName() == "") {
			user.setFirstName(clientUser.getFirstName());
		}
		if (user.getLastName() == null || user.getLastName() == "") {
			user.setLastName(clientUser.getLastName());
		}
		if (user.getUserName() == null || user.getUserName() == "") {
			user.setUserName(clientUser.getUserName());
		}
		if (user.getPassword() == null || user.getPassword() == "") {
			System.out.println("in pass");
			user.setPassword(clientUser.getPassword());
		}
		if (user.getEmail() == null || user.getEmail() == "") {
			user.setEmail(clientUser.getEmail());
		}

		service.updateUser(user);

		return new ResponseEntity<TV2User>(user, HttpStatus.OK);

	}

	@RequestMapping(value = { "/getRole" }, method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<TV2User> loginInfo(HttpServletRequest request) {

		HttpSession session = request.getSession();
		TV2User clientUser = (TV2User) session.getAttribute("user");
		return new ResponseEntity<TV2User>(clientUser, HttpStatus.OK);
	}

	@RequestMapping(value = { "/getUsers" }, method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<HashSet<TV2User>> userList(HttpServletRequest request) {
		HashSet<TV2User> setOfUsers = new HashSet<TV2User>();
		ArrayList<TV2User> listOfUsers = (ArrayList<TV2User>) service.getAllUsers();
		for (TV2User user : listOfUsers) {
			setOfUsers.add(user);
		}
		return new ResponseEntity<HashSet<TV2User>>(setOfUsers, HttpStatus.OK);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<Exception> handleException(Exception e) {
		System.out.println("lol spring...wow catches exceptions");
		return new ResponseEntity<Exception>(e, HttpStatus.CONFLICT);
	}

	@RequestMapping(value = { "/getHome" }, method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<Set<Board>> homeBoards(HttpServletRequest request) {

		HttpSession session = request.getSession();
		TV2User clientUser = (TV2User) session.getAttribute("user");
		Set<Board> clientBoards = clientUser.getBoards();
		return new ResponseEntity<Set<Board>>(clientBoards, HttpStatus.OK);
	}

	@RequestMapping(value = { "/getTeamBoards" }, method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<Set<Board>> teamBoards(HttpServletRequest request) {
		Set<Board> teamBoards = new HashSet<Board>();
		HttpSession session = request.getSession();
		TV2User clientUser = (TV2User) session.getAttribute("user");

		List<Board> clientBoards = service.getAllBoards();
		for (Board b : clientBoards) {
			{
				if (b.getTeam() == clientUser.getTeamId()) {
					teamBoards.add(b);
				}

			}

		}
		return new ResponseEntity<Set<Board>>(teamBoards, HttpStatus.OK);
	}

	@RequestMapping(value = { "/createBoard" }, method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public ResponseEntity<Board> createBoard(@RequestBody Board board, HttpServletRequest request) {
		// getting TV2User at this session to give Board this user's id and team #
		HttpSession session = request.getSession();
		TV2User clientUser = (TV2User) session.getAttribute("user");
		Board b = new Board(board.getbTitle(), clientUser.getTeamId(), clientUser);

		if (b.getbTitle() != null) {
			service.createBoard(b);
		}

		return new ResponseEntity<Board>(b, HttpStatus.OK);

	}

	@RequestMapping(value = {
			"/trelloInfo" }, method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public ResponseEntity<LaneDTO> trello(@RequestBody Board board, HttpServletRequest request) {

		Board nb = service.getBoard(board);
		Set<Lane> lanes = nb.getLanes();
		Set<Card> cards = new HashSet<Card>();
		Set<Task> tasks = new HashSet<Task>();
		for (Lane l : lanes) {
			Set<Card> card = l.getCards();
			for (Card c : card) {
				cards.add(c);
				Set<Task> task = c.getTasks();
				for (Task t : task) {
					tasks.add(t);
				}
			}
		}

		ArrayList<Lane> laneList = new ArrayList<Lane>(lanes);
		ArrayList<Card> cardList = new ArrayList<Card>(cards);
		ArrayList<Task> taskList = new ArrayList<Task>(tasks);

		LaneDTO dto = service.convertToLaneCardTaskDTO(laneList, cardList, taskList);
		return new ResponseEntity<LaneDTO>(dto, HttpStatus.OK);
	}

	@RequestMapping(value = {
			"/updateLane" }, method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Lane> updateLane(@RequestBody Lane lane, HttpServletRequest request) {
		System.out.println("ResponseEntity<Lane> updateLane()");
		
		
		HttpSession session = request.getSession();
		Board laneBoard = (Board) session.getAttribute("board");
		Lane nl = new Lane(lane.getlTitle(), laneBoard);
		
	//	Lane nl = (Lane) session.getAttribute("lane");
//		System.out.println(nl.getlTitle());
//		Lane newlane = new Lane(nl.getlTitle());           // youre the fucking problem
//		//lane.setlTitle(newLane.getlTitle());
//
		if (nl.getlTitle() != null) {
			service.createLane(nl);
		}else {
			System.out.println("Title is empty!!");
		}


		return new ResponseEntity<Lane>(nl, HttpStatus.OK);

	}

}