package com.no1.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.no1.domain.Order;
import com.no1.domain.User;

public interface OrderService {
	public int updateOrder(Order order);
	public Map<String,Object> getOrderList(int pageNumber, int pageSize,String userId);
	public Order getOrderById(int orderId);
	public int saveOrder(Order order);
	public int deleteOrderById(int orderId);
	public int deleteOrders(int[] orderIds);
	public Map<String,Object> selectOrdersBySearchVO(String searchVO,int spage,int epage,String userId);
	
}
