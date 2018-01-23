<template>
  <div class="channelReconciliation">
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
          <span class="mainColor">通道对账</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
          <div class="element">
            <p class="inline">订单完成时间:</p>
            <div class="inline">
              <el-date-picker size="medium" class="inline" style="width:134px;" type="date" placeholder="开始时间" value-format="yyyy-MM-dd" v-model="searchs.sdate">
              </el-date-picker>
              <span class="inline">至</span>
              <el-date-picker size="medium" class="inline" style="width:134px;" type="date" placeholder="结束时间" value-format="yyyy-MM-dd" v-model="searchs.edate">
              </el-date-picker>
            </div>
          </div>
          <div class="element">
            <p class="inline">商户:</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="" class="input" v-model="searchs.merchantNa" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">商户号:</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="" class="input" v-model="searchs.merchantId" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element" @click="searchData">
            <el-button size="medium" class="searchBtn">查询</el-button>
          </div>
        </div>
      </div>
      <div class="tableWrapper">
        <div class="tableWrapper-excel"><span>支付交易:{{payAmountSum}}，</span>
          <span>退款交易:{{refundAmountSum}}，</span>
          <span>手续费:{{handChargeSum}}，</span>
          <span class="tableWrapper-excel-pad">清算金额:{{tradeAmountSum}}</span>
          <span class="tableWrapper-excel-border" @click="downloadExl()" style="cursor: pointer;">导出成excel</span>
        </div>
        <el-table :data="tableData" stripe>
          <el-table-column label="订单完成时间" width="180px">
            <template slot-scope="scope">
              {{scope.row.finishDate | dateFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="merchantName" label="商户" show-overflow-tooltip></el-table-column>
          <el-table-column label="交易类型">
            <template slot-scope="scope">
              {{scope.row.tradeType | tradeType}}
            </template>
          </el-table-column>
          <el-table-column prop="ccy" label="货币种类"></el-table-column>
          <el-table-column prop="tradeAmount" label="交易金额"></el-table-column>
          <el-table-column prop="rate" label="手续费费率"></el-table-column>
          <el-table-column prop="handCharge" label="手续费"></el-table-column>
          <el-table-column prop="surplusAmount" label="结算金额"></el-table-column>
          <el-table-column prop="type" label="分账类型"></el-table-column>
          <el-table-column prop="merchantId" label="商户号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orderNo" label="银行订单号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orgOrderNo" width="120" label="合作机构订单号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="oldOrderNo" label="原银行订单号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
        <div v-if="total>searchs.pageSize" class="tableBottom">
          <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes="[10,12,14,16]" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { format } from 'common/js/times'
  import {channelReconciliation,channelbillTableExport} from '@/api/index.js'
  import qs from 'qs'
  export default {
    data() {
      return {
        tableData: [],
        total: '',
        payAmountSum: '',
        refundAmountSum: '',
        tradeAmountSum: '',
        handChargeSum: '',
        searchs: {
          sdate: '',
          edate: '',
          merchantNa: '',
          merchantId: '',
          pageSize: 10,
          pageIndex: 1
        }
      }
    },
    created() {
      this.searchData()
    },
    filters: {
      dateFormat(value) {
        return format(value)
      },
      tradeType(value) {
        switch (value) {
          case 1:
            return '支付交易';
          case 2:
            return '退款交易';
        }
      }
    },
    methods: {
      searchData() {
        channelReconciliation(this.searchs).then(res => {
          this.tableData = res.result;
          this.total = res.count;
          this.payAmountSum = res.payAmountSum;
          this.payAmountSum = res.payAmountSum;
          this.refundAmountSum = res.refundAmountSum;
          this.tradeAmountSum = res.tradeAmountSum;
          this.handChargeSum = res.handChargeSum
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
        let _q = {...this.searchs}
        delete _q['pageIndex']
        delete _q['pageSize']
        let query = qs.stringify(_q);
        window.open(channelbillTableExport() + '?' + query)
      },
    }
  }
</script>

<style scoped lang="scss">
  @import '~common/scss/common.scss';
</style>
