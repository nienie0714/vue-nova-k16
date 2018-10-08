<template>
  <div class="card">
    <!-- 卡片上半部分 -->
    <div class="card-top">
      <!-- 卡片：标题+内容 -->
      <div class="card-title">
        {{title}}
      </div>
      <div class="card-btm">
        <div class="innum">
          <input v-model="value3" oninput="value=value.replace(/[^\d]/g,'')" @blur="handleBlur">
        </div>
        <div class="inimggroup">
          <div class="decrease" @click="decrease" :class="{disabled: value2 <= min}">
          </div>
          <div class="increase" @click="increase" :class="{disabled: value2 >= max}">
          </div>
        </div>
      </div>
      <!-- slider -->
      <div class="block">
        <el-slider v-model="value2" :max="max" :min="min" :step="step" @change="handleChange">
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
        value3: 0
      };
    },
    props: {
      title: '',  // 标题
      showslider: '', // 滑动 
      value: '', // 这里必须写value,才能和父组件的v-model对应上  其他普通情况 写父@name的name
      min: { default: 1 },
      max: { default: 100 },
      step: { default: 1 }
    },
    created() {
      this.value2 = this.value;  // 将父组件传递的值赋值给自组件的data，即value2
      this.value3 = this.value;
    },
    watch: {  // 用于父组件监听值，watch是一个对象，里面包含的都是键值对，function就相当于一个键值对
      value3(val) {  //-> value2: function(){}    
        if(val) {
          this.value3 = Math.min(parseInt(val), this.max);
          this.value2 = this.value3;
          // 自组建向父传递   第一个参数是  父@name  子name  / 父v-model子必须写input  第二个参数是要传递的值
        }
      },
      value2(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      increase() {
        if(this.value2 >= this.max) {
          return false;
        }
        this.value2 += this.step;
        this.value3 = this.value2;
      },
      decrease() {
        if(this.value2 <= this.min) {
          return false;
        }
        this.value2 -= this.step;
        this.value3 = this.value2;
      },
      getNumber() {
        console.log(this.value2);
      },
      handleBlur() {
        let result = this.value3;

        if(result) {
          if(result < this.min) {
            this.value3 = this.min;
            return false;
          }

          if(this.step > 1 && result % this.step == this.step / 2) {
            result--;
          }
          this.value3 = Math.round(result / this.step) * this.step;
        } else {
          this.value3 = this.min;
        }

        console.log(this.value3);
      },
      handleChange() {
        this.value3 = this.value2;
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
      margin-bottom: 2px;
      padding: 30px 20px 20px 20px;
      z-index: 1;
      .card-title {
        width: 90%;
        font-size: 20px;
        margin-bottom: 15px;
        font-size: 20px;
        color: #acacc7;
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
        font-size: 24px;
        color: #f8f8f8;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .innum {
          flex: 1;
        }
        .inimggroup {
          display: flex;
          .decrease {
            width: 50px;
            height: 32px;
            border: 1px solid #525972;
            border-right: none;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
            cursor: pointer;
            background-position: center center;
            background-image: url('~assets/icon/icon_low_normal.png');
            background-repeat: no-repeat;
            &.disabled {
              background-image: url('~assets/icon/icon_low_forbidden.png');
              cursor: not-allowed;
            }
          }
          .increase {
            width: 50px;
            height: 32px;
            border: 1px solid #525972;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
            cursor: pointer;
            background-position: center center;
            background-image: url('~assets/icon/icon_add_normal.png');
            background-repeat: no-repeat;
            &.disabled {
              background-image: url('~assets/icon/icon_add_forbidden.png');
              cursor: not-allowed;
            }
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

