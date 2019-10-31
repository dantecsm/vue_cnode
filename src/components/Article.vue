<template>
	<div class='article'>
		<!-- 加载动画 -->
		<div class='loading' v-if='isLoading'>
			<img src="../assets/loading.gif">
		</div>
		<div v-else>
			<!-- 以下是文章区 -->
			<div class='topicHeader'>
				<h3 class='topicTitle'>{{post.title}}</h3>
				<ul class='topicInfo'>
					<li>•  发布于 {{post.create_at | formatDate}}</li>
					<li>•  作者 {{post.author.loginname}}</li>
					<li>•  {{post.visit_count}} 次浏览</li>
					<li>•  来自 {{post | tagFormatter}}</li>
				</ul>
				<hr>
				<div v-html='post.content' class='topicContent'></div>
			</div>
			<!-- 以下是回复区 -->
			  <div class="wrapper">
			    <div class="box">{{post.replies.length}} 回复</div>
			    <div class='reply' v-for="(reply, index) in post.replies">
			      <router-link :to="{name: 'user_info',params: {name: reply.author.loginname}}">
			      	<img :src="reply.author.avatar_url">
			      </router-link>
			      <div class='right'>
			        <div class='top'>
			          <router-link :to="{name: 'user_info',params: {name: reply.author.loginname}}">
			          	<span class='x'>{{reply.author.loginname}}</span>
			          </router-link>
			          <span class='y'>
			          <a href='#'>{{index + 1}}楼</a>•<a href='#'>{{reply.create_at | formatDate}}</a>
			          </span>
			          <span class='author' v-if="post.author.loginname === reply.author.loginname">作者</span>
			          <span class='support'>赞 {{reply.ups.length}}</span>
			        </div>
			        <div class='bottom'>
			          <p class='z' v-html='reply.content'></p>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      isLoading: false,
      post: {}, //当前文章所有属性
    };
  },
  methods: {
    getArticleData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          if (res.data.success === true) {
            this.post = res.data.data;
            this.isLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getArticleData();
  },
  watch: {
    $route(to, from) {
      this.getArticleData();
    }
  }
};
</script>

<style scoped>
@import url("../assets/markdown-github.css");
.topicHeader {
  max-width: 910px;
  margin: 15px;
  background-color: #fff;
  padding: 23px 11px 0 11px;
  border-radius: 7px;
}
.topicHeader > .topicInfo {
  display: flex;
  font-size: 11px;
  color: #838383;
  padding: 15px 11px 11px 11px;
}
.topicHeader > .topicInfo > li {
  padding: 0 0.25em;
}
.box {
  background-color: #f6f6f6;
  margin-top: 16px;
}
.wrapper {
  width: 930px;
  margin: 15px;
}

.box {
  padding: 13px;
  font-size: 13px;
}
.reply {
  background-color: #f4fcf0;
  width: 910px;
  min-height: 60px;
  padding: 10px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}
.wrapper img {
  width: 30px;
  height: 30px;
  float: left;
}
.right {
  display: inline-block;
  margin-left: 10px;
  width: 865px;
}
.x {
  font-size: 9px;
  color: #666;
  font-weight: bold;
}
.y {
  font-size: 12px;
  color: #08c;
}
.support {
  float: right;
  color: #808080;
}
.bottom {
  padding-left: 10px;
}
.z {
  font-size: 15px;
}
.author {
  display: inline-block;
  text-align: center;
  line-height: 18px;
  width: 28px;
  height: 18px;
  color: white;
  background-color: #6ba44e;
  font-size: 10px;
}
</style>