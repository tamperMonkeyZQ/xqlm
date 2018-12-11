package com.no1.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
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
import com.no1.domain.Student;
import com.no1.service.MajorService;
import com.no1.service.StudentService;
import com.no1.util.UpFileUtil;

@Controller
@RequestMapping("/student")
public class StudentController {
	
	@Autowired
	StudentService studentService;
	
	@Autowired
	MajorService majorService;
	
	@RequestMapping("/goStudent.action")
	public String goMajorPage(){
		return "student";
	}
	
	@ResponseBody
	@RequestMapping("/stuList.action")
	public Map<String,Object> getStuList(
			@RequestParam(value="pageNumber",defaultValue="0",required=false)int pageNumber,
			@RequestParam("pageSize")int pageSize,
			@RequestParam("myId")String userId){
			Map<String,Object> map = new HashMap<String, Object>();
			map = studentService.getStuListByUnit(userId, pageNumber, pageSize);
			System.out.println("num: " + pageNumber + "size:" + pageSize);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/getStudentByIdcard.action")
	public Map<String,Object> getStudentByidcard(@RequestParam("stuIdcard")String stuIdcard){
			Map<String,Object> map = new HashMap<String, Object>();
			System.out.println(stuIdcard);
			Student student = studentService.getStudentByIdcard(stuIdcard);
			map.put("student", student);
			return map;
	}
	
	@ResponseBody
	@RequestMapping("/updateStudent.action")
	public int updateStudent(@RequestParam("stuIdcard")String stuIdcard,
			@RequestParam(value="stuName",defaultValue="",required=false)String stuName,
			@RequestParam(value="stuNum",defaultValue="",required=false)String stuNum,
			@RequestParam(value="stuTel",defaultValue="",required=false)String stuTel){
		Student student = new Student();
		student.setStuIdcard(stuIdcard);
		student.setStuName(stuName);
		student.setStuNum(stuNum);
		student.setStuTel(stuTel);
		return studentService.updateByIdcardSelective(student);
	}
	
	@ResponseBody
	@RequestMapping("/getStudentByCon.action")
	public Map<String,Object> getStuListByCon(
			@RequestParam(value="pageNumber",defaultValue="0",required=false)int pageNumber,
			@RequestParam("pageSize")int pageSize,@RequestParam(value="stuNameSearch",defaultValue="",required=false)String stuNameSearch,
			@RequestParam("myId")String userId,@RequestParam(value="stuNumSearch",defaultValue="",required=false)String stuNumSearch,
			@RequestParam(value="myMaj",defaultValue="",required=false)Integer stuMaj){
		return studentService.getStuListByUnitCon(userId, stuMaj, stuNameSearch, stuNumSearch, pageNumber, pageSize);
	}
	
	@ResponseBody
	@RequestMapping("/majList.action")
	public List<Major> getMajorListByUnit(@RequestParam("myId")String majUnit){
		System.out.println(majUnit);
		List<Major> list = majorService.getMajorListByUnit(majUnit);
		return list;
	}

	@ResponseBody
	@RequestMapping("/saveStudent.action")
	public int saveStudent(@RequestParam("stuIdcard")String stuIdcard,@RequestParam("stuName")String stuName,@RequestParam("stuNum")String stuNum,
			@RequestParam("stuTel")String stuTel,@RequestParam("stuMaj")int stuMaj,@RequestParam("stuUnit")String stuUnit,
			@RequestParam("stuGrade")MultipartFile stuGrade,@RequestParam("stuSex")int stuSex,
			HttpServletRequest request){
		System.out.println(stuIdcard + " " + stuMaj + " " + stuGrade.getOriginalFilename());
		String path = request.getServletContext().getRealPath("/uploadStu");
		String fileName = UpFileUtil.getFileName() + UpFileUtil.getFileType(stuGrade.getOriginalFilename());
		try {
			stuGrade.transferTo(new File(path + "/" + fileName));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return 0;
		} 
		
		Student stu = new Student();
		stu.setStuIdcard(stuIdcard);
		stu.setStuName(stuName);
		stu.setStuNum(stuNum);
		stu.setStuTel(stuTel);
		stu.setStuUnit(stuUnit);
		stu.setStuMaj(stuMaj);
		stu.setStuGrade(fileName);
		stu.setStuSex(stuSex);
		int i;
		i = studentService.saveStudent(stu);
		
		return i;
	}
	
	
	@ResponseBody
	@RequestMapping("/upStuFile.action")
	public int upStuFile(@RequestParam("stuIdcard")String stuIdcard,
			@RequestParam("stuGrade")MultipartFile stuGrade,HttpServletRequest request){
		int i;
		
		String path = request.getServletContext().getRealPath("/uploadStu");
		String fileName = UpFileUtil.getFileName() + UpFileUtil.getFileType(stuGrade.getOriginalFilename());
		
		try {
			stuGrade.transferTo(new File(path+ "/" +fileName));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return 0;
		} 
		
		Student student = new Student();
		student.setStuIdcard(stuIdcard);
		student.setStuGrade(fileName);
		i = studentService.updateByIdcardSelective(student);
		
		return i;
	}
	
	@RequestMapping("/downloadGrade.action")
	public ResponseEntity<byte[]> downloadFile(@RequestParam("filename")String filename,
			HttpServletRequest request) throws Exception{
		//下载文件路径
        String path = request.getServletContext().getRealPath("/uploadStu");
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
	@RequestMapping("/delStudent.action")
	public int delStudentByIdcard(@RequestParam("uid")String stuIdcard){
		return studentService.delUser(stuIdcard);
	}
	
	@ResponseBody
	@RequestMapping("/import.action")
	public Map<String,Object> importExcel(@RequestParam("files")MultipartFile file,@RequestParam("myId") String stuUnit){
		
		return studentService.importExcel(file, stuUnit);
	}
	
}
