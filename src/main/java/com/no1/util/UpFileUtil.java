package com.no1.util;

import java.util.UUID;

public class UpFileUtil {
	
		public static String getFileName(){
			
			return UUID.randomUUID().toString().replace("-", "");
			
		}
	
		public static String getrealFileName(String content){
		
			int start = content.lastIndexOf("=") + 2;
			int end = content.length() - 1;
		
			return content.substring(start, end);
			
		}
	
		public static String getFileType(String realName){
		
			return realName.substring(realName.lastIndexOf("."));
			
		}	
		
}
