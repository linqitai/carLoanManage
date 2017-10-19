<template>
  <div class="sidebar" :data-role="role">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu class="sub" :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>{{ item.title }}</template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
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
        icon: 'el-icon-menu',
        index: 'mileage',
        title: '车抵贷管理',
        subs: [
          {
            index: 'mileage', // 路由名
            title: '历程'
          },
          {
            index: 'mileage1',
            title: '统计分析'
          },
          {
            index: 'mileage2',
            title: '佣金计算'
          }
        ]
      },
      {
        icon: 'el-icon-menu',
        index: '1',
        title: '臻小贷管理',
        subs: [
          {
            index: 'mileage',
            title: '历程'
          },
          {
            index: 'mileage1',
            title: '统计分析'
          },
          {
            index: 'mileage2',
            title: '佣金计算'
          }
        ]
      },
      {
        icon: 'el-icon-menu',
        index: '11',
        title: '系统管理',
        subs: [
          {
            index: '2',
            title: '用户管理'
          },
          {
            index: '3',
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
.sidebar {
  display: block;
  position: absolute;
  width: $sidebarWidth;
  left: 0;
  top: 50px;
  bottom: 0;
  background-color: $mainColor;
}
.sidebar>ul {
  height: 100%;
}
</style>
