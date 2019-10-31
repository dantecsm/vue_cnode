<template>
	<div class='pagination'>
		<button @click="first">首页</button>
		<button @click="prev">上一页</button>
		<button v-if="currentPage>=4" class="pagebtn">...</button>
		<button v-for="btn in pagebtns" :class="[{currentPage:btn===currentPage}, 'pagebtn']" @click="selectPage">{{btn}}</button>
		<button class="pagebtn">...</button>
		<button @click="next">下一页</button>
	</div>
</template>

<script>
	export default {
		name: 'Pagination',
		data() {
			return {
				currentPage: 1
			}
		},
		methods: {
			selectPage(e) {
				let el = e.currentTarget
				this.currentPage = parseInt(el.innerText)
			},
			prev() {
				this.currentPage -= 1
				if(this.currentPage <= 0) {
					this.currentPage = 1
				}
			},
			next() {
				this.currentPage += 1
			},
			first() {
				this.currentPage = 1
			}
		},
		computed: {
			pagebtns() {
				let p = this.currentPage
				if(p >= 4) {
					return [p -2, p -1, p, p + 1, p + 2]
				} else {
					return [1, 2, 3, 4, 5]
				}
			}
		},
		watch: {
			currentPage(val) {
				this.$emit('changePage', val)
			}
		}
	}
</script>

<style scoped>
	.pagination {
    margin-top: 5px;
    margin-bottom: 20px;
    background-color: white;
    padding: 6px 20px;
    border-radius: 5px;
    box-shadow:0 0 1px 1px #eee;
  }

  button {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #778087;
    border-radius: 3px;
    outline: none;
    height: 21px;
    cursor: pointer;
    padding: 0 2px;
    width: 55px;
    height: 29px;
  }

  .pagebtn {
    position: relative;
    bottom: 1px;
    width: 40px;
    margin: 0 4px;
  }

  .currentPage {
    color: white;
    background-color: #1f1b1b;

  }
</style>