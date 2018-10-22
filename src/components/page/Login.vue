<template>
  <div class="wrapper-container">
    <div class="wrapper">
      <v-header :showName="false"></v-header>
      <div class="login-wrap">
        <!-- <div class="ms-title">后台管理系统</div> -->
        <div class="ms-login">
          <div class="login-center">
            <div class="product">
              <img src="@/assets/icon/img_product.png" alt="">
            </div>
            <div class="right-login">
              <div class="procuct-name">
                <span>WELCOME to</span>
                <img src="@/assets/icon_productname.png" alt="">
              </div>
              <el-form>
                <div class="login-btn" @click="submitForm()">
                  <img src="@/assets/icon/icon_right.png" alt="">
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';
  import axios from 'axios';
  export default {
    data: function() {
      return {
      }
    },
    created() {
    },
    methods: {
      ...mapMutations(['setMosic']),
      ...mapActions(['ajax']),
      submitForm() {
        let command = '';
        for(let i = 0; i <= 13; i++) {
          command += Math.floor(Math.random() * 10);
        }
        this.ajax({
          name: 'url',
          data: { RW: 1, DevID: 0, CMD: 0, Account: command, _: command }
        }).then(res => {
          this.getMosaicData(command);
          sessionStorage.setItem('_', command);
        });
        // sessionStorage.setItem('_', command);
        // this.$router.push({ path: "/" });
      },
      getMosaicData(command) {
        this.ajax({
          name: 'url',
          data: { RW: 0, DevID: 0, Screen_Bri: 0, In9_MosL: 0, In9_MosM: 0, In9_MosW: 0, In9_MosH: 0, _: command }
        }).then(res => {
          // { "In9_MosL":"1", "In9_MosM":"2", "In9_MosW":"1920", "In9_MosH":"1080", "ERRC": "0"}
          this.setMosic(res);
          this.$router.push({ path: "/" });
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .wrapper-container {
    height: 100%;
    background: url('../../assets/img_bg_login.png') center center no-repeat / cover;
  }
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .ms-login {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 300px;
    padding: 98px 0 69px 0;
    background-color: rgba(31, 40, 70, 0.5);
  }
  .login-center {
    width: 1100px;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  .right-login {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .procuct-name {
      color: #fff;
      font-size: 32px;
    }
  }
  .login-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 50px;
    background-color: #febe00;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
  }
</style>