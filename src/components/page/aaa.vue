<template>
  <div class="aaa">
    <div class="wrapper">
      <v-header></v-header>
      <div class="content-box">
        <div class="snav">
          <img src="@/assets/icon/u343.png" alt="" @click="$router.go(-1);">
          <img src="@/assets/home/u123.svg" alt="">
          <span>输入设置</span>
        </div>
      </div>
      <div class="content">
        <div class="tabs">
          <div class="tab" v-for="(item, index) in tabsList" :class="{active: active == index}" @click="active = index" :key="index">
            <b>{{item}}</b>
          </div>
        </div>
        <div class="contents">
          <div class="tabcontent1" v-show="active == 0">
            <div class="DPc">关于DP的EDID设置</div>
            <v-box :showdrop="1" :showtitle="1" :showcontent="1" :showslider="0" :title="'abc'" :content="'asdfsdfsdf'" :list="list" v-model="value"></v-box>
            <!-- {{value}} -->
          </div>
          <div class="tabcontent2" v-show="active == 1">
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
          </div>
          <div class="tabcontent3" v-show="active == 2">
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
          </div>
          <div class="tabcontent4" v-show="active == 3">
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'aaa',
    data() {
      return {
        tabsList: ["DP", "HDMI", "SDI", "DVI"],
        active: 0,
        list: ["bac", "bad", "adf", "asdf", "sdr", "sdf", "we", "we"],
        value: 90
      }
    },
    created() {
    },
    methods: {
    }
  }

</script>

<style scoped lang="less">
  .snav {
    height: 22px;
    line-height: 22px;
    color: rgba(255, 255, 255, 1);
    img {
      display: inline-block;
      width: 25px;
      height: 25px;
    }
  }

  .tabs {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tab {
      width: 24.8%;
      height: 100%;
      display: flex;
      align-items: center;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(0, 0, 0, 1);
      > b {
        display: block;
        width: 100%;
        text-align: center;
      }
      &:last-child {
        margin-right: 0;
      }
      &.active {
        border: none;
        background-color: rgba(209, 58, 29, 1);
      }
    }
  }
</style>
