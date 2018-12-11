package com.no1.service;

import com.no1.domain.Recruit;

import java.util.List;

public interface RecruitService {
    List<Recruit> getAll(int pageNumber, int pageSize );
}
