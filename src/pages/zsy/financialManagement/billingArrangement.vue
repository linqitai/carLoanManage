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
           <div class="width100 inline">
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
       </div>
     </div>
   </div>
 </div>
</template>

<script>
  import { payList } from 'common/js/config'
  export default {
    data() {
      return {
        payList: payList
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~common/scss/common.scss';
  @import './billingArrangement.scss'
</style>
