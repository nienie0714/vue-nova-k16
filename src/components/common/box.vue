<template>
  <div class="card">
    <!-- 卡片上半部分 -->
    <div class="card-top">
      <!-- 卡片：标题+内容 -->
      <div class="card-icon" @click="dropcard = !dropcard" v-if="showdrop">
        <transition name="bounce">
          <span v-if="dropcard"><img src="@/assets/icon/u343.png" alt=""></span>
          <span v-else><img src="@/assets/icon/u389.png" alt=""></span>
        </transition>
      </div>
      <div class="card-title" v-if="showtitle">
        {{title}}
      </div>
      <div class="card-btm" v-if="showcontent">
        {{content}}
      </div>
      <!-- slider -->
      <div class="block" v-if="showslider">
        <input type="text" v-model.number="value2">
        <el-slider v-model="value2">
        </el-slider>
      </div>
    </div>
    <!-- 卡片下拉框 -->
    <div class="card-drop" :class="{actives: dropcard}">
      <div v-for="item in list">{{item}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dropcard: false,
        value2: 0
      };
    },
    props: [
      'showdrop',     // 控制上下三角号是否显示
      'showtitle',    // 控制标题显示
      'showcontent',  // 控制内容显示
      'title',        // 标题
      'content',      // 内容
      'list',         // 下拉菜单列表
      'showslider',   // 滑动 
      'value'         // 这里必须写value,才能和父组件的v-model对应上  其他普通情况 写父@name的name
    ],
    created() {
      this.value2 = this.value;  // 将父组件传递的值赋值给自组件的data，即value2
    },
    methods: {

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
    box-sizing: border-box;
    width: 240px;
    height: 123px;
    display: flex;
    flex-direction: column;
    position: relative;
    &-top {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background-color: rgba(58, 62, 71, 1);
      font-size: 14px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 2px;
      padding: 15px 10px;
      z-index: 10;
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
      }
      .card-btm {
        width: 100%;
      }
    }
    &-drop {
      width: 240px;
      height: 123px;
      // padding: 15px 10px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 1);
      color: rgba(0, 0, 0, 1);
      transition: all 0.3s;
      position: absolute;
      left: 0;
      top: 0;
      overflow-y: auto;
      cursor: pointer;
      > div {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        transition: 0.3s;
      }
      > div:hover {
        color: #ff6700;
        background: #ccc;
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
    .actives {
      left: 0;
      top: 125px;
    }
  }
  input {
    border: none;
  }
</style>

