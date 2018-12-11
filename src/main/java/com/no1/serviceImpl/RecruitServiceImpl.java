package com.no1.serviceImpl;

import com.github.pagehelper.PageHelper;
import com.no1.domain.Recruit;
import com.no1.mapper.RecruitMapper;
import com.no1.service.RecruitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecruitServiceImpl implements RecruitService {

    @Autowired
    RecruitMapper recruitMapper;

    @Override
    public List<Recruit> getAll(int pageNumber, int pageSize) {
        PageHelper.startPage(pageNumber, pageSize);
        List<Recruit> list = recruitMapper.getAll();
        return list;
    }

    /**
     * 根据工作地点条件或职位，模糊查询
     * @param pageNumber
     * @param pageSize
     * @param searchVO
     * @return
     */
    @Override
    public List<Recruit> search(int pageNumber, int pageSize, String searchVO) {
        PageHelper.startPage(pageNumber, pageSize);
        List<Recruit> list = recruitMapper.getAllBySearchVO(searchVO);
        return list;
    }
}
