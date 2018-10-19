<template>
  <div class="login-wrap">
    <div class="ms-title">后台管理系统</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p style="font-size:12px;line-height:30px;color:#999;">Tips : 直接点击登录按钮即可登录。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';
  import axios from 'axios';
  export default {
    data: function() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: false, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: false, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
    },
    methods: {
      ...mapMutations(['setMosic']),
      ...mapActions(['ajax']),
      postLogin() {
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
          this.$router.push({ path: "/" });
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
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.postLogin();
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
  }
</style>