/**
 * 专业
 */
$(function (){
	//getDeptLists();  
	
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
		url: "major/majorList.action",
		cache : false,
		striped : true,
		pagination : true, //在表格底部显示分页工具栏
		pageSize : 5, //默认每页条数
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
			field : "majName",
			title : "专业名称",
			class : 'col-md-1',
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "majId",
			title : "专业编号",
			align : "center",
			valign : "middle",
			sortable : "true",
			//visible : "false"
 		},{
			field : "majYear",
			title : "培养年限",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "majSmry",
			title : "专业简介",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "majUnit",
			title : "隶属学校账号",
			align : "center",
			valign : "middle",
			sortable : "true",
			//visible : "false"
		},{
			field : "majFile",
			title : "培养方案",
			align : "center",
			valign : "middle",
			sortable : "true",
			 formatter: aFormatter,
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
        '<button type="button" class=" btn btn-info" onclick="getValue('+row.majId+')">修改</button>',
        '&nbsp;&nbsp;&nbsp;<button class=" btn btn-primary" type="button" onclick="openFileDlg('+row.majId+')">方案</button>',
        '&nbsp;&nbsp;&nbsp;<button class=" btn btn-danger" type="button" onclick="delMajor('+row.majId+')">删除</button>'
        
        ].join('');
}

function aFormatter(value, row, index) {
	var path = getContextPath();
    return [
            '<a href="' + path + '/major/download.action?filename=' + row.majFile + '">下载</a>'
        ].join('');
}
//条件查询
	function getMajorByCon(){
		 
		$("#test-table").bootstrapTable('destroy');
		$('#test-table').bootstrapTable({
			method : 'post', //默认是post,不允许对静态文件访问
			url: "major/getMajorByCon.action",
			contentType:"application/x-www-form-urlencoded",
			cache : false,
			striped : true,// 隔行加亮
			pagination : true, //开启分页功能    在表格底部显示分页工具栏
			pageSize : 5, //默认每页条数
			pageNumber : 1, //默认分页
			pageList : [ 10, 20, 50, 100, 200, 500 ],//分页数
			showColumns : true, //显示隐藏列
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
				field : "majName",
				title : "专业名称",
				class : 'col-md-1',
				align : "center",
				valign : "middle",
				sortable : "true"
			}, {
				field : "majId",
				title : "专业编号",
				align : "center",
				valign : "middle",
				sortable : "true",
				//visible : "false"
	 		},{
				field : "majYear",
				title : "培养年限",
				align : "center",
				valign : "middle",
				sortable : "true"
			}, {
				field : "majSmry",
				title : "专业简介",
				align : "center",
				valign : "middle",
				sortable : "true"
			}, {
				field : "majUnit",
				title : "隶属学校账号",
				align : "center",
				valign : "middle",
				sortable : "true",
				//visible : "false"
			},{
				field : "majFile",
				title : "培养方案",
				align : "center",
				valign : "middle",
				sortable : "true",
				 formatter: aFormatter,
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
	            var param = {
	                pageNumber: params.pageNumber,
	                pageSize: params.pageSize,
	                majorSearch:$("#majorSearch").val(),
	                majUnit: $("#myId").val(),
	                //deptId:$("#deptId").val()
	                // searchText: params.searchText
	            };
	            console.log($("#majorSearch").val());
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


//查询所有部门 追加到 条件查询中
function getDeptLists(){
	$.ajax({
		url:'dept/getDeptList.action',
		dataType:'json',
		type:'post',
		success:function(data){
			$("#deptId").empty();
			$("#deptId").append("<option value='0'>请选择所属部门</option>");
			$.each(data,function(){
				$("#deptId").append("<option value='"+this.dept_id+"'>"+this.dept_name+"</option>");
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
	if($("#importForm").data('bootstrapValidator').validate().isValid()){
		$.ajax({
			url:'user/import.action',
			dataType:'json',
			type:'post',
			data:new FormData($("#importForm")[0]),
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
		url:'major/getMajorById.action',
		dataType:'json',
		type:'post',
		data:{
			majId:id,
		},
		success:function(data){
			$("#majName1").val(data.major.majName);
			$("#majYear1").val(data.major.majYear);
			$("#majSmry1").val(data.major.majSmry);
			$("#majId1").val(data.major.majId);
			
			$("#mydlg1").modal('show');
		},
		error:function(){
			alert('请求失败！');
		}
	});
}

function openFileDlg(id){
	$("#majId2").val(id);
	$("#mydlg2").modal('show');
}

function upMajFile(){
	var formData = new FormData();
	if($("#myform2").data("bootstrapValidator").validate().isValid()){
		formData.append("myFile", $("#myFile2")[0].files[0]);
		formData.append("majId", $("#majId2").val());
		$.ajax({
			url:'major/upMajorFile.action',
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

//修改用户
function upMajor(){
		var formData = new FormData();
		if($("#myform1").data("bootstrapValidator").validate().isValid()){
			//var fileName = $("#myFile1").val(); 
			//console.log(fileName);
			/*if(fileName == ""){
				//console.log("nono");
				//formData.append("myFile", null);
				formData.append("myFile", undefined);
			}else{
				formData.append("myFile", $("#myFile1")[0].files[0]);
			}*/
			//formData.append("myFile", $("#myFile1")[0].files[0]);
			formData.append("majName", $("#majName1").val());
			formData.append("majYear", $("#majYear1").val());
			formData.append("majSmry", $("#majSmry1").val());
			formData.append("majUnit", $("#myId").val());
			formData.append("majId", $("#majId1").val());
			$.ajax({
				url:'major/upMajor.action',
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
function delMajor(id){
	if(confirm("您确定要删除这条数据吗?")){
		$.ajax({
			url:'major/delMajor.action',
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
	$("#mydlg").modal('show');
};

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
function saveMajor(){
	var msg=$("#mid").text();
	var formData = new FormData();
	//formData.append("myFile",$("#myFile").files[0]);
	//formData.append("myFile",document.getElementById("myFile").files[0]);
	
	if(msg=="专业名称可用"){
		if($("#myform").data('bootstrapValidator').validate().isValid()){
			formData.append("myFile", $("#myFile")[0].files[0]);
			formData.append("majName", $("#majName").val());
			formData.append("majYear", $("#majYear").val());
			formData.append("majSmry", $("#majSmry").val());
			formData.append("majUnit", $("#myId").val());
			$.ajax({
				url:'major/saveMajor.action',
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
			majName:{
				validators:{
					notEmpty:{
						message:"专业名称不能为空"
					},
					stringLength:{
						max:40,
						message:"字符长度不能超过40个字符"
					}
				}
			},
			majSmry:{
				validators:{
					stringLength:{
						max:250,
						message:"字符长度不能超过250"
					}
				}
			},
			majYear:{
				validators:{
					notEmpty:{
						message:'培养时间不能为空'
					},
					stringLength:{
						max:40,
						message:'字符长度不能超过40个字符'
					}
				}
			},
			myFile: {
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
	

	$("#myform1").bootstrapValidator({
		fields:{
			majName:{
				validators:{
					notEmpty:{
						message:"专业名称不能为空"
					},
					stringLength:{
						max:40,
						message:"字符长度不能超过40个字符"
					}
				}
			},
			majSmry:{
				validators:{
					stringLength:{
						max:250,
						message:"字符长度不能超过250"
					}
				}
			},
			majYear:{
				validators:{
					stringLength:{
						max:40,
						message:'字符长度不能超过40个字符'
					}
				}
			},
			myFile: {
				validators: {
			         file: {
			        	 extension: 'pdf',
			        	 type: 'application/pdf',
			        	 message: '请重新选择文件'
			         }
				}
			}	
		}
	});
	
	
	$("#myform2").bootstrapValidator({
		fields:{
			myFile: {
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
