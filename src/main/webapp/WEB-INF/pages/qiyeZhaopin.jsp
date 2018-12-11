<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../../include/core.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="${path }/jsFiles/qiyeZhaopin.js"></script>

<title>招聘需求管理</title>
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
	
	</div>
</div>
<table id="test-table" class="table table-hover table-striped table-condensed table-bordered"></table>

<!--toolbar  -->
<div id="toolbar" class="btn-toolbar">
    <button onclick="openDlg()" type="button" class="btn btn-success">
      <span class="glyphicon glyphicon-plus" aria-hidden="true" >添加</span>
    </button>
    
</div>


<!-- 模态框（Modal） -->
<!-- 添加培养需求 -->
<div id="mydlg" class="modal fade" id="myModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
   
    <div class="modal-dialog">
        <div class="modal-content">
        
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">发布招聘需求</h4>
            </div>
            <div class="container">
			<form class="form-horizontal" name="form1" id="form1" method="post" enctype="multipart/form-data">
			<div class="form-group">
			<label class="col-md-2 control-label">招聘职务</label>
			<div class="col-md-3 ">
			<input type="text" id="zhiwu" name="zhiwu" class="form-control form-control-static" placeholder="请输入">
			</div>
			</div>
			
			<div class="form-group">
			<label class="col-md-2 control-label">简介</label>
			<div class="col-md-3">
			<textarea rows="5" id="brief" name="brief" cols="32" class="form-control form-control-static" placeholder="请输入简介"></textarea>
			</div>
			</div>
			<div class="form-group">
			<label class="col-md-2 control-label">要求性别</label>
			<div class="col-md-3 ">
			<input type="text" id="xingbie" name="xingbie" class="form-control form-control-static" placeholder="请输入">
			</div>
			</div>
			<div class="form-group">
			<label class="col-md-2 control-label">年龄下限</label>
			<div class="col-md-3 ">
			<input type="text" id="xiaxian" name="xiaxian" class="form-control form-control-static" placeholder="请输入">
			</div>
			</div>
			<div class="form-group">
			<label class="col-md-2 control-label">年龄上限</label>
			<div class="col-md-3 ">
			<input type="text" id="shangxian" name="shangxian" class="form-control form-control-static" placeholder="请输入">
			</div>
			</div>
			<div class="form-group">
			<label class="col-md-2 control-label">学历</label>
			<div class="col-md-3 ">
			<input type="text" id="xueli" name="xueli" class="form-control form-control-static" placeholder="请输入">
			</div>
			</div>
			<div class="form-group">
			<label class="col-md-2 control-label">工作地点</label>
			<div class="col-md-3 ">
			<input type="text" id="didian" name="didian" class="form-control form-control-static" placeholder="请输入">
			</div>
			</div>
			
            <div class="modal-footer col-md-6">
            <!--用来清空表单数据-->
            <input type="reset" name="reset" style="display: none;" />
                <button type="button" class="btn btn-default" onclick="closeDlg()">关闭</button>
               <button type="button" onclick="addQiyeZhaopin()" class="btn btn-primary">提交</button>
            </div>
            </form>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div> 







</body>
</html>