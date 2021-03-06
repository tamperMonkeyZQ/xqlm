/**
 * 用户
 */
$(function (){
	//getDeptLists();  
	getValue();
	//select2 多选
    $("#rid").select2({
    	//minimumInputLength: 1, 
        language: "zh-CN", //设置 提示语言
        maximumSelectionLength: 3,  //设置最多可以选择多少项
         //width: "100%", //设置下拉框的宽度
         placeholder: "请选择",
         tags: true,
    });
    
    
	
});





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
function getValue(){
	var id = $("#myId").val();
	$.ajax({
		url:'user/getUserById.action',
		dataType:'json',
		type:'post',
		data:{
			uid:id
		},
		success:function(data){
			$("#userId").val(data.user.userId);
			$("#userUnit").val(data.user.userUnit);
			$("#userTel").val(data.user.userTel);
			$("#userEmail").val(data.user.userEmail);
			$("#userWeb").val(data.user.userWeb);
			$("#userSmry").val(data.user.userSmry);
			
			//$("#mydlg1").modal('show');
		},
		error:function(){
			alert('请求失败！');
		}
	});
}
//修改用户
function upUser(){
		if($("#myform").data("bootstrapValidator").validate().isValid()){
			$.ajax({
				url:'user/upUser.action',
				dataType:'json',
				type:'post',
				data:$("#myform").serialize(),
				success:function(data){
					if(data>0){
						alert("修改成功！");
					}else{
						alert("修改失败！");
					}
					//closeDlg();
					//$("#test-table").bootstrapTable('refresh');
					//location.href="info/goFixinfo.action";
				}
			});
		}else{
			alert("请按规则填写信息");
		}
}

//删除员工
function delUser(id){
	if(confirm("您确定要删除这条数据吗?")){
		$.ajax({
			url:'user/delUser.action',
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
	$("#mid").text(null);
	$("input[type=reset]").trigger("click");
	$('#importForm').data('bootstrapValidator', null);
	$('#myform').data('bootstrapValidator', null);
	$('#myform1').data('bootstrapValidator', null);
	formValidator();
};

//添加用户
function saveUser(){
	var msg=$("#mid").text();
	if(msg=="此账号可用"){
		if($("#myform").data('bootstrapValidator').validate().isValid()){
			$.ajax({
				url:'user/saveUser.action',
				type:'post',
				dataType:'json',
				data:$("#myform").serialize(),
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

//添加用户时验证登录账号是否唯一
function validAccount(){
	var x=$("#userId").val();
	if(x!=""){
		$.ajax({
			url:'user/validAccount.action',
			dataType:'json',
			type:'post',
			data:{
				account:$("#userId").val()
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
			userId:{
				validators:{
					notEmpty:{
						message:"登陆账号不能为空"
					},
					stringLength:{
						max:20,
						message:"字符长度不能超过20个字符"
					}
				}
			},
			userUnit:{
				validators:{
					notEmpty:{
						message:'企业名称不能为空'
					},
					stringLength:{
						max:40,
						message:'字符长度不能超过40个字符'
					}
				}
			},
			userPwd:{
				validators:{
					notEmpty:{
						message:'密码不能为空'
					},
					stringLength:{
						min:6,
						max:18,
						message:'字符长度要在6~18之间'
					}
				}
			},
			againpass:{
				validators:{
					notEmpty:{
						message:'密码不能为空'
					},
					identical:{
						field:'userPwd',
						message:'两次输入密码不一致'
					}
				}
			},
			userWeb:{
				validators:{
					stringLength:{
						max:80,
						message:'字符长度不能超过80个字符'
					}
				}
				
			},
			userTel:{
				validators:{
					notEmpty:{
						message:'电话不能为空'
					},
					digits:{
						message: '该值只能包含数字'
					},
					stringLength:{
						min:8,
						max:11,
						message:'长度在8~11之间'
					}
				}
			},
			userEmail:{
				validators:{
					notEmpty:{
						message:"Email不能为空"
					},
					emailAddress: {
						 message: 'Email格式不符合法'
					}
				}
			},
			userSmry:{
				validators:{
					stringLength:{
						max:250,
						message:"字符长度不能超过250"
					}
				}
			}
		}
	});
	

	$("#myform1").bootstrapValidator({
		fields:{
			userId:{
				validators:{
					notEmpty:{
						message:"登陆账号不能为空"
					},
					stringLength:{
						max:20,
						message:"字符长度不能超过20个字符"
					}
				}
			},
			userUnit:{
				validators:{
					notEmpty:{
						message:'企业名称不能为空'
					},
					stringLength:{
						max:40,
						message:'字符长度不能超过40个字符'
					}
				}
			},
			userWeb:{
				validators:{
					stringLength:{
						max:80,
						message:'字符长度不能超过80个字符'
					}
				}
				
			},
			userTel:{
				validators:{
					notEmpty:{
						message:'电话不能为空'
					},
					digits:{
						message: '该值只能包含数字'
					},
					stringLength:{
						min:8,
						max:11,
						message:'长度在8~11之间'
					}
				}
			},
			userEmail:{
				validators:{
					notEmpty:{
						message:"Email不能为空"
					},
					emailAddress: {
						 message: 'Email格式不符合法'
					}
				}
			},
			userSmry:{
				validators:{
					stringLength:{
						max:250,
						message:"字符长度不能超过250"
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
