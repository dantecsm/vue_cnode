<template>
  <div id="app">
    <Header/>
    <div class="main">
      <router-view name="slideBar"></router-view>
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header'
  export default {
    name: 'App',
    components: {
      Header
    }
  }
</script>

<style>
  body {
    background: #e1e1e1;
    padding-bottom: 40px;
  }
  body.yellow {
    background: #e1e1e1 url(https://news.toranoana.jp/wp-content/uploads/2018/09/patter-2.png) center center fixed;
  }
  * {
    margin: 0;
    padding: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  ul, ol {
    list-style: none;
  }
  .loading {
    width: 50px;
    height: 50px;
    margin: 40vh auto 60vh auto;
  }
  .main {
    max-width: 1366px;
	margin: auto;
  }
</style>
