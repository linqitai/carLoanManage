<template>
  <div class="sidebar" @changeActiveIndex="changeActiveIndex">
    <el-menu unique-opened router class="el-menu-vertical-demo menu" :default-active="$route.path" text-color="#ffffff" active-text-color="#ffff8d" :collapse="isCollapse">
      <template v-for="item in items">
        <el-submenu :index="item.index" :key="item.index" class="borderTopParent">
          <template slot="title" class="title1">
            <i class="iconfont" :class="item.icon"></i>
            <span slot="title">
              <span class="fontSize14">{{item.title}}</span>
            </span>
          </template>
          <template v-if="item.subs">
            <!-- 二级目录 -->
            <div v-for="item2 in item.subs" class="second">
              <template v-if="item2.subs">
                <el-submenu :index="item2.index" :key="item2.index" class="borderTopParent">
                  <template slot="title" class="title2">
                    <!-- <template v-if="item2.icon">
                        <i class="secondIcon"></i> 
                        <i class="iconfont ml20 mr3 fontSize4siderIcon" :class="item2.icon"></i>
                      </template> -->
                    <span slot="title" class="child2">{{item2.title}}</span>
                  </template>
                  <template v-if="item2.subs">
                    <!-- 三级目录 -->
                    <template v-for="item3 in item2.subs">
                      <el-menu-item class="child3" :index="item3.index" :key="item3.index">{{item3.title}}</el-menu-item>
                    </template>
                  </template>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item class="child" :index="item2.index" :title="item2.title" :key="item2.index">
                  <template slot="title" class="title2">
                    <span slot="title" class="child2">{{item2.title}}</span>
                  </template>
                </el-menu-item>
              </template>
            </div>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      activeIndex: '',
      items: [
        {
          icon: 'icon-qian',
          index: '/zsyMileage',
          title: '臻收银管理',
          subs: [
            {
              icon: 'icon-flag',
              index: '/merchantManage', // 路由名
              title: '商户管理'
              // subs: [
              //   {
              //     index: '/experience',
              //     title: '历程(暂无功能)'
              //   },
              //   {
              //     index: '/merchantManage',
              //     title: '商户管理'
              //   },
              //   {
              //     index: '/storeManage',
              //     title: '门店管理'
              //   },
              //   {
              //     index: '/operatorManage',
              //     title: '操作员管理'
              //   },
              //   {
              //     index: '/QRcode',
              //     title: '收款码'
              //   }
              // ]
            },
            {
              icon: 'icon-flag',
              index: '/agent',
              title: '代理商管理'
              // subs: [
              //   {
              //     index: '/agent', // 路由名
              //     title: '代理商'
              //   }
              // ]
            },
            {
              icon: 'icon-flag',
              index: '/opinion',
              title: '意见反馈'
              // subs: [
              //   {
              //     index: '/opinion', // 路由名
              //     title: '意见反馈'
              //   }
              // ]
            },
            {
              icon: 'icon-flag',
              index: '/bill',
              title: '财务管理',
              subs: [
                {
                  index: '/bill', // 路由名
                  title: '账单管理'
                },
                {
                  index: '/channelReconciliation',
                  title: '通道对账'
                },
                // {
                //   index: '/remainTreasure',
                //   title: '余利宝'
                // },
                // {
                //   index: '/withdrawManage',
                //   title: '提现管理'
                // },
                {
                  index: '/agentMoney',
                  title: '代理商分润'
                },
                {
                  index: '/fenRunIncome',
                  title: '分润收入'
                }
              ]
            }
          ]
        },
        {
          icon: 'icon-shangyezhongxin',
          index: '/zsfMileage',
          title: '臻商分管理',
          subs: [
            {
              index: '/zsfMileage',
              title: '自评历程'
            },
            {
              index: '/zsfComCalculation',
              title: '提额历程'
            },
            {
              index: '/zsfSysAnalysis',
              title: '统计分析'
            }
          ]
        },
        {
          icon: 'icon-che2',
          index: '/mileage',
          title: '臻车贷管理',
          subs: [
            {
              index: '/mileage', // 路由名
              title: '历程'
            },
            {
              index: '/sysAnalysis',
              title: '统计分析'
            },
            {
              index: '/comCalculation',
              title: '佣金计算'
            }
          ]
        },
        {
          icon: 'icon-eIcon',
          index: '/zedMileage',
          title: '臻e贷管理',
          subs: [
            {
              index: '/zedMileage',
              title: '历程'
            },
            {
              index: '/zedSysAnalysis',
              title: '统计分析'
            },
            {
              index: '/zedComCalculation',
              title: '佣金计算'
            }
          ]
        },
        {
          icon: 'icon-card',
          index: '/creditCard',
          title: '信用卡申请',
          subs: [
            {
              index: '/creditCard',
              title: '历程'
            },
            {
              index: '/reportCard',
              title: '统计分析'
            }
          ]
        },
        {
          icon: 'icon-shuju1',
          index: '/bdBig',
          title: '大数据管理',
          subs: [
            {
              index: '/bdBig',
              title: '数据归集'
            },
            {
              index: '/bdSysAnalysis',
              title: '数据清洗'
            },
            {
              index: '/digitPortrayal',
              title: '数字画像'
            },
            {
              index: '/bdComCalculation',
              title: '大数据分析'
            },
            {
              index: '/businessApply',
              title: '商业应用'
            }
          ]
        },
        {
          icon: 'icon-contral',
          index: '/user',
          title: '系统管理',
          subs: [
            {
              index: '/user',
              title: '用户管理'
            },
            {
              index: '/role',
              title: '角色管理'
            }
          ]
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    changeActiveIndex(index) {
      this.activeIndex = index
    }
  },
  mounted() {
    // this.role = sessionStorage.getItem('role')
    // console.log('role:' + sessionStorage.getItem('role'))
  }
}
</script>
<style lang="scss">
@import './MySiderbar2.0'
</style>