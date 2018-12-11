package com.no1.service;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.no1.domain.Student;

public interface StudentService {
	public Map<String, Object> getStuListByUnit(String userId,int pageNumber,int pageSize);
	public int saveStudent(Student student);
	public Map<String,Object> getStuListByUnitCon(String userId,Integer majId,
			String stuNameSearch,String stuNumSearch,int pageNumber,int pageSize);
	public Student getStudentByIdcard(String stuIdcard); 
	public int updateByIdcardSelective(Student student);
	public int delUser(String stuIdcard);
	public Map<String,Object> importExcel(MultipartFile file, String stuUnit);
}
