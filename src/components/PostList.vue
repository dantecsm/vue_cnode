<template>
	<div class="postList">
		<!-- 在数据未返回的时候显示加载 -->
		<div class="loading" v-if="isLoading">
			<img src="../assets/loading.gif">
		</div>
		<!-- 帖子列表 -->
		<div class="posts">
			<!-- 分类导航 -->
			<div class='topNavBar'>
				<span class='selected'><a data-tab="" @click="select">全部</a></span>
				<span><a data-tab="good" @click="select">精华</a></span>
				<span><a data-tab="share" @click="select">分享</a></span>
				<span><a data-tab="ask" @click="select">问答</a></span>
				<span><a data-tab="job" @click="select">招聘</a></span>	
			</div>
			<ul>
				<!-- 单条帖子 -->
				<li class="post" v-for="post in posts">
					<!-- 用户头像 -->
					<router-link :to="{name: 'user_info', params: {name: post.author.loginname}}">
						<img :src="post.author.avatar_url">
					</router-link>
					<!-- 回复量，浏览数 -->
					<span class="num">
						<span class="reply_count">{{post.reply_count}}</span>/<span class="visit_count">{{post.visit_count}}</span>
					</span>
					<!-- 帖子分类 -->
					<span :class="[{tab: true, good:(post.good ==true), top:(post.top == true), norm:(!post.good && !post.top)}]">
						{{post | tagFormatter}}
					</span>
					<!-- 帖子标题 -->
					<router-link :to="{name: 'post_content', params: {id: post.id,name:post.author.loginname}}">
						<span class="title">
							{{post.title}}
						</span>
					</router-link>
					<!-- 最后时间 -->
					<span class="last_reply">
						{{post.last_reply_at | formatDate}}
					</span>
				</li>
				<li>
					<pagination @changePage="renderList"/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import pagination from './Pagination'
	export default {
		name: 'PostList',
		data() {
			return {
				isLoading: false,
				posts: [],
				postPage: 1
			}
		},
		components: {
			pagination
		},
		methods: {
			getData() {
				this.$http.get('https://cnodejs.org/api/v1/topics', {
					params: {
						page: this.postPage,
						limit: 20	
					}
				})
				.then(res => {
					this.isLoading = false
					this.posts = res.data.data
				})
				.catch(err => {
					console.log(err)
				})
			},
			select(e) {
				// 改样式
				e.preventDefault()
				let current = e.currentTarget.parentNode
				let parent = e.currentTarget.parentNode.parentNode
				let siblings = parent.querySelectorAll('span')
				for(let i=0; i<siblings.length; i++) {
					siblings[i].classList.remove('selected')
				}
				current.classList.add('selected')
				// 取数据
				let tab = e.currentTarget.dataset.tab
				this.$http.get('https://cnodejs.org/api/v1/topics', {
					params: {
						page: this.postPage,
						limit: 20,
						tab	
					}
				})
				.then(res => {
					this.posts = res.data.data
				})
				.catch(err => {
					console.log(err)
				})
			},
			renderList(page) {
				this.postPage = page
				this.getData()
			}
		},
		beforeMount() {
			this.isLoading = true
			this.getData()
		}
	}
</script>

<style scoped>
	ul {
		list-style: none;
	}
	a {
		color: inherit;
		text-decoration: none;
	}
	.posts {
		max-width: 910px;
		background-color: #fff;
		margin: 15px auto;
	}
	.posts >.topNavBar {
		height: 27px;
		background-color: #f6f6f6;
		padding: 9px 0 4px 20px;
	}
	.posts >.topNavBar >span{
		font-size: 13px;
		line-height: 13px;
		padding: 2px 4px;
		margin: 0 13px;
		border-radius: 4px;
		cursor: pointer;
	}
	.posts >.topNavBar >span:hover {
		color: #005580;
	}
	.posts >.topNavBar >span.selected {
		background-color: #80bd01;
	}
	.posts >.topNavBar >span.selected >a {
		color: #fff;
	}
	.posts >.topNavBar a {
		text-decoration: none;
		color: #80bd01;
	}
	.posts >.topNavBar a:hover {
		color: #4f78b2;
	}
	.posts >ul >.post {
		position: relative;
		border-bottom:1px solid #f0f0f0;
		height: 50px;
		line-height: 50px;
		padding-left: 45px;
	}
	.posts >ul >.post:hover {
		background-color: #e1e1e1;
	}
	.post img {
		position: absolute;
		width: 30px;
		cursor: pointer;
		top: 10px;
		left: 10px;
	}
	.post >.num {
		display: inline-block;
		text-align: center;
		width: 60px;
		font-size: 8px;
	}
	.post >.num >.reply_count {
		color: #9e78c0;
	}
	.post >.tab {
		padding: 2px 0 2px 2px;
		font-size: 8px;
		line-height: 8px;
		margin-right: 6px;
	}
	.post >.norm {
		background-color: #e5e5e5;
		color: #a3a3b9;
	}
	.post >.tab.top {
		color: #fff;
		background-color: #80bd01;
	}
	.post >.tab.good {
		color: #fff;
		background-color: #80bd01;
	}
	.post .title {
		display: inline-block;
		white-space: nowrap;
		font-size: 15px;
		line-height: 15px;
		max-width: 50vw;
		overflow: hidden;;
		cursor: pointer;
	}
	.post .title:hover {
		text-decoration: underline;
	}
	.post .last_reply {
		float: right;
		font-size: 9px;
		margin-right: 9px;
	}
</style>