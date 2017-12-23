<template>
<div class="details">
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
        <span class="text">账单管理</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span class="mainColor">详情</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="allWrapper">
      <div class="infoBox">
        <div class="contentText">
          <div class="lineText">
            <span class="label">店铺</span>
            <span class="value">银泰商业城</span>
          </div>
          <div class="lineText">
            <span class="label">商户</span>
            <span class="value">个体工商户</span>
          </div>
          <div class="lineText">
            <span class="label">收银员</span>
            <span class="value">64561545454545ddd</span>
          </div>
          <div class="lineText">
            <span class="label">代理商</span>
            <span class="value">64561545</span>
          </div>
          <div class="lineText">
            <span class="label">实收金额</span>
            <span class="value">64561545454545ddd</span>
          </div>
          <div class="lineText">
            <span class="label">实收金额</span>
            <span class="value">64561545454545ddd</span>
          </div>
          <div class="lineText">
            <span class="label">订单金额</span>
            <span class="value">64561545454545ddd</span>
          </div>
          <div class="lineText">
            <span class="label">退款金额</span>
            <span class="value">64561545454545ddd</span>
          </div>
          <div class="lineText">
            <span class="label">结算金额</span>
            <span class="value">64561545454545ddd</span>
          </div>
          <div class="element" @click="moreBtn">
           <img class="moreIcon" src="../../../common/images/arrow_down.png" v-if="!searchCell">
           <img class="moreIcon iconTransform" src="../../../common/images/arrow_down.png" v-if="searchCell">
         </div>
          <div class="lineText">
            <span class="label">手续费</span>
            <span class="value">64561545454545ddd</span>
          </div>
          <div class="lineText">
            <span class="label">收款来源</span>
            <span class="value">64561545454545ddd</span>
          </div>
          <div class="lineText">
            <span class="label">收款方式</span>
            <span class="value">64561545454545ddd</span>
          </div>
          <div class="lineText">
            <span class="label">收款时间</span>
            <span class="value">64561545454545ddd</span>
          </div>
          <div class="lineText">
            <span class="label">订单号</span>
            <span class="value">64561545454545ddd</span>
          </div>
          <div class="lineText">
            <span class="label">备注</span>
            <span class="value">64561545454545ddd</span>
          </div>
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
        searchCell: false
      }
    },
    methods: {
      moreBtn() {
        this.searchCell = !this.searchCell
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~common/scss/common.scss';
  @import './details.scss'
</style>
