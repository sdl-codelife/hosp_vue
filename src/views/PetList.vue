<template>
	<div>
		<!-- 面包屑-->
		<div class="breadcrumb">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path:'/Home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>宠物管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		
		<div class="menua">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true">
					<el-form-item>
						<el-input v-model="petname" prefix-icon="el-icon-search" clearable placeholder="宠物名"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click="selectpet" type="primary">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button @click="resetselect" type="primary">重置</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<!--表格数据-->
			<el-table :data="petdata" v-loading="listLoading" style="width: 100%" border>
				<el-table-column type="index" ></el-table-column>
				<el-table-column width="100px" prop="id" label="宠物ID"sortable></el-table-column>
				<el-table-column prop="name" label="宠物名" ></el-table-column>
				<el-table-column prop="sex" label="宠物性别" ></el-table-column>
				<el-table-column prop="type" label="宠物种类" ></el-table-column>
				<el-table-column prop="age" label="宠物年龄"></el-table-column>
				<el-table-column prop="user" label="宠物主人ID" ></el-table-column>
				<el-table-column width="200px" label="操作">
					<template scope="scope">
						<el-button size="small" @click="editpethandle(scope.row)">编辑</el-button>
						<el-button type="danger" @click="delpet(scope.row)" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--分页 -->
			<el-pagination
			  background
			  layout="total, prev, pager, next"
			  :total="total"
			  :page-size="pagesize"
			  :page-count="pagecount"
			  :current-page="currentpage"
			  @current-change="currentpagehandle"
			  style="margin-top:10px"
			></el-pagination>
			<!-- 编辑药品数据dialog -->
			<el-dialog title="编辑药品信息" :visible.sync="editdialog">
			  <div  style="width:300px">
			    <el-form
			      ref="editform"
			      :model="editform"
			      label-width="70px"
			      size="mini"
			    >
			      <el-form-item label="宠物ID">
			        <el-input v-model="editform.id" disabled></el-input>
			      </el-form-item>
			      <el-form-item label="宠物名">
			        <el-input v-model="editform.name"></el-input>
			      </el-form-item>
				  <el-form-item label="性别">
				    <el-radio v-model="editform.sex" label="雌">雌</el-radio>
				    <el-radio v-model="editform.sex" label="雄">雄</el-radio>
				  </el-form-item>
				  <el-form-item label="宠物种类">
				    <el-input v-model="editform.type"></el-input>
				  </el-form-item>
			      <el-form-item label="宠物年龄">
			        <el-input-number v-model="editform.age" :precision="1" :step="1" :min="0"></el-input-number>
			      </el-form-item>
				 <el-form-item label="宠物主人">
				   <el-input v-model="editform.user" ></el-input>
				 </el-form-item>
			      <div>
			        <el-button @click="editdialog = false" size="mini">取消</el-button>
			        <el-button @click="editpet" type="primary" size="mini">更新</el-button>
			      </div>
			    </el-form>
			  </div>
			  
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			this.getallpet()
		},
		data() {
			return {
				petdata: [],
				listLoading: false,
				editdialog: false,
				petname: '',
				total: 0, //总条数
				pagesize: 6, //每页显示条数
				pagecount: 0, //总页数
				currentpage: 1, //当前页
				editform: {
				  id: 0,
				  name: "",
				  sex: "",
				  type: "",
				  age: "",
				  image: "",
				  user: 0,
				},
			}
		},
		methods: {
			getallpet() {
				this.$getRequest('/getallpet?' + "pageNo=" +
					this.currentpage +
					"&pageSize=" +
					this.pagesize +
					"&parms=" +
					this.petname)
					.then(res=>{
						if (res.data.code == 200) {
						  this.petdata = res.data.data.list;
						  this.total = res.data.data.total; //总条数
						  this.pagesize = res.data.data.pageSize; //每页显示条数
						  this.pagecount = res.data.data.pages; //总页数
						  this.currentpage = res.data.data.pageNum; //当前页数
						}
					})
			},
			selectpet() {
				this.getallpet()
			},
			resetselect() {
				this.petname = ''
				this.getallpet()
			},
			currentpagehandle(){
				

			},
			editpet(){
				this.$confirm('确定更新 ？', '提示')
					.then(() => {
						this.$putRequest('/updatepet', this.editform)
							.then(res => {
								if (res.data.code == 200) {
									this.$message.success('操作成功！');
									this.editmedicdialog = false;
								}
								this.getallpet()();
							})
							.catch(e => {
								console.log(e);
							});
					})
					.catch(() => {
						console.log('cancle');
					});
			},
			editpethandle(row){
				this.editdialog = true;
				this.editform = Object.assign({}, row);
			},
			delpet(row){
				this.$confirm("确定要删除吗？此操作不可恢复。", "提示", {
				  type: "warning"
				})
				  .then(() => {
				    this.listLoading = true;
				    this.$deleteRequest("/deltepet?id=" + row.id)
				      .then(res => {
				        this.$message.success("删除成功");
				        this.getallpet();
				        this.listLoading = false;
				      })
				      .catch(e => {
				        console.log(e);
				      });
				  })
				  .catch(() => {
				    this.$message.info("已取消操作");
				  });
			}
		}

	}
</script>

<style scoped>

</style>
