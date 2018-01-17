<template>
  <div class="storeManage">
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
          <span class="text">商户管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="mainColor">门店管理</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
          <div class="element">
            <p class="inline">店铺名称</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="店铺名称查询" class="input" v-model="searchs.shopname" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">商户名称</p>
            <div class="width200 inline">
              <el-input size="medium" clearable placeholder="商户名称查询" class="input" v-model="searchs.merchantname" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">负责人</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="负责人查询" class="input" v-model="searchs.responsiblename" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">手机号码</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="手机号码查询" :maxlength="maxLengthMobile" class="input" v-model="searchs.phone" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element" >
            <el-button size="medium" class="searchBtn" @click="searchData">查询</el-button>
          </div>
          <div class="element" @click="moreBtn">
            <img class="moreIcon" src="../../../common/images/arrow_down.png" v-if="!searchCell">
            <img class="moreIcon iconTransform" src="../../../common/images/arrow_down.png" v-if="searchCell">
          </div>
        </div>
        <transition name="">
          <div class="searchBox clear" v-if="searchCell">
            <div class="element">
              <p class="inline">店铺地址</p>
            <div class="width140 inline">
              <el-select size="medium" v-model="searchs.runTYpe" placeholder="请选择" @change="searchData">
                <el-option v-for="item in runTYpeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="tableWrapper">
        <el-table :data="tableData" stripe>
          <el-table-column prop="shopname" label="店铺名称"></el-table-column>
          <el-table-column prop="merchantname" label="所属商户"></el-table-column>
          <el-table-column prop="responsiblename" label="负责人"></el-table-column>
          <el-table-column prop="phone" label="手机号码"></el-table-column>
          <el-table-column prop="province" label="店铺地址" show-overflow-tooltip width="300">
             <template slot-scope="scope">{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.address}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="toRouter('/operatorManage?shopname=' + scope.row.shopname)">操作员</el-button>
              <el-button type="text" size="small" @click="toRouter('/QRcode?shopname=' + scope.row.shopname)">收款码</el-button>
              <el-button type="text" size="small" @click="toRouter('/bill?shopname=' + scope.row.shopname)">账单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tableBottom">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mtypeList, runTYpeList, statusList } from "common/js/config";
import { zsyStore } from "@/api/index.js";
export default {
  data() {
    return {
      maxLengthMobile: 11,
      maxLengthIdentity: 18,
      isShowMore: false,
      showCheckbox: false,
      searchCell: false,
      showSizeChanger: true,
      pageSizeOption: [10, 15, 20, 25, 30],
      provinceList: "",
      cityList: "",
      areaList: "",
      total: null,
      tableData: [],
      searchs: {
        shopname: "",
        merchantname: this.$route.query.merchantname,
        responsiblename: "",
        phone: "",
        province: "",
        pageSize: 10,
        pageIndex: 1
      }
    };
  },
  filters: {
    openClose(value) {
      return value === 1 ? "禁用" : value === 0 ? "启用" : "---";
    }
  },
  created() {
    this.searchData();
    // this.searchTable();
  },
  methods: {
    searchData() {
      zsyStore(this.searchs).then(res => {
        this.tableData = res.result;
        this.total = res.count;
      });
    },
    toRouter(index) {
      this.$router.push(index);
    },
    moreBtn() {
      console.log("click");
      this.searchCell = !this.searchCell;
    },
    openOrClose(row) {
      let cancalMsg = "操作已取消";
      if (row.isopen === 1) {
        this.$prompt(`请输入禁用商户[${row.name}]的原因`, "禁用商户", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(({ value }) => {
            this.$message({
              type: "success",
              message: `你禁用商户[${row.name}]的原因是: ` + value
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: cancalMsg
            });
          });
      } else {
        this.$confirm(`此操作将启用商户[${row.name}], 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "启用成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: cancalMsg
            });
          });
      }
    },
    detail(item) {
      console.log(item);
      this.$router.push("/merchantManageDetail");
    },
    searchEvent() {
      console.log("searchEvent");
    },
    startTimeChange(val) {
      console.log("change：" + val);
    },
    endTimeChange(val) {
      console.log("change：" + val);
    },
    // searchData(val) {
    //   this.searchs.pageIndex = val;
    //   this.searchTable();
    // },
    handleSizeChange(val) {
      this.searchs.pageSize = val;
      this.searchData();
    },
    handleCurrentChange(val) {
      this.searchs.pageIndex = val;
      this.searchData();
    }
  },
  components: {}
};
</script>

<style lang="scss">
.storeManage {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>