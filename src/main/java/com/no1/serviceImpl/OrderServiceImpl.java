package com.no1.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.no1.domain.Order;
import com.no1.domain.User;
import com.no1.mapper.OrderMapper;
import com.no1.mapper.UserMapper;
import com.no1.service.OrderService;
import com.no1.service.UserService;

@Service
public class OrderServiceImpl implements OrderService{
	
	@Autowired
	OrderMapper orderMapper;

	@Override
	public int updateOrder(Order order) {
		// TODO Auto-generated method stub
		return orderMapper.updateByPrimaryKeySelective(order);
	}

	@Override
	public Map<String, Object> getOrderList(int pageNumber, int pageSize,String userId) {
		int count = orderMapper.getOrderCount(userId);
		List<Order> list = orderMapper.selectOrderList((pageNumber-1)*pageSize, pageNumber*pageSize,userId);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", list);
		return map;
	}

	@Override
	public Order getOrderById(int orderId) {
		// TODO Auto-generated method stub
		return orderMapper.selectByPrimaryKey(orderId);
	}

	@Override
	public int saveOrder(Order order) {
		// TODO Auto-generated method stub
		return orderMapper.insertSelective(order);
	}

	@Override
	public int deleteOrderById(int orderId) {
		// TODO Auto-generated method stub
		return orderMapper.deleteByPrimaryKey(orderId);
	}

	@Override
	public int deleteOrders(int[] orderIds) {
		// TODO Auto-generated method stub
		for(int i = 0; i < orderIds.length; i++){
			int x = orderMapper.deleteByPrimaryKey(orderIds[i]);
			if(x < 0){
				return 0;
			}
		}
		
		return 1;
	}

	@Override
	public Map<String, Object> selectOrdersBySearchVO(String searchVO, int spage, int epage, String userId) {
		// TODO Auto-generated method stub
		List<Order> orderList = orderMapper.searchBySearchVO(searchVO, spage, epage,userId);
		int count = orderMapper.getSearchCount(searchVO,userId);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("rows", orderList);
		map.put("total", count);
		return map;
	}
	
	

	
	
	

	


	
}
