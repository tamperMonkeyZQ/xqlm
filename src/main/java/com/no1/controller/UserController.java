package com.no1.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.no1.domain.User;
import com.no1.service.UserService;


@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@RequestMapping("/goQyUser.action")
	public String goQyUserPage(){
		return "qyuser";
	}
	
	@RequestMapping("/goYxUser.action")
	public String goYxUserPage(){
		return "yxuser";
	}
	
	/*
	@ResponseBody
	@RequestMapping("/upPass.action")
	public int upPass(String id,String pass,HttpServletRequest request){
		User user = new User();
		
		user.setUserId(id);
		user.setUserPwd(pass);
		int i = userService.updateUser(user);
		return i;
	}*/
	
	/**
	 * 验证用户登录账号是否唯一
	 * @param account
	 * @param uid
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/validAccount.action")
	public Map<String,Object> validUserAccount(@RequestParam("account")String account){
		
		Map<String,Object> map=new HashMap<String, Object>();
		User user = userService.getUserById(account);
		if(user != null){
			map.put("msg", "此账号不可用");
		}else{
			map.put("msg", "此账号可用");
		}
		
		return map;
	}
	
	/**
	 * 企业成员加载
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/QyUserList.action")
	public Map<String,Object> getQyUserList(
			@RequestParam(value="pageNumber",defaultValue="0",required=false)int pageNumber,
			@RequestParam("pageSize")int pageSize){
		Map<String,Object>map=userService.getQyUserList(pageNumber, pageSize);
		
		return map;
	}
	
	/**
	 * 院校成员加载
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/YxUserList.action")
	public Map<String,Object> getYxUserList(
			@RequestParam(value="pageNumber",defaultValue="0",required=false)int pageNumber,
			@RequestParam("pageSize")int pageSize){
		Map<String,Object>map=userService.getYxUserList(pageNumber, pageSize);
		
		return map;
	}
	
	/**
	 * 添加用户
	 * @param user
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/saveUser.action")
	public int saveUser(User user,HttpServletRequest request){
		if(user.getUserWeb()==null){
			user.setUserWeb("");
		}
		
		if(user.getUserSmry()==null){
			user.setUserSmry("");
		}
		int i=userService.saveUser(user);
		return i;
	}
	
	/**
	 * 根据用户id查询用户信息
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getUserById.action")
	public Map<String,Object> queryUserById(@RequestParam("uid")String userId){
		Map<String,Object>map=new HashMap<String, Object>();
		User user = userService.getUserById(userId);
		map.put("user", user);
		return map;
	}
	
	/**
	 * 修改用户
	 * @param user
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/upUser.action")
	public int upUser(User user,HttpServletRequest request){
		int i=userService.updateUser(user);
		return i;
	}
	
	/**
	 * 删除用户
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/delUser.action")
	public int delUser(@RequestParam("uid")String id){
		int i=userService.deleteUserById(id);
		return i;
	}
	
	/**
	 * 批量删除用户
	 * @param ids
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/delUsers.action")
	public int delUsers(@RequestParam("ids")String[] ids){
		int i=userService.deleteUsers(ids);
		return i;
	}
	
	/**
	 * 企业条件查询
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getQyUserByCon.action")
	public Map<String,Object> getQyUseByCon(
			@RequestParam("pageNumber")Integer pageNumber,
			@RequestParam("pageSize")Integer pageSize,
			@RequestParam(value="userSearch",required=false,defaultValue="")String searchVO
			){
				return userService.selectUsersBySearchVO(searchVO, (pageNumber-1)*pageSize, pageNumber*pageSize,1);
	}
	
	/**
	 * 院校条件查询
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getYxUserByCon.action")
	public Map<String,Object> getYxUseByCon(
			@RequestParam("pageNumber")Integer pageNumber,
			@RequestParam("pageSize")Integer pageSize,
			@RequestParam(value="userSearch",required=false,defaultValue="")String searchVO
			){
				return userService.selectUsersBySearchVO(searchVO, (pageNumber-1)*pageSize, pageNumber*pageSize,2);
	}
	
	/**
	 * 密码修改
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/upPass.action")
	public int upPass(@RequestParam("id")String uid,@RequestParam("pass")String pass){
		System.out.println("111");
		System.out.println(uid + " " + pass);
		int i=userService.upPass(uid, pass);
		return i;
	}
	
}
