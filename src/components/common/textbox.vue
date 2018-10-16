<template>
  <div class="card" :class="{active: dpActive, hidden: !dpActive}">
    <!-- 卡片上半部分 -->
    <div class="card-top" :class="{active: dpActive}">
      <!-- 下三角号 -->
      <div class="card-icon triangle" :class="{triangleActive: dropcard}" @click.stop="dropcard = !dropcard" v-if="showdrop">
        <!-- <transition name="bounce">
          <span v-if="dropcard"><img src="@/assets/icon/icon_p.png" alt=""></span>
          <span v-else><img src="@/assets/icon/icon_p.png" alt=""></span>
        </transition> -->
      </div>
      <!-- 开关 -->
      <div class="card-icon" v-if="showswitch">
        <el-switch :active-value="1" :inactive-value="0" v-model="open2" @change="switchOpen" active-color="#febe00" inactive-color="#848999">
        </el-switch>
      </div>
      <!-- 卡片：标题+内容 -->
      <div class="card-title">
        {{title}}
      </div>
      <div class="card-btm">
        <slot name="template">
          {{defaultcontent}}
        </slot>
      </div>
    </div>
    <!-- 卡片下拉框 -->
    <div class="card-drap-wrap" :class="{dpActive}">
      <div class="card-drop" :class="{active: dropcard}">
        <slot>
          <!-- <div v-if="!list.length" v-for="(item, index) in list" :key="index" @click="getData(index, item)">{{item}}</div> -->
          <div class="row" :class="{active: index == activeIndex}" v-for="(item, index) in list" :key="index" @click="getData(index, item)">{{ item.r || `${item.w}*${item.h}`}} {{item.default && ('(默认)')}}</div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dropcard: false,
        open2: 0,
        dpActive: false,
        timmer: null
      };
    },
    props: [
      'showdrop',            // 控制上下三角号是否显示
      'showswitch',          // 控制开关显示
      'title',               // 标题
      'defaultcontent',      // 内容
      'list',                // 下拉菜单列表
      'open',                 // switch
      'value',
      'activeIndex'
    ],
    methods: {
      getData(index, item) {
        this.$emit('getData', { index, item });
        this.dropcard = false;
      },
      close() {
        this.dropcard = false;
      },
      switchOpen(val) {
        this.$emit('switchOpen', val);
      }
    },
    created() {
      this.open2 = this.open;
    },
    watch: {
      open(val) {
        this.open2 = this.open;
      },
      value(val) {
        this.dropcard = val;
      },
      dropcard(val) {
        if(val) {
          this.dpActive = true;
        } else {
          this.timmer = setTimeout(() => { this.dpActive = false }, 300);
        }
        this.$emit('input', val);
      }
      // list(val) {
      //   this.$nextTick(function() {
      //   });
      // }
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
        cursor: pointer;
        float: right;
        width: 30px;
        height: 30px;
        // overflow: hidden;
        background: url('~@/assets/icon/icon_p.png') no-repeat;
        &.triangle {
          background-position: 0 0;
          transition: linear 0.2s;
        }
        &.triangleActive {
          background-position: 0 -30px;
          transition: linear 0.2s;
        }
        // img {
        //   width: 30px;
        //   height: 30px;
        //   transform: rotate(0) translateY(-10px);
        //   transition: transform 0.3s;
        //   padding: 10px;
        // }
        .up {
          transform: rotate(180deg);
        }
      }
      .card-btm {
        width: 100%;
        font-size: 24px;
        margin-bottom: 15px;
        color: #ffffff;
      }
      &.active {
        z-index: 11;
      }
    }
    &-drap-wrap {
      height: 250px;
      position: absolute;
      top: 100%;
      overflow: hidden;
      width: 100%;
      z-index: -1;
      &.dpActive {
        z-index: 12;
      }
    }
    &-drop {
      width: 100%;
      max-height: 250px;
      min-height: 100px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 1);
      color: rgba(0, 0, 0, 1);
      transition: all 0.3s;
      transform: translateY(-100%);
      overflow-y: auto;
      cursor: pointer;
      .row {
        height: 40px;
        font-size: 20px;
        width: calc(100%-24px);
        margin: 1px 12px;
        padding: 8px 1px;
        box-sizing: border-box;
        transition: all 0.3s;
        &:first-child {
          margin-top: 8px;
        }
        &:last-child {
          margin-bottom: 8px;
        }
      }
      .row:hover {
        color: #000;
        background: #848999;
      }
      .active {
        color: #febe00;
        background: #1f2a51;
      }
      &.active {
        transform: translateY(0);
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

  .hidden {
    overflow: hidden;
  }
</style>

