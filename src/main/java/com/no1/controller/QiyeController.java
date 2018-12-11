package com.no1.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.no1.domain.Employ;
import com.no1.domain.Order;
import com.no1.domain.Recruit;
import com.no1.domain.User;
import com.no1.service.OrderService;
import com.no1.service.UserService;

import util.CRUDUtil;
import util.DBUtil;
import util.DownloadRecord;
import util.Upload;


@Controller
@RequestMapping("/qiye")
public class QiyeController {
	
	
	@RequestMapping("/peiyang.action")
	public String peiyang(){
		return "qiyePeiyang";
	}
	@RequestMapping("/zhaopin.action")
	public String zhaopin(){
		return "qiyeZhaopin";
	}
	@RequestMapping("/yingpin.action")
	public String yingpin(){
		return "qiyeYingpin";
	}
	@ResponseBody
	@RequestMapping("/qiyePeiyang.action")
	public Map<String,Object> qiyePeiyang (
			@RequestParam(value="pageNumber",defaultValue="0",required=false)int pageNumber,
			@RequestParam("pageSize")int pageSize) throws Exception{
		Map<String,Object>map=new HashMap<String,Object>();
		List<Order>list=new ArrayList<Order>();
		int count=0;
		String sql = "select * from orders "
				   + "left join user u1 on order_give = u1.user_id "
				   + "left join user u2 on order_take = u2.user_id "
				   + "where order_type=1";
		Object params[]={};
		DBUtil db=new DBUtil();
		db.doPstm(sql, params);
		ResultSet rs=db.getRs();
		while(rs.next()){
			count++;
			Order order=new Order();
			User userGiver = new User();
			User userTaker = new User();
			order.setOrderBrief(rs.getString("order_brief"));
			order.setOrderFile(rs.getString("order_file"));
			order.setOrderGive(rs.getString("order_give"));
			order.setOrderId(rs.getInt("order_id"));
			order.setOrderTake(rs.getString("order_take"));
			order.setOrderType(rs.getInt("order_type"));
			
			userGiver.setUserId(rs.getString("u1.user_id"));
			userGiver.setUserUnit(rs.getString("u1.user_unit"));
			
			userTaker.setUserId(rs.getString("u2.user_id"));
			userTaker.setUserUnit(rs.getString("u2.user_unit"));
			
			order.setOrderGiveUser(userGiver);
			order.setOrderTakeUser(userTaker);
			list.add(order);
		}
		rs.close();
		db.closed();
		map.put("total", count);
		map.put("rows", list);
		return map;
	}
	@ResponseBody
	@RequestMapping("/qiyeZhaopin.action")
	public Map<String,Object> qiyeZhaopin (HttpServletRequest request,
			@RequestParam(value="pageNumber",defaultValue="0",required=false)int pageNumber,
			@RequestParam("pageSize")int pageSize) throws Exception{
		Map<String,Object>map=new HashMap<String,Object>();
		List<Recruit>list=new ArrayList<Recruit>();
		int count=0;
		String unit=((User)request.getSession().getAttribute("USER")).getUserUnit();
		String sql="select * from recruit where re_unit=?";
		Object params[]={unit};
		DBUtil db=new DBUtil();
		db.doPstm(sql, params);
		ResultSet rs=db.getRs();
		while(rs.next()){
			count++;
			Recruit rc=new Recruit();
			rc.setReAgebtm(rs.getInt("re_agebtm"));
			rc.setReAgetop(rs.getInt("re_agetop"));
			rc.setReBrief(rs.getString("re_brief"));
			rc.setReDegree(rs.getString("re_degree"));
			rc.setReDuty(rs.getString("re_duty"));
			rc.setReId(rs.getInt("re_id"));
			rc.setReLocal(rs.getString("re_local"));
			rc.setSex(rs.getInt("re_sex")==0?"男":"女");
			rc.setReStatus(rs.getString("re_status"));
			rc.setReTime(rs.getDate("re_time"));
			rc.setReUnit(rs.getString("re_unit"));
			list.add(rc);
		}
		rs.close();
		db.closed();
		map.put("total", count);
		map.put("rows", list);
		return map;
	}
	@ResponseBody
	@RequestMapping("/qiyeYingpin.action")
	public Map<String,Object> qiyeYingpin (HttpServletRequest request,
			@RequestParam(value="pageNumber",defaultValue="0",required=false)int pageNumber,
			@RequestParam("pageSize")int pageSize) throws Exception{
		Map<String,Object>map=new HashMap<String,Object>();
		List<Employ>list=new ArrayList<Employ>();
		int count=0;
		String ID=((User)request.getSession().getAttribute("USER")).getUserId();
		
		String unit=((User)request.getSession().getAttribute("USER")).getUserUnit();
		String sql1="select * from recruit where re_unit=?";
		Object params1[]={unit};
		DBUtil db1=new DBUtil();
		db1.doPstm(sql1, params1);
		ResultSet rs1=db1.getRs();
		while(rs1.next()){
			int re_id=rs1.getInt("re_id");
			String sql="select * from employ where em_re=?";
			Object params[]={re_id};
			DBUtil db=new DBUtil();
			db.doPstm(sql, params);
			ResultSet rs=db.getRs();
			while(rs.next()){
				count++;
				Employ em=new Employ();
				em.setEmId(rs.getInt("em_id"));
				em.setEmRe(rs.getInt("em_re"));
				em.setEmStatus(rs.getInt("em_status"));
				em.setEmStu(rs.getString("em_stu"));
				int status=rs.getInt("em_status");
				if(status==0){
					em.setStatus("申请中");
				}
				else if(status==1){
					em.setStatus("面试中");
				}
				else if(status==2){
					em.setStatus("合作失败");
				}
				else{
					em.setStatus("签约");
				}
				em.setRe(unit);
				list.add(em);
			}
			rs.close();
			db.closed();
		}
		rs1.close();
		db1.closed();
		map.put("total", count);
		map.put("rows", list);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/addPeiyang.action")
	public int addPeiyang (@RequestParam(value = "file",required = false)MultipartFile fileField,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		String give=request.getSession().getAttribute("ID").toString();
		String brief=request.getParameter("brief");
		
		InputStream stream=fileField.getInputStream();//上传文件需要的文件流参数
		String filename = fileField.getOriginalFilename(); 
		//获取文件名后缀  
		String suffix = filename.substring(filename.lastIndexOf(".")+1);
		if(suffix.equals("pdf")){  //上传文件需要的参数    	
	    	String savepath=request.getServletContext().getRealPath(File.separator+"peiyang");
	        File path=new File(savepath);  //这个要自己写具体的路径，是需要上传文件需要的参数
	        if(!path.exists()){
	        	path.mkdirs();
	        }
	        Upload.uploadFile(stream, path,filename);   //调用工具类方法		
			CRUDUtil.insert("orders", "order_brief,order_file,order_give,order_type", "?,?,?,?", new Object[]{brief,filename,give,0});
			return 1;
		}
		else{
			return 0;
		}
	}
	@ResponseBody
	@RequestMapping("/addZhaopin.action")
	public int addZhaopin (HttpServletRequest request, HttpServletResponse response) throws Exception{
		String unit=((User)request.getSession().getAttribute("USER")).getUserUnit();
		String zhiwu=request.getParameter("zhiwu");
		String brief=request.getParameter("brief");
		int xingbie=request.getParameter("xingbie").equals("男")?0:1;
		int xiaxian=Integer.parseInt(request.getParameter("xiaxian"));
		int shangxian=Integer.parseInt(request.getParameter("shangxian"));
		String xueli=request.getParameter("xueli");
		String didian=request.getParameter("didian");
		CRUDUtil.insert("recruit", "re_duty,re_brief,re_sex,re_agebtm,re_agetop,re_degree,re_local,re_unit,re_status,re_time", "?,?,?,?,?,?,?,?,?,?", new Object[]{zhiwu,brief,xingbie,xiaxian,shangxian,xueli,didian,unit,"招聘中",new Date()});
		return 1;
	}
	
	@RequestMapping("/download.action")
	public ResponseEntity<byte[]> download(HttpServletRequest request, HttpServletResponse response) 
			throws Exception {
		String id=request.getParameter("id");
		String filePath="";
		String fileName="";
		String sql="select order_file from orders where order_id=?";
		Object params[]={id};
		DBUtil db=new DBUtil();
		db.doPstm(sql, params);
		ResultSet rs=db.getRs();
		if(rs.next()){
			fileName=rs.getString("order_file");
		}
		rs.close();
		db.closed();
		String path = request.getServletContext().getRealPath("/peiyang");
        File file = new File(path + "/" + fileName);
        HttpHeaders headers = new HttpHeaders();  
        //下载显示的文件名，解决中文名称乱码问题  
        String downloadFielName = new String(fileName.getBytes("UTF-8"),"iso-8859-1");
        //通知浏览器以attachment（下载方式）打开图片
        headers.setContentDispositionFormData("attachment", downloadFielName); 
        //application/octet-stream ： 二进制流数据（最常见的文件下载）。
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        
        return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file),    
                headers, HttpStatus.CREATED);  
	}
	@ResponseBody
	@RequestMapping("/tongguo.action")
	public int tongguo (HttpServletRequest request, HttpServletResponse response) throws Exception{
		int result=0;
		String give=request.getSession().getAttribute("ID").toString();
		String id=request.getParameter("id");
		String sql="select * from orders where order_id=?";
		Object params[]={id};
		DBUtil db=new DBUtil();
		db.doPstm(sql, params);
		ResultSet rs=db.getRs();
		if(rs.next()){
			if(rs.getString("order_take")==null){
				result=1;
			}
			else{
				if(!rs.getString("order_give").equals(give)){
					result=2;
				}
				else{
					if(rs.getInt("tongguo")==1){
						result=3;
					}
					else{
						CRUDUtil.update("orders", "tongguo=?", "order_id=?", new Object[]{1,id});
					}
				}
			}
		}
		rs.close();
		db.closed();
		return result;
		
	}
	@ResponseBody
	@RequestMapping("/jieshou.action")
	public int jieshou (HttpServletRequest request, HttpServletResponse response) throws Exception{
		int result=0;
		String ID=request.getSession().getAttribute("ID").toString();
		int role=((User)request.getSession().getAttribute("USER")).getUserRole()-1;
		String id=request.getParameter("id");
		String sql="select * from orders where order_id=?";
		Object params[]={id};
		DBUtil db=new DBUtil();
		db.doPstm(sql, params);
		ResultSet rs=db.getRs();
		if(rs.next()){
			if(rs.getInt("order_type")==role){
				result=1;
			}
			else{
				if(rs.getString("order_take")!=null){
					result=2;
				}
				else{
					CRUDUtil.update("orders", "order_take=?", "order_id=?", new Object[]{ID,id});
				}
			}
		}
		rs.close();
		db.closed();
		return result;
		
	}
	@ResponseBody
	@RequestMapping("/xiugai.action")
	public int xiugai (HttpServletRequest request, HttpServletResponse response) throws Exception{
		int result=0;
		String ID=request.getSession().getAttribute("ID").toString();
		String id=request.getParameter("id");
		String sql="select * from orders where order_id=?";
		Object params[]={id};
		DBUtil db=new DBUtil();
		db.doPstm(sql, params);
		ResultSet rs=db.getRs();
		if(rs.next()){
			if(!rs.getString("order_give").equals(ID)){
				result=1;
			}
			else{
				if(rs.getString("order_take")==null){
					result=2;
				}
				else{
					if(rs.getInt("modify")==1){
						result=3;
					}
					else{
						
					}
					
				}
			}
		}
		rs.close();
		db.closed();
		return result;
		
	}
	@ResponseBody
	@RequestMapping("/xiugaiPeiyang.action")
	public int xiugaiPeiyang (@RequestParam(value = "file1",required = false)MultipartFile fileField,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		String id=request.getParameter("order_id");
		InputStream stream=fileField.getInputStream();//上传文件需要的文件流参数
		String filename = fileField.getOriginalFilename(); 
		//获取文件名后缀  
		String suffix = filename.substring(filename.lastIndexOf(".")+1);
		if(suffix.equals("pdf")){  //上传文件需要的参数    	
	    	String savepath=request.getServletContext().getRealPath(File.separator+"peiyang");
	        File path=new File(savepath);  //这个要自己写具体的路径，是需要上传文件需要的参数
	        if(!path.exists()){
	        	path.mkdirs();
	        }
	        Upload.uploadFile(stream, path,filename);   //调用工具类方法		
			CRUDUtil.update("orders", ",order_file=?,modify=?", "order_id=?", new Object[]{filename,1,id});
			return 1;
		}
		else{
			return 0;
		}
	}
	@ResponseBody
	@RequestMapping("/shanchu.action")
	public int shanchu (HttpServletRequest request, HttpServletResponse response) throws Exception{
		int result=0;
		String ID=request.getSession().getAttribute("ID").toString();
		String id=request.getParameter("id");
		String sql="select * from orders where order_id=?";
		Object params[]={id};
		DBUtil db=new DBUtil();
		db.doPstm(sql, params);
		ResultSet rs=db.getRs();
		if(rs.next()){
			if(!rs.getString("order_give").equals(ID)){
				result=1;
			}
			else{
				CRUDUtil.delete("orders", "order_id=?", new Object[]{id});
			}
		}
		rs.close();
		db.closed();
		return result;
		
	}
	@ResponseBody
	@RequestMapping("/zhaopinShanchu.action")
	public int zhaopinShanchu (HttpServletRequest request, HttpServletResponse response) throws Exception{
		int result=0;
		String id=request.getParameter("id");
		CRUDUtil.delete("recruit", "re_id=?", new Object[]{id});
		return result;
		
	}
	@ResponseBody
	@RequestMapping("/jujue.action")
	public int jujue (HttpServletRequest request, HttpServletResponse response) throws Exception{
		int result=0;
		String id=request.getParameter("id");
		CRUDUtil.update("employ", "em_status=?", "em_id=?", new Object[]{2,id});
		return result;
		
	}
	@ResponseBody
	@RequestMapping("/yaoqing.action")
	public int yaoqing (HttpServletRequest request, HttpServletResponse response) throws Exception{
		int result=0;
		String id=request.getParameter("id");
		CRUDUtil.update("employ", "em_status=?", "em_id=?", new Object[]{1,id});
		return result;
		
	}
	@ResponseBody
	@RequestMapping("/qianyue.action")
	public int qianyue (HttpServletRequest request, HttpServletResponse response) throws Exception{
		int result=0;
		String id=request.getParameter("id");
		CRUDUtil.update("employ", "em_status=?", "em_id=?", new Object[]{3,id});
		return result;
		
	}
	
}
