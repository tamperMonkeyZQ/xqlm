<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../../include/core.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="${path }/jsFiles/student.js"></script>

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
<input type="hidden" id="myId" name="myId" value="${ID }">
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
    <input type="text" class="form-control" id="stuNumSearch" name="stuNumSearch" placeholder="请输入学号">
    </div>
  </div>
  
   
  <div class="form-group"  >
    <div class="col-md-2 ">
    <input type="text" class="form-control" id="stuNameSearch" name="stuNameSearch" placeholder="请输入姓名">
    </div>
  </div>
  
  <div class="form-group">
    <div class="col-md-2 ">
    <select class="form-control form-control-static" name="myMaj" id="myMaj"></select>
    </div>
  </div>
  
  <button type="button" onclick="getStudentByCon()" class="btn btn-info ">
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
    
   <button onclick="ImportExcel()" type="button" class="btn btn-success">
      <span class="glyphicon glyphicon-copy" aria-hidden="true" >导入</span>
    </button>
</div>


<!-- 模态框（Modal） -->
<!-- 添加毕业生 -->
<div id="mydlg" class="modal fade" id="myModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
   
    <div class="modal-dialog">
        <div class="modal-content">
        
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">添加学生</h4>
            </div>
            <div class="container">
			<form class="form-horizontal" id="myform"  method="post" enctype="multipart/form-data">
			<div class="form-group">
			<label class="col-md-2 control-label">身份证号：</label>
			<div class="col-md-3 ">
			<input type="text"  id="stuIdcard" name="stuIdcard" class="form-control form-control-static" placeholder="请输入身份证号">
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">学生姓名：</label>
			<div class="col-md-3">
			<input type="text" id="stuName" name="stuName" class="form-control form-control-static" placeholder="请输入姓名"></textarea>
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">学生性别 ：</label>
			<div class="col-md-3 ">
			<select id="stuSex" name="stuSex" class="form-control form-control-static" >
			<option value="0">男</option><option value="1">女</option>
			</select>
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">学生学号 ：</label>
			<div class="col-md-3 ">
			<input type="text" id="stuNum" name="stuNum" class="form-control form-control-static" placeholder="请输入学号">
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">学生电话  ：</label>
			<div class="col-md-3 ">
			<input type="text" id="stuTel" name="stuTel" class="form-control form-control-static" placeholder="请输入电话">
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">学生专业 ：</label>
			<div class="col-md-3 ">
			<select id="pid" name="pid" class="form-control form-control-static" ></select>
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">学生成绩 ：</label>
			<div class="col-md-3 ">
			<input type="file" id="stuGrade" name="stuGrade">
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">毕业时间 ：</label>
			<div class="col-md-3 ">
			<input type="text" id="stuGradu" name="stuGradu" class="form-control form-control-static" placeholder="请输入毕业年份">
			</div>
			</div>
            <div class="modal-footer col-md-6">
            <!--用来清空表单数据-->
            <input type="reset" name="reset" style="display: none;" />
                <button type="button" class="btn btn-default" onclick="closeDlg()">关闭</button>
               <button type="button" onclick="saveStudent()" class="btn btn-primary">提交</button>
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
                <h4 class="modal-title" id="myModalLabel">修改学生</h4>
            </div>
            <div class="container">
			<form class="form-horizontal" id="myform1"  method="post" >
			<div class="form-group">
			<label class="col-md-2 control-label">身份证号：</label>
			<div class="col-md-3 ">
			<input type="text"  readonly="readonly" id="stuIdcard1" name="stuIdcard" class="form-control form-control-static" placeholder="请输入身份证号">
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">学生姓名：</label>
			<div class="col-md-3">
			<input type="text" id="stuName1" name="stuName" class="form-control form-control-static" placeholder="请输入姓名"></textarea>
			</div>
			</div>
		
			<div class="form-group">
			<label class="col-md-2 control-label">学生学号 ：</label>
			<div class="col-md-3 ">
			<input type="text" id="stuNum1" name="stuNum" class="form-control form-control-static" placeholder="请输入学号">
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">学生电话  ：</label>
			<div class="col-md-3 ">
			<input type="text" id="stuTel1" name="stuTel" class="form-control form-control-static" placeholder="请输入电话">
			</div>
			</div>
			
            <div class="modal-footer col-md-6">
            <!--用来清空表单数据-->
            <input type="reset" name="reset" style="display: none;" />
                <button type="button" class="btn btn-default" onclick="closeDlg()">关闭</button>
               <button type="button" onclick="updateStudent()" class="btn btn-primary">提交</button>
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
                <h4 class="modal-title" id="myModalLabel">更新成绩单</h4>
            </div>
            <div class="container">
			<form class="form-horizontal" id="myform2"  method="post" >
			<input type="hidden" id="stuIdcard2" name="stuIdcard">
			
		
			<div class="form-group">
			<label class="col-md-2 control-label">学生成绩：</label>
			<div class="col-md-3 ">
			<input type="file" id="stuGrade2" name="stuGrade"  >
			</div>
			</div>
			
            <div class="modal-footer col-md-6">
            <!--用来清空表单数据-->
            <input type="reset" name="reset" style="display: none;" />
                <button type="button" class="btn btn-default" onclick="closeDlg()">关闭</button>
               <button type="button" onclick="upStuFile()" class="btn btn-primary">提交</button>
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
			<input  type="file" id="files" name="files" />
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