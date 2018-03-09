<template>
  <div class="agentMoney">
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
          <span class="mainColor">代理商分润</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <search-condition @clickSearchData="searchData">
        <div class="element">
          <p class="inline">时间</p>
          <div class="inline">
            <el-date-picker size="medium" class="inline" style="width:138px;" type="month" placeholder="开始时间" value-format="yyyy-MM-dd" @change="startTimeChange" v-model="searchs.sdate">
            </el-date-picker>
            <span class="inline">至</span>
            <el-date-picker size="medium" class="inline" style="width:138px;" type="month" placeholder="结束时间" value-format="yyyy-MM-dd" @change="endTimeChange" v-model="searchs.edate">
            </el-date-picker>
          </div>
        </div>
        <div class="element">
          <p class="inline">代理商:</p>
          <div class="width140 inline">
            <el-input size="medium" clearable placeholder="代理商查询" class="input" @keyup.enter.native="searchData" v-model="searchs.agentName"></el-input>
          </div>
        </div>
        <div class="element">
          <p class="inline">服务码:</p>
          <div class="width140 inline">
            <el-input size="medium" clearable placeholder="服务码查询" class="input" @keyup.enter.native="searchData" v-model="searchs.code"></el-input>
          </div>
        </div>
        <div class="element">
          <p class="inline">分润排序:</p>
          <div class="width120 inline">
            <el-select size="medium" placeholder="请选择" @change="searchData" v-model="searchs.orderType">
              <el-option v-for="item in moneyList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </search-condition>
      <div class="tableWrapper">
        <div class="tableWrapper-excel">
          <span class="tableWrapper-excel-pad">分润总和:{{agentIncomeSum}}</span>
          <span class="tableWrapper-excel-border" @click="downloadExl" style="cursor:pointer">导出成excel</span>
        </div>
        <el-table :data="tableData" stripe>
          <el-table-column prop="transDate" label="时间" width="200"></el-table-column>
          <el-table-column prop="agentName" label="代理商"></el-table-column>
          <el-table-column prop="code" label="服务码"></el-table-column>
          <el-table-column prop="agentIncome" label="分润金额(元)" min-width="120"></el-table-column>
          <!-- <el-table-column prop="buyerPayAmount" label="商户收款总额(元)"></el-table-column> -->
          <el-table-column label="商户收款总额(元)">
            <template slot-scope="scope">
              {{scope.row.buyerPayAmount}} &nbsp;&nbsp;
              <el-button type="text" size="middle" @click="detail(scope.row)">明细</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="tableBottom" v-if="total>searchs.pageSize">
          <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="searchs.pageSize" :page-sizes="pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { moneyList, PAGESIZES } from "common/js/config";
import { zsyAgentIncomeList, zsyRedListExcel } from "@/api/index.js";
// import { getDate } from "@/common/js/times"
import qs from 'qs'
import searchCondition from 'components/searchCondition.vue'
export default {
  data() {
    return {
      pageSizes: PAGESIZES,
      moneyList: moneyList,
      tableData: [],
      total: null,
      agentIncomeSum: null,
      searchs: {
        sdate: '',
        edate: '',
        transDate: "",
        agentName: "",
        code: "",
        agentIncome: "",
        orderType: "",
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
      if (
        (this.searchs.sdate && !this.searchs.edate) ||
        (!this.searchs.sdate && this.searchs.edate)
      ) {
        this.$alert("请输入完整的起止时间", "提示", {
          confirmButtonText: "确定"
        });
      } else if (
        this.searchs.sdate !== "" &&
        this.searchs.edate !== "" &&
        new Date(this.searchs.sdate) - new Date(this.searchs.edate) > 0
      ) {
        this.$alert("请输入正确的起止时间，结束时间不能小于等于开始时间", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        zsyAgentIncomeList(this.searchs).then(res => {
          this.tableData = res.result;
          this.total = res.count;
          this.agentIncomeSum = res.agentIncomeSum;
        });
      }
    },
    downloadExl() {
      console.log(111);
      let _q = { ...this.searchs };
      delete _q["pageIndex"];
      delete _q["pageSize"];
      let query = qs.stringify(_q);
      window.open(zsyRedListExcel() + "?" + query);
    },
    search() { },
    startTimeChange(val) {
      console.log("change：" + val);
    },
    endTimeChange(val) {
      console.log("change：" + val);
      const arr = this.searchs.edate.split("-");
      let dayCount = new Date(arr[0], arr[1], 0).getDate();
      this.searchs.edate = this.searchs.edate.substring(0,7);
      this.searchs.edate = this.searchs.edate + '-' + dayCount;
    },
    handleSizeChange(val) {
      this.searchs.pageSize = val;
      this.searchData();
    },
    handleCurrentChange(val) {
      this.searchs.pageIndex = val;
      this.searchData();
    },
    detail(row) {
      console.log(row);
      this.$router.push('bill?code=' + row.code + '&transDate=' + row.transDate);
    }
  },
  components: {
    searchCondition
  }
}
</script>

<style scoped lang="scss">
@import "~common/scss/common.scss";
@import "./agentMoney.scss";
</style>
