package com.no1.domain;

import java.io.Serializable;

public class RoleMenu implements Serializable {
    private Integer rmId;

    private Integer roleId;

    private Integer menuId;

    private static final long serialVersionUID = 1L;

    public Integer getRmId() {
        return rmId;
    }

    public void setRmId(Integer rmId) {
        this.rmId = rmId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getMenuId() {
        return menuId;
    }

    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
    }
}