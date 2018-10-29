<template>
  <div class="wrapper-container">
    <!-- <div ref="wrapper" class="wrapper" :class="{subactive: subactive || mask}"> -->
    <div class="wrapper" :class="{subactive: subactive}">
      <v-header :showName="islogin"></v-header>
      <div class="contentwrapper">
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <div :class="{subactive: subactive}"></div>
    <template v-if="islogin">
      <v-floating :subactive.sync="subactive"></v-floating>
    </template>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        subactive: false,
        islogin: false,
        mask: false
      }
    },
    created() {
      if(this.$route.path == "/login") {
        this.islogin = false;
      } else {
        this.islogin = true;
      }
    },
    computed: {
    },
    watch: {
      '$route.path'(val) {
        if(this.$route.path == "/login") {
          this.islogin = false;
        } else {
          this.islogin = true;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .wrapper-container {
    height: 100%;
  }

  .subactive {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(10px);
  }
</style>
