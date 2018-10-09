<template>
  <div class="wrapper">
    <v-header></v-header>
    <v-floating></v-floating>
    <div class="contentwrapper">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    created() {
    },
    computed: {
    }
  }
</script>

<style lang="less" scoped>
</style>
