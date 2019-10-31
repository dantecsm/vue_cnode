<template>
	<div class="header">
		<router-link :to="{name: 'root'}">
			<img src="../assets/cnodejs_light.svg" alt="">
		</router-link>
		<ul>
			<li>
				<router-link :to="{name: 'root'}"><span>首页</span></router-link>
			</li>
			<li><span><router-link :to="{name: 'empty'}">新手入门</router-link></span></li>
			<li><span><router-link :to="{name: 'empty'}">API</router-link></span></li>
			<li><span><router-link :to="{name: 'empty'}">关于</router-link></span></li>
			<li><span><router-link :to="{name: 'empty'}">注册</router-link></span></li>
			<li><span><router-link :to="{name: 'empty'}">登录</router-link></span></li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		methods: {
			jump(url) {
				window.location.href = (url)
			}
		}
	}
</script>

<style scoped>
	.header {
		background-color: #444;
		height: 50px;
		position: relative;
	}
	img {
		max-width: 120px;
		margin-left: 50px;
		margin-top: 10px;
	}
	ul {
		list-style: none;
		display: flex;
		position: absolute;
		right: 5%;
		top: 0;
	}
	li {
		padding: 16px;
	}
	span {
		color: #ccc;
		font-size: 14px;
		text-decoration: none;
		cursor: pointer;
	}
	span:hover {
		color: #fff;
	}
</style>