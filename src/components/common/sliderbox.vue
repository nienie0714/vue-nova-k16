<template>
  <div class="card">
    <!-- 卡片上半部分 -->
    <div class="card-top">
      <!-- 卡片：标题+内容 -->
      <div class="card-title">
        {{title}}
      </div>
      <div class="card-btm">
        <div class="innum"><input type="text" v-model.number="value2"></div>
        <div class="inimggroup">
          <div class="inimg" @click="decrease">
            <img v-if="notmin" src="@/assets/icon/icon_low_normal.png" alt="">
            <img v-else src="@/assets/icon/icon_low_normal.png" alt="">
          </div>
          <div class="inimg" @click="increase">
            <img v-if="max" src="@/assets/icon/icon_add_normal.png" alt="">
            <img v-else src="@/assets/icon/icon_add_normal.png" alt="">
          </div>
        </div>
      </div>
      <!-- slider -->
      <div class="block">
        <el-slider v-model="value2" :max="max" :min="min">
          <!--  min=0 max=1920 -->
        </el-slider>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value2: 0,
        notmax: true,
        notmin: true,
      };
    },
    props: {
      title: '',  // 标题
      showslider: '', // 滑动 
      value: '', // 这里必须写value,才能和父组件的v-model对应上  其他普通情况 写父@name的name
      min: { default: 1 },
      max: { default: 100 }
    },
    created() {
      this.value2 = this.value;  // 将父组件传递的值赋值给自组件的data，即value2
    },
    watch: {  // 用于父组件监听值，watch是一个对象，里面包含的都是键值对，function就相当于一个键值对
      value2() {  //-> value2: function(){}    
        this.$emit('input', this.value2); // 自组建向父传递   第一个参数是  父@name  子name  / 父v-model子必须写input  第二个参数是要传递的值
      }
    },
    methods: {
      increase() {
        this.value2++;
      },
      decrease() {
        this.value2--;
      }
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
    &.active {
      height: 160 + 180px;
      // position: absolute;
    }
    &-top {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background-color: #1f2a51; // 背景色
      color: rgba(255, 255, 255, 1);
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
        }
        .up {
          transform: rotate(180deg);
        }
      }
      .card-btm {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .innum {
          flex: 1;
        }
        .inimggroup {
          display: flex;
          justify-content: flex-end;
          .inimg {
            width: 50px;
            height: 32px;
            border: 1px solid white;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
            cursor: pointer;
          }
        }
      }
      &.active {
        z-index: 12;
      }
    }
  }
  input {
    border: none;
    width: 50%;
    font-size: 24px;
    background-color: #1f2a51;
    color: white;
  }
</style>

