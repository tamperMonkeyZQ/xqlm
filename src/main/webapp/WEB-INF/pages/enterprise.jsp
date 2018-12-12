<%--
  Created by IntelliJ IDEA.
  User: zhangqi
  Date: 2018.12.11
  Time: 20:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
    <title>Title</title>
    <link rel="favicon" href="${pageContext.request.contextPath }/assets/images/favicon.png">
    <link rel="stylesheet" href="${pageContext.request.contextPath }/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath }/assets/css/bootstrap-theme.css" media="screen">
    <link href="${pageContext.request.contextPath }/assets/css/bootstrap-table.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/assets/font-awesome/css/font-awesome.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <link rel="stylesheet" href="${pageContext.request.contextPath }/recruit/css/bt3.css" />
    <link rel="stylesheet" href="${pageContext.request.contextPath }/recruit/css/app.css" />
    <meta content="user-scalable=no,width=device-width, initial-scale=1" name="viewport">
    <link rel="stylesheet" href="${pageContext.request.contextPath }/recruit/css/page-fast-news-60c1b0fb04288316f8b14bbbcc409bff.css" />
    <link rel="stylesheet" href="${pageContext.request.contextPath }/recruit/css/application-febb10a4ab803df13138ef8cf968c276.css" />
    <link rel="stylesheet" href="${pageContext.request.contextPath }/recruit/css/styleList.css" />
    <script src="http://libs.baidu.com/jquery/1.11.3/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath }/assets/js/bootstrap.min.js"></script>
    <script src="${pageContext.request.contextPath }/assets/js/bootstrap-table/bootstrap-table.js"></script>
    <script src="${pageContext.request.contextPath }/assets/js/bootstrap-table/bootstrap-table-zh-CN.js"></script>
    <script src="${pageContext.request.contextPath }/assets/js/enterprise.js"></script>
</head>
<body style="background-color: #fff;" class=" pace-done">
<jsp:include page="Header.jsp"></jsp:include>
<div class="container paperCut" style="margin-top: 42px;">
    <div class="row">
        <%--<div class="col-md-3">--%>
        <%--<div class="box"  >--%>
        <%--<h3 class="clearfix" style="text-align: center;background-color: #f5f5f5;">--%>
        <%--<span style="color: #008DF2;">共找到115个人才</span>--%>
        <%--</h3>--%>
        <%--</div>--%>
        <%--<div class="box" style="margin-top: 25px;" >--%>
        <%--<h3>人才类型</h3>--%>
        <%--<div class="content" style="margin-top: 20px;padding: 10px;">--%>
        <%--<span class="biaoq"><img src="${pageContext.request.contextPath }/recruit/img/u46.png" />前端</span>--%>
        <%--<span class="biaoq"><img src="${pageContext.request.contextPath }/recruit/img/u48.png" />IOS</span>--%>
        <%--<span class="biaoq"><img src="${pageContext.request.contextPath }/recruit/img/u50.png" />安卓</span>--%>
        <%--<span class="biaoq"><img src="${pageContext.request.contextPath }/recruit/img/u58.png" />后台</span>--%>
        <%--<span class="biaoq"><img src="${pageContext.request.contextPath }/recruit/img/u54.png" />产品</span>--%>
        <%--<span class="biaoq"><img src="${pageContext.request.contextPath }/recruit/img/u52.png" />设计</span>--%>
        <%--<span class="biaoq"><img src="${pageContext.request.contextPath }/recruit/img/u56.png" />运营</span>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div class="box">--%>
        <%--<h3 class="clearfix">技能标签<span style="float: right;">更多</span></h3>--%>
        <%--<div class="content paper-link">--%>
        <%--<a href="">PHP</a>--%>
        <%--<a href="">Java</a>--%>
        <%--<a href="">python</a>--%>
        <%--<a href="">css</a>--%>
        <%--<a href="">Javascript</a>--%>
        <%--<a href="">.NET</a>--%>
        <%--<a href="">node.js</a>--%>
        <%--<a href="">ios</a>--%>
        <%--<a href="">android</a>--%>
        <%--<a href="">C++</a>--%>
        <%--<a href="">C</a>--%>
        <%--<a href="">mysql</a>--%>
        <%--<a href="">C#</a>--%>
        <%--<a href="">HTML5</a>--%>
        <%--<a href="">Linux</a>--%>
        <%--<a href="">Jquery</a>--%>
        <%--</div>--%>
        <%--</div>--%>

        <%--</div>--%>
        <div class="col-md-12">
            <div class="box" style="width: 100%;border: 0px;height: 50px;">
                <div style="width: 80%;float: left;height: 33px;"><input id="search_value" style=" width:100%;border: 2px #008DF2  solid;padding: 10px;" placeholder=" 搜索你感兴趣的企业"></div>
                <button id="search_button" style="width: 20%;background-color:#008DF2 ;float: left;height:43px;text-align:center;"><span  style="width:100%;line-height:43px;color: #fff;font-size: 18px;">搜索</span></button>
            </div>
            <table id="test-table" class="table table-hover table-striped table-condensed table-bordered"></table>
        </div>
    </div>
</div>
</body>
<script>
    $("#search_button").click(function(){
        var searchVO = $("#search_value").val();
        $("#test-table").bootstrapTable('destroy');
        $('#test-table').bootstrapTable({
            method : 'GET',
            url: encodeURI("/xqlm/upStage/userSearch.action?role=1&searchVO="+searchVO),
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
</script>

