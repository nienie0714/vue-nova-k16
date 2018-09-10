<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" :router="true">
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
              <i :class="subItem.icon"></i> {{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import bus from '../common/bus';
  export default {
    data() {
      return {
        collapse: false,
        items: [
          {
            icon: 'el-icon-setting',
            index: 'product',
            title: '产品管理',
            // subs: [
            //   {
            //     index: 'download',
            //     title: '视频产品线'
            //   },
            //   {
            //     index: '',
            //     title: '同步产品线'
            //   },
            //   {
            //     index: '',
            //     title: '云显产品线'
            //   }
            // ]
          },
          {
            icon: 'el-icon-setting',
            index: '2',
            title: '权限管理',
            subs: [
              {
                index: 'Role',
                title: '角色管理'
              },
              {
                index: 'user',
                title: '用户管理'
              },
              {
                index: '',
                title: '功能管理'
              }
            ]
          },
          {
            icon: 'el-icon-setting',
            index: '3',
            title: '系统管理',
            subs: [
              {
                index: '',
                title: '操作审计'
              }
            ]
          },
          {
            icon: 'el-icon-tickets',
            index: 'upload',
            title: '文件上传'
          },
          {
            icon: 'el-icon-tickets',
            index: 'Statistics',
            title: '统计分析'
          }
        ]
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    created() {
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      bus.$on('collapse', msg => {
        this.collapse = msg;
      })
    },
    methods: {
    }
  }
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }
  .sidebar::-webkit-scrollbar {
    width: 0;
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }
  .sidebar > ul {
    height: 100%;
  }
</style>
