package com.no1.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.no1.domain.Major;
import com.no1.domain.User;

@Repository
public interface MajorMapper {
    int deleteByPrimaryKey(Integer majId);

    int insert(Major record);

    int insertSelective(Major record);

    Major selectByPrimaryKey(Integer majId);
    
    Major selectByPrimaryKeyJoin(Integer majId);

    int updateByPrimaryKeySelective(Major record);

    int updateByPrimaryKey(Major record);
    
    List<Major> selectMajorsByUnit(@Param("majUnit")String majUnit,@Param("spage")int spage,@Param("epage")int epage);
    
    int getMajorsByUnitCount(String majUnit);
    
    Major selectMajorNameUnique(@Param("majName")String majName,@Param("majUnit")String majUnit);
    
    List<Major> searchBySearchVO(@Param("searchVO")String searchVO,@Param("spage")int spage,@Param("epage")int epage,@Param("majUnit")String majUnit);
    
    int getSearchCount(@Param("searchVO")String searchVO,@Param("majUnit")String majUnit);
    
    public List<Major> getMajorListByUnit(@Param("majUnit")String majUnit);
}