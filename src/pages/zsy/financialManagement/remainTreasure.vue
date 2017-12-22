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
            <el-input size="medium" clearable placeholder="" class="input" @keyup.enter.native="search"></el-input>
          </div>
        </div>
        <div class="element">
          <p class="inline">手机号:</p>
          <div class="width140 inline">
            <el-input size="medium" clearable placeholder="" class="input" @keyup.enter.native="search"></el-input>
          </div>
        </div>
        <div class="element">
          <p class="inline">时间</p>
          <div class="inline">
            <el-date-picker size="medium" class="inline" style="width:134px;" type="date" placeholder="开始时间" @change="startTimeChange">
            </el-date-picker>
            <span class="inline">至</span>
            <el-date-picker size="medium" class="inline" style="width:134px;" type="date" placeholder="结束时间" @change="endTimeChange">
            </el-date-picker>
          </div>
        </div>
        <div class="element" @click="search">
          <el-button size="medium" class="searchBtn">查询</el-button>
        </div>
      </div>
    </div>
    <div class="tableWrapper">
      <el-table :data="tableData" stripe>
        <el-table-column prop="date" label="时间" width="200"></el-table-column>
        <el-table-column prop="name" label="商户"></el-table-column>
        <el-table-column prop="name" label="手机号"></el-table-column>
        <el-table-column prop="name" label="收益(元)" width="100"></el-table-column>
        <el-table-column prop="name" label="累计收益(元)"></el-table-column>
        <el-table-column prop="name" label="账户总额(元)"></el-table-column>
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
  import { tableData } from 'common/js/config'
  export default {
    data() {
      return {
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
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~common/scss/common.scss';
  @import './remainTreasure.scss'
</style>
