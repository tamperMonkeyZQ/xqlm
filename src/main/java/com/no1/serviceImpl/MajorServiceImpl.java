package com.no1.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.no1.domain.Major;
import com.no1.mapper.MajorMapper;
import com.no1.service.MajorService;

@Service
public class MajorServiceImpl implements MajorService{

	@Autowired
	MajorMapper majorMapper;

	@Override
	public Map<String, Object> getMajorListByUnit(String majUnit,
			int pageNumber, int pageSize) {
		// TODO Auto-generated method stub
		Map<String,Object> map = new HashMap<String, Object>();
		List<Major> majorList=  majorMapper.selectMajorsByUnit(majUnit,(pageNumber-1)*pageSize, pageNumber*pageSize);
		int count = majorMapper.getMajorsByUnitCount(majUnit);
		map.put("rows", majorList);
		map.put("total", count);
		return map;
	}

	@Override
	public Major checkMajorUnique(String majName, String userId) {
		// TODO Auto-generated method stub
		Major major = majorMapper.selectMajorNameUnique(majName, userId);
		return major;
	}

	@Override
	public int saveMajor(Major major) {
		// TODO Auto-generated method stub
		return majorMapper.insert(major);
	}

	@Override
	public Major getMajorById(int majId) {
		// TODO Auto-generated method stub
		return majorMapper.selectByPrimaryKey(majId);
	}

	@Override
	public int updateMajorSelective(Major major) {
		// TODO Auto-generated method stub
		return majorMapper.updateByPrimaryKeySelective(major);
	}

	@Override
	public int delMajorById(int majId) {
		// TODO Auto-generated method stub
		return majorMapper.deleteByPrimaryKey(majId);
	}

	@Override
	public Map<String, Object> selectMajorBySearchVO(int pageNumber,int pageSize, 
			String majUnit, String searchVO) {
		// TODO Auto-generated method stub
		Map<String,Object> map = new HashMap<String,Object>();
		List<Major> list = majorMapper.searchBySearchVO(searchVO, (pageNumber-1) * pageSize, pageNumber *pageSize, majUnit);
		int count = majorMapper.getSearchCount(searchVO, majUnit);
		map.put("rows", list);
		map.put("total", count);
		return map;
	}

	@Override
	public List<Major> getMajorListByUnit(String majUnit) {
		// TODO Auto-generated method stub
		return majorMapper.getMajorListByUnit(majUnit);
	}

	
	
	
	
}
