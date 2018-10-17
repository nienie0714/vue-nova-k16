<template>
  <div>
    <div class="wrapper" :class="{subactive: subactive}">
      <v-header></v-header>
      <div class="contentwrapper">
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
    {{subactive}}
    <v-floating :subactive.sync="subactive"></v-floating>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        subactive: false
      }
    },
    created() {
    },
    computed: {
    }
  }
</script>

<style lang="less" scoped>
  .subactive {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(10px);
  }
</style>
