<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> 固件包</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table></el-table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    methods: {}
  }
</script>
<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .del-dialog-cnt {
    font-size: 16px;
    text-align: center;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

