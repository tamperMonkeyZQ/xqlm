package com.no1.serviceImpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.no1.domain.Student;
import com.no1.mapper.StudentMapper;
import com.no1.service.StudentService;


@Service
public class StudentServiceImpl implements StudentService{

	@Autowired
	StudentMapper stuMapper;

	@Override
	public Map<String, Object> getStuListByUnit(String userId, int pageNumber,
			int pageSize) {
		// TODO Auto-generated method stub
		List<Student> stuList = stuMapper.selectStudentByUser(userId, (pageNumber-1)*pageSize, pageNumber*pageSize);
		int count = stuMapper.getStudentByUserCount(userId);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("rows", stuList);
		map.put("total", count);
		return map;
	}

	@Override
	public int saveStudent(Student student) {
		// TODO Auto-generated method stub
		return stuMapper.insertSelective(student);
	}

	@Override
	public Map<String, Object> getStuListByUnitCon(String userId, Integer majId,
			String stuNameSearch, String stuNumSearch, int pageNumber,
			int pageSize) {
		// TODO Auto-generated method stub
		Map<String,Object> map = new HashMap<String, Object>();
		List<Student> list = stuMapper.selectStuConByUser(userId, majId, stuNameSearch, 
				stuNumSearch, (pageNumber-1)*pageSize, pageNumber*pageSize);
		int count = stuMapper.getStuConByUserCount(userId, majId, stuNameSearch, stuNumSearch);
		map.put("rows", list);
		map.put("total", count);
		return map;
	}

	@Override
	public Student getStudentByIdcard(String stuIdcard) {
		// TODO Auto-generated method stub
		return stuMapper.selectByPrimaryKey(stuIdcard);
	}

	@Override
	public int updateByIdcardSelective(Student student) {
		// TODO Auto-generated method stub
		return stuMapper.updateByPrimaryKeySelective(student);
	}

	@Override
	public int delUser(String stuIdcard) {
		// TODO Auto-generated method stub
		return stuMapper.deleteByPrimaryKey(stuIdcard);
	}

	@Override
	public Map<String, Object> importExcel(MultipartFile file, String stuUnit) {
		// TODO Auto-generated method stub
				List<Student> list = new ArrayList<Student>();
				Map<String,Object> map = new HashMap<String, Object>();
				int x=0,y=0,sum=0;
				boolean flag = false;
				if(file != null){
					//根据指定的文件输入流导入Excel从而产生Workbook对象
					try {
							Workbook workBook = new XSSFWorkbook(file.getInputStream());
							//new HSSFWorkbook(file.getInputStream());
							//获取Excel文档中的第一个表单
							Sheet sheet=workBook.getSheetAt(0);
							//对Sheet中的每一行进行迭代  
							for (Row r : sheet) {  
								//如果当前行的行号（从0开始）未达到2（第三行）则从新循环  
								if(r.getRowNum()<2){  
									continue;  
			    		    } 
							//
							Student student = new Student();
							r.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
							r.getCell(1).setCellType(Cell.CELL_TYPE_STRING);
							r.getCell(2).setCellType(Cell.CELL_TYPE_STRING);
							r.getCell(3).setCellType(Cell.CELL_TYPE_NUMERIC);
							r.getCell(4).setCellType(Cell.CELL_TYPE_STRING);
							r.getCell(5).setCellType(Cell.CELL_TYPE_NUMERIC);
							r.getCell(6).setCellType(Cell.CELL_TYPE_NUMERIC);
							student.setStuIdcard(r.getCell(0).getStringCellValue());
							student.setStuName(r.getCell(1).getStringCellValue());
							student.setStuNum(r.getCell(2).getStringCellValue());
							student.setStuSex((int)r.getCell(3).getNumericCellValue());
							student.setStuTel(r.getCell(4).getStringCellValue());
							student.setStuMaj((int)r.getCell(5).getNumericCellValue());
							student.setStuUnit(stuUnit);
							student.setStuGradu((int)r.getCell(6).getNumericCellValue());
							list.add(student);
						
						}
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
					y = list.size();
					for(Student student : list){
						if(stuMapper.selectByPrimaryKey(student.getStuIdcard())!=null){
							x++;
						}else{
							int i = stuMapper.insert(student);
							sum += i;
						}
					}
					
					if(sum==(y-x)){
						flag = true;
					}			
				}
				map.put("msg", "共有"+y+"条数据,成功导入"+sum+"条数据,登陆账号重名的数据有"+x+"条");
				map.put("flag", flag);
				return map;
	}

	
	
	
	
}
