<template>
<div class="remainTreasure">
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
        <span class="mainColor">余利宝</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="allWrapper">
    <div class="searchCondition">
      <div class="searchBox">
        <div class="element">
          <p class="inline">商户:</p>
          <div class="width140 inline">
            <el-input size="medium" v-model.trim="searchMenu.merchantname" clearable placeholder="" class="input" @keyup.enter.native="search"></el-input>
          </div>
        </div>
        <div class="element">
          <p class="inline">手机号:</p>
          <div class="width140 inline">
            <el-input size="medium" clearable v-model.trim="searchMenu.phone" placeholder="" class="input" @keyup.enter.native="search"></el-input>
          </div>
        </div>
        <div class="element">
          <p class="inline">时间</p>
          <div class="inline">
            <el-date-picker size="medium" v-model.trim="searchMenu.sdate" class="inline" style="width:134px;" type="date" placeholder="开始时间" @change="startTimeChange">
            </el-date-picker>
            <span class="inline">至</span>
            <el-date-picker size="medium" v-model.trim="searchMenu.edate" class="inline" style="width:134px;" type="date" placeholder="结束时间" @change="endTimeChange">
            </el-date-picker>
          </div>
        </div>
        <div class="element" @click="search">
          <el-button size="medium" class="searchBtn">查询</el-button>
        </div>
      </div>
    </div>
    <div class="tableWrapper">
      <el-table :data="tableList" stripe>
        <el-table-column prop="date" label="时间" width="200"></el-table-column>
        <el-table-column prop="merchantname" label="商户" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="手机号" min-width="120px"></el-table-column>
        <el-table-column prop="dayProfitYuan" label="收益(元)" width="100"></el-table-column>
        <el-table-column prop="totalProfitYuan" label="累计收益(元)"></el-table-column>
        <el-table-column prop="totalAmountYuan" label="账户总额(元)"></el-table-column>
      </el-table>
      <div class="tableBottom">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes="[10,20,30,40]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import { listYuLiBao } from "@/api/index"
  import { getDateTime } from "@/common/js/times"
  export default {
    data() {
      return {
        tableList: [],
        searchMenu: {
          merchantname: null,
          phone: null,
          sdate: null,
          edate: null
        },
        pageSize: 10,
        pageIndex: 1,
        total: null,
        loading: false
      }
    },
    created() {
      this.search();
    },
    methods: {
      search() {
        if (this.searchMenu.sdate && this.searchMenu.edate && new Date(this.searchMenu.sdate) - new Date(this.searchMenu.edate) > 0) {
          this.$message({
            type: 'error',
            message: '开始时间不能大于结束时间!'
          });
          return;
        }
        if (this.searchMenu.sdate) {
          this.searchMenu.sdate = getDateTime(new Date(this.searchMenu.sdate));
        }
        if (this.searchMenu.edate) {
          this.searchMenu.edate = getDateTime(new Date(this.searchMenu.edate));
        }
        this.loading = true;
        let params = {
          merchantname: this.searchMenu.merchantname,
          phone: this.searchMenu.phone,
          sdate: this.searchMenu.sdate,
          edate: this.searchMenu.edate,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        };
        listYuLiBao(params).then(res => {
          this.loading = false;
          if (res.code === 200) {
            this.tableList = res.result;
            this.total = res.count;
            for (let i = 0; i < this.tableList.length; i++) {
              this.tableList[i].totalProfitYuan = this.tableList[i].totalProfit / 100;
              this.tableList[i].dayProfitYuan = this.tableList[i].dayProfit / 100;
              this.tableList[i].totalAmountYuan = this.tableList[i].totalAmount / 100;
              this.tableList[i].dateTime = getDateTime(this.tableList[i].date);
            }
          };
        })
      },
      startTimeChange(val) {
        console.log('change：' + val)
      },
      endTimeChange(val) {
        console.log('change：' + val)
      },
      handleSizeChange: function(size) {
        this.pageSize = size;
        this.search();
      },
      handleCurrentChange: function(currentPage) {
        this.pageIndex = currentPage;
        this.search();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~common/scss/common.scss';
  @import './remainTreasure.scss'
</style>
