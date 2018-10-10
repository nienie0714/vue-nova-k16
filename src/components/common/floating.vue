<template>
  <div class="floatingbtn">
    <img class="floatingicon" src="@/assets/icon/icon_dashboard.png" alt="">
  </div>
  <!-- :class="{subactive: false}" -->
  <!-- <div class="mask">
    <div class="slide-box">
    </div>
  </div> -->
</template>
<script>
  export default {
    data() {
      return {

      };
    },
    props: [

    ],
    methods: {
    },
    created() {

    },
    watch: {

    }
  }
</script>
<style lang="less" scoped>
  .floatingbtn {
    position: fixed;
    right: 0;
    height: 50px;
    line-height: 50px;
  }
</style>

