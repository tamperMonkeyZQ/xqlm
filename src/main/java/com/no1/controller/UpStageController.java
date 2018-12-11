package com.no1.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("upStage")
public class UpStageController {

    @RequestMapping("/upStage.action")
    public String upStage() {
        return "upStage";
    }

    @RequestMapping("/goUpStageLogin.action")
    public String goUpStageLogin(){
        return "login";
    }

    @RequestMapping("/goUpStageReg.action")
    public String goUpStageReg(){
        return "reg";
    }

    @RequestMapping("/goUpStageGetPass.action")
    public String goUpStageGetePass(){
        return "getpass";
    }
}
