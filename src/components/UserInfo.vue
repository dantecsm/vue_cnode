<template>
	<div class='UserInfo'>
		<div class='loading' v-if="isLoading">
			<img src="../assets/loading.gif">
		</div>
		<div class='userInformation' v-else>
			<section class='info'>
				<div class='cardHead'>
					<span>主页 /</span>
				</div>
				<div class='cardBody'>
					<div class='userDetail'>
						<img class='userImg' :src="details.avatar_url" :title="details.loginname" alt="">
						<span class='userName'>{{details.loginname}}</span>
					</div>
					<p>{{details.score}} 积分</p>
					<p class='collections'>130个话题收藏</p>
					<div>
						<p class='homePage'>main：http://atian25.github.io</p>
						<p>loca：阿里游戏 | 广州</p>
						<p class='github'>gith：@atian25</p>
						<p class='weibo'>weib：http://weibo.com/liuyong25</p>
					</div>
					<p class='regTime'>注册时间 {{details.create_at | formatDate}}</p>
				</div>
			</section>
			<section class='recent'>
				<div class="cardHead">
					<span>最近创建的话题</span>
				</div>
				<div class='cardBody'>
					<ul>
						<li class='post' v-for="topic in topiclimitby5">
							<img :src="topic.author.avatar_url" :title="topic.author.loginname" alt="">
							<div>
								<span class='stat'>
									<span class='replyNum'>51</span>/<span class='visitNum'>5540</span>
								</span>
								<span class='good'>精华</span>
							</div>
							<router-link :to="{name: 'post_content', params: {id:topic.id, name:topic.author.loginname}}"><a href="#">{{topic.title}}</a></router-link>
							<span class="date">{{topic.last_reply_at | formatDate}}</span>
						</li>
					</ul>
				</div>
				<div class='forMore'>
					<span>查看更多》</span>
				</div>
			</section>
			<section class='recent'>
				<div class="cardHead">
					<span>最近参与的话题</span>
				</div>
				<div class='cardBody'>
					<ul>
						<li class='post' v-for="reply in replylimitby5">
							<img :src="reply.author.avatar_url" :title="reply.author.loginname" alt="">
							<div><span class='stat'>
								<span class='replyNum'>51</span>/<span class='visitNum'>5540</span> </span>
								<span class='good'>精华</span></div>
								<router-link :to="{name: 'post_content', params: {id:reply.id, name:reply.author.loginname}}"><a href="#">{{reply.title}}</a></router-link>
								<span class="date">{{reply.last_reply_at | formatDate}}</span>
							</li>
						</ul>
					</div>
					<div class='forMore'>
						<span>查看更多》</span>
					</div>
				</section>
			</div>
		</div>
	</template>

	<script>
		export default {
			name: "UserInfo",
			data() {
				return {
					isLoading: false,
				details: {} //当前用户所有信息
			}
		},
		methods: {
			getUserInfo () {
				this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
				.then(res => {
					if (res.data.success === true) {
						this.details = res.data.data
						this.details.recent_topics = this.details.recent_topics.slice(0, 5)
						this.details.recent_replies = this.details.recent_replies.slice(0, 5)
						this.isLoading = false
					}
				})
				.catch(err => {
					console.log(err)
				})
			}
		},
		computed: {
			topiclimitby5() {
				if(this.details.recent_topics) {
					return this.details.recent_topics.slice(0, 5)
				}
			},
			replylimitby5() {
				if(this.details.recent_replies) {
					return this.details.recent_replies.slice(0, 5)
				}
			}
		},
		beforeMount () {
			this.isLoading = true
			this.getUserInfo()
		}
	}
</script>

<style scoped>
	* {
		box-sizing: border-box;
	}
	img {
		border: 1px solid;
		width: 30px;
		height: 30px;
		cursor: pointer;
	}
	.userImg {
		width: 40px;
		height: 40px;
	}
	.UserInfo {
		padding-bottom: 50px;
	}
	section {
		width: 910px;
		margin: auto;
		margin-top: 12px;
		border-radius: 2px;
		background-color: #fff;
		font-size: 14px;
	}
	section.info {
		margin-top: 14px;
	}
	section >.cardHead {
		color: #80bd01;
		background-color: #f6f6f6;
		padding: 11px;
		border-bottom: 1px solid #e5e5e5;
	}
	section.info >.cardBody {
		height: 284px;
		padding: 10px;
	}
	.userDetail {
		position: relative;
	}
	.userName {
		position: absolute;
		margin-left: 10px;
	}
	.userName,
	.collections,
	.homePage,
	.github,
	.weibo {
		color: #778087;
	}
	.regTime {
		color: #ababab;
	}
	section.info p {
		padding: 5px;
	}
	section.info .regTime {
		margin-top: 9px;
	}
	section.recent .cardHead,
	section.recentReply .cardHead {
		color: #444;
	}
	section.recent >.cardBody {
		min-height: 255px;
		padding: 0;
	}
	section.recent li {
		height: 50px;
		padding: 10px 20px;
		border-bottom: 1px solid #f0f0f0;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}
	section.recent img {
		margin-right: 10px;
	}
	section.recent >.cardBody div {
		min-width: 100px;
		height: 30px;
		padding-top: 3px;
	}
	section.recent .replyNum{
		color: #9e78c0;
		font-size: 10px;
	}
	section.recent .visitNum{
		color: #b4b4b4;
		font-size: 10px;
	}
	section.recent .good {
		color: white;
		background-color: #80bd01;
		font-size: 12px;
		padding: 2px 3px;
		border-radius: 3px;
	}
	section.recent a {
		font-size: 15px;
		color: #0088cc;
		text-decoration: none;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		flex-grow: 1;
		padding-right: 2em;
	}
	section.recent a:hover {
		color: #005580;
		text-decoration: underline;
	}
	section.recent .date {
		white-space: nowrap;
		font-size: 11px;
		color: #777;
	}
	section.recent .date:hover {
		color: #005580;
	}
	section.recent .forMore {
		color: #666;
		height: 40px;
		padding: 10px;
	}
</style>