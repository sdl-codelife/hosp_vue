<template>
	<div>
		<!-- 面包屑-->
		<div class="breadcrumb">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path:'/Home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>接口文档</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<iframe class="iframe_con" scrolling="auto" frameborder="0" src="http://localhost:8787/swagger-ui.html"></iframe>
	</div>
</template>

<script>
// http://localhost:8787/swagger-ui.html
</script>

<style>
.iframe_con {
	width: 100%;
	height: 800px;
	padding-top: 10px;
}
</style>
