package com.no1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.no1.domain.User;
import com.no1.service.TestService;

@Controller
@RequestMapping("/test")
public class TestController {
	
	@Autowired
	TestService testService;
	
	@RequestMapping("/goTest.action")
	public String goTest(Model model){
		List<User> userList = testService.getUserList();
		model.addAttribute("userList", userList);
 	
		return "test";
	}
}
