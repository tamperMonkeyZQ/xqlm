package com.no1.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/info")
public class InfoController {
	
	@RequestMapping("/goFixinfo.action")
	public String goFixinfoPage(){
		return "fixinfo";
	}
}
