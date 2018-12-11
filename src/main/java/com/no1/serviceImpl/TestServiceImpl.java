package com.no1.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.no1.domain.User;
import com.no1.mapper.UserMapper;
import com.no1.service.TestService;

@Service
public class TestServiceImpl implements TestService{
	
	@Autowired
	UserMapper userMapper;
	
	@Override
	public List<User> getUserList() {
		// TODO Auto-generated method stub
		List<User> userList = userMapper.selectAll();
		return userList;
	}
	
}
