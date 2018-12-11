package com.no1.mapper;

import org.springframework.stereotype.Repository;

import com.no1.domain.Employ;

@Repository
public interface EmployMapper {
    int deleteByPrimaryKey(Integer emId);

    int insert(Employ record);

    int insertSelective(Employ record);

    Employ selectByPrimaryKey(Integer emId);

    int updateByPrimaryKeySelective(Employ record);

    int updateByPrimaryKey(Employ record);
}