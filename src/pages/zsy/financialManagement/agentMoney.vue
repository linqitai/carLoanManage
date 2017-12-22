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
      <div class="searchCondition">
        <div class="searchBox">
          <div class="element">
            <p class="inline">代理商:</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="" class="input" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">服务码:</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="" class="input" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">分润排序:</p>
            <div class="width120 inline">
              <el-select size="medium" placeholder="请选择" @change="search">
                <el-option v-for="item in moneyList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
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
        <div class="tableWrapper-excel"><span class="tableWrapper-excel-pad">分润总和:3123123213</span><span class="tableWrapper-excel-border" @click="downloadExl()">导出成excel</span></div>
        <el-table :data="tableData" stripe>
          <el-table-column prop="date" label="时间" width="200"></el-table-column>
          <el-table-column prop="name" label="代理商"></el-table-column>
          <el-table-column prop="name" label="服务码"></el-table-column>
          <el-table-column prop="name" label="分润金额(元)" width="100"></el-table-column>
          <el-table-column prop="name" label="商户收款总额(元)"></el-table-column>
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
  import { moneyList, tableData } from 'common/js/config'

  export default {
    data() {
      return {
        moneyList: moneyList,
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
  @import './agentMoney.scss'
</style>
