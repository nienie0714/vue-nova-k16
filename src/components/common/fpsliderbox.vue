<template>
  <div class="card">
    <!-- 卡片上半部分 -->
    <div class="card-top">
      <!-- 卡片：标题+内容 -->
      <div class="card-title">
        {{title}}
      </div>
      <div class="card-btm">
        <div class="silder-input">
          <el-input-number v-model="value" :step="step" :min="min" :max="max" @change="inputChange"></el-input-number>
        </div>
      </div>
      <div class="block">
        <el-slider :max="max" :min="min" :step="step" v-model="value" @change="change" :disabled="disabled">
        </el-slider>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: 0,
        count: 0,
        time: new Date(),
        oldVal: 0,
        drag: true // 防止通过props 改变而下发
      };
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      val: {
        type: Number,
        default: 0
      },
      step: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: 100
      },
      min: {
        type: Number,
        default: 0
      },
      showinput: {
        default: false,
        type: Boolean
      },
      islock: {
        default: false,
        type: Boolean
      },
      disabled: {
        default: false,
        type: Boolean
      },
      num: {
        default: 1,
        type: Number
      }
    },
    created() {
      this.value = this.val;
    },
    watch: {
      value: function(newVal, oldVal) {
        this.oldVal = oldVal;
        if(new Date() - this.time > 1000) {
          this.time = new Date();
          console.log(1, newVal);
          if(this.count && this.drag) {
            if(!this.islock) {
              console.log(2, newVal);
              this.$emit('callback', newVal);
            }
          } else {
            this.drag = true;
          }
          this.count++;
        }
      },
      val: function(newVal) {
        if(this.value !== newVal) {
          this.value = newVal;
        }
        // this.drag = false;
      },
      max: function(newValue) {
        if(newValue >= 0) {
          this.max = newValue;
        } else {
          // this.max = this.min;
        }
      }
    },
    methods: {
      change(val) {
        // this.$emit('change', val);
        console.log(111);
        if(val != this.oldVal) {
          this.$emit('callback', val);
        }
      },
      inputChange(val) {
        if(!this.islock) {
          this.$emit('callback', val);
        }
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
      .card-btm {
        width: 100%;
        font-size: 24px;
        color: #f8f8f8;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
    }
  }
  .silder-input {
    height: 34px;
    width: 100%;
  }
</style>

