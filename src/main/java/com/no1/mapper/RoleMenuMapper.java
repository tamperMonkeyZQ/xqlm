package com.no1.mapper;

import org.springframework.stereotype.Repository;

import com.no1.domain.RoleMenu;

@Repository
public interface RoleMenuMapper {
    int deleteByPrimaryKey(Integer rmId);

    int insert(RoleMenu record);

    int insertSelective(RoleMenu record);

    RoleMenu selectByPrimaryKey(Integer rmId);

    int updateByPrimaryKeySelective(RoleMenu record);

    int updateByPrimaryKey(RoleMenu record);
}