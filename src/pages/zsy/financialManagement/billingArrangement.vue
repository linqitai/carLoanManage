<template>
  <div class="billingArrangement">
    <div class="breadcrumbWrapper" ref="breadcrumbWrapper">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <img class="hoemIcon" src="../../../common/images/homeIconGray.png" alt="">
          <span class="text">当前位置</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="text">臻收银管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="text">财务管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="mainColor">账单管理</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
          <div class="element">
            <p class="inline">店铺:</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="店铺查询" class="input" v-model="searchs.shopName" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">商户:</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="商户查询" class="input" v-model="searchs.merchantName" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">支付来源:</p>
            <div class="width120 inline">
              <el-select size="medium" placeholder="请选择" v-model="searchs.channelType" @change="searchData">
                <el-option v-for="item in payList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">收款方式:</p>
            <div class="width120 inline">
              <el-select size="medium" placeholder="请选择" v-model="searchs.paymode" @change="searchData">
                <el-option v-for="item in collectionList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">订单号:</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="订单号查询" class="input" v-model="searchs.merchantOrderNo" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">代理商:</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="代理商查询" class="input" v-model="searchs.agentName" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">服务密码:</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="服务密码查询" class="input" v-model="searchs.agentServiceCode" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">收款时间:</p>
            <div class="inline">
              <el-date-picker size="medium" class="inline" style="width:134px;" type="date" placeholder="开始时间" value-format="yyyy-MM-dd" v-model="searchs.sdate">
              </el-date-picker>
              <span class="inline">至</span>
              <el-date-picker size="medium" class="inline" style="width:134px;" type="date" placeholder="结束时间" value-format="yyyy-MM-dd" v-model="searchs.edate">
              </el-date-picker>
            </div>
          </div>
          <div class="element" @click="search">
            <el-button size="medium" class="searchBtn">查询</el-button>
          </div>
        </div>
      </div>
      <div class="tableWrapper">
        <div class="tableWrapper-excel">
          <span class="tableWrapper-excel-pad">实收金额:{{money}}</span>
          <span class="tableWrapper-excel-border" @click="downloadExl()" style="cursor: pointer;">导出成excel</span>
        </div>
        <el-table :data="tableData" stripe>
          <el-table-column label="收款时间" width="200">
            <template slot-scope="scope">
              {{scope.row.created | dateFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="shopName" label="店铺" width="240" show-overflow-tooltip></el-table-column>
          <el-table-column prop="merchantName" label="商户" width="240" show-overflow-tooltip></el-table-column>
          <el-table-column prop="buyerPayAmount" label="实收金额(元)" width="100"></el-table-column>
          <el-table-column label="支付来源">
            <template slot-scope="scope">
              {{scope.row.channelType | paySource}}
            </template>
          </el-table-column>
          <el-table-column label="收款方式">
            <template slot-scope="scope">
              {{scope.row.paymode | collectionType}}
            </template>
          </el-table-column>
          <el-table-column prop="merchantOrderNo" label="订单号" width="240" show-overflow-tooltip></el-table-column>
          <el-table-column prop="agentName" label="代理商"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="detail(scope.row.orderid)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="total>searchs.pageSize" class="tableBottom">
          <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="searchs.pageIndex" :page-size="searchs.pageSize" :page-sizes="[10,12,14,16]" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { format } from 'common/js/times'
import { billManage, billTableExport } from '@/api/index.js'
import qs from 'qs'
export default {
  data() {
    return {
      money: null,
      payList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 'ALI',
          label: '支付宝'
        },
        {
          value: 'WX',
          label: '微信'
        }
      ],
      collectionList: [
        {
          value: 1,
          label: '动态正扫'
        },
        {
          value: 2,
          label: '动态反扫'
        },
        {
          value: 5,
          label: '静态二维码'
        }
      ],
      value: '',
      searchCell: false,
      total: '',
      tableData: [],
      searchs: {
        shopName: this.$route.query.shopname,
        merchantName: '',
        channelType: '',
        paymode: '',
        merchantOrderNo: '',
        agentName: '',
        agentServiceCode: '',
        sdate: '',
        edate: '',
        pageSize: 10,
        pageIndex: 1
      }
    }
  },
  created() {
    console.log(this.searchs.shopName)
    this.searchData()
  },
  filters: {
    dateFormat(value) {
      return format(value)
    },
    paySource(value) {
      switch (value) {
        case 'ALI':
          return '支付宝';
        case 'WX':
          return '微信';
      }
    },
    collectionType(value) {
      switch (value) {
        case 1:
          return '动态正扫';
        case 2:
          return '动态反扫';
        case 3:
          return '赎回';
        case 4:
          return '申购';
        case 5:
          return '静态二维码';
      }
    }
  },
  methods: {
    searchData() {
      billManage(this.searchs).then(res => {
        this.tableData = res.result;
        this.money = res.buyerPayAmountSum;
        this.total = res.count;
      })
    },
    search() {
      if (this.searchs.sdate && this.searchs.edate && new Date(this.searchs.sdate) - new Date(this.searchs.edate) > 0) {
        this.$message({
          type: 'error',
          message: '开始时间不大于结束时间!'
        });
        return
      }
      this.searchData()
    },
    handleSizeChange(val) {
      this.searchs.pageSize = val;
      this.searchData();
    },
    handleCurrentChange(val) {
      this.searchs.pageIndex = val;
      this.searchData();
    },
    downloadExl() {
      let _q = { ...this.searchs }
      delete _q['pageIndex']
      delete _q['pageSize']
      let query = qs.stringify(_q);
      window.open(billTableExport() + '?' + query)
    },
    detail(item) {
      this.$router.push({ path: '/bill/details', query: { orderid: item } })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~common/scss/common.scss';
@import './billingArrangement.scss'
</style>
