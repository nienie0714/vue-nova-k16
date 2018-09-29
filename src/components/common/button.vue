<template>
  <div class="button">
    <div class="btngroup">
      <div>
        <div class="btn" :class="{btnactive: btnactive==1}" @click="getBtn(1)">{{maintitle}}</div>
        <div class="btn" :class="{btnactive: btnactive==2}" @click="getBtn(2)">{{subtitle}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        btnactive: 1,            // 默认 预设分辨率
      }
    },
    props: [
      'maintitle',               // 主标题
      'subtitle',                // 副标题 
      'value'
    ],
    created() {
      this.btnactive = this.value || 1;
    },
    methods: {
      getBtn(val) {
        this.btnactive = val;
        this.$emit('getBtn', val);
      }
    }
  }
</script>
<style lang="less" scoped>
  //按钮组
  .btngroup {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
  }
  //按钮
  .btn {
    height: 50px;
    width: 180px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    border: solid 2px #828298;
    color: #828298;
    font-size: 20px;
    cursor: pointer;
    &.btnactive {
      font-size: 20px;
      color: #080532;
      background-color: #828298;
    }
  }
</style>
