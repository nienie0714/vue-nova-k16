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
</style>
