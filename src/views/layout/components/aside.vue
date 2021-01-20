<template>
	<div style="background-color: #002033;">
		<div class="div-image">
			<el-image class="aside-image" :src="require('@/assets/aside_icon.png')" fit="scale-down"></el-image>
		</div>

		<el-menu class="nav-menu" default-active="/" background-color="#002033" text-color="#fff" active-text-color="#ffd04b"
		 router>
			<el-menu-item index="/">
				<i class="el-icon-s-home"></i>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-menu-item index="/article">
				<i class="el-icon-document"></i>
				<span slot="title">内容管理</span>
			</el-menu-item>
			<el-menu-item index="/image">
				<i class="el-icon-picture"></i>
				<span slot="title">素材管理</span>
			</el-menu-item>
			<el-menu-item index="/publish">
				<i class="iconfont icon-publish"></i>
				<span slot="title">发布文章</span>
			</el-menu-item>
			<el-menu-item index="/comment">
				<i class="el-icon-s-comment"></i>
				<span slot="title">评论管理</span>
			</el-menu-item>
			<el-menu-item index="/fans">
				<i class="el-icon-setting"></i>
				<span slot="title">粉丝管理</span>
			</el-menu-item>
			<el-menu-item index="/settings">
				<i class="el-icon-setting"></i>
				<span slot="title">个人设置</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		name: 'AppAside',
		components: {},
		props: {},
		data() {
			return {}
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {},
		methods: {}
	}
</script>

<style scoped lang="less">
	.nav-menu {
		.iconfont {
			margin-right: 10px;
			padding-left: 5px;
		}
	}
	.div-image{
		vertical-align: bottom;
		margin-left: 20px;
		width: 100%;
		height: 40px;
		.aside-image {
			width: 100px;
			height: 60px;
			
		}
	}
	
</style>
