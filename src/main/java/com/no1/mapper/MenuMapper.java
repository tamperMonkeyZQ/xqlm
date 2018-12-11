package com.no1.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.no1.domain.Menu;

@Repository
public interface MenuMapper {
    int deleteByPrimaryKey(Integer menuId);

    int insert(Menu record);

    int insertSelective(Menu record);

    Menu selectByPrimaryKey(Integer menuId);

    int updateByPrimaryKeySelective(Menu record);

    int updateByPrimaryKey(Menu record);
    
    List<Menu> selectParentMenuListById(String userId);
    
    List<Menu> selectChildMenuByPid(Integer parentID);
    
}