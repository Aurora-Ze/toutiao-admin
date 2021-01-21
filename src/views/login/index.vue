<template>
	<div class="login-container">
		<div class="login-form-wrap">
			<div class="login-head">
				<div class="logo"></div>
			</div>
			<el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
				<el-form-item prop="mobile">
					<el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item prop="code">
					<el-input v-model="user.code" placeholder="请输入验证码"></el-input>
				</el-form-item>
				<el-form-item prop="agree">
					<el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-button class="login-btn" type="primary" @click="onLogin()" :loading="loginLoading">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import request from '@/utils/request.js'
	import {
		login
	} from '@/api/user.js'
	export default {
		name: 'LoginIndex',
		components: {},
		props: {},
		data() {
			return {
				user: {
					mobile: '13911111111', // 手机号
					code: '246810', // 验证码
					agree: false, // 是否同意协议的选中状态
				},

				loginLoading: false, // 加载
				formRules: { //表单规则
					mobile: [{
							required: true,
							message: '请输入手机号',
							trigger: 'change'
						},
						{
							pattern: /^1[3|5|7|8|9]\d{9}$/,
							message: '请输入正确的手机号格式',
							trigger: 'change'
						}
					],
					code: [{
							required: true,
							message: '验证码不能为空',
							trigger: 'change'
						},
						{
							pattern: /^\d{6}$/,
							message: '请输入正确的验证码格式',
							trigger: 'change'
						},
					],
					agree: [{
						// 自定义校验规则：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
						// 验证通过：callback()
						// 验证失败：callback(new Error('错误消息'))
						validator: (rule, value, callback) => {
							if (value) {
								callback()
							} else {
								callback(new Error('请同意用户协议'))
							}
						},
						trigger: 'change'
					}]
				}
			}
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {},
		methods: {
			onLogin() {
				// 校验
				this.$refs['login-form'].validate(valid => {
					// 如果表单验证失败，停止请求提交
					if (!valid) {
						return
					}
					// 验证通过，请求登录
					this.login()
				})
			},
			login() {
				const user = this.user
				// 开启加载
				this.loginLoading = true
				// 调用封装的接口
				login(this.user).then(res => {
					console.log(res)
					// 登录成功
					this.$message({
						message: '恭喜你，登录成功',
						type: 'success'
					})
					// 关闭加载
					this.loginLoading = false
					//将后端接口返回的数据进行本地存储
					window.localStorage.setItem('user',JSON.stringify(res.data.data))
					// 跳转到首页
					this.$router.push('/')
					
				}).catch(err => {
					console.log('登录失败', err)
					this.$message.error('登录失败，手机或验证码错误')
					// 关闭加载
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
