/**
 * 订单
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
		method : 'GET', //默认是post,不允许对静态文件访问
		url: "qiye/qiyePeiyang.action",
		cache : false,
		striped : true,// 隔行加亮
		pagination : true, //开启分页功能    在表格底部显示分页工具栏
		pageSize : 999, //默认每页条数
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
		columns : [ {
			checkbox:false
		}   ,{
			field : "orderId",
			title : "订单编号",
			class : 'col-md-1',
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "orderBrief",
			title : "订单简介",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "orderFile",
			title : "培养文件",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "orderGiveUser.userUnit",
			title : "发布者",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "orderTakeUser.userUnit",
			title : "接受者",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
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
});

function operateFormatter(value, row, index) {
    return [
        '<button type="button" class=" btn btn-info" onclick="xiazai(\''+row.orderId+'\')">下载</button>',
        '&nbsp;&nbsp;&nbsp;<button type="button" class=" btn btn-info" onclick="tongguo(\''+row.orderId+'\')">通过</button>',
        '&nbsp;&nbsp;&nbsp;<button type="button" class=" btn btn-info" onclick="jieshou(\''+row.orderId+'\')">接受</button>',
        '&nbsp;&nbsp;&nbsp;<button type="button" class=" btn btn-info" onclick="xiugai(\''+row.orderId+'\')">修改</button>',
        '&nbsp;&nbsp;&nbsp;<button class=" btn btn-danger" type="button" onclick="shanchu(\''+row.orderId+'\')">删除</button>'
        ].join('');
}
function xiazai(id){
	//var path = getContextPath();
	//window.open("http://www.baidu.com");
	//alert(id);
	window.open("/xqlm/qiye/download.action?id="+id);
}
function tongguo(id){
	$.ajax({
		url:'qiye/tongguo.action',
		dataType:'json',
		type:'post',
		traditional:true,
		data:{
			id:id
		},
		success:function(data){
			if(data==0){
				alert("通过成功");
			}
			else if(data==1){
				alert("暂时无人接受，通过失败");
			}
			else if(data==2){
				alert("只能通过自己发布的需求，通过失败");
			}
			else{
				alert("你已经通过了改需求，不能重复通过");
			}
		}
	})
}
function jieshou(id){
	$.ajax({
		url:'qiye/jieshou.action',
		dataType:'json',
		type:'post',
		traditional:true,
		data:{
			id:id
		},
		success:function(data){
			if(data==0){
				alert("接受成功");
				$("#test-table").bootstrapTable('refresh');
			}
			else if(data==1){
				alert("只能接受学校的需求哦，接受失败");
			}
			else{
				alert("该需求已被他人接受，接受失败");
			}
		}
	})
}
function xiugai(id){
	$.ajax({
		url:'qiye/xiugai.action',
		dataType:'json',
		type:'post',
		traditional:true,
		data:{
			id:id
		},
		success:function(data){
			if(data==0){
				$("#mydlg1").modal('show');
				$("#order_id").val(id);
			}
			else if(data==1){
				alert("不是你发布的需求，不能修改");
			}
			else if(data==2){
				alert("需求暂未被接受，不能修改");
			}
			else{
				alert("需求已经修改过一次，不能修改");
			}
		}
	})
}
function shanchu(id){
	if(confirm("确定删除吗?")){
		$.ajax({
			url:'qiye/shanchu.action',
			dataType:'json',
			type:'post',
			traditional:true,
			data:{
				id:id
			},
			success:function(data){
				if(data==0){
					alert("删除成功");
					$("#test-table").bootstrapTable('refresh');
				}
				else{
					alert("不能删除别人的需求");
				}
			}
		})
	}
}
//保存修改角色
function xiugaiPeiyang(){
	var file1=$("#file1").val();
	if(file1==""){
		alert("培养文件不能为空");
		return;
	}
	var dataForm=new FormData(document.getElementById("form2"));
	$.ajax({
		url:'qiye/xiugaiPeiyang.action',
		type:'post',
		async: false,
		cache: false,
		contentType: false,
		processData: false,
		data:dataForm,
		success:function(data){
			if(data>0){
				alert("修改成功！");
			}else{
				alert("修改失败！");
			}
			$("#test-table").bootstrapTable('refresh');
			closeDlg();
		},
		error:function(){
			alert("请求失败");
		}
	});
};


//添加，打开模态框
function openDlg(){
	//getDeptList();
	$("#mydlg").modal('show');
};

//关闭模态框
function closeDlg(){
	$("#mydlg1").modal('hide');
	$("#mydlg").modal('hide');
	$("input[type=reset]").trigger("click");
	$('#importForm').data('bootstrapValidator', null);
	$('#myform').data('bootstrapValidator', null);
	$('#myform1').data('bootstrapValidator', null);
	formValidator();
};

//发布需求
function addQiyePeiyang(){
	var brief=$("#brief").val();
	var file=$("#file").val();
	if(brief==""){
		alert("培养简介不能为空");
		return;
	}
	if(file==""){
		alert("培养文件不能为空");
		return;
	}
	var dataForm=new FormData(document.getElementById("form1"));
	$.ajax({
		url:'qiye/addPeiyang.action',
		type:'post',
		async: false,
		cache: false,
		contentType: false,
		processData: false,
		data:dataForm,
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
}



