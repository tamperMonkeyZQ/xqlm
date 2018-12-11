package com.no1.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.no1.domain.User;

public interface UserService {
	public int updateUser(User user);
	public Map<String,Object> getQyUserList(int pageNumber, int pageSize);
	public Map<String,Object> getYxUserList(int pageNumber, int pageSize);
	public User getUserById(String userId);
	public int saveUser(User user);
	public int deleteUserById(String userId);
	public int deleteUsers(String[] userIds);
	public Map<String,Object> selectUsersBySearchVO(String searchVO,int spage,int epage,int role);
	public int upPass(String userId, String userPwd);	
}
