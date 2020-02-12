<template>
	<div>
		<el-row>
			<el-col :span="8" class="vermenu">
				<div class="grid-content bg-purple">
					<div>
						<el-row class="tac">
							<el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
								
								<el-menu-item index="/userlist">
									<i class="el-icon-user" />
									<span>用户管理</span>
								</el-menu-item>
								<el-menu-item index="/medicinelist">
									<i class="el-icon-first-aid-kit" />
									<span slot="title">药品管理</span>
								</el-menu-item>
								<el-menu-item index="/petlist">
									<i><svg class="icon">
											<use xlink:href='#icon-chongwu'></use>
										</svg></i>
									<span style="padding: 5px;" slot="title">宠物管理</span>
								</el-menu-item>
								<el-menu-item index="/message">
									<i class="el-icon-chat-line-square" />
									<span>系统公告</span>
								</el-menu-item>
								<el-menu-item index="/banner">
									<i class="el-icon-picture-outline" />
									<span>轮播图管理</span>
								</el-menu-item>
								<el-menu-item index="userinfo">
									<i class="el-icon-setting" />
									<span slot="title">个人中心</span>
								</el-menu-item>
								<el-menu-item index="/swagger">
									<i class="el-icon-document" />
									<span  slot="title">接口文档</span>
								</el-menu-item>
							</el-menu>
						</el-row>
					</div>
				</div>
			</el-col>
			<el-col :span="18">
				<div class="grid-content bg-purple-light" />
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'Vmenu',
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath)
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath)
			}
		}
	}
</script>

<style scoped>
	.vermenu {
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		width: 180px;
		margin: 10px;
	}
</style>
