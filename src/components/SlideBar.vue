<template>
	<div class="authorinfo">
		<div class="authorsummary">
			<div class='topBar'>作者</div>
			<div class='userDetail'>
				<router-link :to="{name: 'user_info', params: {name:userinfo.loginname}}">
					<img :src="userinfo.avatar_url">
				</router-link>
				<span class='loginname'>{{userinfo.loginname}}</span>
				<span class='score'>{{userinfo.score}} 积分</span>
			</div>
				
		</div>
		<div class="recent_replies">
			<div class='topBar'>作者最近主题</div>
			<ul>
				<li v-for="list in topiclimitby5">
					<router-link :to="{name: 'post_content', params: {id:list.id, name:list.author.loginname}}">
						{{list.title}}
					</router-link>
				</li>
			</ul>
		</div>
		<div class="recent_topics">
			<div class='topBar'>作者最近回复</div>
			<ul>
				<li v-for="list in replylimitby5">
					<router-link :to="{name: 'post_content', params: {id:list.id, name:list.author.loginname}}">
						{{list.title}}
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SlideBar',
		data() {
			return {
				userinfo: {}
			}
		},
		methods: {
			getData () {
				this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
				.then (res => {
					this.userinfo = res.data.data
					this.isLoading = false
					console.log(this.userinfo)
				})
				.catch (err => {
					console.log(err)
				})
			}
		},
		computed: {
			topiclimitby5() {
				if(this.userinfo.recent_topics) {
					return this.userinfo.recent_topics.slice(0, 5)
				}
			},
			replylimitby5() {
				if(this.userinfo.recent_replies) {
					return this.userinfo.recent_replies.slice(0, 5)
				}
			}
		},
		beforeMount() {
			this.isLoading = true
			this.getData()
		},
		watch: {
			'$route'(to, from) {
				this.getData()
			}
		}
	}
</script>

<style scoped>
.authorsummay, .recent_replies, .recent_topics,.userDetail {
    background-color: #fff;
  }
  .authorinfo {
    width: 328px;
    float: right;
    margin-right: 20px;
    margin-top: 0;
  }
  li{
    padding: 3px 0 ;
  }
  .recent_replies ul, .recent_topics ul {
    margin-top: 0px;
    margin-bottom: 0px;
    list-style: none;
    padding-left: 14px;
  }

  ul a {
    font-size: 12px;
    text-decoration: none;
    color: #778087;
  }

  .topBar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 16px;
    font-size: 12px;
    margin-top: 10px;
  }

  img {
    height: 48px;
    width: 48px;
    border-radius: 3px;
    margin: 10px;
  }

  .loginname {
    width: 100px;
    float: right;
    margin-top: 22px;
    margin-right: 159px;
    font-size: 14px;
  }

  .loginname a {
    text-decoration: none;
    color: #778087;
  }

  .authorsummay .topbar {
    margin-top: 0px;
  }
</style>