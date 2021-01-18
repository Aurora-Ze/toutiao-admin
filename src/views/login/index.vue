<template>
	<div class="login-container">
		<div class="login-form-wrap">
			<div class="login-head">
				<div class="logo"></div>
			</div>
			<el-form class="login-form" ref="form" :model="user">
				<el-form-item>
					<el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="user.code" placeholder="请输入验证码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-button class="login-btn" type="primary" @click="onLogin()"
					:loading="loginLoading">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import request from '@/utils/request.js'
	export default {
		name: 'LoginIndex',
		components: {},
		props: {},
		data() {
			return {
				user: {
					mobile: '', // 手机号
					code: '' // 验证码
				},
				checked: false ,// 是否同意协议的选中状态
				loginLoading: false
			}
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {},
		methods: {
			onLogin() {
				const user = this.user
				
				//开启加载
				this.loginLoading = true
				
				request({
					method: 'POST',
					url: '/app/v1_0/authorizations',
					data: user
				}).then(res => {
					console.log(res)
					
					//登录成功
					this.$message({
					  message: '恭喜你，登录成功',
					  type: 'success'
					})
					
					//关闭加载
					this.loginLoading = false
				}).catch(err => {
					console.log('登录失败', err)
					this.$message.error('登录失败，手机或验证码错误')
					//关闭加载
					this.loginLoading = false
				})


			}
		},
	}
</script>

<style scoped lang="less">
	.login-container {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: url('./login_bg.jpg') no-repeat;
		background-size: cover;

		.login-form-wrap {
			min-width: 300px;
			padding: 30px 50px 10px;
			background-color: #fff;

			.login-head {
				display: flex;
				justify-content: center;

				.logo {
					width: 200px;
					height: 57px;
					background: url('./logo_index.png') no-repeat;
					background-size: contain;
				}
			}

			.login-form {
				.login-btn {
					width: 100%;
				}
			}
		}
	}
</style>
