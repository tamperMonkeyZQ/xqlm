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
		url: "qiye/qiyeZhaopin.action",
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
			field : "reDuty",
			title : "招聘职务",
			class : 'col-md-1',
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "reBrief",
			title : "简介",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "sex",
			title : "性别",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "reAgebtm",
			title : "年龄下限",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "reAgetop",
			title : "年龄上限",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "reDegree",
			title : "学历",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "reLocal",
			title : "工作地点",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "reUnit",
			title : "招聘单位",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "reTime",
			title : "发布时间",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "reStatus",
			title : "招聘状态",
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
        '<button class=" btn btn-danger" type="button" onclick="shanchu(\''+row.reId+'\')">删除</button>'
        ].join('');
}

function shanchu(id){
	if(confirm("确定删除吗?")){
		$.ajax({
			url:'qiye/zhaopinShanchu.action',
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

//添加，打开模态框
function openDlg(){
	//getDeptList();
	$("#mydlg").modal('show');
};

//关闭模态框
function closeDlg(){
	$("#mydlg").modal('hide');
	$("input[type=reset]").trigger("click");
	$('#importForm').data('bootstrapValidator', null);
	$('#myform').data('bootstrapValidator', null);
	formValidator();
};

//发布需求
function addQiyeZhaopin(){
	var zhiwu=$("#zhiwu").val();
	var brief=$("#brief").val();
	var xingbie=$("#xingbie").val();
	var xiaxian=$("#xiaxian").val();
	var shangxian=$("#shangxian").val();
	var xueli=$("#xueli").val();
	var didian=$("#didian").val();
	if(zhiwu==""){
		alert("职务不能为空");
		return;
	}
	if(brief==""){
		alert("培养简介不能为空");
		return;
	}
	if(xingbie==""){
		alert("性别不能为空");
		return;
	}
	if(xiaxian==""){
		alert("年龄下限不能为空");
		return;
	}
	if(shangxian==""){
		alert("年龄上限不能为空");
		return;
	}
	if(xueli==""){
		alert("学历不能为空");
		return;
	}
	if(didian==""){
		alert("地点不能为空");
		return;
	}
	var dataForm=new FormData(document.getElementById("form1"));
	$.ajax({
		url:'qiye/addZhaopin.action',
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



