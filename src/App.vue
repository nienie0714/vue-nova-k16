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
  #app {
    background: url('./assets/img_BG.png') center center no-repeat / cover;
  }
  @import '../static/css/main.less';
</style>