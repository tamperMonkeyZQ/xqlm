package com.no1.serviceImpl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.no1.domain.Recruit;
import com.no1.mapper.RecruitMapper;
import com.no1.service.RecruitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecruitServiceImpl implements RecruitService {

    @Autowired
    RecruitMapper recruitMapper;

    @Override
    public Map<String, Object> getAll(int pageNumber, int pageSize) {
        Map<String,Object> map = new HashMap<String,Object>();
        Page page =  PageHelper.startPage(pageNumber, pageSize);
        List<Recruit> rows = recruitMapper.getAll();
        long count = page.getTotal();
        map.put("rows", rows);
        map.put("total", count);
        return map;
    }

    /**
     * 根据工作地点条件或职位，模糊查询
     * @param pageNumber
     * @param pageSize
     * @param searchVO
     * @return
     */
    @Override
    public Map<String, Object> search(int pageNumber, int pageSize, String searchVO) {
        Map<String,Object> map = new HashMap<String,Object>();
        Page page =  PageHelper.startPage(pageNumber, pageSize);
        PageHelper.startPage(pageNumber, pageSize);
        List<Recruit> rows = recruitMapper.getAllBySearchVO(searchVO);
        long count = page.getTotal();
        map.put("rows", rows);
        map.put("total", count);
        return map;
    }
}
