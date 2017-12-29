<template>
  <div class="QRcode">
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
          <span class="mainColor">收款码管理</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
          <div class="element">
            <p class="inline">名称</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="名称查询" class="input" v-model="searchs.codename" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">所属门店</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="所属门店查询" class="input" v-model="searchs.shopname" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">所属商户</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="所属商户查询" class="input" v-model="searchs.merchantname" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element" >
            <el-button size="medium" class="searchBtn" @click="searchData">查询</el-button>
          </div>
        </div>
      </div>
      <div class="tableWrapper">
        <el-table :data="tableData" stripe style="min-width:860px;width: 930px;">
          <el-table-column fixed prop="codename" label="名称" width="120"></el-table-column>
          <el-table-column prop="shopid" label="编号" width="150"></el-table-column>
          <el-table-column prop="shopname" label="所属门店" width="200"></el-table-column>
          <el-table-column prop="merchantname" label="所属商户" width="200"></el-table-column>
          <el-table-column prop="created" label="添加时间" width="180"></el-table-column>
          <el-table-column prop="imageurl" fixed="right" label="图片" width="80">
            <template slot-scope="scope">
              <el-button @click="imgDetail(scope.$index,tableData)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-table :data="tableData" stripe style="min-width:1060px;max-width:1620px;width: 1150px;"></el-table> -->
        <el-dialog class="qrDialog" prop="shopname" :title='activeShop + "收银二维码"' :data="tableData" :visible.sync="dialogVisible" width="500" :before-close="handleClose">
          <div class="storeText">
            <span>所属门店:{{shopname}}</span>
          </div>
          <img :src="clickshowimg" />
        </el-dialog>
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
import { zsyQRcode } from "@/api/index.js";
export default {
  data() {
    return {
      activeShop: '',
      dialogVisible: false,
      maxLengthMobile: 11,
      maxLengthIdentity: 18,
      isShowMore: false,
      showCheckbox: false,
      searchCell: false,
      showSizeChanger: true,
      pageSizeOption: [10, 15, 20, 25, 30],
      mtypeList: mtypeList,
      runTYpeList: runTYpeList,
      statusList: statusList,
      provinceList: "",
      cityList: "",
      areaList: "",
      total: "",
      tableData: [],
      shopname: "",
      searchs: {
        codename: "",
        shopname: "",
        merchantname: "",
        pageIndex: 1,
        pageSize: 10
      },
      clickshowimg: null
    };
  },
  filters: {
    openClose(value) {
      return value === 1 ? "禁用" : value === 0 ? "启用" : "---";
    }
  },
  created() {
    // this.imgDetail();
    this.searchData();
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = false;
    },
    toRouter(index) {
      this.$router.push(index);
    },
    search() {
      // ...
    },
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
    // 查看按钮
    imgDetail(index, rows) {
      this.rowIndex = index;
      this.dialogVisible = true;
      this.activeShop = rows[index].shopname;
      this.clickshowimg = rows[index].imageurl;
      this.shopname = rows[index].shopname;
    },
    searchData() {
      zsyQRcode(this.searchs).then(res => {
        this.tableData = res.result;
        console.log(res, this.tableData);
        this.total = res.count;
      });
    }
  },
  components: {}
};
</script>

<style lang="scss">
@import "~common/scss/common.scss";
.QRcode {
  position: relative;
  width: 100%;
  height: 100%;
  .qrDialog {
    .el-dialog__title {
      display: block;
      text-align: center !important;
      font-size: $font-size-ll;
    }
    .el-dialog__body {
      text-align: center;
      padding: 0px 0px 20px 0;
    }
    .storeText {
      padding-bottom: 3px;
      font-size: $font-size-s;
    }
  }
}
</style>