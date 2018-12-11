<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../../include/core.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="${path }/jsFiles/qyuser.js"></script>

<title>用户管理</title>
<style type="text/css">
 #roleDlg {
     position: fixed;  
    top: 15%;
    left: 30%;
    width: 800px;
    height: 800px;
     margin: 100px 100 0 0px;/* margin 负值为宽高的一半 */ 
}
#mydlg,#mydlg1{
    position: fixed;  
    top: 0%;
    left: 30%;
    width: 800px;
    height: 800px;
     margin: 100px 100 0 0px;/* margin 负值为宽高的一半 */ 
} 
</style>
</head>
<body>

<div class="panel panel-default">
	<div class="panel-heading">
		<h4 class="panel-title">
			<strong>条件查询</strong>
		</h4>
	</div>
	<div class="panel-body">
		<form id="conForm" class=" form-inline">
  
  <div class="form-group"  >
    <div class="col-md-2 ">
    <input type="text" class="form-control" id="userSearch" name="userSearch" placeholder="请输入企业名称或者登陆账号">
    </div>
  </div>
  
  <button type="button" onclick="getUserByCon()" class="btn btn-info ">
   <span class="glyphicon glyphicon-search" aria-hidden="true" >  搜索</span></button>
</form>
	</div>
</div>
<table id="test-table" class="table table-hover table-striped table-condensed table-bordered"></table>

<!--toolbar  -->
<div id="toolbar" class="btn-toolbar">
    <button onclick="openDlg()" type="button" class="btn btn-success">
      <span class="glyphicon glyphicon-plus" aria-hidden="true" >添加</span>
    </button>
    
    <button  type="button" onclick="delMany()" class="btn btn-danger">
      <span class="glyphicon glyphicon-trash" aria-hidden="true">删除</span>
    </button>
</div>


<!-- 模态框（Modal） -->
<!-- 添加用户 -->
<div id="mydlg" class="modal fade" id="myModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
   
    <div class="modal-dialog">
        <div class="modal-content">
        
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">添加用户</h4>
            </div>
            <div class="container">
			<form class="form-horizontal" id="myform"  method="post">
			<div class="form-group">
			<label class="col-md-2 control-label">登录账号：</label>
			<div class="col-md-3 ">
			<input type="text" onblur="validAccount()" id="userId" name="userId" class="form-control form-control-static" placeholder="请输入登陆账号">
			</div>
			<label class="control-label"><span id="mid" style="color:red"></span></label>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">企业名称</label>
			<div class="col-md-3 ">
			<input type="text" id="userUnit"  name="userUnit" class="form-control form-control-static" placeholder="请输入企业名称">
			<input type="hidden" id="userRole" name="userRole" value="1">
			</div>
			</div>
			
			
			<div class="form-group">
			<label class="col-md-2 control-label">用户密码：</label>
			<div class="col-md-3 ">
			<input type="password" id="userPwd" onblur="clearPass()" name="userPwd" class="form-control form-control-static" placeholder="请输入密码">
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">确认密码：</label>
			<div class="col-md-3 ">
			<input type="password" id="againpass" name="againpass" class="form-control form-control-static" placeholder="请输入密码">
			</div>
			</div>
			
			
 			<div class="form-group">
			<label class="col-md-2 control-label">联系电话：</label>
			<div class="col-md-3 ">
			<input type="text" id="userTel" name="userTel" class="form-control form-control-static" placeholder="请输入联系电话">
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">Email：</label>
			<div class="col-md-3 ">
			<input type="text" id="userEmail" name="userEmail" class="form-control form-control-static" placeholder="请输入Email">
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">官方网站：</label>
			<div class="col-md-3 ">
			<input type="text" id="userWeb" name="userWeb" class="form-control form-control-static" placeholder="请输入官方网址">
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">企业简介</label>
			<div class="col-md-3">
			<textarea rows="5" id="userSmry" name="userSmry" cols="32" class="form-control form-control-static" placeholder="请输入简介"></textarea>
			</div>
			</div>
            <div class="modal-footer col-md-6">
            <!--用来清空表单数据-->
            <input type="reset" name="reset" style="display: none;" />
                <button type="button" class="btn btn-default" onclick="closeDlg()">关闭</button>
               <button type="button" onclick="saveUser()" class="btn btn-primary">提交</button>
            </div>
            </form>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div> 



<!-- 模态框（Modal） -->
<!-- 修改用户 -->
<div id="mydlg1" class="modal fade" id="myModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
   
    <div class="modal-dialog">
        <div class="modal-content">
        
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">修改用户</h4>
            </div>
            <div class="container">
			<form class="form-horizontal" id="myform1"  method="post">
			
			<div class="form-group">
			<label class="col-md-2 control-label">企业账号：</label>
			<div class="col-md-3 ">
			<input type="text" id="user_id1" readonly="readonly"  name="userId" class="form-control form-control-static" placeholder="请输入账号">
			</div>
			</div>
			
			
			<div class="form-group">
			<label class="col-md-2 control-label">企业名称：</label>
			<div class="col-md-3 ">
			<input type="text" id="user_name1"  name="userName" class="form-control form-control-static" placeholder="请输入企业名称">
			</div>
			</div>
			
 			<div class="form-group">
			<label class="col-md-2 control-label">联系电话：</label>
			<div class="col-md-3 ">
			<input type="text" id="user_phone1"  name="userTel" class="form-control form-control-static" placeholder="请输入联系电话">
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">Email：</label>
			<div class="col-md-3 ">
			<input type="text" id="email1"  name="userEmail" class="form-control form-control-static" placeholder="请输入电子邮箱">
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">官方网址：</label>
			<div class="col-md-3 ">
			<input type="text" id="user_web1" name="userWeb" class="form-control form-control-static" placeholder="请输入Email">
			</div>
			</div>
			
			
			<div class="form-group">
			<label class="col-md-2 control-label">企业简介：</label>
			<div class="col-md-3">
			<textarea rows="5" id="user_smry1" name="userSmry" cols="32" class="form-control form-control-static" placeholder="请输入企业简介"></textarea>
			</div>
			</div>
            <div class="modal-footer col-md-6">
            <!--用来清空表单数据-->
            <input type="reset" name="reset" style="display: none;" />
                <button type="button" class="btn btn-default" onclick="closeDlg()">关闭</button>
               <button type="button" onclick="upUser()" class="btn btn-primary">提交</button>
            </div>
            </form>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div> 


<!-- 模态框（Modal） -->
<!-- 角色分配-->
<div id="roleDlg" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">分配角色</h4>
            </div>
            <div class="container">
			<form class="form-horizontal" id="roleForm"  method="post">
			
			<div class="form-group">
			<label class="col-md-2 control-label">我的角色：</label>
			<div class="col-md-3 ">
			<input type="hidden" id="hid" >
			<select  style= "width:280px" id="rid" name="role" multiple="multiple"  class="form-control form-control-static "></select>
			</div>
			</div>
            <div class="modal-footer col-md-6">
            <!--用来清空表单数据-->
            <input type="reset" name="reset" style="display: none;" />
                <button type="button" class="btn btn-default" onclick="closeDlg()">关闭</button>
               <button type="button" onclick="saveRole()" class="btn btn-primary">保存</button>
            </div>
            </form>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>



<!-- 模态框（Modal） -->
<!-- 导入-->
<div id="importDlg" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">导入</h4>
            </div>
            <div class="container">
			<form class="form-horizontal" id="importForm"  method="post" enctype="multipart/form-data">
			
			<div class="form-group">
			<label class="col-md-2 control-label">导入文件：</label>
			<div class="col-md-3 ">
			<input  type="file" name="files" class="form-control form-control-static ">
			</div>
			</div>
            <div class="modal-footer col-md-6">
            <!--用来清空表单数据-->
            <input type="reset" name="reset" style="display: none;" />
                <button type="button" class="btn btn-default" onclick="closeDlg()">关闭</button>
               <button type="button" onclick="importExcel()" class="btn btn-primary">保存</button>
            </div>
            </form>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>


</body>
</html>