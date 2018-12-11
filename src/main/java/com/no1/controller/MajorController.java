package com.no1.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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

import com.no1.domain.Major;
import com.no1.service.MajorService;
import com.no1.util.UpFileUtil;

@Controller
@RequestMapping("/major")
public class MajorController {
	
	@Autowired
	MajorService majorService;
	
	@RequestMapping("/goMajor.action")
	public String goMajorPage(){
		return "major";
	}
	
	@ResponseBody
	@RequestMapping("/majorList.action")
	public Map<String,Object> getMajorList(
			@RequestParam(value="pageNumber",defaultValue="0",required=false)int pageNumber,
			@RequestParam("pageSize")int pageSize,
			@RequestParam("myId")String userId){
			Map<String,Object> map = new HashMap<String, Object>();
			map = majorService.getMajorListByUnit(userId,pageNumber,pageSize);
		return map;
	}
	
	/**
	 * 验证该用户登录账号下这个专业名称是否唯一
	 * @param account
	 * @param userUnit
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/validAccount.action")
	public Map<String,Object> validAccountMajor(@RequestParam("account")String majName,
			@RequestParam("userId")String userId){
		Map<String,Object> map=new HashMap<String, Object>();
		System.out.println(majorService.checkMajorUnique(majName, userId));
		Major major = majorService.checkMajorUnique(majName, userId);
		if(major != null){
			map.put("msg", "专业名称不可用");
		}else{
			map.put("msg", "专业名称可用");
		}
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/saveMajor.action")
	public int saveUser(@RequestParam("majName")String majName,@RequestParam("majUnit")String majUnit,
			@RequestParam("majSmry")String majSmry,@RequestParam("majYear")String majYear,
			@RequestParam("myFile")MultipartFile myFile,HttpServletRequest request){
		/*System.out.println(myFile.getOriginalFilename());
		System.out.println(myFile.getName());
		System.out.println(myFile);*/
		int i;
		String path = request.getServletContext().getRealPath("/uploadmajor");
		String fileName = UpFileUtil.getFileName() + UpFileUtil.getFileType(myFile.getOriginalFilename());
		Major major = new Major();
		major.setMajFile(fileName);
		major.setMajName(majName);
		major.setMajSmry(majSmry);
		major.setMajYear(majYear);
		major.setMajUnit(majUnit);
		i = majorService.saveMajor(major);
		/*System.out.println(path);
		System.out.println(fileName);*/
		try {
			myFile.transferTo(new File(path + "/" + fileName));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return 0;
		}
		return i;
	}
	
	@RequestMapping("/download.action")
	public ResponseEntity<byte[]> downloadFile(@RequestParam("filename")String filename,
			HttpServletRequest request) throws Exception{
		System.out.println(filename);
		
		//下载文件路径
        String path = request.getServletContext().getRealPath("/uploadmajor");
        File file = new File(path + "/" + filename);
        HttpHeaders headers = new HttpHeaders();  
        //下载显示的文件名，解决中文名称乱码问题  
        String downloadFielName = new String(filename.getBytes("UTF-8"),"iso-8859-1");
        //通知浏览器以attachment（下载方式）打开图片
        headers.setContentDispositionFormData("attachment", downloadFielName); 
        //application/octet-stream ： 二进制流数据（最常见的文件下载）。
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        
        return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file),    
                headers, HttpStatus.CREATED);  

	}
	
	@ResponseBody
	@RequestMapping("/getMajorById.action")
	public Map<String,Object> getMajorById(@RequestParam("majId")int majId){
		Map<String,Object> map = new HashMap<String, Object>();
		Major major = majorService.getMajorById(majId);
		map.put("major", major);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/upMajor.action")
	public int upMajor(@RequestParam("majName")String majName,@RequestParam("majUnit")String majUnit,
			@RequestParam("majSmry")String majSmry,@RequestParam("majYear")String majYear,@RequestParam("majId")int majId,
			HttpServletRequest request){
		int i;
		
		Major major = new Major();
		major.setMajId(majId);
		major.setMajName(majName);
		major.setMajSmry(majSmry);
		major.setMajYear(majYear);
		major.setMajUnit(majUnit);
		
		i = majorService.updateMajorSelective(major);
		
		return i;
	}
	
	@ResponseBody
	@RequestMapping("/upMajorFile.action")
	public int upMajorFile(@RequestParam("myFile")MultipartFile myFile,@RequestParam("majId")int majId,
			HttpServletRequest request){
		int i;
		String path = request.getServletContext().getRealPath("/uploadmajor");
		String fileName = UpFileUtil.getFileName() + UpFileUtil.getFileType(myFile.getOriginalFilename());
		Major major =  new Major();
		major.setMajId(majId);
		major.setMajFile(fileName);
		i = majorService.updateMajorSelective(major);
		try {
			myFile.transferTo(new File(path + "/" + fileName));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			i = 0;
		} 
		return i;
	}
	
	
	//删除
	@ResponseBody
	@RequestMapping("/delMajor.action")
	public int delUser(@RequestParam("uid")int majId){
		int i = majorService.delMajorById(majId);
		return i;
	}
	
	@ResponseBody
	@RequestMapping("/getMajorByCon.action")
	public Map<String,Object> getMajorByCon(
			@RequestParam("pageNumber")Integer pageNumber,@RequestParam("pageSize")Integer pageSize,
			@RequestParam("majUnit")String majUnit,
			@RequestParam(value="majorSearch",required=false,defaultValue="")String searchVO
			){
				
				return majorService.selectMajorBySearchVO(pageNumber, pageSize, majUnit, searchVO);
	}
}
