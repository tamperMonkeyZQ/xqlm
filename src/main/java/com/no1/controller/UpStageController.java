package com.no1.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UpStageController {
    @RequestMapping("/upStage.action")
    public String upStage() {
        return "upStage";
    }
}
