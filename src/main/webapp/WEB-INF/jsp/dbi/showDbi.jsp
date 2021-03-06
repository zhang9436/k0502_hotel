<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<head>
    <base href="<%=basePath%>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>客房销售记录分析</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="static/lib/layui/css/layui.css">
    <!-- 引入 ECharts 文件 -->
    <script src="static/lib/echarts/echarts.min.js"></script>
    <script type="text/javascript" src="static/lib/echarts/jquery.min.js" ></script>
</head>
<body>
<!--数据显示的容器 -->
<div align="center" id="main" style="width: 1000px;height:600px;"></div>
</body>
<!--引入layui的js文件-->
<script src="static/js/dbi/showDbi.js"></script>
</html>