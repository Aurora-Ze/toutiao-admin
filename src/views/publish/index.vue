<template>
	<div class="publish-container">
		<el-card class="publish-card">
			<div slot="header" class="clearfix">
				<!-- 面包屑 -->
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<!-- 表单 -->
			<el-form class="publish-form" ref="publish-form" :model="article" label-width="60px" size="medium" v-loading="loading"
			 :rules="formRules">
				<el-form-item label="标题" prop="title">
					<el-input v-model="article.title" suffix-icon="el-icon-caret-left" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="content">
					<!-- <el-input v-model="article.content" type="textarea" :autosize="{ minRows: 10, maxRows: 20}" style="width: 700px;"></el-input> -->
					<template>
						<div>
							<el-tiptap v-model="article.content" :extensions="extensions" lang="zh" height="350"></el-tiptap>
						</div>
					</template>
				</el-form-item>
				<el-form-item label="封面">
					<el-radio-group v-model="article.cover.type">
						<el-radio :label="1">单图</el-radio>
						<el-radio :label="3">三图</el-radio>
						<el-radio :label="0">无图</el-radio>
						<el-radio :label="-1">自动</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="频道" prop="channel_id">
					<el-select v-model="article.channel_id" placeholder="请选择频道">
						<el-option :label="channel.name" :value="channel.id" v-for="(channel,index) in channels" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="onPublish(false)">发表</el-button>
					<el-button type="info" @click="onPublish(true)">存入草稿</el-button>
				</el-form-item>
			</el-form>
		</el-card>

	</div>
</template>

<script>
	import {
		ElementTiptap,
		// 需要的 extensions
		Doc,
		Text,
		Paragraph,
		Heading,
		Bold,
		Underline,
		Italic,
		Strike,
		ListItem,
		BulletList,
		OrderedList,
		Image,
		HorizontalRule,
		TodoItem,
		TodoList,
		Fullscreen,
		Preview,
		CodeBlock
	} from 'element-tiptap';
	// import element-tiptap 样式
	import 'element-tiptap/lib/index.css';
	import {
		getArticleChannels,
		addArticle,
		updateArticle,
		getArticle
	} from '@/api/article';
	import {
		uploadImage
	} from '@/api/image';
	export default {
		name: 'PublishIndex',
		components: {
			'el-tiptap': ElementTiptap
		},
		props: {},
		data() {
			return {
				extensions: [
					new Doc(),
					new Text(),
					new Paragraph(),
					new Heading({
						level: 6
					}),
					new Bold({
						bubble: true
					}), // 在气泡菜单中渲染菜单按钮
					new Image({
						uploadRequest(file) {
							const fd = new FormData()
							fd.append('image', file)
							return uploadImage(fd).then(res => {
								console.log(res)
								return res.data.data.url
							})
						}
					}),
					new Underline(), // 下划线
					new Italic(), // 斜体
					new Strike(), // 删除线
					new HorizontalRule(), // 华丽的分割线
					new ListItem(),
					new BulletList(), // 无序列表
					new OrderedList(), // 有序列表
					new TodoItem(),
					new TodoList(),
					new Fullscreen(),
					new Preview(),
					new CodeBlock()
				],
				article: {
					title: '',
					content: '',
					cover: {
						type: 0,
						images: []
					},
					channel_id: null
				},
				channels: [],
				channelId: null,
				loading: true,
				formRules: {
					title: [{
							required: true,
							message: '请输入文章标题',
							trigger: 'blur'
						},
						{
							min: 5,
							max: 30,
							message: '长度在 5 到 30 个字符',
							trigger: 'blur'
						}
					],
					content: [{
							validator(rule, value, callback) {
								if (value === '<p></p>') {
									callback(new Error('请输入文章内容'))
								} else {
									callback()
								}
							}
						},
						{
							required: true,
							message: '请输入文章内容',
							trigger: 'blur'
						}
					],
					channel_id: [{
						required: true,
						message: '请选择文章频道'
					}]
				}
			}
		},
		computed: {},
		watch: {},
		created() {
			this.loadChannels()
			if (this.$route.query.id) {
				this.loadArticle()
			}
		},
		mounted() {},
		methods: {
			loadChannels() {
				this.loading = true
				getArticleChannels().then(res => {
					this.channels = res.data.data.channels
					this.loading = false
				})
			},
			onPublish(draft = false) {
				this.$refs['publish-form'].validate(valid => {
					//校验表单
					if(!valid) {
						return 
					}
					//校验成功的话
					const articleId = this.$route.query.id
					if (articleId) {
						//执行修改
						updateArticle(articleId, this.article, draft).then(res => {
							this.$message({
								message: "修改成功",
								type: "success"
							})
							this.$router.push('/article')
						})
					} else {
						//执行创建
						addArticle(this.article, draft).then(res => {
							this.$message({
								message: "发布成功",
								type: "success"
							})
							this.$router.push('/article')
						})
					}
					
				})
			},
			loadArticle() {
				getArticle(this.$route.query.id).then(res => {
					this.article = res.data.data
				})
			}
		}
	}
</script>
