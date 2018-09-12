<template>
  <div class="home">
    <div class="wrapper">
      <v-head></v-head>
      <div class="menues-container">
        <div class="menu-box" v-for="(router, index) in routers" :key="index" :class="router.className" @click="go(router)">
          <div>{{router.name}}</div>
        </div>
      </div>
      <div class="slide-box" v-show="ishidden">

      </div>
      <div>
        <el-button @click="ishidden=!ishidden">click</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import vHead from '../common/header.vue';
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
        ishidden: false
      };
    },
    components: {
      vHead
    },
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
    // width: 52%;
    // height: 60%;
    background: rgba(233, 0, 0, 0.8);
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
    width: 80%;
    height: 80%;
    background: rgba(57, 62, 67, 0.8);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>

