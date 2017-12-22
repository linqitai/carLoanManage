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
           <p class="inline">姓名:</p>
           <div class="width100 inline">
             <el-input size="medium" clearable placeholder="" class="input" @keyup.enter.native="search"></el-input>
           </div>
         </div>
         <div class="element">
           <p class="inline">商户:</p>
           <div class="width140 inline">
             <el-input size="medium" clearable placeholder="" class="input" @keyup.enter.native="search"></el-input>
           </div>
         </div>
         <div class="element">
           <p class="inline">支付来源:</p>
           <div class="width120 inline">
             <el-select size="medium" placeholder="请选择" @change="search">
               <el-option v-for="item in payList" :key="item.value" :label="item.label" :value="item.value">
               </el-option>
             </el-select>
           </div>
         </div>
         <div class="element">
           <p class="inline">收款方式:</p>
           <div class="width120 inline">
             <el-select size="medium" placeholder="请选择" @change="search">
               <el-option v-for="item in collectionList" :key="item.value" :label="item.label" :value="item.value">
               </el-option>
             </el-select>
           </div>
         </div>
         <div class="element" @click="search">
           <el-button size="medium" class="searchBtn">查询</el-button>
         </div>
         <div class="element" @click="moreBtn">
           <img class="moreIcon" src="../../../common/images/arrow_down.png" v-if="!searchCell">
           <img class="moreIcon iconTransform" src="../../../common/images/arrow_down.png" v-if="searchCell">
         </div>
       </div>
       <transition name="">
         <div class="searchBox clear" v-if="searchCell">
           <div class="element">
             <p class="inline">订单号:</p>
             <div class="width140 inline">
               <el-input size="medium" clearable placeholder="" class="input" @keyup.enter.native="search"></el-input>
             </div>
           </div>
           <div class="element">
             <p class="inline">代理商:</p>
             <div class="width140 inline">
               <el-input size="medium" clearable placeholder="" class="input" @keyup.enter.native="search"></el-input>
             </div>
           </div>
           <div class="element">
             <p class="inline">服务密码:</p>
             <div class="width140 inline">
               <el-input size="medium" clearable placeholder="" class="input" @keyup.enter.native="search"></el-input>
             </div>
           </div>
         </div>
       </transition>
       <transition name="">
         <div class="searchBox clear" v-if="searchCell">
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
         </div>
       </transition>
     </div>
     <div class="tableWrapper">
       <div class="tableWrapper-excel"><span class="tableWrapper-excel-pad">实收金额:{{money}}</span><span class="tableWrapper-excel-border" @click="downloadExl()">导出成excel</span></div>
       <el-table :data="tableData" stripe>
         <el-table-column prop="date" label="收款时间" width="200"></el-table-column>
         <el-table-column prop="name" label="店铺"></el-table-column>
         <el-table-column prop="name" label="商户"></el-table-column>
         <el-table-column prop="name" label="实收金额(元)" width="100"></el-table-column>
         <el-table-column prop="name" label="支付来源"></el-table-column>
         <el-table-column prop="name" label="收款方式"></el-table-column>
         <el-table-column prop="name" label="订单号"></el-table-column>
         <el-table-column prop="name" label="代理商"></el-table-column>
         <el-table-column prop="name" label="操作"></el-table-column>
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
  import { payList, collectionList, tableData } from 'common/js/config'
  export default {
    data() {
      return {
        money: 4564979,
        payList: payList,
        collectionList: collectionList,
        value: '',
        searchCell: false,
        tableData: tableData
      }
    },
    methods: {
      moreBtn() {
        this.searchCell = !this.searchCell
      },
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
      },
      downloadExl() {
//        location.href = "/manage/excel.json?method=exportOrderExcel"+
//          "&astk="+localStorage.token+
//          "&receiverMobile="+this.form.receiverMobile+
//          "&startDate="+this.form.startDate+
//          "&endDate="+this.form.endDate+
//          "&serviceState="+this.form.serviceState+
//          "&province="+this.form.province+
//          "&city="+this.form.city+
//          "&area="+this.form.area;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~common/scss/common.scss';
  @import './billingArrangement.scss'
</style>
