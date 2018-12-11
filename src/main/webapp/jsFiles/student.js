/**
 * 专业
 */
$(function (){
	getMajorLists();  
	
	//select2 多选
    $("#rid").select2({
    	//minimumInputLength: 1, 
        language: "zh-CN", //设置 提示语言
        maximumSelectionLength: 3,  //设置最多可以选择多少项
         //width: "100%", //设置下拉框的宽度
         placeholder: "请选择",
         tags: true,
    });
    
    
	$("#test-table").bootstrapTable('destroy');
	$('#test-table').bootstrapTable({
		method : 'GET',
		url: "student/stuList.action",
		cache : false,
		striped : true,
		pagination : true, //在表格底部显示分页工具栏
		pageSize : 10, //默认每页条数
		pageNumber : 1, //默认分页
		pageList : [ 10, 20, 50, 100, 200, 500 ],//分页数
		showColumns : false, //显示隐藏列
		showRefresh : false, //显示刷新按钮
		showExport : false,
		toolbar:"#toolbar",
		singleselect : true,
		clickToSelect: true, // 单击行即可以选中
		search : false,//显示搜素表单
		silent : true, //刷新事件必须设置
		sidePagination : "server", //表示服务端请求  
		columns : [  
		{
			field : "stuIdcard",
			title : "身份证号",
			class : 'col-md-1',
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "stuNum",
			title : "学号",
			align : "center",
			valign : "middle",
			sortable : "true",
			//visible : "false"
		},{
			field : "stuName",
			title : "姓名",
			align : "center",
			valign : "middle",
			sortable : "true",
			//visible : "false"
 		},{
			field : "stuSex",
			title : "性别",
			align : "center",
			valign : "middle",
			sortable : "true",
			formatter: bFormatter,
		}, {
			field : "stuTel",
			title : "电话",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "major.majName",
			title : "专业名称",
			align : "center",
			valign : "middle",
			sortable : "true",
			//formatter: aFormatter,
		},{
			field : "stuGrade",
			title : "成绩",
			align : "center",
			valign : "middle",
			sortable : "true",
			formatter: aFormatter,
		},{
			field : "stuGradu",
			title : "毕业时间",
			align : "center",
			valign : "middle",
			sortable : "true",
			//visible : "false"
		},{
			field : "stuUpdate",
			title : "更新时间",
			align : "center",
			valign : "middle",
			sortable : "true",
			//visible : "false"
		},{
            field: 'operate',
            title: '操作',
           class : 'col-md-2',
            align: 'center',
            valign: 'middle',
           formatter: operateFormatter,
        }],
		queryParamsType: "undefined",
        queryParams: function queryParams(params) {   //设置查询参数
        	var x = $("#myId").val();
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                myId: x,
                // searchText: params.searchText
            };
            return param;
        },
		formatLoadingMessage : function() {
			return "请稍等，正在加载中...";
		},

		formatNoMatches : function() {
			return '无符合条件的记录';
		},
		 //注册加载子表的事件。注意下这里的三个参数！
       onExpandRow: function (index, row, $detail) {
            oInit.InitSubTable(index, row, $detail);
        }

	});
});

function getContextPath(){ 
	 var contextPath = document.location.pathname; 
	 var index =contextPath.substr(1).indexOf("/"); //这个地方可能有问题，要根据具体项目适当修改
	 contextPath = contextPath.substr(0,index+1); 
	 delete index; 
	 return contextPath; 
} 

function operateFormatter(value, row, index) {
    return [
        '<button type="button" class=" btn btn-info" onclick="getValue(\''+row.stuIdcard+'\')">修改</button>',
        '&nbsp;&nbsp;&nbsp;<button class=" btn btn-primary" type="button" onclick="openFileDlg(\''+row.stuIdcard+'\')">成绩</button>',
        '&nbsp;&nbsp;&nbsp;<button class=" btn btn-danger" type="button" onclick="delStudent(\''+row.stuIdcard+'\')">删除</button>'
        
        ].join('');
}

function aFormatter(value, row, index) {
	var path = getContextPath();
    return [
            '<a href="' + path + '/student/downloadGrade.action?filename=' + row.stuGrade + '">下载</a>'
        ].join('');
}

function bFormatter(value, row, index) {
	if(row.stuSex=='0'){
		return ['男'].join('');
	}else{
		return ['女'].join('');
	}
}
//条件查询
	function getStudentByCon(){
		 
		$("#test-table").bootstrapTable('destroy');
		$('#test-table').bootstrapTable({
			method : 'post', //默认是post,不允许对静态文件访问
			url: "student/getStudentByCon.action",
			contentType:"application/x-www-form-urlencoded",
			cache : false,
			striped : true,// 隔行加亮
			pagination : true, //开启分页功能    在表格底部显示分页工具栏
			pageSize : 10, //默认每页条数
			pageNumber : 1, //默认分页
			pageList : [ 10, 20, 50, 100, 200, 500 ],//分页数
			showColumns : false, //显示隐藏列
			showRefresh : false, //显示刷新按钮
			toolbar:"#toolbar",
			singleselect : true,
			minimumCountColumns: 2,// 设置最少显示列个数
	        clickToSelect: true, // 单击行即可以选中
			search : false,//显示搜素表单
			silent : true, //刷新事件必须设置
			sidePagination : "server", //表示服务端请求  
			columns : [  
			{
			   	field : "stuIdcard",
			   	title : "身份证号",
			   	class : 'col-md-1',
			   	align : "center",
			   	valign : "middle",
			   	sortable : "true"
			 }, {
			   	field : "stuNum",
			   	title : "学号",
			   	align : "center",
			   	valign : "middle",
			   	sortable : "true",
			   	//visible : "false"
			 },{
			   	field : "stuName",
			   	title : "姓名",
			   	align : "center",
			   	valign : "middle",
			   	sortable : "true",
			   	//visible : "false"
			 },{
				 field : "stuSex",
			   	 title : "性别",
			   	 align : "center",
			   	 valign : "middle",
			   	 sortable : "true",
			   	 formatter: bFormatter,
			  }, {
			   	 field : "stuTel",
			   	 title : "电话",
			   	 align : "center",
			   	 valign : "middle",
			   	 sortable : "true"
			   },{
			   		field : "major.majName",
			   		title : "专业名称",
			   		align : "center",
			   		valign : "middle",
			   		sortable : "true",
			   		//formatter: aFormatter,
			   },{
			   		field : "stuGrade",
			   		title : "成绩",
			   		align : "center",
			   		valign : "middle",
			   		sortable : "true",
			   		formatter: aFormatter,
			   },{
			   		field : "stuGradu",
			   		title : "毕业时间",
			   		align : "center",
			   		valign : "middle",
			   		sortable : "true",
			   			//visible : "false"
			   },{
			   		field : "stuUpdate",
			   		title : "更新时间",
			   		align : "center",
			   		valign : "middle",
			   		sortable : "true",
			   		//visible : "false"
			},{
			        field: 'operate',
			        title: '操作',
			        class : 'col-md-2',
			        align: 'center',
			        valign: 'middle',
			        formatter: operateFormatter,
			 }],
			queryParamsType: "undefined",
	        queryParams: function queryParams(params) { //设置查询参数
	        	var x = $("#myId").val();
	            var param = {
	                pageNumber: params.pageNumber,
	                pageSize: params.pageSize,
	                stuNameSearch:$("#stuNameSearch").val(),
	                stuNumSearch: $("#stuNumSearch").val(),
	                myMaj: $("#myMaj").val(),
	                myId:x,
	                // searchText: params.searchText
	            };
	            
	            return param;
	        },
			formatLoadingMessage : function() {
				return "请稍等，正在加载中...";
			},
	
			formatNoMatches : function() {
				return '无符合条件的记录';
			}
		});
}


//查询所有专业 追加到 条件查询中
function getMajorLists(){
	var qid = $("#myId").val();
	$.ajax({
		url:'student/majList.action',
		dataType:'json',
		type:'post',
		data:{myId:qid},
		success:function(data){
			$("#myMaj").empty();
			$("#myMaj").append("<option value=''>请选择所属专业</option>");
			$.each(data,function(){
				$("#myMaj").append("<option value='"+this.majId+"'>"+this.majName+"</option>");
			});
		},
		error:function(){
			alert("请求失败!");
		}
	});
}

//打开  导入 
function ImportExcel(){
	$("#importDlg").modal('show');
}
//导入
function importExcel(){
	var formData = new FormData();
	formData.append("files", $("#files")[0].files[0]);
	formData.append("myId", $("#myId").val());
	if($("#importForm").data('bootstrapValidator').validate().isValid()){
		$.ajax({
			url:'student/import.action',
			dataType:'json',
			type:'post',
			data:formData,
			contentType: false, //必须false才会避开jQuery对 formdata 的默认处理 
            processData: false, //必须false才会自动加上正确的Content-Type
			success:function(data){
				if(data.flag){
					alert("导入成功！"+data.msg);
				}else{
					alert("导入失败！"+data.msg);
				}
				closeDlg();
				$("#test-table").bootstrapTable('refresh');
			},
			error:function(){
				alert("请求失败！");
			}
		});
	}else{
		return false;
	}
}

//导出
function ExportExcel(){
	if(confirm("您确定要导出所有用户信息吗？")){
		location.href="user/export.action";
	}else{
		return false;
	}
}


//角色分配
function getRole(uid){
	$("#hid").val(uid);
	$.ajax({
		url:'user/getRole.action',
		dataType:'json',
		type:'post',
		traditional:true,
		data:{
			uid:uid
		},
		success:function(data){
			$("#rid").empty();
			$.each(data.role,function(index,items){
				$("#rid").append("<option value='"+items.role_id+"'>"+items.role_name+"</option>");
			});
			if((data.userRole!=null)){
				$.each(data.userRole,function(index,items){
					$("#rid").val(data.userRole).trigger("change");//select2 选中
				});
			}else{
				$("#rid").val(0).trigger("change");
			}
		},
		error:function(){
			alert("请求失败！");
		}
	})
	$("#roleDlg").modal('show');
}
//保存修改角色
function saveRole(){
	var uid=$("#hid").val();
	//var rid=$("#rid option:selected").val();
	var rids=$("#rid").val();//select2 获取多选值
	$.ajax({
		url:'user/upUserRple.action',
		dataType:'json',
		type:'post',
		traditional:true,
		data:{
			uid:uid,
			rid:rids
		},
		success:function(data){
			if(data){
				alert("保存成功！");
			}else{
				alert("保存失败！");
			}
			closeDlg();
			$('#test-table').bootstrapTable('refresh'); 
		}
	})
};

//批量删除
function delMany(){
	var idstr=[];
	//获取选中的行
	var a= $('#test-table').bootstrapTable('getSelections');  
	if(a.length>0){  
		if(confirm("您确定要删除选中的数据吗？")){
			$.each(a,function(index){
				idstr.push(a[index].userId);
			});
			$.ajax({
				url:'user/delUsers.action',
				dataType:'json',
				type:'post',
				traditional:true,
				data:{
					ids:idstr
				},
				success:function(data){
					if(data>0){
						alert("删除成功！");
					}else{
						alert("删除失败！");
					}
					$('#test-table').bootstrapTable('refresh'); 
				},
				error:function(){
					alert("请求失败！");
				}
			});
		}else{
			return false;
		}
	}else{
		alert("请至少选中一行数据");
	}
}
//修改前，打开模态框
function getValue(id){
	//var myId = $("#myId").val();
	$.ajax({
		url:'student/getStudentByIdcard.action',
		dataType:'json',
		type:'post',
		data:{
			stuIdcard:id,
		},
		success:function(data){
			$("#stuIdcard1").val(data.student.stuIdcard);
			$("#stuName1").val(data.student.stuName);
			$("#stuNum1").val(data.student.stuNum);
			$("#stuTel1").val(data.student.stuTel);
			
			$("#mydlg1").modal('show');
		},
		error:function(){
			alert('请求失败！');
		}
	});
}

function openFileDlg(id){
	$("#stuIdcard2").val(id);
	$("#mydlg2").modal('show');
}


function upStuFile(){
	var formData = new FormData();
	if($("#myform2").data("bootstrapValidator").validate().isValid()){
		formData.append("stuGrade", $("#stuGrade2")[0].files[0]);
		formData.append("stuIdcard", $("#stuIdcard2").val());
		$.ajax({
			url:'student/upStuFile.action',
			type:'post',
			cache: false,
			data:formData,
			processData: false,
		    contentType: false,
			success:function(data){
				if(data>0){
					alert("修改成功！");
				}else{
					alert("修改失败！");
				}
				closeDlg();
				$("#test-table").bootstrapTable('refresh');
			}
		});
	}else{
		alert("请按规则填写信息");
	}
}

//修改学生
function updateStudent(){
		var formData = new FormData();
		if($("#myform1").data("bootstrapValidator").validate().isValid()){
			formData.append("stuIdcard", $("#stuIdcard1").val());
			formData.append("stuName", $("#stuName1").val());
			formData.append("stuNum", $("#stuNum1").val());
			formData.append("stuTel", $("#stuTel1").val());
			$.ajax({
				url:'student/updateStudent.action',
				type:'post',
				cache: false,
				data:formData,
				processData: false,
			    contentType: false,
				success:function(data){
					if(data>0){
						alert("修改成功！");
					}else{
						alert("修改失败！");
					}
					closeDlg();
					$("#test-table").bootstrapTable('refresh');
				}
			});
		}else{
			alert("请按规则填写信息");
		}
}

//删除专业
function delStudent(id){
	if(confirm("您确定要删除这条数据吗?")){
		$.ajax({
			url:'student/delStudent.action',
			dataType:'json',
			type:'post',
			data:{uid:id},
			success:function(data){
				if(data>0){
					alert("删除成功！");
				}else{
					alert("删除失败！");
				}
				$("#test-table").bootstrapTable('refresh');
			},
			error:function(){
				alert("请求失败！");
			}
		});
	}
}
//添加，打开模态框
function openDlg(){
	//getDeptList();
	var qid = $("#myId").val();
	console.log(qid);
	$.ajax({
		url:'student/majList.action',
		dataType:'json',
		type:'post',
		data:{myId:qid},
		success:function(data){
			$("#pid").empty();
			$("#pid").append("<option value=''>请选择专业</option>");
			$.each(data,function(){
				$("#pid").append("<option value='"+this.majId+"'>"+this.majName+"</option>");
			});
		},
		error:function(){
			alert("请求失败！");
		}
	});
	$("#mydlg").modal('show');
}

//关闭模态框
function closeDlg(){
	$("#importDlg").modal('hide');
	$("#roleDlg").modal('hide');
	$("#mydlg1").modal('hide');
	$("#mydlg").modal('hide');
	$("#mydlg2").modal('hide');
	$("#mid").text(null);
	$("input[type=reset]").trigger("click");
	$('#importForm').data('bootstrapValidator', null);
	$('#myform').data('bootstrapValidator', null);
	$('#myform1').data('bootstrapValidator', null);
	$('#myform2').data('bootstrapValidator', null);
	formValidator();
};

//添加用户
function saveStudent(){
	var msg="名称可用";
	var formData = new FormData();
	//formData.append("myFile",$("#myFile").files[0]);
	//formData.append("myFile",document.getElementById("myFile").files[0]);
	
	if(msg=="名称可用"){
		if($("#myform").data('bootstrapValidator').validate().isValid()){
			formData.append("stuGrade", $("#stuGrade")[0].files[0]);
			formData.append("stuIdcard", $("#stuIdcard").val());
			formData.append("stuName", $("#stuName").val());
			formData.append("stuNum", $("#stuNum").val());
			formData.append("stuTel", $("#stuTel").val());
			formData.append("stuMaj", $("#pid").val());
			formData.append("stuGradu", $("#stuGradu").val());
			formData.append("stuUnit", $("#myId").val());
			formData.append("stuSex", $("#stuSex").val());
			$.ajax({
				url:'student/saveStudent.action',
				type:'post',
				cache: false,
				data:formData,
				processData: false,
			    contentType: false,
				success:function(data){
					if(data>0){
						alert("添加成功！");
					}else{
						alert("添加失败！");
					}
					$("#test-table").bootstrapTable('refresh');
					closeDlg();
				},
				error:function(){
					alert("请求失败");
				}
			});
		}else{
			alert("请填写合法信息");
		}
	}else{
		alert("请填写合法信息");
	}
}

//添加专业时验证登录账号是否唯一
function validAccount(){
	var x = $("#majName").val();
	var y = $("#myId").val();
	if(x!=""){
		$.ajax({
			url:'major/validAccount.action',
			dataType:'json',
			type:'post',
			data:{
				account:$("#majName").val(),
				userId:$("#myId").val()
			},
			success:function(data){
				$("#mid").text(data.msg);
			},
			error:function(){
				alert("请求失败");
			}
		});
	}else{
		return false;
	}
};



//查询所有部门
function getDeptList(){
	$.ajax({
		url:'dept/getDeptList.action',
		dataType:'json',
		type:'post',
		success:function(data){
			$("#sid").empty();
			$("#sid").append("<option value='0'>请选择</option>");
			$.each(data,function(){
				$("#sid").append("<option value='"+this.dept_id+"'>"+this.dept_name+"</option>");
			});
		},
		error:function(){
			alert("请求失败!");
		}
	});
}
//当修改密码后清空确认密码
function clearPass(){
	$("#againpass").val("");
	$('#myform').data('bootstrapValidator', null);
	formValidator();
}


$(document).ready(function(){
	formValidator();
});
function formValidator(){
	$("#myform").bootstrapValidator({
		fields:{
			stuIdcard:{
				validators:{
					notEmpty:{
						message:"身份证号不能为空"
					},
				}
			},
			stuName:{
				validators:{
					notEmpty:{
						message:"姓名不能为空"
					},
					stringLength:{
						max:40,
						message:"字符长度不能超过40"
					}
				}
			},
			stuNum:{
				validators:{
					notEmpty:{
						message:'学号不能为空'
					},
					stringLength:{
						max:40,
						message:'字符长度不能超过40个字符'
					}
				}
			},
			stuTel:{
				validators:{
					notEmpty:{
						message:'电话不能为空'
					},
					stringLength:{
						max:40,
						message:'字符长度不能超过40个字符'
					}
				}
			},
			stuGrade: {
				validators: {
			         notEmpty: {
			        	 message: '上传文件不能为空'
			         },
			         file: {
			        	 extension: 'pdf',
			        	 type: 'application/pdf',
			        	 message: '请重新选择文件'
			         }
				}
			},
			stuGradu:{
				validators:{
					notEmpty:{
						message:'毕业时间不能为空'
					},
					stringLength:{
						max:40,
						message:'字符长度不能超过40个字符'
					}
				}
			},	
		}
	});
	

	$("#myform1").bootstrapValidator({
		fields:{
			stuIdcard:{
				validators:{
					notEmpty:{
						message:"身份证号不能为空"
					},
				}
			},
			stuName:{
				validators:{
					notEmpty:{
						message:"姓名不能为空"
					},
					stringLength:{
						max:40,
						message:"字符长度不能超过40"
					}
				}
			},
			stuNum:{
				validators:{
					notEmpty:{
						message:'学号不能为空'
					},
					stringLength:{
						max:40,
						message:'字符长度不能超过40个字符'
					}
				}
			},
			stuTel:{
				validators:{
					notEmpty:{
						message:'电话不能为空'
					},
					stringLength:{
						max:40,
						message:'字符长度不能超过40个字符'
					}
				}
			},
			
		}
	});
	
	
	$("#myform2").bootstrapValidator({
		fields:{
			stuGrade: {
				validators: {
			         notEmpty: {
			        	 message: '上传文件不能为空'
			         },
			         file: {
			        	 extension: 'pdf',
			        	 type: 'application/pdf',
			        	 message: '请重新选择文件'
			         }
				}
			}	
		}
	});

	
	$("#importForm").bootstrapValidator({
		fields:{
			files:{
				validators:{
					notEmpty:{
						message:"导入文件不能为空"
					},
				}
			},
		}
	});
	
}
