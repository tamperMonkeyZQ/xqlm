package com.no1.domain;

import java.io.Serializable;
import java.util.Date;

public class Student implements Serializable {
	//主键身份证号
    private String stuIdcard;

    //学生姓名
    private String stuName;

    //性别0男1女
    private Integer stuSex;
    
    //学号
    private String stuNum;

    //电话
    private String stuTel;
    
    //学校
    private String stuUnit;
    private User stuSchool;
    
    //专业
    private Integer stuMaj;
    private Major major;
    
    //成绩（此为文件名）
    private String stuGrade;

    //毕业年份
    private Integer stuGradu;
    
    private Integer stuStatus;//0未签约 1应聘中 2已签约 3已就业
    
    //更新时间
    private Date stuUpdate;

    private static final long serialVersionUID = 1L;

    public String getStuIdcard() {
        return stuIdcard;
    }

    public void setStuIdcard(String stuIdcard) {
        this.stuIdcard = stuIdcard == null ? null : stuIdcard.trim();
    }

    public String getStuName() {
        return stuName;
    }

    public void setStuName(String stuName) {
        this.stuName = stuName == null ? null : stuName.trim();
    }

    public String getStuNum() {
        return stuNum;
    }

    public void setStuNum(String stuNum) {
        this.stuNum = stuNum == null ? null : stuNum.trim();
    }

    public Integer getStuMaj() {
        return stuMaj;
    }

    public void setStuMaj(Integer stuMaj) {
        this.stuMaj = stuMaj;
    }

    public String getStuGrade() {
        return stuGrade;
    }

    public void setStuGrade(String stuGrade) {
        this.stuGrade = stuGrade == null ? null : stuGrade.trim();
    }

    public Integer getStuGradu() {
        return stuGradu;
    }

    public void setStuGradu(Integer stuGradu) {
        this.stuGradu = stuGradu;
    }

    public Date getStuUpdate() {
        return stuUpdate;
    }

    public void setStuUpdate(Date stuUpdate) {
        this.stuUpdate = stuUpdate;
    }

	public Integer getStuSex() {
		return stuSex;
	}

	public void setStuSex(Integer stuSex) {
		this.stuSex = stuSex;
	}

	public String getStuTel() {
		return stuTel;
	}

	public void setStuTel(String stuTel) {
		this.stuTel = stuTel;
	}

	public String getStuUnit() {
		return stuUnit;
	}

	public void setStuUnit(String stuUnit) {
		this.stuUnit = stuUnit;
	}

	public User getStuSchool() {
		return stuSchool;
	}

	public void setStuSchool(User stuSchool) {
		this.stuSchool = stuSchool;
	}

	public Major getMajor() {
		return major;
	}

	public void setMajor(Major major) {
		this.major = major;
	}

	public Integer getStuStatus() {
		return stuStatus;
	}

	public void setStuStatus(Integer stuStatus) {
		this.stuStatus = stuStatus;
	}
    
	
    
}