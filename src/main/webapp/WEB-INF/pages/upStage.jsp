<%--
  Created by IntelliJ IDEA.
  User: zhangqi
  Date: 2018.12.11
  Time: 13:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html><head>
    <meta charset="utf-8" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="webThemez.com">
    <title>辽宁产教融合工作信息共享平台</title>
    <link rel="favicon" href="${pageContext.request.contextPath }/assets/images/favicon.png">
    <link rel="stylesheet" media="screen" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
    <link rel="stylesheet" href="${pageContext.request.contextPath }/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath }/assets/css/bootstrap-theme.css" media="screen">
    <link rel="stylesheet" href="${pageContext.request.contextPath }/assets/css/style.css">
    <link href="${pageContext.request.contextPath }/assets/css/animate.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/assets/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/assets/css/BannerStyle.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <script src="http://libs.baidu.com/jquery/1.11.3/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath }/assets/js/bootstrap.min.js"></script>
    <script>
        function formattimestamp (timestamp){
            var timestamp = new Date(timestamp);
            var year = 1900 + timestamp.getYear();
            var month = "0" + (timestamp.getMonth() + 1);
            var date = "0" + timestamp.getDate();
            return year + "-" + month.substring(month.length-2, month.length)  + "-" + date.substring(date.length-2, date.length);
        }

    </script>

    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }
        #slide p {
            height: 34px;
            line-height: 34px;
            overflow: hidden;
        }

        #slide span {
            float: right;
        }
        #slide_1 p {
            height: 34px;
            line-height: 34px;
            overflow: hidden;
        }

        #slide_A p {
            height: 34px;
            line-height: 34px;
            overflow: hidden;
        }

        #slide_1 span {
            float: right;
        }

        #slide_A span {
            float: right;
        }

        .rollTable td {
            height: 26px;
            font-size: 14px;
            vertical-align: baseline;
            color: #333;
        }
        .list styled custom-list ul li tr td {
            color: #333;
        }

        .widget {
            border-radius: 5px;
            padding: 15px 20px;
            margin-bottom: 10px;
            margin-top: 10px;
        }

        .navy-bg, .bg-primary {
            background-color: #5b93d0;
            color: #ffffff;
        }

        .ibox-content {
            background-color: #ffffff;
            color: inherit;
            padding: 15px 20px 20px 20px;
            border-color: #e7eaec;
            border-image: none;
            border-style: solid solid none;
            border-width: 1px 0;
        }
        .ibox-title {
            background-color: #5b93d0;
        }
        .ibox-title-h1 {
            color: #FFF;
            padding-left: 20px;
            padding-bottom: 10px;
        }

        h1, .h1, h2, .h2, h3, .h3 {
            margin-top: 30px;
        }
        .tablebox {
            height: 200px;
            overflow: hidden;
            position: relative;
            width: 100%;
            background-color: rgba(6, 26, 103, 0);
        }

        .tbl-header {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 999;
        }

        .tbl-body {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        .tablebox table {
            width: 100%;
        }
        .tablebox table th,
        .tablebox table td {
            font-size: 15px;
            color: #000000;
            line-height: 35px;
            text-align: center;
        }
        .tablebox table tr th {
            background-color: rgba(31, 31, 156, 0);
            cursor: pointer;
        }
        .tablebox table tr td {
            background-color: transparent;
        }
        .tbl-body tr:nth-child(even) td,.tbl-body1 tr:nth-child(even) td {
            background-color: rgba(0, 0, 0, 0.07);
        }
    </style>
    <style type="text/css">.fancybox-margin {
        margin-right: 0px;
    }
    </style>
</head>
<body>
<div class="" style="padding-top: 20px;border-bottom: 2px solid rgb(91,147,208)">
    <div class="container">
        <div class="navbar-header">
            <font size="5" style="font-family:'Microsoft YaHei';"><b>辽宁省软件校企联盟就业服务平台</b></font>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav pull-right mainNav">
                <li><a href="#">企业信息</a></li>
                <li><a href="#">院校信息</a></li>
                <li><a href="#">招聘信息</a></li>
                <li><a href="#">毕业生注册</a></li>
                <li><a href="#">管理员登录</a></li>
            </ul>
        </div>
    </div>
</div>

<div id="myCarousel" class="carousel slide">
    <!-- 轮播（Carousel）指标 -->
    <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class=""></li>
        <li data-target="#myCarousel" data-slide-to="1" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="2" class=""></li>
    </ol>
    <!-- 轮播（Carousel）项目 -->
    <div class="carousel-inner">
        <div class="item">
            <img src="${pageContext.request.contextPath }/images/pic3.jpg" alt="First slide">
        </div>
        <div class="item active">
            <img src="${pageContext.request.contextPath }/images/pic3.jpg" alt="Second slide">
        </div>
        <div class="item">
            <img src="${pageContext.request.contextPath }/images/pic3.jpg" alt="Third slide">
        </div>
    </div>
    <!-- 轮播（Carousel）导航 -->
    <a class="carousel-control left" href="#myCarousel" data-slide="prev">
        <span _ngcontent-c3="" aria-hidden="true" class="fa fa-chevron-left" style="margin-top: 50%"></span></a>
    <a class="carousel-control right" href="#myCarousel" data-slide="next">
        <span _ngcontent-c3="" aria-hidden="true" class="fa fa-chevron-right" style="margin-top: 50%"></span></a>
</div>
<section class="container">

    <div class="row">
        <div class="focus col-lg-12" id="focus">
            <div class="left">
                <ul id="work_left">

                    <li class="active" style="opacity: 1;"><p></p><a target="_blank" href="/html/work13.html"><img src="${pageContext.request.contextPath }/images/1.png"></a></li>
                    <li class="" style="opacity: 0;"><p></p><a target="_blank" href="/html/work12.html"><img src="${pageContext.request.contextPath }/images/2.png"></a></li>
                    <li class="" style="opacity: 0;"><p></p><a target="_blank" href="/html/work11.html"><img src="${pageContext.request.contextPath }/images/3.png"></a></li>
                    <li class="" style="opacity: 0;"><p></p><a target="_blank" href="/html/work10.html"><img src="${pageContext.request.contextPath }/images/1.png"></a></li>
                    <li class="" style="opacity: 0;"><p></p><a target="_blank" href="/html/work9.html"><img src="${pageContext.request.contextPath }/images/2.png"></a></li>
                </ul>
            </div>
            <div class="right">
                <ul id="work_right">
                    <li title="省教育厅召开本科高校向应用型转变工作培训交流会" class="active">
                        <span class="fa fa-pencil-square-o"></span> 省教育厅召开本科高校向应用型转变工作培训交流会
                    </li>
                    <li title="省教育厅工业高等教育处组织召开向应用型转变工作座谈会" class=""><span class="fa fa-pencil-square-o"></span>省教育厅工业高等教育处组织召开向应用型转变工作座谈会
                    </li>
                    <li title="省教育厅召开向应用型转变试点工作调研推进会" class=""><span class="fa fa-pencil-square-o"></span>省教育厅召开向应用型转变试点工作调研推进会
                    </li>
                    <li title="我省印发本科高校向应用型转变评价指标体系深入推进本科 高校向应用型转变" class="">
                        <span class="fa fa-pencil-square-o"></span>我省印发本科高校向应用型转变评价指标体系深入推进本科
                        高校向应用型转变
                    </li>
                    <li title="省教育厅组织深入研讨向应用型转变试点学校和试点专业 2 个 指导性评价指标体系" class=""><span
                            class="fa fa-pencil-square-o"></span>省教育厅组织深入研讨向应用型转变试点学校和试点专业 2 个 指导性评价指标体系</li>
                </ul>
            </div>
        </div>
        <script>

        </script>
    </div>
    <div class="row">
        <div class="col-lg-6">
            <div class="ibox float-e-margins" style="
    height: 300px;
">
                <div class="ibox-title">
                    <h1 class="ibox-title-h1"><font size="5" style="font-family:'Microsoft YaHei';">就业新闻</font></h1>
                </div>
                <div class="ibox-content" style="padding: 0;height: 150px;">
                    <ul class="list-group clear-list m-t" id="plicyFile">

                        <li class="list-group-item fist-item" style="border-left: 0;border-right: 0">
                                <span class="pull-right">
                                    辽教发[2017]94号
                                </span>
                            <span class="fa fa-file-text-o"></span><a target="_blank" href="http://www.upln.cn/html/2018/Column_0103_0103/4352.html" style="color:#000" title=" 辽宁省教育厅关于进一步优化高等学校学科专业结构的指导意见 ">&nbsp;辽宁省教育厅关于进一步优化高等学校学科专业结构的指...</a>
                        </li><li class="list-group-item fist-item" style="border-left: 0;border-right: 0">
                                <span class="pull-right">
                                    辽教发[2017]23号
                                </span>
                        <span class="fa fa-file-text-o"></span><a target="_blank" href="assets/pdf/web/viewer.html?file=/pdf/8f482ffd92c44bc0802ddb1904f0528d.pdf" style="color:#000" title="辽宁省教育厅关于深入推进校企联盟建设的指导意见">&nbsp;辽宁省教育厅关于深入推进校企联盟建设的指导意见...</a>
                    </li><li class="list-group-item fist-item" style="border-left: 0;border-right: 0">
                                <span class="pull-right">
                                    辽政办发[2016]163号
                                </span>
                        <span class="fa fa-file-text-o"></span><a target="_blank" href="assets/pdf/web/viewer.html?file=/pdf/e4cbcc2f73f64f5dbfa5b087a5d63add.pdf" style="color:#000" title="辽宁省加强校企联盟建设实施方案（试行）的通知">&nbsp;辽宁省加强校企联盟建设实施方案（试行）的通知...</a>
                    </li><li class="list-group-item fist-item" style="border-left: 0;border-right: 0">
                                <span class="pull-right">
                                    辽政办发[2015]89号
                                </span>
                        <span class="fa fa-file-text-o"></span><a target="_blank" href="assets/pdf/web/viewer.html?file=/pdf/d54aeb08d2e141058bd08f9f79051f73.pdf" style="color:#000" title="辽宁省人民政府办公厅关于推动本科高校向应用型转变的实施意见">&nbsp;辽宁省人民政府办公厅关于推动本科高校向应用型转变的...</a>
                    </li><li class="list-group-item fist-item" style="border-left: 0;border-right: 0">
                                <span class="pull-right">
                                    教发[2015]7号
                                </span>
                        <span class="fa fa-file-text-o"></span><a target="_blank" href="assets/pdf/web/viewer.html?file=/pdf/6b19ddb6d84e432c820aec0d9e8ba260.pdf" style="color:#000" title="教育部、发展改革委、财政部关于引导部分地方普通本科高校向应用型转变的指导意见">&nbsp;教育部、发展改革委、财政部关于引导部分地方普通本科...</a>
                    </li></ul>

                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="ibox float-e-margins" style="
    height: 300px;
">
                <div class="ibox-title">
                    <h1 class="ibox-title-h1"><font size="5" style="font-family:'Microsoft YaHei';">通知公告</font></h1>
                </div>
                <div class="ibox-content" style="padding: 0;height: 150px;">
                    <div>
                        <ul class="list-group clear-list m-t" id="notify">

                            <li class="list-group-item fist-item" style="border-left: 0;border-right: 0">
                                <span class="fa fa-volume-down"></span><a target="_blank" href="http://www.upln.cn/html/2018/Column_0103_1011/4505.html" style="color:#000" title=" 辽宁省教育厅办公室关于召开普通高等学校向应用型转变工作交流会的通知">&nbsp;辽宁省教育厅办公室关于召开普通高等学校向应用型转变工作交流会的通知...</a>
                            </li><li class="list-group-item fist-item" style="border-left: 0;border-right: 0">
                            <span class="fa fa-volume-down"></span><a target="_blank" href="http://www.upln.cn/html/2018/Column_0103_0626/4444.html" style="color:#000" title=" 辽宁省教育厅办公室关于开展向应用型转变试点高校及专业阶段性检查工作的通知">&nbsp;辽宁省教育厅办公室关于开展向应用型转变试点高校及专业阶段性检查工作的通...</a>
                        </li><li class="list-group-item fist-item" style="border-left: 0;border-right: 0">
                            <span class="fa fa-volume-down"></span><a target="_blank" href="http://www.upln.cn/html/2018/Column_0103_0518/4418.html" style="color:#000" title=" 辽宁省教育厅办公室关于召开普通本科高等学校应用型人才培养专家指导委员会工作会议的通知">&nbsp;辽宁省教育厅办公室关于召开普通本科高等学校应用型人才培养专家指导委员会...</a>
                        </li><li class="list-group-item fist-item" style="border-left: 0;border-right: 0">
                            <span class="fa fa-volume-down"></span><a target="_blank" href="http://www.upln.cn/html/2017/Column_0103_1129/4316.html" style="color:#000" title=" 辽宁省教育厅关于公布辽宁省普通本科高等学校向应用型转变示范高校及示范专业名单的通知">&nbsp;辽宁省教育厅关于公布辽宁省普通本科高等学校向应用型转变示范高校及示范专...</a>
                        </li><li class="list-group-item fist-item" style="border-left: 0;border-right: 0">
                            <span class="fa fa-volume-down"></span><a target="_blank" href="http://www.upln.cn/html/2017/Column_0103_0928/4265.html" style="color:#000" title=" 辽宁省教育厅办公室关于开展普通本科高等学校向应用型转变示范高校及示范专业遴选工作的通知">&nbsp;辽宁省教育厅办公室关于开展普通本科高等学校向应用型转变示范高校及示范专...</a>
                        </li></ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%--<script>--%>
        <%--var Items = [{"csId":5,"csSect":2,"csTitle":"辽宁省教育厅关于进一步优化高等学校学科专业结构的指导意见","ctCktime":1514981092000,"ctFileName":"辽教发[2017]94号","ctIsout":1,"ctUrl":"http://www.upln.cn/html/2018/Column_0103_0103/4352.html"},{"csId":4,"csSect":2,"csTitle":"辽宁省教育厅关于深入推进校企联盟建设的指导意见","ctCktime":1490702687000,"ctFileName":"辽教发[2017]23号","ctIsout":0,"ctUrl":"8f482ffd92c44bc0802ddb1904f0528d"},{"csId":3,"csSect":2,"csTitle":"辽宁省加强校企联盟建设实施方案（试行）的通知","ctCktime":1483358685000,"ctFileName":"辽政办发[2016]163号","ctIsout":0,"ctUrl":"e4cbcc2f73f64f5dbfa5b087a5d63add"},{"csId":2,"csSect":2,"csTitle":"辽宁省人民政府办公厅关于推动本科高校向应用型转变的实施意见","ctCktime":1446811480000,"ctFileName":"辽政办发[2015]89号","ctIsout":0,"ctUrl":"d54aeb08d2e141058bd08f9f79051f73"},{"csId":1,"csSect":2,"csTitle":"教育部、发展改革委、财政部关于引导部分地方普通本科高校向应用型转变的指导意见","ctCktime":1445601878000,"ctFileName":"教发[2015]7号","ctIsout":0,"ctUrl":"6b19ddb6d84e432c820aec0d9e8ba260"},{"csId":17,"csSect":3,"csTitle":"辽宁省教育厅办公室关于召开普通高等学校向应用型转变工作交流会的通知","ctCktime":1539266094000,"ctFileName":"辽教办[2018]193 号","ctIsout":1,"ctUrl":"http://www.upln.cn/html/2018/Column_0103_1011/4505.html"},{"csId":16,"csSect":3,"csTitle":"辽宁省教育厅办公室关于开展向应用型转变试点高校及专业阶段性检查工作的通知","ctCktime":1530021283000,"ctFileName":"辽教办〔2018〕124号","ctIsout":1,"ctUrl":"http://www.upln.cn/html/2018/Column_0103_0626/4444.html"},{"csId":15,"csSect":3,"csTitle":"辽宁省教育厅办公室关于召开普通本科高等学校应用型人才培养专家指导委员会工作会议的通知","ctCktime":1526651669000,"ctFileName":"辽教发〔2018〕91号","ctIsout":1,"ctUrl":"http://www.upln.cn/html/2018/Column_0103_0518/4418.html"},{"csId":14,"csSect":3,"csTitle":"辽宁省教育厅关于公布辽宁省普通本科高等学校向应用型转变示范高校及示范专业名单的通知","ctCktime":1511963642000,"ctFileName":"辽教函[2017]779号","ctIsout":1,"ctUrl":"http://www.upln.cn/html/2017/Column_0103_1129/4316.html"},{"csId":13,"csSect":3,"csTitle":"辽宁省教育厅办公室关于开展普通本科高等学校向应用型转变示范高校及示范专业遴选工作的通知","ctCktime":1506606827000,"ctFileName":"辽教办[2017]132 号","ctIsout":1,"ctUrl":"http://www.upln.cn/html/2017/Column_0103_0928/4265.html"},{"csId":30,"csSect":1,"csTitle":"省教育厅召开本科高校向应用型转变工作培训交流会","ctCktime":1500042915000,"ctIsout":0,"ctUrl":"work13"},{"csId":29,"csSect":1,"csTitle":"省教育厅工业高等教育处组织召开向应用型转变工作座谈会","ctCktime":1495031705000,"ctIsout":0,"ctUrl":"work12"},{"csId":28,"csSect":1,"csTitle":"省教育厅召开向应用型转变试点工作调研推进会","ctCktime":1484231688000,"ctIsout":0,"ctUrl":"work11"},{"csId":27,"csSect":1,"csTitle":"我省印发本科高校向应用型转变评价指标体系深入推进本科 高校向应用型转变","ctCktime":1482158075000,"ctIsout":0,"ctUrl":"work10"},{"csId":26,"csSect":1,"csTitle":"省教育厅组织深入研讨向应用型转变试点学校和试点专业 2 个 指导性评价指标体系","ctCktime":1481639658000,"ctIsout":0,"ctUrl":"work9"}];--%>
        <%--var indexs = 0;--%>
        <%--$.each(Items, function (i, item) {--%>
            <%--// 2政策文件 3通知公告 1工作动态--%>
            <%--if (item.csSect == 2) {--%>
                <%--str = "<li class=\"list-group-item fist-item\" style=\"border-left: 0;border-right: 0\">\n" +--%>
                    <%--"                                <span class=\"pull-right\">\n" +--%>
                    <%--"                                    " + item.ctFileName + "\n" +--%>
                    <%--"                                </span>\n" +--%>
                    <%--"                            <span class=\"fa fa-file-text-o\"></span><a target='_blank' href=\"assets/pdf/web/viewer.html?file=/pdf/" + item.ctUrl + ".pdf\" style=\"color:#000\" title= " + item.csTitle + ">&nbsp;" + item.csTitle.substring(0, 25) + "...</a>\n" +--%>
                    <%--"                        </li>";--%>
                <%--if (item.ctIsout == 1)--%>
                    <%--str = "<li class=\"list-group-item fist-item\" style=\"border-left: 0;border-right: 0\">\n" +--%>
                        <%--"                                <span class=\"pull-right\">\n" +--%>
                        <%--"                                    " + item.ctFileName + "\n" +--%>
                        <%--"                                </span>\n" +--%>
                        <%--"                            <span class=\"fa fa-file-text-o\"></span><a target='_blank' href=" + item.ctUrl + " style=\"color:#000\" title= \" "+ item.csTitle +" \">&nbsp;" + item.csTitle.substring(0, 25) + "...</a>\n" +--%>
                        <%--"                        </li>";--%>
                <%--$('#plicyFile').append(str);--%>
            <%--}--%>
            <%--else if(item.csSect == 3){--%>
                <%--str = "<li class=\"list-group-item fist-item\" style=\"border-left: 0;border-right: 0\">\n" +--%>
                    <%--"                            <span class=\"fa fa-volume-down\"></span><a target='_blank' href=\"assets/pdf/web/viewer.html?file=/pdf/" + item.ctUrl + ".pdf\" style=\"color:#000\" title= " + item.csTitle + ">&nbsp;" + item.csTitle.substring(0, 35) + "...</a>\n" +--%>
                    <%--"                        </li>";--%>
                <%--if (item.ctIsout == 1)--%>
                    <%--str = "<li class=\"list-group-item fist-item\" style=\"border-left: 0;border-right: 0\">\n" +--%>
                        <%--"                            <span class=\"fa fa-volume-down\"></span><a target='_blank' href=" + item.ctUrl + " style=\"color:#000\" title= \" "+ item.csTitle + "\">&nbsp;" + item.csTitle.substring(0, 35) + "...</a>\n" +--%>
                        <%--"                        </li>";--%>
                <%--$('#notify').append(str);--%>
            <%--}--%>
            <%--else{--%>
                <%--if(indexs==0) {--%>
                    <%--str2 = "<li title='"+item.csTitle+"' class=\"active\"><span class=\"fa fa-pencil-square-o\"></span> " + item.csTitle+ "</li>";--%>
                    <%--str1="<li class=\"active\" style=\"opacity: 1;\"><p></p><a target='_blank' href=\"/html/"+item.ctUrl+".html\"><img src=\"/myImage/work"+(++indexs)+".jpg\"></a></li>"--%>
                <%--}--%>
                <%--else {--%>
                    <%--str1="<li class=\"\" style=\"opacity: 1;\"><p></p><a target='_blank' href=\"/html/"+item.ctUrl+".html\"><img src=\"/myImage/work"+(++indexs)+".jpg\"></a></li>"--%>
                    <%--str2 = "<li title='"+item.csTitle+"' class=\"\"><span class=\"fa fa-pencil-square-o\"></span>" + item.csTitle+ "</li>";--%>
                <%--}--%>
                <%--$("#work_left").append(str1);--%>
                <%--$("#work_right").append(str2);--%>
            <%--}--%>

        <%--});--%>
    <%--</script>--%>



</section>
<footer id="footer" style="margin-top:0px;">

    <div class="footer2">
        <div class="container">
            <div class="row">
                <div class="panel-body">
                    <div class="col-md-12 panel">
                        <div class="panel-body">
                            <p class="text-center">
                                版权所有:辽宁省教育厅 地址:辽宁省沈阳市皇姑区崇山东路46-1号 邮编:110032<br> 研发与技术支持:辽宁省教育厅教育信息中心
                                辽ICP备10200702号-2号<br> 建议使用1920*1080分辨率 谷歌68以上版本浏览器 <br>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /row of panels -->
        </div>
    </div>
</footer>
<script type="text/javascript">
    $(function(){
        var oFocus=$('#focus'),
            oRight=oFocus.find('.right'),
            oLeft=oFocus.find('.left'),
            aRLi=oRight.find('li'),
            aLLi=oLeft.find('li'),
            index=0,
            timer = null;
        aRLi.click(function(){
            index=$(this).index()
            $(this).addClass('active').siblings().removeClass();
            aLLi.eq(index).addClass('active').siblings().removeClass();
            aLLi.eq(index).stop().animate({'opacity':1},300).siblings().stop().animate({'opacity':0},300);
            stopFoucs();
        })
        oLeft.mouseenter(function(){
            stopFoucs();
        }).mouseleave(function(){
            startFocus();
        });
        timer = setInterval(function(){
            startFocus();
        },5000);
        function startFocus(){
            index++;
            index = index > aRLi.size()-1 ? 0 :index;

            aLLi.eq(index).addClass('active').siblings().removeClass();
            aLLi.eq(index).stop().animate({'opacity':1},300).siblings().stop().animate({'opacity':0},300);
            aRLi.eq(index).addClass('active').siblings().removeClass();
        }
        function stopFoucs(){
            clearInterval(timer);
        }
    })
</script>



</body></html>