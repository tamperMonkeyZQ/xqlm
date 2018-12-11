package com.no1.domain;

import java.io.Serializable;
import java.util.Date;

//招聘 
public class Recruit implements Serializable {
	//招聘id
    private Integer reId;

    //招聘职务
    private String reDuty;

    //招聘简介
    private String reBrief;

    //招聘性别
    private Integer reSex;
    private String sex;
    public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	//年龄下限（不用判断）
    private Integer reAgebtm;

    //年龄上限
    private Integer reAgetop;

    //学历
    private String reDegree;

    //工作地点
    private String reLocal;

    //招聘单位
    private String reUnit;
    private User user;
    
    //招聘状态（招聘中0/完成招聘1/招聘失效2）
    private String reStatus;

    //更新时间
    private Date reTime;

    private static final long serialVersionUID = 1L;
    
    public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Integer getReId() {
        return reId;
    }

    public void setReId(Integer reId) {
        this.reId = reId;
    }

    public String getReDuty() {
        return reDuty;
    }

    public void setReDuty(String reDuty) {
        this.reDuty = reDuty == null ? null : reDuty.trim();
    }

    public String getReBrief() {
        return reBrief;
    }

    public void setReBrief(String reBrief) {
        this.reBrief = reBrief == null ? null : reBrief.trim();
    }

    public Integer getReSex() {
        return reSex;
    }

    public void setReSex(Integer reSex) {
        this.reSex = reSex;
    }

    public Integer getReAgebtm() {
        return reAgebtm;
    }

    public void setReAgebtm(Integer reAgebtm) {
        this.reAgebtm = reAgebtm;
    }

    public Integer getReAgetop() {
        return reAgetop;
    }

    public void setReAgetop(Integer reAgetop) {
        this.reAgetop = reAgetop;
    }

    public String getReDegree() {
        return reDegree;
    }

    public void setReDegree(String reDegree) {
        this.reDegree = reDegree == null ? null : reDegree.trim();
    }

    public String getReLocal() {
        return reLocal;
    }

    public void setReLocal(String reLocal) {
        this.reLocal = reLocal == null ? null : reLocal.trim();
    }

  

    public String getReUnit() {
		return reUnit;
	}

	public void setReUnit(String reUnit) {
		this.reUnit = reUnit;
	}

	public String getReStatus() {
        return reStatus;
    }

    public void setReStatus(String reStatus) {
        this.reStatus = reStatus == null ? null : reStatus.trim();
    }

    public Date getReTime() {
        return reTime;
    }

    public void setReTime(Date reTime) {
        this.reTime = reTime;
    }
}