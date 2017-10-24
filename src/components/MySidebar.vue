<template>
  <div class="sidebar" :data-role="role">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo menu" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index" class="borderTopParent">
            <template slot="title">
              <i><img :src="item.icon" class="titleIcon">
                <span class="titleText">{{ item.title }}</span>
              </i>
            </template>
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
        icon: 'http://static.hpbanking.com/xg/uploads/files/2834f7a41ec680117aa6f09c7dc1c04a-16-13.png',
        index: 'mileage',
        title: '臻车贷管理',
        subs: [
          {
            index: 'mileage', // 路由名
            title: '历程'
          },
          {
            index: 'sysAnalysis',
            title: '统计分析'
          },
          {
            index: 'comCalculation',
            title: '佣金计算'
          }
        ]
      },
      {
        icon: 'http://static.hpbanking.com/xg/uploads/files/d132892f5b3b7654ff36462d133f2b8c-16-16.png',
        index: 'zedMileage',
        title: '臻e贷管理',
        subs: [
          {
            index: 'zedMileage',
            title: '历程'
          },
          {
            index: 'zedSysAnalysis',
            title: '统计分析'
          },
          {
            index: 'zedComCalculation',
            title: '佣金计算'
          }
        ]
      },
      {
        icon: 'http://static.hpbanking.com/xg/uploads/files/ab54e5fe5dd354bc251e3b8002f72555-18-18.png',
        index: 'zsfMileage',
        title: '臻商分管理',
        subs: [
          {
            index: 'zsfMileage',
            title: '自评历程'
          },
          {
            index: 'zsfMileage',
            title: '提额历程'
          },
          {
            index: 'zsfSysAnalysis',
            title: '统计分析'
          },
          {
            index: 'zsfComCalculation',
            title: '激活审批'
          }
        ]
      },
      {
        icon: 'http://static.hpbanking.com/xg/uploads/files/6c79859609a6b66f76bb5d4ef544fb4f-18-18.png',
        index: 'bdBig',
        title: '大数据管理',
        subs: [
          {
            index: 'bdBig',
            title: '大库'
          },
          {
            index: 'bdSysAnalysis',
            title: '小库'
          },
          {
            index: 'bdComCalculation',
            title: '商业开发'
          }
        ]
      },
      {
        icon: 'http://static.hpbanking.com/xg/uploads/files/ee3035dd8a105b7ce44ee3cd5e1725d2-17-16.png',
        index: 'user',
        title: '系统管理',
        subs: [
          {
            index: 'user',
            title: '用户管理'
          },
          {
            index: 'role',
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
</style>
