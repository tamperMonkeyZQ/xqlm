<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../../include/core.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="${path }/jsFiles/major.js"></script>

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
    <input type="text" class="form-control" id="majorSearch" name="majorSearch" placeholder="请输入专业名称">
    </div>
  </div>
  
  <button type="button" onclick="getMajorByCon()" class="btn btn-info ">
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
<input type="hidden" id="myId" name="myId" value="${ID }">

<!-- 模态框（Modal） -->
<!-- 添加用户 -->
<div id="mydlg" class="modal fade" id="myModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
   
    <div class="modal-dialog">
        <div class="modal-content">
        
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">添加专业</h4>
            </div>
            <div class="container">
			<form class="form-horizontal" id="myform"  method="post" enctype="multipart/form-data">
			<div class="form-group">
			<label class="col-md-2 control-label">专业名称：</label>
			<div class="col-md-3 ">
			<input type="text" onblur="validAccount()" id="majName" name="majName" class="form-control form-control-static" placeholder="请输入专业名称">
			</div>
			<label class="control-label"><span id="mid" style="color:red"></span></label>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">专业简介：</label>
			<div class="col-md-3">
			<textarea rows="5" id="majSmry" name="majSmry" cols="32" class="form-control form-control-static" placeholder="请输入专业简介"></textarea>
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">培养时间 ：</label>
			<div class="col-md-3 ">
			<input type="text" id="majYear" name="majYear" class="form-control form-control-static" placeholder="请输入培养年限">
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">培养方案 ：</label>
			<div class="col-md-3 ">
			<input type="file" id="myFile" name="myFile">
			</div>
			</div>
            <div class="modal-footer col-md-6">
            <!--用来清空表单数据-->
            <input type="reset" name="reset" style="display: none;" />
                <button type="button" class="btn btn-default" onclick="closeDlg()">关闭</button>
               <button type="button" onclick="saveMajor()" class="btn btn-primary">提交</button>
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
			<input type="hidden" id="majId1" name="majId">
			<div class="form-group">
			<label class="col-md-2 control-label">专业名称：</label>
			<div class="col-md-3 ">
			<input type="text" readonly="readonly" id="majName1" name="majName" class="form-control form-control-static" placeholder="请输入专业名称">
			</div>
			<label class="control-label"></label>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">专业简介：</label>
			<div class="col-md-3">
			<textarea rows="5" id="majSmry1" name="majSmry" cols="32" class="form-control form-control-static" placeholder="请输入专业简介"></textarea>
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">培养时间 ：</label>
			<div class="col-md-3 ">
			<input type="text" id="majYear1" name="majYear" class="form-control form-control-static" placeholder="请输入培养年限">
			</div>
			</div>
			
            <div class="modal-footer col-md-6">
            <!--用来清空表单数据-->
            <input type="reset" name="reset" style="display: none;" />
                <button type="button" class="btn btn-default" onclick="closeDlg()">关闭</button>
               <button type="button" onclick="upMajor()" class="btn btn-primary">提交</button>
            </div>
            </form>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div> 

<!-- 模态框（Modal） -->
<!-- 修改培养方案 -->
<div id="mydlg2" class="modal fade" id="myModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
   
    <div class="modal-dialog">
        <div class="modal-content">
        
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">修改培养方案</h4>
            </div>
            <div class="container">
			<form class="form-horizontal" id="myform2"  method="post">
			<input type="hidden" id="majId2" name="majId">
			
		
			<div class="form-group">
			<label class="col-md-2 control-label">培养方案 ：</label>
			<div class="col-md-3 ">
			<input type="file" id="myFile2" name="myFile"  >
			</div>
			</div>
			
            <div class="modal-footer col-md-6">
            <!--用来清空表单数据-->
            <input type="reset" name="reset" style="display: none;" />
                <button type="button" class="btn btn-default" onclick="closeDlg()">关闭</button>
               <button type="button" onclick="upMajFile()" class="btn btn-primary">提交</button>
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