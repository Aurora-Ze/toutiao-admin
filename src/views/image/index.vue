<template>
	<div class="image-container">
		<el-card class="image-card">
			<div slot="header" class="clearfix">
				<!-- 面包屑 -->
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>素材管理</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<!-- 选择按钮 -->
			<div class="select-btn">
				<el-radio-group v-model="collect" size="mini" @change="loadImages(1)">
					<el-radio-button :label="false">全部</el-radio-button>
					<el-radio-button :label="true">收藏</el-radio-button>
				</el-radio-group>
				<el-button size="mini" type="success" @click="dialogVisible = true">上传素材</el-button>
			</div>
			<!-- 图片 -->
			<el-row :gutter="10">
				<el-col class="image-item" :xs="12" :sm="6" :md="6" :lg="4" v-for="(img, index) in images" :key="index">
					<el-image :src="img.url" fit="cover" style="height: 100px;"></el-image>
					<div class="image-action">
						<el-button 
						type="warning"
						size="mini"
						circle
						:icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off' "
						@click="onCollect(img)"
						:loading="img.loading"></el-button>
						<el-button
						size="mini"
						type="danger"
						icon="el-icon-delete-solid"
						circle
						@click="onDelete(img)"
						:loading="img.loading"></el-button>
					</div>
				</el-col>
			</el-row>
			<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="totalCount"
			  :page-size="pageSize"
			  @current-change="onPageChange"
			  style="margin-top: 20px;"
			  :current-page.sync="page">
			</el-pagination>
		</el-card>
		<!-- 上传的图片框 -->
		<el-dialog title="上传素材" :visible.sync="dialogVisible" :append-to-body="true" width="30%">
			<el-upload 
			class="upload-image" 
			drag 
			action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images" 
			multiple
			name="image"
			:headers="uploadHeaders"
			:on-success="onUploadSuccess"
			v-if="dialogVisible">
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getImages,
		collectImage,
		deleteImage
	} from '@/api/image'
	export default {
		name: 'ImageIndex',
		components: {},
		props: {},
		data() {
			const user = JSON.parse(window.localStorage.getItem('user'))
			return {
				collect: false,
				images: [],
				dialogVisible: false,
				uploadHeaders: {
					Authorization: `Bearer ${user.token}`
				},
				totalCount: 0,
				pageSize: 20,
				page: 1
			}
		},
		computed: {},
		watch: {},
		created() {
			this.loadImages(1)
		},
		mounted() {},
		methods: {
			loadImages(page) {
				this.page = page //重置高亮页码
				getImages({
					collect: this.collect,
					page,
					per_page: this.pageSize
				}).then(res => {
					const results = res.data.data.results
					results.forEach(img => {
						img.loading = false
					})
					this.images = results
					this.totalCount = res.data.data.total_count
					
				})
			},
			//上传成功
			onUploadSuccess() {
				this.dialogVisible = false
				this.loadImages(1)
				this.$message({
					type: 'success',
					message: '上传成功'
				})
			},
			onPageChange(page) {
				this.loadImages(page)
			},
			onCollect(img) {
				//展示Loading
				img.loading = true
				collectImage(img.id, !img.is_collected).then(res => {
					img.is_collected = !img.is_collected
					//关闭loading
					img.loading = false
				})
			},
			onDelete(img){
				img.loading = true
				deleteImage(img.id).then(res => {
					img.loading = false
					this.loadImages(this.page)
					this.$message({
						type: 'success',
						message: '删除成功'
					})
					
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.select-btn {
		display: flex;
		justify-content: space-between;
		padding-bottom: 20px;
	}	
	.image-item {
		position: relative
	}
	.image-action {
		height: 40px;
		background-color: rgba(204, 204, 204, .5);
		position: absolute;
		bottom: 4px;
		left: 5px;
		right: 5px;
		
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		color: #fff;
		
	}
</style>
