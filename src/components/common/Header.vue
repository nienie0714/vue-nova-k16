<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <!-- <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div> -->
    <div class="logo">
      <img src="../../assets/icon_logo.png">
      <div class="proname">
        NovaPro UHD Jr
      </div>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <img src="../../assets/icon/icon_fullscreen.png">
          </el-tooltip>
        </div>
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <img src="../../assets/icon/icon_lang.png">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            <el-dropdown-item divided command="chinese">
              {{$t('chinese')}}</el-dropdown-item>
            <el-dropdown-item divided command="english">
              {{$t('english')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
  import bus from './bus';
  import { mapMutations } from 'vuex';

  export default {
    data() {
      return {
        fullscreen: false
      }
    },
    methods: {
      ...mapMutations(['setLang']),
      // 用户名下拉菜单选择事件
      handleCommand(command) {
        if(command == 'loginout') {
          localStorage.removeItem('_');
          this.$router.push('/login');
        } else if(command == 'chinese') {
          this.setLang('zh');
          window.location.reload();
        } else if(command == 'english') {
          this.setLang('en');
          window.location.reload();
        }
      },
      // 全屏事件
      handleFullScreen() {
        let element = document.documentElement;
        if(this.fullscreen) {
          if(document.exitFullscreen) {
            document.exitFullscreen();
          } else if(document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if(document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if(element.requestFullscreen) {
            element.requestFullscreen();
          } else if(element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if(element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      }
    }
  }
</script>
<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 80px;
    font-size: 18px;
    color: #fff;
  }
  .header .logo {
    float: left;
    display: flex;
    align-items: center;
  }
  .proname {
    margin-left: 15px;
    display: inline-block;
  }
  .header-right {
    height: 80px;
    display: flex;
    align-items: center;
    float: right;
    padding-right: 40px;
  }
  .header-user-con {
    display: flex;
    height: 40px;
    align-items: center;
  }
  .btn-fullscreen {
    margin-top: 5px;
    margin-right: 15px;
    font-size: 24px;
  }
  .btn-bell,
  .btn-fullscreen {
    position: relative;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }
  .btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }
  .btn-bell .el-icon-bell {
    color: #fff;
  }
  .user-name {
    margin-left: 10px;
  }
  .user-avator {
    margin-left: 20px;
  }
  .user-avator img {
    display: block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }
  .el-dropdown-menu__item {
    text-align: center;
  }
  img {
    border: none;
    outline: none;
  }
</style>
