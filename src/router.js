import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
Vue.use(VueRouter)

// 路由配置表
const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/',
		component: Layout,
		children: [
			{
				path: '',
				name: 'home',
				component: Home
			}
		]
	}
]

const router = new VueRouter({
  routes
})

export default router