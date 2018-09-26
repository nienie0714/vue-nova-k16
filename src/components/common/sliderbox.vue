<template>
  <div class="card">
    <!-- 卡片上半部分 -->
    <div class="card-top">
      <!-- 卡片：标题+内容 -->
      <div class="card-title">
        {{title}}
      </div>
      <div class="card-btm">
        <input type="text" v-model.number="value2">
      </div>
      <!-- slider -->
      <div class="block">
        <el-slider v-model="value2">
        </el-slider>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value2: 0
      };
    },
    props: [
      'title',               // 标题
      'showslider',          // 滑动 
      'value'                // 这里必须写value,才能和父组件的v-model对应上  其他普通情况 写父@name的name
    ],
    created() {
      this.value2 = this.value;  // 将父组件传递的值赋值给自组件的data，即value2
    },
    watch: {  // 用于父组件监听值，watch是一个对象，里面包含的都是键值对，function就相当于一个键值对
      value2() {  //-> value2: function(){}    
        this.$emit('input', this.value2); // 自组建向父传递   第一个参数是  父@name  子name  / 父v-model子必须写input  第二个参数是要传递的值
      }
    }
  }
</script>
<style lang="less" scoped>
  .card {
    float: left;
    box-sizing: border-box;
    width: 240px;
    height: 123px;
    margin: 2px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    &.active {
      height: 123 + 180px;
      // position: absolute;
    }
    &-top {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 123px;
      background-color: rgba(58, 62, 71, 1);
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
        }
        .up {
          transform: rotate(180deg);
        }
      }
      .card-btm {
        width: 100%;
      }
      &.active {
        z-index: 12;
      }
    }
    &-drop {
      width: 240px;
      height: 100px;
      // padding: 15px 10px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 1);
      color: rgba(0, 0, 0, 1);
      transition: all 3s;
      position: absolute;
      left: 0;
      bottom: 100%;
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
        left: 0;
        bottom: 0px;
      }
      &.dpActive {
        z-index: 11;
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

