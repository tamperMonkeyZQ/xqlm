package com.no1.service;

import java.util.List;
import java.util.Map;

import com.no1.domain.Major;

public interface MajorService {
	public Map<String,Object> getMajorListByUnit(String majUnit,int pageNumber,int pageSize);
	public Major checkMajorUnique(String majName,String userId);
	public int saveMajor(Major major);
	public Major getMajorById(int majId);
	public int updateMajorSelective(Major major);
	public int delMajorById(int majId);
	public Map<String,Object> selectMajorBySearchVO(int pageNumber,int pageSize,String majUnit,String searchVO);
	public List<Major> getMajorListByUnit(String majUnit);
}
