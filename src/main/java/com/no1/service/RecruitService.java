package com.no1.service;

import com.no1.domain.Recruit;

import java.util.List;
import java.util.Map;

public interface RecruitService {
    Map<String,Object> getAll(int pageNumber, int pageSize );
    Map<String,Object> search(int pageNumber, int pageSize , String searchVO);
}
