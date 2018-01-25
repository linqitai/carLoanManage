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
            <span class="value">{{orderDetails.shopName}}</span>
          </div>
          <div class="lineText">
            <span class="label">商户</span>
            <span class="value">{{orderDetails.merchantName}}</span>
          </div>
          <div class="lineText">
            <span class="label">收银员</span>
            <span class="value">{{orderDetails.operName}}</span>
          </div>
          <div class="lineText">
            <span class="label">代理商</span>
            <span class="value">{{orderDetails.agentName}}</span>
          </div>
          <div class="lineText">
            <span class="label">实收金额</span>
            <span class="value">{{orderDetails.totalamount - orderDetails.refundamount}}</span>
          </div>
          <div class="lineText">
            <span class="label">订单金额</span>
            <span class="value">{{orderDetails.totalamount}}</span>
          </div>
          <div class="lineText">
            <el-popover
            ref="popover4"
            placement="right"
            width="600"
            trigger="click">
            <el-table :data="tableData">
                <el-table-column width="200" label="退款时间">
                  <template slot-scope="scope">
                    {{scope.row.created | dateFormat}}
                  </template>
                </el-table-column>
                <el-table-column width="90" prop="refundAmount" label="退款金额"></el-table-column>
                <el-table-column width="200" label="退款人">
                    <template slot-scope="scope">
                      {{scope.row.refundUser}}/{{scope.row.refundPhone}}
                    </template>
                </el-table-column>
                <el-table-column width="110" label="退款原因">
                  <template slot-scope="scope">
                    {{scope.row.refundReason | refundReasonType}}
                  </template>
                </el-table-column>
            </el-table>
            </el-popover>
            <span class="label">退款金额</span>
            <span class="value">{{orderDetails.refundamount}}</span>
            <span class="element" style="margin-left:30px;cursor: pointer;" v-popover:popover4>
              <i class="el-icon-info" style="color:#029E8A;"></i>
            </span>
          </div>
          <div class="lineText">
            <span class="label">结算金额</span>
            <span class="value">{{orderDetails.revenue}}</span>
          </div>
          <div class="lineText">
            <span class="label">手续费</span>
            <span class="value">{{orderDetails.handCharge}}</span>
          </div>
          <div class="lineText">
            <span class="label">收款来源</span>
            <span class="value">{{orderDetails.channelName}}</span>
          </div>
          <div class="lineText">
            <span class="label">收款方式</span>
            <span class="value">{{orderDetails.payModeName}}</span>
          </div>
          <div class="lineText">
            <span class="label">收款时间</span>
            <span class="value">
                {{orderDetails.created | dateFormat}}
            </span>
          </div>
          <div class="lineText">
            <span class="label">订单号</span>
            <span class="value">{{orderDetails.merchantOrderNo}}</span>
          </div>
          <div class="lineText">
            <span class="label">备注</span>
            <span class="value">{{orderDetails.common}}</span>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import { billDetails } from "@/api/index.js";
import { format } from "common/js/times";
export default {
  data() {
    return {
      orderDetails: {},
      searchCell: false,
      tableData: []
    };
  },
  filters: {
    dateFormat(value) {
      return format(value);
    },
    refundReasonType(value) {
      switch (value) {
        case "1":
          return '收错金额';
        case "2":
          return '用户输错金额';
        case "3":
          return '其他';  
      }
    },
  },
  created() {
    const orderid = this.$route.query.orderid;
    this.search(orderid);
  },
  methods: {
    moreBtn() {
      this.searchCell = !this.searchCell;
    },
    search(id) {
      billDetails({ orderId: id }).then(res => {
        this.orderDetails = res.result;
        this.tableData = res.result.refundOrders;
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~common/scss/common.scss";
@import "./details.scss";
</style>
