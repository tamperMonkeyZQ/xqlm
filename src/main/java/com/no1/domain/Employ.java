package com.no1.domain;

import java.io.Serializable;

public class Employ implements Serializable {
    private Integer emId;
    
    private String re;
    public String getRe() {
		return re;
	}

	public void setRe(String re) {
		this.re = re;
	}

	//雇佣关系来自的招聘编号
    private Integer emRe;

    //雇佣学生
    private String emStu;

    //雇佣状态（0申请中/面试中1/合作失败2/签约3）
    private Integer emStatus;
    private String status;

    public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	private static final long serialVersionUID = 1L;

    public Integer getEmId() {
        return emId;
    }

    public void setEmId(Integer emId) {
        this.emId = emId;
    }

    public Integer getEmRe() {
        return emRe;
    }

    public void setEmRe(Integer emRe) {
        this.emRe = emRe;
    }

    public String getEmStu() {
        return emStu;
    }

    public void setEmStu(String emStu) {
        this.emStu = emStu == null ? null : emStu.trim();
    }

    public Integer getEmStatus() {
        return emStatus;
    }

    public void setEmStatus(Integer emStatus) {
        this.emStatus = emStatus;
    }
}