<template>
  <div class="card" :class="{'hasimg': hasimg, 'active': active}">
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
    background-color: #1f2a51; // 背景色
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url('~@/assets/icon/icon_none.png');
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

