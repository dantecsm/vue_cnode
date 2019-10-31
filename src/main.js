// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import App from './App'
import router from './router'

Vue.prototype.$http = Axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  beforeMount() {
  	document.title = 'CNode: Node.js专业中文社区'
  }
})

Vue.filter('formatDate', function(str) {
	if (!str) {
		return ''
	}
	var date = new Date(str)
	var time = (new Date().getTime() - date.getTime()) / 1000
	if (time < 0) {
		return ''
	} else if (time < 30) {
		return '刚刚'
	} else if (time < 60) {
		return `${parseInt(time)} 秒前`
	} else if (time / 60 < 60) {
		return `${parseInt(time / 60)} 分钟前`
	} else if (time / 3600 < 24) {
		return `${parseInt(time / 3600)} 小时前`
	} else if (time / 86400 < 31) {
		return `${parseInt(time / 86400)} 天前`
	} else if (time / 2592000 < 12) {
		return `${parseInt(time / 2592000)} 月前`
	} else {
		return `${parseInt(time / 31536000)} 年前`
	}
})

Vue.filter('tagFormatter', function(post) {
	if(post.top === true) {
		return '置顶'
	}else if(post.good === true) {
		return '精华'
	}else if(post.tab === 'ask') {
		return '问答'
	}else if(post.tab === 'share') {
		return '分享'
	}else {
		return '招聘'
	}
})