package com.no1.service;

import java.util.List;

import com.no1.domain.Menu;
import com.no1.domain.User;

public interface LoginService {
	public User getUserById(String userId);
	public List<Menu> getMenuByUserId(String userId);
	
}
