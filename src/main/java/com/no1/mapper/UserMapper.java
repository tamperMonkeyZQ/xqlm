package com.no1.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import com.no1.domain.User;

@Repository
public interface UserMapper {
	
    int deleteByPrimaryKey(String userId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(String userId);
    
    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
    
    List<User> selectAll();

    List<User> selectQyUserList(@Param("spage")int spage,@Param("epage")int epage);
    
    List<User> selectYxUserList(@Param("spage")int spage,@Param("epage")int epage);
    
    int getQyUserCount();
    
    int getYxUserCount();
    
    List<User> searchBySearchVO(@Param("searchVO")String searchVO,@Param("spage")int spage,@Param("epage")int epage,@Param("roleId")int roleId);
    
    int getSearchCount(@Param("searchVO")String searchVO,@Param("roleId")int roleId);
    
    int upPass(@Param("id")String id,@Param("pass")String pass);
   
}