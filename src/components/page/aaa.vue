<template>
  <div class="aaa">
    <div class="wrapper">
      <v-header></v-header>
      <!-- 页面名称 -->
      <div class="jrtitle">
        <div class="snav">
          <img src="@/assets/icon/u343.png" alt="" @click="$router.go(-1);">
          <img src="@/assets/home/u123.svg" alt="">
          <span>输入设置</span>
          <el-button @click="slide = !slide">a</el-button>
        </div>
      </div>
      <div class="content-box">
        <!-- tab -->
        <div class="tabs">
          <div class="tab" v-for="(item, index) in tabsList" :class="{active: active == index}" @click="active = index" :key="index">
            <b>{{item}}</b>
          </div>
        </div>
        <!-- content -->
        <div class="content" :class="{active: slide}">
          <div class="container">
            <div class="tabdp" v-show="active == 0">
              <div class="tabtitle">关于DP的EDID设置</div>
              <v-box :showdrop="0" :showtitle="1" :showcontent="1" :title="'当前输入分辨率'" :defaultcontent="'3840×2160@ 60Hz'"></v-box>
              <v-box :showdrop="1" :showtitle="1" :showcontent="1" :showslider="0" :title="'预设分辨率'" :defaultcontent="'1920*1080'" :list="list1"></v-box>
              <v-box :showdrop="1" :showtitle="1" :showcontent="1" :showslider="0" :title="'预设刷新率（Hz）'" :defaultcontent="'60'" :list="list2"></v-box>
              <!-- <v-box :showdrop="1" :showtitle="1" :showcontent="1" :showslider="0" :title="'预设刷新率（Hz）'" :defaultcontent="'60'" :list="list2" v-model="value"></v-box>  {{value}}-->
            </div>
            <div class="tabcontent2" v-show="active == 1">
              <div class="tabtitle">关于HDMI的EDID设置</div>
            </div>
            <div class="tabcontent3" v-show="active == 2">
              <div class="tabtitle">关于SDI的EDID设置</div>
            </div>
            <div class="tabcontent4" v-show="active == 3">
              <div class="tabtitle">关于DPI的EDID设置</div>
              <v-box class="zindex" :showdrop="1" :showtitle="1" :showcontent="1" :showslider="0" :title="'DVI输入模式'" :defaultcontent="'单链模式'" :list="dvimodel"></v-box>
              <v-box :showdrop="0" :showtitle="1" :showcontent="1" :title="'当前输入分辨率'" :defaultcontent="'3840×2160@ 60Hz'"></v-box>
              <v-box :showdrop="0" :showtitle="1" :showcontent="1" :title="'当前输入分辨率'" :defaultcontent="'3840×2160@ 60Hz'"></v-box>
              <v-box :showdrop="0" :showtitle="1" :showcontent="1" :title="'当前输入分辨率'" :defaultcontent="'3840×2160@ 60Hz'"></v-box>
              <v-box :showdrop="0" :showtitle="1" :showcontent="1" :title="'当前输入分辨率'" :defaultcontent="'3840×2160@ 60Hz'"></v-box>
              <div></div>
              <v-box :showdrop="1" :showtitle="1" :showcontent="1" :showslider="0" :title="'预设分辨率'" :defaultcontent="'1920*1080'" :list="list1"></v-box>
              <v-box :showdrop="1" :showtitle="1" :showcontent="1" :showslider="0" :title="'预设刷新率（Hz）'" :defaultcontent="'60'" :list="list2"></v-box>
            </div>
          </div>
          <div class="subcontainer">
            <div>222</div>
            <div>222</div>
            <div>222</div>
            <div>222</div>
            <div>333</div>
            <div>222</div>
            <div>222</div>
            <div>222</div>
            <div>222</div>
            <div>222</div>
            <div>222</div>
            <div>222</div>
            <div>222</div>
            <div>222</div>
            <div>222</div>
            <div>222</div>
            <div>222</div>
            <div>222</div>
            <div>222</div>
            <div>222</div>
            <div>222</div>
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
        list1: ["800*600", "1024*768", "1280*720", "1280*768", "1920*1080", "3840*2160 (默认)"],
        list2: ["23.98", "24", "25", "29.97", "30", "60 (默认)"],
        dvimodel: ["单链模式", "双链模式"],
        slide: false
      }
    },
    created() {
    },
    methods: {
    }
  }

</script>

<style scoped lang="less">
  .tabs {
    width: 1800px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    z-index: 11;
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
  .tabtitle {
    padding: 20px 30px;
    color: white;
  }
  .zindex {
    .card-top {
      z-index: 12 !important;
    }
  }
</style>
