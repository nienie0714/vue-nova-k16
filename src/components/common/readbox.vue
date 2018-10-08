<template>
  <div class="card" :class="{active: dpActive}">
    <!-- 卡片上半部分 -->
    <div class="card-top" :class="{active: dpActive}">
      <!-- 卡片：标题+内容 -->
      <div class="card-title">
        {{title}}
      </div>
      <div class="card-btm">
        {{defaultcontent}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dropcard: false,
        open2: false,
        dpActive: false,
      };
    },
    props: [
      'title',               // 标题
      'defaultcontent',      // 内容
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
    border: 1px solid #525972; // 只读只有边框
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
      .card-icon {
        float: right;
        img {
          width: 20px;
          height: 20px;
          transform: rotate(0);
          transition: all 0.3s;
        }
        .up {
          transform: rotate(180deg);
        }
      }
      .card-btm {
        width: 100%;
        font-size: 24px;
        margin-bottom: 15px;
      }
      &.active {
        z-index: 11;
      }
    }
    &-drap-wrap {
      height: 250px;
      position: absolute;
      top: 100%;
      overflow: hidden;
      width: 100%;
      z-index: -1;
      &.dpActive {
        z-index: 12;
      }
    }
    &-drop {
      width: 100%;
      max-height: 250px;
      min-height: 100px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 1);
      color: rgba(0, 0, 0, 1);
      transition: all 0.3s;
      transform: translateY(-100%);
      overflow-y: auto;
      cursor: pointer;
      > div {
        font-size: 14px;
        width: 100%;
        padding: 4px;
        box-sizing: border-box;
        transition: all 0.3s;
      }
      > div:hover {
        color: #ff6700;
        background: #ccc;
      }
      &.active {
        transform: translateY(0);
      }
    }
    &-drop::-webkit-scrollbar {
      width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }
    &-drop::-webkit-scrollbar-thumb {
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(212, 166, 166, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }
    &-drop::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
  }
  input {
    border: none;
  }
</style>

