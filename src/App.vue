<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
  export default {
    data: function() {
      return {
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>


<style lang="less">
  @import '../static/css/main.css';
  @import './style/index.less';

  #app {
    background: url('./assets/img_BG.png') center center no-repeat / cover;
  }
</style>