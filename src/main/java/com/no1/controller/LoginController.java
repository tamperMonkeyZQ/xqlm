package com.no1.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.no1.domain.Menu;
import com.no1.domain.User;
import com.no1.service.LoginService;

@Controller
@RequestMapping("/login")
public class LoginController {

	@Autowired
	LoginService loginService;
	
	/**
	 * 登录操作密码验证
	 * @param admin
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/doLogin.action")
	public Map<String,Object> doLoginById(User admin,HttpServletRequest request){
		
		Map <String,Object> map = new HashMap<String, Object>();
		User user = loginService.getUserById(admin.getUserId());
		Integer i = null;
		if(user != null){
			if(user.getUserPwd().equals(admin.getUserPwd())){
				i = 0; //登陆成功
				map.put("id", user.getUserId());
				request.getSession().setAttribute("USER", user);
				request.getSession().setAttribute("ID", user.getUserId());
				request.getSession().setAttribute("UNIT", user.getUserUnit());
				request.getSession().setAttribute("PASSWORD", user.getUserPwd());
			}else{
				i = 1; //登陆密码错误
			}
		}else{
			i = 2; //账户不存在
		}
		map.put("i",i);
		return map;
	}
	
	/**
	 * 加载菜单
	 * @param uid
	 * @param request
	 * @return
	 */
	@RequestMapping("/login.action")
	public String getMenuByUserId(String uid,HttpServletRequest request){
		List<Menu> menuList = loginService.getMenuByUserId(uid);
		request.getSession().setAttribute("mlist", menuList);
		return "redirect:../index.jsp";
	}
	
	/**
	 * 退出登陆
	 * @param request
	 * @return
	 */
	@RequestMapping("/quit.action")
	public String quitLogin(HttpServletRequest request){
		request.getSession().invalidate();
		return "redirect:../login.jsp";
	}
	
}
