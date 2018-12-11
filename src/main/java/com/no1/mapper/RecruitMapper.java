package com.no1.mapper;

import org.springframework.stereotype.Repository;

import com.no1.domain.Recruit;

import java.util.List;

@Repository
public interface RecruitMapper {
    int deleteByPrimaryKey(Integer reId);

    int insert(Recruit record);

    int insertSelective(Recruit record);

    Recruit selectByPrimaryKey(Integer reId);

    int updateByPrimaryKeySelective(Recruit record);

    int updateByPrimaryKey(Recruit record);

    List<Recruit> getAll();
}