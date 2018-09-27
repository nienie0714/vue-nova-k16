<template>
  <div class="card" :class="{active: dpActive}">
    <!-- 卡片上半部分 -->
    <div class="card-top" :class="{active: dpActive}">
      <!-- 下三角号 -->
      <div class="card-icon" @click.stop="dropcard = !dropcard" v-if="showdrop">
        <transition name="bounce">
          <span v-if="dropcard"><img class="up" src="@/assets/icon/u389.png" alt=""></span>
          <span v-else><img src="@/assets/icon/u389.png" alt=""></span>
        </transition>
      </div>
      <!-- 开关 -->
      <div class="card-icon" v-if="showswitch">
        <el-switch active-value="1" inactive-value="0" v-model="open2" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </div>
      <!-- 卡片：标题+内容 -->
      <div class="card-title">
        {{title}}
      </div>
      <div class="card-btm">
        {{defaultcontent}}
      </div>
    </div>
    <!-- 卡片下拉框 -->
    <div class="card-drap-wrap" :class="{dpActive}">
      <div class="card-drop" :class="{active: dropcard}">
        <div v-for="(item, index) in list" :key="index" @click="getData(index, item)">{{item}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dropcard: false,
        open2: false,
        dpActive: false,
      };
    },
    props: [
      'showdrop',            // 控制上下三角号是否显示
      'showswitch',          // 控制开关显示
      'title',               // 标题
      'defaultcontent',      // 内容
      'list',                // 下拉菜单列表
      'open',                 // switch
      'value'
    ],
    methods: {
      getData(index, item) {
        this.$emit('getData', { index, item });
        this.dropcard = false;
      },
      close() {
        this.dropcard = false;
      }
    },
    created() {
      this.open2 = this.open;
    },
    watch: {
      value(val) {
        this.dropcard = val;
      },
      dropcard(val) {
        if(val) {
          this.dpActive = true;
        } else {
          setTimeout(() => { this.dpActive = false }, 300);
        }
        this.$emit('input', val);
      }
    }
  }
</script>
<style lang="less" scoped>
  .card {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    // margin: 20px 2px 20px 0;
    display: flex;
    // flex-direction: column;
    position: relative;
    &-top {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border: 1px solid white;
      // background-color: #1f2a51;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 2px;
      padding: 15px 10px;
      z-index: 1;
      .card-title {
        width: 90%;
        font-size: 20px;
        margin-bottom: 10px;
      }
      .card-icon {
        float: right;
        img {
          width: 20px;
          height: 20px;
          transform: rotate(0);
          transition: all 0.3s;
        }
        .up {
          transform: rotate(180deg);
        }
      }
      .card-btm {
        width: 100%;
        font-size: 24px;
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
      > div {
        font-size: 14px;
        width: 100%;
        padding: 4px;
        box-sizing: border-box;
        transition: all 0.3s;
      }
      > div:hover {
        color: #ff6700;
        background: #ccc;
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
</style>

