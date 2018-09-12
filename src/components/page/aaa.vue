<template>
  <div class="aaa">
    <div class="wrapper">
      <v-head></v-head>
      <div class="content-box">
        <div class="snav">
          <img src="@/assets/icon/u343.png" alt="">
          <img src="@/assets/home/u123.svg" alt="">
          <span>输入设置</span>
        </div>
      </div>
      <div class="content">
        <div class="tabs">
          <div class="tab">
            <b>DP</b>
          </div>
          <div class="tab">
            <b>HDMI</b>
          </div>
          <div class="tab">
            <b>SDI</b>
          </div>
          <div class="tab">
            <b>DVI</b>
          </div>
        </div>
        <div class="tabcontent">
          aaa
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import vHead from '../common/header.vue';
  export default {
    name: 'aaa',
    data() {
      return {}
    },
    components: {
      vHead
    },
    created() {
    },
    methods: {
    }
  }

</script>

<style scoped lang="less">
  .snav {
    height: 22px;
    line-height: 22px;
    color: rgba(255, 255, 255, 1);
    img {
      display: inline-block;
      width: 25px;
      height: 25px;
    }
  }
  .tabs {
    .tab {
      display: inline-block;
      margin-right: 3px;
      width: 24.7%;
      height: 50px;
      line-height: 50px;
      text-align-last: center;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(0, 0, 0, 1);
      &:last-child {
        margin-right: 0;
      }
      &:active {
        background-color: rgba(209, 58, 29, 1);
      }
    }
  }
</style>
