<template>
  <div class="home">
    <div class="wrapper">
      <v-header></v-header>
      <div class="menues-container">
        <div class="menu-box" v-for="(router, index) in routers" :key="index" :class="router.className" @click="go(router)">
          <div>{{router.name}}</div>
        </div>
      </div>
      <div class="mask">

        <div class="slide-box" :class="{active: ishidden}">

        </div>

      </div>
      <el-button @click="ishidden=!ishidden">click</el-button>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
  //import vHead from '../common/header.vue'; // 常规引用组件
  import bus from '../common/bus';
  import { mapGetters } from 'vuex';
  import { getLoc } from '../../utils';
  export default {
    data() {
      return {
        routers: [{
          name: 'aaa',
          path: 'aaa',
          className: 'aaa'
        }, {
          name: 'bbb',
          path: 'bbb',
          className: 'bbb'
        }, {
          name: 'ccc',
          path: 'ccc',
          className: 'ccc'
        }, {
          name: 'ccc',
          path: 'ccc',
          className: 'ccc'
        }, {
          name: 'ccc',
          path: 'ccc',
          className: 'ccc'
        }, {
          name: 'ccc',
          path: 'ccc',
          className: 'ccc'
        }, {
          name: 'ccc',
          path: 'ccc',
          className: 'ccc'
        }, {
          name: 'ccc',
          path: 'ccc',
          className: 'ccc'
        }, {
          name: 'ccc',
          path: 'ccc',
          className: 'ccc'
        }
        ],
        ishidden: true
      };
    },
    // components: {
    //   vHead// 常规引用组件
    // },
    created() {
    },
    methods: {
      go(route) {
        this.$router.push({ name: route.path });
      }
    }
  }
</script>
<style lang="less" scoped>
  .menues-container {
    width: 1000px;
    height: 530px;
    // background: rgba(233, 0, 0, 0.8);
    margin: 30px;
    display: flex;
    flex-wrap: wrap;
    .menu-box {
      box-sizing: border-box;
      width: 300px;
      height: 170px;
      margin: 0 30px 10px 0;
      padding: 10px;
      color: #fff;
      display: flex;
      align-items: flex-end;
      &:active {
        opacity: 0.8;
      }
      &.aaa {
        background: rgba(0, 0, 0, 0.8) url('../../assets/home/u51.svg') center center no-repeat / 64px 64px;
      }
      &.bbb {
        background: rgba(0, 0, 0, 0.8) url('../../assets/home/u177.svg') center center no-repeat / 64px 64px;
      }
      &.ccc {
        background: rgba(0, 0, 0, 0.8) url('../../assets/home/u51.svg') center center no-repeat / 64px 64px;
      }
    }
  }
  .slide-box {
    width: 100%;
    height: 100%;
    background: rgba(57, 62, 67, 0.8);
    transform: translateX(0);
    transition: transform ease 0.5s;
    &.active {
      transform: translateX(100%);
    }
  }
  .mask {
    width: 80%;
    height: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
  }
</style>

