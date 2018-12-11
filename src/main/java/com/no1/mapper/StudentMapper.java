package com.no1.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.no1.domain.Student;

@Repository
public interface StudentMapper {
    int deleteByPrimaryKey(String stuIdcard);

    int insert(Student record);

    int insertSelective(Student record);

    Student selectByPrimaryKey(String stuIdcard);

    int updateByPrimaryKeySelective(Student record);

    int updateByPrimaryKey(Student record);
    
    List<Student> selectStudentByUser(@Param("stuUnit")String stuUnit,@Param("spage")int spage,@Param("epage")int epage);
    
    int getStudentByUserCount(@Param("stuUnit")String stuUnit);
    
    List<Student> selectStuConByUser(@Param("stuUnit")String stuUnit,@Param("stuMaj")Integer stuMaj,@Param("stuNameSearch")String stuNameSearch,
    		@Param("stuNumSearch")String stuNumSearch,@Param("spage")int spage,@Param("epage")int epage);
    
    int getStuConByUserCount(@Param("stuUnit")String stuUnit,@Param("stuMaj")Integer stuMaj,@Param("stuNameSearch")String stuNameSearch,
    		@Param("stuNumSearch")String stuNumSearch);
    
}