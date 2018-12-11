package com.no1.domain;

import java.io.Serializable;

//培养订单
public class Order implements Serializable {
	//订单id
    private Integer orderId;

    //订单简介
    private String orderBrief;

    //培养文件
    private String orderFile;

    //订单发出
    private String orderGive;
    private User orderGiveUser;

    //订单接收
    private String orderTake;
    private User orderTakeUser;
    
    //订单类型（企业发出给学校或者相反）
    private Integer orderType;

    private static final long serialVersionUID = 1L;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getOrderBrief() {
        return orderBrief;
    }

    public void setOrderBrief(String orderBrief) {
        this.orderBrief = orderBrief == null ? null : orderBrief.trim();
    }

    public String getOrderFile() {
        return orderFile;
    }

    public void setOrderFile(String orderFile) {
        this.orderFile = orderFile == null ? null : orderFile.trim();
    }

    public String getOrderGive() {
        return orderGive;
    }

    public void setOrderGive(String orderGive) {
        this.orderGive = orderGive == null ? null : orderGive.trim();
    }

    public String getOrderTake() {
        return orderTake;
    }

    public void setOrderTake(String orderTake) {
        this.orderTake = orderTake == null ? null : orderTake.trim();
    }

    public Integer getOrderType() {
        return orderType;
    }

    public void setOrderType(Integer orderType) {
        this.orderType = orderType;
    }

	public User getOrderGiveUser() {
		return orderGiveUser;
	}

	public void setOrderGiveUser(User orderGiveUser) {
		this.orderGiveUser = orderGiveUser;
	}

	public User getOrderTakeUser() {
		return orderTakeUser;
	}

	public void setOrderTakeUser(User orderTakeUser) {
		this.orderTakeUser = orderTakeUser;
	}
    
}