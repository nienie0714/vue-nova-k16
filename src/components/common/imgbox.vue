<template>
  <div class="card" :class="{'hasimg': hasimg, 'active': active}">
    <div class="hoverimg"><img src="~@/assets/icon/icon_img_apply.png" alt=""></div>
    <div v-if="isapply" class="isapply">
      <img src="~@/assets/icon/icon_img_apply.png" alt="">
    </div>
    <!-- 卡片上半部分 -->
    <div class="card-top">
      <!-- 卡片：标题+内容 -->
      <div class="card-title">
        {{title}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      };
    },
    props: [
      'title',               // 标题
      'hasimg',
      'isapply',
      'active'
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
  .card {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    background-color: #2e3c67; // 背景色
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url('~@/assets/icon/icon_none.png');
    &:hover {
      border: 1px solid #febe00;
    }
    .hoverimg {
      // display: none;
      // width: 100px;
      // height: 60px;
      // position: absolute;
      // top: 0px;
      // right: -100px;
      opacity: 0;
      width: 100px;
      height: 60px;
      position: absolute;
      top: 0px;
      right: 0px;
    }
    &:hover .hoverimg {
      // display: block;
      // top: 0px;
      // right: 0px;
      // transition: all 0.5s;
      opacity: 1;
      transition: all 0.5s;
    }
    &.active {
      border: 1px solid #febe00;
    }
    &.hasimg {
      background-image: url('~@/assets/icon/icon_exist.png');
      background-position: center center;
    }
    .isapply {
      width: 100px;
      height: 60px;
      position: absolute;
      top: 0px;
      right: 0px;
    }
    &-top {
      overflow: hidden;
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      color: #adb4cf;
      margin-bottom: 2px;
      padding: 30px 20px 20px 20px;
      z-index: 1;
      .card-title {
        width: 90%;
        font-size: 20px;
        margin-bottom: 15px;
      }
    }
  }
</style>

