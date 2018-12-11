/**
 * 专业
 */
$(function (){

    $("#test-table").bootstrapTable('destroy');
    $('#test-table').bootstrapTable({
        method : 'GET',
        url: "/xqlm/upStage/recruitLoad.action",
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
                formatter:itemsFormatter
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
    $("thead").remove();
});
function urlAlert() {
    alert('材料正在建设中');
}
function itemsFormatter(value, row, index){
    return [
        '<div class="content">\n' +
        '<dl class="clearfix">\n' +
        '<dt class="clearfix pull-left">\n' +
        '<p class="paper-image">\n' +
        '<a class="J_view paper-title" href="detail.html">\n' +
        '<span class="txb">'+row.reLocal+'</span><span><img src="/xqlm/recruit/img/u54.png">'+row.reDuty+'</span>\n' +
        '</a>\n' +
        '</p>\n' +
        '</dt>\n' +
        '<dd class="pull-right">\n' +
        '<span style="float: right;margin-right: 10px;">'+row.reUnit+'</span>\n' +
        '</dd>'+
        '<div clas="bottom clearfix" style="margin-top: 60px;padding: 10px;">\n' +
        '<p class="pull-left paper-desc">\n' +
        ''+row.reBrief+'\n' +
        '</p>\n' +
        '</div>\n' +
        '  <div style="padding: 10px;margin-top: 40px;">\n' +
        '  <span>学历要求：</span><span class="jns">'+row.reDegree+'</span>\n' +
        '  </div>\n' +
        '  <div style="padding: 10px;margin-top: -10px;">\n' +
        '  <span>年龄要求：</span><span class="jns">'+row.reAgebtm+'-'+row.reAgetop+'</span>\n' +
        '  </div>\n' +
        '</dl>\n' +
        '</div>'
    ].join('');
}

