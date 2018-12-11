package util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;


public class Config {
	/**
	 * 数据库用户名
	 * */
	public static String user;
	/**
	 * 数据库密码
	 * */
	public static String password;
	/**
	 * 数据库名称
	 * */
	public static String table;
	/**
	 * 数据库连接语句
	 * */
	public static String url;
	/**
	 * 表前缀
	 * */
	public static String prefix;
	/**
	 * 获取数据库配置信息
	 * */
	public static void init() throws Exception{
		
		setUser("root");
		setPassword("123456");
		String ip="localhost";
		String port="3306";
		String table="no2";
		setUrl("jdbc:mysql://"+ip+":"+port+"/"+table+"?useUnicode=true&autoReconnect=true&characterEncoding=utf8");
		setPrefix("bxc");
	}
	public static String getUser(){
		return user;
	}
	public static void setUser(String user) {
		Config.user = user;
	}
	public static String getPassword() {
		return password;
	}
	public static void setPassword(String password) {
		Config.password = password;
	}
	public static String getTable() {
		return table;
	}
	public static void setTable(String table) {
		Config.table = table;
	}
	public static String getUrl() {
		return url;
	}
	public static void setUrl(String url) {
		Config.url = url;
	}
	public static String getPrefix() {
		return prefix;
	}
	public static void setPrefix(String prefix) {
		Config.prefix = prefix;
	}

}
