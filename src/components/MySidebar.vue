<template>
  <div class="sidebar" :data-role="role">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo menu" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index" class="borderTopParent">
            <template slot="title">
              <i><img :src="item.icon" class="titleIcon"><span class="titleText">{{ item.title }}</span></i></template>
            <el-menu-item class="child" v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
              <div class="text">{{ subItem.title }}</div>
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :title="item.title" :key="item.index">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: '',
      titles: [],
      items: [{
        icon: 'http://static.hpbanking.com/xg/uploads/files/816abeaa35662043109a141b323450f7-16-16.png',
        index: 'mileage',
        title: '臻车贷管理',
        subs: [
          {
            index: 'mileage', // 路由名
            title: '历程'
          },
          {
            index: 'NoPage',
            title: '统计分析'
          },
          {
            index: 'NoPage12',
            title: '佣金计算'
          }
        ]
      },
      {
        icon: 'http://static.hpbanking.com/xg/uploads/files/f6d57143aaf418bd5556f0f45b630b0b-18-18.png',
        index: 'NoPage2',
        title: '臻小贷管理',
        subs: [
          {
            index: 'NoPage111',
            title: '历程'
          },
          {
            index: 'NoPage111',
            title: '统计分析'
          },
          {
            index: 'NoPage11',
            title: '佣金计算'
          }
        ]
      },
      {
        icon: 'http://static.hpbanking.com/xg/uploads/files/ef71d4b495346ef16e0ff79e5c87f893-18-18.png',
        index: 'NoPage3',
        title: '系统管理',
        subs: [
          {
            index: 'NoPage4',
            title: '用户管理'
          },
          {
            index: 'NoPage6',
            title: '角色管理'
          }
        ]
      }
      ]
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {},
  mounted() {
    // this.role = sessionStorage.getItem('role')
    // console.log('role:' + sessionStorage.getItem('role'))
  }
}
</script>

<style lang="scss">
@import '../common/scss/common.scss';
@import '../common/scss/mixin.scss';
.sidebar {
  display: block;
  position: absolute;
  width: $sidebarWidth;
  left: 0;
  top: 42px;
  bottom: 0;
  background-color: #14AC98;
  .menu {
    background-color: #00917e;
    color: $menuColor;
    .borderTopParent {
      .titleIcon{
        margin-bottom: 3px;
      }
      .titleText{
        padding-left: 4px;
      }
      .el-submenu__title {
        height: 42px;
        line-height: 42px;
        @include border_bottom($color: #ffffff);
        color: #ffffff;
        &:hover {
          background-color: #14AC98;
        }
      }
      &:first-child {
        @include border_top($color: #ffffff);
      }
      &:last-child {
        @include border_bottom($color: #ffffff);
      }
    }
    .child {
      font-size: 12px; // padding-left: 50px !important;
      height: 30px;
      line-height: 30px;
      color: $menuColor; // @include border_bottom($color: #ffffff);
      background-color: #00917e;
      &:hover {
        background-color: #00AF98;
      }
      .text {
        width: 120px;
        padding-left: 10px;
        @include border_bottom($color: #ffffff);
      }
    }
  }
}

.sidebar>ul {
  height: 100%;
}
</style>
