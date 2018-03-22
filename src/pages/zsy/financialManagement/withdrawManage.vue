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
            <el-input size="medium" clearable placeholder="" class="input" @keyup.enter.native="search"></el-input>
          </div>
        </div>
        <div class="element">
          <p class="inline">商户手机:</p>
          <div class="width140 inline">
            <el-input size="medium" clearable placeholder="" class="input" @keyup.enter.native="search"></el-input>
          </div>
        </div>
        <div class="element">
          <p class="inline">状态:</p>
          <div class="width120 inline">
            <el-select size="medium" placeholder="请选择" @change="search">
              <el-option v-for="item in statesList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="element" @click="search">
          <el-button size="medium" class="searchBtn">查询</el-button>
        </div>
      </div>
    </div>
    <div class="tableWrapper">
      <el-table :data="tableData" stripe>
        <el-table-column prop="date" label="交易时间" width="200"></el-table-column>
        <el-table-column prop="name" label="完成时间"></el-table-column>
        <el-table-column prop="name" label="商户"></el-table-column>
        <el-table-column prop="name" label="手机号"></el-table-column>
        <el-table-column prop="name" label="提现金额(元)" width="100"></el-table-column>
        <el-table-column prop="name" label="剩余金额(元)"></el-table-column>
        <el-table-column prop="name" label="手续费(元)"></el-table-column>
        <el-table-column prop="name" label="银行卡"></el-table-column>
        <el-table-column prop="name" label="状态"></el-table-column>
      </el-table>
      <div class="tableBottom">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes="[10,12,14,16]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import { statesList, tableData } from 'common/js/config'
  export default {
    data() {
      return {
        statesList: statesList,
        tableData: tableData
      }
    },
    methods: {
      search() {
      },
      startTimeChange(val) {
        console.log('change：' + val)
      },
      endTimeChange(val) {
        console.log('change：' + val)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~common/scss/common.scss';
  @import './withdrawManage.scss'
</style>
