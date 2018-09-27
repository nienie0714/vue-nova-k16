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
    float: left;
    box-sizing: border-box;
    width: 240px;
    height: 123px;
    margin: 20px 2px 20px 0;
    display: flex;
    flex-direction: column;
    position: absolute;
    border: 2px solid #ddd;
    &-top {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 123px;
      // background-color: rgba(58, 62, 71, 1);
      font-size: 14px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 2px;
      padding: 15px 10px;
      z-index: 1;
      .card-title {
        width: 90%;
        margin-bottom: 10px;
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
      }
      &.active {
        z-index: 11;
      }
    }
    &-drap-wrap {
      height: 180px;
      position: absolute;
      top: 125px;
      overflow: hidden;
      width: 240px;
      z-index: -1;
      &.dpActive {
        z-index: 12;
      }
    }
    &-drop {
      width: 240px;
      max-height: 180px;
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
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
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

