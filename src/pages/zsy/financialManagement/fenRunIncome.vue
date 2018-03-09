<template>
<div class="fenRunIncome">
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
        <span class="mainColor">分润收入</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="allWrapper">
    <div class="searchCondition">
      <div class="searchBox">
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
          <p class="inline">分润收入排序:</p>
          <div class="width120 inline">
            <el-select size="medium" placeholder="请选择" @change="searchData" v-model="searchs.orderType">
              <el-option v-for="item in IncomeList" :key="item.value" :label="item.label" :value="item.value" >
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
      <div class="tableWrapper-excel"><span class="tableWrapper-excel-pad">分润总和:{{companyIncomeSum}}</span></div>
      <el-table :data="tableData" stripe>
        <el-table-column prop="transDate" label="时间"></el-table-column>
        <!-- <el-table-column prop="buyerPayAmount" label="商户收款总额(元)"></el-table-column> -->
        <el-table-column label="商户收款总额(元)">
          <template slot-scope="scope">
            {{scope.row.buyerPayAmount}} &nbsp;&nbsp;
            <el-button type="text" size="middle" @click="detail(scope.row)">明细</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="income" label="分润收入(元)"></el-table-column>
        <el-table-column prop="companyIncome" label="分润总金额(元)">
        </el-table-column>
        <el-table-column prop="agentIncome" label="代理商分润(元)"></el-table-column>
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
import { IncomeList, PAGESIZES } from "common/js/config";
import { zsyIncomeList } from "@/api/index.js";
export default {
  data() {
    return {
      pageSizes: PAGESIZES,
      IncomeList: IncomeList,
      tableData: [],
      total: null,
      companyIncomeSum: null,
      searchs: {
        transDate: "",
        buyerPayAmount: "",
        companyIncome: "",
        companyIncomeSum: "",
        agentIncome: "",
        orderType: "",
        sdate: "",
        edate: "",
        pageSize: 10,
        pageIndex: 1
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
        const arr = this.searchs.edate.split("-");
        let dayCount = new Date(arr[0], arr[1], 0).getDate();
        this.searchs.edate = this.searchs.edate.substring(0,7);
        this.searchs.edate = this.searchs.edate + '-' + dayCount;
        zsyIncomeList(this.searchs).then(res => {
          this.tableData = res.result;
          this.total = res.count;
          this.companyIncomeSum = res.companyIncomeSum;
        });
      }
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
    },
    detail(row) {
      console.log(row);
      this.$router.push('bill?transDate=' + row.transDate);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~common/scss/common.scss";
@import "./agentMoney.scss";
</style>
