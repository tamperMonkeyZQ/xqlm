/**
 * 专业
 */
$(function (){
    $("#test-table").bootstrapTable('destroy');
    $('#test-table').bootstrapTable({
        method : 'GET',
        url: "/univercity/load",
        cache : false,
        striped : true,
        pagination : true, //在表格底部显示分页工具栏
        pageSize : 10, //默认每页条数
        pageNumber : 1, //默认分页
        pageList : [ 10, 20, 50, 100, 200, 500 ],//分页数
        showColumns : false, //显示隐藏列
        showRefresh : false, //显示刷新按钮
        showExport : false,
        singleselect : true,
        clickToSelect: true, // 单击行即可以选中
        search : false,//显示搜素表单
        silent : true, //刷新事件必须设置
        sidePagination : "server", //表示服务端请求
        columns : [
            {
                field : "colCode",
                title : "学校代码",
                class : 'col-md-1',
                align : "center",
                valign : "middle",
                sortable : "true"
            },
            {
                field : "colName",
                title : "学校名称",
                class : 'col-md-1',
                align : "center",
                valign : "middle",
                sortable : "true"
            },
            {
                field : "colName",
                title : "政策文件",
                class : 'col-md-1',
                align : "center",
                valign : "middle",
                sortable : "true",
                formatter:pdfFormatter,
            },
            {
                field : "colName",
                title : "经验交流",
                class : 'col-md-1',
                align : "center",
                valign : "middle",
                sortable : "true",
                formatter:expFormatter,
            }],
        queryParamsType: "undefined",
        queryParams: function queryParams(params) {   //设置查询参数
            //var x = $("#myId").val();
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                //myId: x,
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
function urlAlert() {
    alert('材料正在建设中');
}
function operateFormatter(value, row, index) {
    return [
        '<button type="button" class=" btn btn-info" onclick="getValue('+row.stuIdcard+')">修改</button>',
        '&nbsp;&nbsp;&nbsp;<button class=" btn btn-primary" type="button" onclick="openFileDlg('+row.stuIdcard+')">成绩</button>',
        '&nbsp;&nbsp;&nbsp;<button class=" btn btn-danger" type="button" onclick="delStudent('+row.stuIdcard+')">删除</button>'

    ].join('');
}
function pdfFormatter(value, row, index){
    if(row.polUrl == ''){
        return [
            '<span onclick="urlAlert()" class="fa fa-book"></span>'
        ].join('');
    }
    else{return [
        '<a href="assets/pdf/web/viewer.html?file=/pdf/' + row.polUrl+ '.pdf" ',
        'style="color: #000000" target="_blank"><span class="fa fa-book"></span></a>'
    ].join('');}

}
function majorFormatter(value, row, index){
    return [
        '<a href="/major" ',
        'style="color: #000000" target="_blank"><span class="fa fa-book"></span></a>'
    ].join('');
}
function expFormatter(value, row, index){
    if(row.expUrl ==''){
        return [
            '<span onclick="urlAlert()" class="fa fa-comment-o"></span>'
        ].join('');
    }else{ return [
        '<a href="assets/pdf/web/viewer.html?file=/pdf/'+ row.expUrl + '.pdf" ',
        'style="color: #000000" target="_blank"><span class="fa fa-comment-o"></span></a>'
    ].join('');}

}
function bFormatter(value, row, index) {
    if(row.stuSex=='0'){
        return ['男'].join('');
    }else{
        return ['女'].join('');
    }
}
// //条件查询
// function getStudentByCon(){
//
//     $("#test-table").bootstrapTable('destroy');
//     $('#test-table').bootstrapTable({
//         method : 'post', //默认是post,不允许对静态文件访问
//         url: "student/getStudentByCon.action",
//         contentType:"application/x-www-form-urlencoded",
//         cache : false,
//         striped : true,// 隔行加亮
//         pagination : true, //开启分页功能    在表格底部显示分页工具栏
//         pageSize : 10, //默认每页条数
//         pageNumber : 1, //默认分页
//         pageList : [ 10, 20, 50, 100, 200, 500 ],//分页数
//         showColumns : false, //显示隐藏列
//         showRefresh : false, //显示刷新按钮
//         toolbar:"#toolbar",
//         singleselect : true,
//         minimumCountColumns: 2,// 设置最少显示列个数
//         clickToSelect: true, // 单击行即可以选中
//         search : false,//显示搜素表单
//         silent : true, //刷新事件必须设置
//         sidePagination : "server", //表示服务端请求
//         columns : [
//             {
//                 field : "stuIdcard",
//                 title : "身份证号",
//                 class : 'col-md-1',
//                 align : "center",
//                 valign : "middle",
//                 sortable : "true"
//             }, {
//                 field : "stuNum",
//                 title : "学号",
//                 align : "center",
//                 valign : "middle",
//                 sortable : "true",
//                 //visible : "false"
//             },{
//                 field : "stuName",
//                 title : "姓名",
//                 align : "center",
//                 valign : "middle",
//                 sortable : "true",
//                 //visible : "false"
//             },{
//                 field : "stuSex",
//                 title : "性别",
//                 align : "center",
//                 valign : "middle",
//                 sortable : "true",
//                 formatter: bFormatter,
//             }, {
//                 field : "stuTel",
//                 title : "电话",
//                 align : "center",
//                 valign : "middle",
//                 sortable : "true"
//             },{
//                 field : "major.majName",
//                 title : "专业名称",
//                 align : "center",
//                 valign : "middle",
//                 sortable : "true",
//                 //formatter: aFormatter,
//             },{
//                 field : "stuGrade",
//                 title : "成绩",
//                 align : "center",
//                 valign : "middle",
//                 sortable : "true",
//                 formatter: aFormatter,
//             },{
//                 field : "stuGradu",
//                 title : "毕业时间",
//                 align : "center",
//                 valign : "middle",
//                 sortable : "true",
//                 //visible : "false"
//             },{
//                 field : "stuUpdate",
//                 title : "更新时间",
//                 align : "center",
//                 valign : "middle",
//                 sortable : "true",
//                 //visible : "false"
//             },{
//                 field: 'operate',
//                 title: '操作',
//                 class : 'col-md-2',
//                 align: 'center',
//                 valign: 'middle',
//                 formatter: operateFormatter,
//             }],
//         queryParamsType: "undefined",
//         queryParams: function queryParams(params) { //设置查询参数
//             var x = $("#myId").val();
//             var param = {
//                 pageNumber: params.pageNumber,
//                 pageSize: params.pageSize,
//                 stuNameSearch:$("#stuNameSearch").val(),
//                 stuNumSearch: $("#stuNumSearch").val(),
//                 myMaj: $("#myMaj").val(),
//                 myId:x,
//                 // searchText: params.searchText
//             };
//
//             return param;
//         },
//         formatLoadingMessage : function() {
//             return "请稍等，正在加载中...";
//         },
//
//         formatNoMatches : function() {
//             return '无符合条件的记录';
//         }
//     });
// }
// $(document).ready(function(){
//     formValidator();
// });
