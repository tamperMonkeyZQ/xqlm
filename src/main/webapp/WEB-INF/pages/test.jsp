<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %><%@ page isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Home</title>
</head>
<body>
<table border="1 px solid" cellspacing="0" width="60%" height="40%">
<thead><tr><th>Id</th><th>pwd</th><th>name</th><th>tel</th></tr></thead>
<tbody align="center"><c:forEach items="${requestScope.userList }" var="user">
<tr><td>${user.userId}</td><td>${user.userPwd}</td><td>${user.userUnit}</td><td>${user.userTel}</td><tr>
</c:forEach></tbody>
</table>
</body>
</html>
