package com.no1.domain;

import java.io.Serializable;
//专业类
public class Major implements Serializable {
	//专业id
    private Integer majId;
    
    //专业名称
    private String majName;

    //专业简介
    private String majSmry;

    //培养年限
    private String majYear;

    //培养方案(文件名）
    private String majFile;

    //专业对应学校
    private String majUnit;
    private User majSchool;
    
    private static final long serialVersionUID = 1L;

    public Integer getMajId() {
        return majId;
    }

    public void setMajId(Integer majId) {
        this.majId = majId;
    }

    public String getMajName() {
        return majName;
    }

    public void setMajName(String majName) {
        this.majName = majName == null ? null : majName.trim();
    }

    public String getMajSmry() {
        return majSmry;
    }

    public void setMajSmry(String majSmry) {
        this.majSmry = majSmry == null ? null : majSmry.trim();
    }

    public String getMajYear() {
        return majYear;
    }

    public void setMajYear(String majYear) {
        this.majYear = majYear == null ? null : majYear.trim();
    }

    public String getMajFile() {
        return majFile;
    }

    public void setMajFile(String majFile) {
        this.majFile = majFile == null ? null : majFile.trim();
    }

	public String getMajUnit() {
		return majUnit;
	}

	public void setMajUnit(String majUnit) {
		this.majUnit = majUnit;
	}

	public User getMajSchool() {
		return majSchool;
	}

	public void setMajSchool(User majSchool) {
		this.majSchool = majSchool;
	}

   
}