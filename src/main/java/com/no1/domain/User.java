package com.no1.domain;

import java.io.Serializable;

public class User implements Serializable {
	//用户id 即为学校或者企业的id 一个身份对应id为1个
    private String userId;

    //用户或企业名
    private String userUnit;

    //密码
    private String userPwd;

    //角色
    private Integer userRole;

    //电话
    private String userTel;

    //email
    private String userEmail;

    //官网
    private String userWeb;

    //简介
    private String userSmry;

    private static final long serialVersionUID = 1L;

  

    public String getUserUnit() {
        return userUnit;
    }

    public void setUserUnit(String userUnit) {
        this.userUnit = userUnit == null ? null : userUnit.trim();
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd == null ? null : userPwd.trim();
    }

   

    public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Integer getUserRole() {
		return userRole;
	}

	public void setUserRole(Integer userRole) {
		this.userRole = userRole;
	}

	public String getUserTel() {
        return userTel;
    }

    public void setUserTel(String userTel) {
        this.userTel = userTel == null ? null : userTel.trim();
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail == null ? null : userEmail.trim();
    }

    public String getUserWeb() {
        return userWeb;
    }

    public void setUserWeb(String userWeb) {
        this.userWeb = userWeb == null ? null : userWeb.trim();
    }

    public String getUserSmry() {
        return userSmry;
    }

    public void setUserSmry(String userSmry) {
        this.userSmry = userSmry == null ? null : userSmry.trim();
    }
}