<template>
  <div class="wrapper-container">
    <!-- <div ref="wrapper" class="wrapper" :class="{subactive: subactive || mask}"> -->
    <div class="wrapper" :class="{subactive: subactive}">
      <v-header :showName="islogin"></v-header>
      <div class="contentwrapper">
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <div :class="{subactive: subactive}"></div>
    <template v-if="islogin">
      <v-floating :subactive.sync="subactive"></v-floating>
    </template>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
  export default {
    data() {
      return {
        subactive: false,
        islogin: false,
        mask: false
      }
    },
    created() {
      if(this.$route.path == "/login") {
        this.islogin = false;
      } else {
        this.islogin = true;
      }
      if(this.$route.path == "/") {
        this.getMosaicData();
      }
    },
    computed: {
    },
    watch: {
      '$route.path'(val) {
        if(this.$route.path == "/login") {
          this.islogin = false;
        } else {
          this.islogin = true;
        }
        if(this.$route.path == "/") {
          this.getMosaicData();
          // console.log('------------ watch  light ---------------------');
        }
      }
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setMosic']),
      getMosaicData() {
        this.ajax({
          name: 'url',
          data: { RW: 0, DevID: 0, Screen_Bri: 0, In9_MosL: 0, In9_MosM: 0, In9_MosW: 0, In9_MosH: 0, _: sessionStorage.getItem('_') }
        }).then(res => {
          // { "In9_MosL":"1", "In9_MosM":"2", "In9_MosW":"1920", "In9_MosH":"1080", "ERRC": "0"}
          this.setMosic(res);
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .wrapper-container {
    height: 100%;
  }

  .subactive {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(10px);
  }
</style>
