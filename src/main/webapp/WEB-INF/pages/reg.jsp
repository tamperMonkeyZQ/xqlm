<%--
  Created by IntelliJ IDEA.
  User: YoungJin
  Date: 2018/12/11
  Time: 17:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>用户注册</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="Keywords" content="网站关键词">
    <meta name="Description" content="网站介绍">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/upStageLoginAsset/css/base.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/upStageLoginAsset/css/iconfont.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/upStageLoginAsset/css/reg.css">
</head>
<body>
<div id="ajax-hook"></div>
<div class="wrap">
    <div class="wpn">
        <div class="form-data pos">
            <!--<a href=""><img src="./img/logo.png" class="head-logo"></a>-->
            <!--<p class="tel-warn hide"><i class="icon-warn"></i></p>-->
            <form>
                <p class="p-input pos">
                    <label for="stuNum">输入学号</label>
                    <input type="number" id="stuNum" autocomplete="off">
                    <span class="tel-warn tel-err hide"><em></em><i class="icon-warn"></i></span>
                </p>

                <p class="p-input pos">
                    <label for="schoolId">请输入学校名称</label>
                    <input type="text" id="schoolId" autocomplete="off">
                    <span class="tel-warn tel-err hide"><em></em><i class="icon-warn"></i></span>
                </p>

                <!--<p class="p-input pos" id="sendcode">
                    <label for="veri-code">输入验证码</label>
                    <input type="number" id="veri-code">
                    <a href="javascript:;" class="send">发送验证码</a>
                    <span class="time hide"><em>120</em>s</span>
                    <span class="error hide"><em></em><i class="icon-warn" style="margin-left: 5px"></i></span>
                </p>-->
                <p class="p-input pos hide" id="pwd">
                    <label for="passport">输入原始密码（身份证后六位）</label>
                    <input type="password" style="display: none"/>
                    <input type="password" id="passport">
                    <span class="tel-warn pwd-err hide"><em></em><i class="icon-warn" style="margin-left: 5px"></i></span>
                </p>
                <!--
                <p class="p-input pos hide" id="confirmpwd">
                    <label for="passport2">确认密码</label>
                    <input type="password" style="position:absolute;top:-998px"/>
                    <input type="password" id="passport2">
                    <span class="tel-warn confirmpwd-err hide"><em></em><i class="icon-warn" style="margin-left: 5px"></i></span>
                </p> -->
            </form>
            <!--<div class="reg_checkboxline pos">
                <span class="z"><i class="icon-ok-sign boxcol" nullmsg="请同意!"></i></span>
                <input type="hidden" name="agree" value="1">
                <div class="Validform_checktip"></div>
                <p>我已阅读并接受 <a href="#" target="_brack">《XXXX协议说明》</a></p>
            </div>-->
            <button class="lang-btn">注册</button>
            <div class="bottom-info">已有账号，<a href="${pageContext.request.contextPath}/upStage/goUpStageLogin.action">马上登录</a></div>
            <div class="third-party">
                <!--<a href="#" class="log-qq icon-qq-round"></a>
                <a href="#" class="log-qq icon-weixin"></a>
                <a href="#" class="log-qq icon-sina1"></a>-->
            </div>
            <p class="right">Powered by © 2018</p>
        </div>
    </div>
</div>
<script src="${pageContext.request.contextPath}/upStageLoginAsset/js/jquery.js"></script>
<script src="${pageContext.request.contextPath}/upStageLoginAsset/js/agree.js"></script>
<script src="${pageContext.request.contextPath}/upStageLoginAsset/js/login.js"></script>
<div style="text-align:center;">
    <p></p>
</div>
</body>
</html>