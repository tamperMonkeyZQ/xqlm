package com.no1.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.no1.domain.Menu;
import com.no1.domain.User;
import com.no1.mapper.MenuMapper;
import com.no1.mapper.UserMapper;
import com.no1.service.LoginService;

@Service
public class LoginServiceImpl implements LoginService{
	
	@Autowired
	UserMapper userMapper;
	
	@Autowired
	MenuMapper menuMapper;

	@Override
	public User getUserById(String userId) {
		// TODO Auto-generated method stub
		User user = userMapper.selectByPrimaryKey(userId);
		return user;
	}

	@Override
	public List<Menu> getMenuByUserId(String userId) {
		// TODO Auto-generated method stub
		List<Menu> menuList = menuMapper.selectParentMenuListById(userId);
		for(Menu me : menuList){
			List<Menu> children = menuMapper.selectChildMenuByPid(me.getMenuId());
			if(children != null){
				me.setMenuList(children);
			}
		}
		return menuList;
	}
	
}
