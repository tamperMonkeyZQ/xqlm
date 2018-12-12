package com.no1.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.no1.domain.User;
import com.no1.mapper.UserMapper;
import com.no1.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserMapper userMapper;
	
	@Override
	public int updateUser(User user) {
		// TODO Auto-generated method stub
		return userMapper.updateByPrimaryKeySelective(user);
	}

	/**
	 * 查询企业成员
	 */
	@Override
	public Map<String, Object> getQyUserList(int pageNumber, int pageSize) {
		// TODO Auto-generated method stub
		int count = userMapper.getQyUserCount();
		List<User> list = userMapper.selectQyUserList((pageNumber-1)*pageSize, pageNumber*pageSize);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", list);
		return map;
	}

	/**
	 * 查询院校成员
	 */
	@Override
	public Map<String, Object> getYxUserList(int pageNumber, int pageSize) {
		// TODO Auto-generated method stub
		int count = userMapper.getYxUserCount();
		List<User> list = userMapper.selectYxUserList((pageNumber-1)*pageSize, pageNumber*pageSize);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", list);
		return map;
	}

	@Override
	public User getUserById(String userId) {
		// TODO Auto-generated method stub
		return userMapper.selectByPrimaryKey(userId);
	}

	@Override
	public int saveUser(User user) {
		// TODO Auto-generated method stub
		return userMapper.insertSelective(user);
	}

	@Override
	public int deleteUserById(String userId) {
		// TODO Auto-generated method stub
		return userMapper.deleteByPrimaryKey(userId);
	}

	@Override
	public int deleteUsers(String[] userIds) {
		// TODO Auto-generated method stub
		
		for(int i = 0; i < userIds.length; i++){
			int x = userMapper.deleteByPrimaryKey(userIds[i]);
			if(x < 0){
				return 0;
			}
		}
		
		return 1;
	}

	@Override
	public Map<String, Object> selectUsersBySearchVO(String searchVO,
			int spage, int epage,int role) {
		// TODO Auto-generated method stub
		int t = epage;
		epage =spage*t;
		spage = (spage-1)*t;
		List<User> userList = userMapper.searchBySearchVO(searchVO, spage, epage,role);
		int count = userMapper.getSearchCount(searchVO,role);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("rows", userList);
		map.put("total", count);
		return map;
	}

	@Override
	public int upPass(String userId, String userPwd) {
		// TODO Auto-generated method stub
		return userMapper.upPass(userId, userPwd);
	}

	
	
	

	


	
}
