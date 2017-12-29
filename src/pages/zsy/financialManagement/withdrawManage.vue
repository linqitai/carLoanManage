<template>
<div class="withdrawManage">
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
        <span class="mainColor">提现管理</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="allWrapper">
    <div class="searchCondition">
      <div class="searchBox">
        <div class="element">
          <p class="inline">商户:</p>
          <div class="width140 inline">
            <el-input size="medium" clearable placeholder="" class="input" @keyup.enter.native="search" v-model="searchs.merchantName"></el-input>
          </div>
        </div>
        <div class="element">
          <p class="inline">商户手机:</p>
          <div class="width140 inline">
            <el-input size="medium" clearable placeholder="" class="input" @keyup.enter.native="search" v-model="searchs.phone"></el-input>
          </div>
        </div>
        <div class="element">
          <p class="inline">状态:</p>
          <div class="width120 inline">
            <el-select size="medium" placeholder="请选择" @change="search" v-model="searchs.tradeStatus">
              <el-option v-for="item in statesList" :key="item.value" :label="item.label" :value="item.value" >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="element">
          <el-button size="medium" class="searchBtn" @click="searchData">查询</el-button>
        </div>
      </div>
    </div>
    <div class="tableWrapper">
      <el-table :data="tableData" stripe>
        <el-table-column prop="created" label="交易时间"></el-table-column>
        <el-table-column label="完成时间">
          <template slot-scope="scope">{{scope.row.transDate}} {{scope.row.transTime}}</template>
        </el-table-column>
        <el-table-column prop="merchantName" label="商户"></el-table-column>
        <el-table-column prop="operPhone" label="手机号"></el-table-column>
        <el-table-column prop="buyerPayAmount" label="提现金额(元)"></el-table-column>
        <el-table-column prop="residualAmount" label="剩余金额(元)"></el-table-column>
        <el-table-column prop="handCharge" label="手续费(元)"></el-table-column>
        <el-table-column prop="bankCardName" label="银行卡"></el-table-column>
        <el-table-column prop="tradeStatus" label="状态"></el-table-column>
      </el-table>
      <div class="tableBottom">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="searchs.pageIndex" :page-size="searchs.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { statesList } from "common/js/config";
import { zsyRedeemList } from "@/api/index.js";
export default {
  data() {
    return {
      statesList: statesList,
      tableData: [],
      total: null,
      searchs: {
        created: "",
        transDate: "",
        merchantName: "",
        operPhone: "",
        phone: "",
        buyerPayAmount: "",
        residualAmount: "",
        handCharge: "",
        bankCardName: "",
        tradeStatus: "",
        transTime: "",
        pageIndex: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.searchData();
  },
  methods: {
    searchData() {
      zsyRedeemList(this.searchs).then(res => {
        console.log(res.result);
        this.tableData = res.result;
        // this.tableData.transTime = res.result.transDate + res.result.transTime;
        this.total = res.count;
      });
    },
    search() {},
    startTimeChange(val) {
      console.log("change：" + val);
    },
    endTimeChange(val) {
      console.log("change：" + val);
    },
    handleSizeChange(val) {
      this.searchs.pageSize = val;
      this.searchData();
    },
    handleCurrentChange(val) {
      this.searchs.pageIndex = val;
      this.searchData();
    }
  }
};
</script>

<style scoped lang="scss">
@import "~common/scss/common.scss";
@import "./withdrawManage.scss";
</style>
