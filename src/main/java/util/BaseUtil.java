package util;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class BaseUtil {
	/**
	 * 返回JSONarray对象，到前台显示
	 * */
	public static void returnJSONArray(HttpServletRequest request,HttpServletResponse response,JSONArray ja) throws Exception{
		request.setCharacterEncoding("utf-8"); 
        response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache");
		PrintWriter out = response.getWriter();
		out.print(ja.toString());
		out.flush();
		out.close();
	}
	/**
	 * 返回JSONObject对象，到前台显示
	 * */
	public static void returnJSONObject(HttpServletRequest request,HttpServletResponse response,JSONObject jo) throws Exception{
		request.setCharacterEncoding("utf-8"); 
        response.setContentType("text/html;charset=utf-8");
        response.setHeader("Cache-Control", "no-cache");
		PrintWriter out = response.getWriter();
		out.print(jo.toString());
		out.flush();
		out.close();
	}

}
