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
		url: "qiye/qiyeYingpin.action",
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
			field : "re",
			title : "招聘企业",
			class : 'col-md-1',
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "emStu",
			title : "应聘学生",
			align : "center",
			valign : "middle",
			sortable : "true"
		}, {
			field : "status",
			title : "雇佣状态",
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
        '<button class=" btn btn-danger" type="button" onclick="jujue(\''+row.emId+'\')">拒绝</button>&nbsp;&nbsp;&nbsp;'+
        '<button class=" btn btn-danger" type="button" onclick="yaoqing(\''+row.emId+'\')">邀请</button>&nbsp;&nbsp;&nbsp;'+
        '<button class=" btn btn-danger" type="button" onclick="qianyue(\''+row.emId+'\')">签约</button>&nbsp;&nbsp;&nbsp;'
        ].join('');
}

function jujue(id){
	$.ajax({
		url:'qiye/jujue.action',
		dataType:'json',
		type:'post',
		traditional:true,
		data:{
			id:id
		},
		success:function(data){
			if(data==0){
				alert("拒绝成功");
				$("#test-table").bootstrapTable('refresh');
			}
			else{
				
			}
		}
	})
}
function yaoqing(id){
	$.ajax({
		url:'qiye/yaoqing.action',
		dataType:'json',
		type:'post',
		traditional:true,
		data:{
			id:id
		},
		success:function(data){
			if(data==0){
				alert("邀请成功");
				$("#test-table").bootstrapTable('refresh');
			}
			else{
				
			}
		}
	})
}
function qianyue(id){
	$.ajax({
		url:'qiye/qianyue.action',
		dataType:'json',
		type:'post',
		traditional:true,
		data:{
			id:id
		},
		success:function(data){
			if(data==0){
				alert("签约成功");
				$("#test-table").bootstrapTable('refresh');
			}
			else{
				
			}
		}
	})
}

