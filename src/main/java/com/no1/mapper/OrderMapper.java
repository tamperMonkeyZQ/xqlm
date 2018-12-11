package com.no1.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.no1.domain.Order;
import com.no1.domain.User;

@Repository
public interface OrderMapper {
    int deleteByPrimaryKey(Integer orderId);

    int insert(Order record);

    int insertSelective(Order record);

    Order selectByPrimaryKey(Integer orderId);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);
    
    int getOrderCount(String userId);
    
    List<Order> searchBySearchVO(@Param("searchVO")String searchVO,@Param("spage")int spage,@Param("epage")int epage,@Param("userId")String userId);
    
    int getSearchCount(@Param("searchVO")String searchVO,@Param("userId")String userId);
    
    List<Order> selectOrderList(@Param("spage")int spage,@Param("epage")int epage,@Param("userId")String userId);
}