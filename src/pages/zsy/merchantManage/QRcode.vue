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
              <el-input size="medium" clearable placeholder="名称查询" class="input" v-model="searchs.name" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">所属门店</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="所属门店查询" class="input" v-model="searchs.store" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">所属商户</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="所属商户查询" class="input" v-model="searchs.merchant" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element" @click="search">
            <el-button size="medium" class="searchBtn">查询</el-button>
          </div>
        </div>
      </div>
      <div class="tableWrapper">
        <el-table :data="tableData" stripe style="min-width:860px;width: 930px;">
          <el-table-column fixed prop="date" label="添加时间" width="180"></el-table-column>
          <el-table-column prop="name" label="名称" width="120"></el-table-column>
          <el-table-column prop="name" label="编号" width="150"></el-table-column>
          <el-table-column prop="name" label="所属门店" width="200"></el-table-column>
          <el-table-column prop="name" label="所属商户" width="200"></el-table-column>
          <el-table-column fixed="right" label="图片" width="80">
            <template slot-scope="scope">
              <el-button @click="detail(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-table :data="tableData" stripe style="min-width:1060px;max-width:1620px;width: 1150px;"></el-table> -->
        <el-dialog class="qrDialog" title="名称" :visible.sync="dialogVisible" width="500" :before-close="handleClose">
          <div class="storeText">
            <span>所属门店:</span>
            <span>所属门店</span>
          </div>
          <img src="../../../common/images/qrCode.png" alt="">
        </el-dialog>
      </div>
      <div class="tableBottom">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes="[10,12,14,16]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mtypeList, runTYpeList, statusList, tableData } from 'common/js/config'
export default {
  data() {
    return {
      dialogVisible: false,
      maxLengthMobile: 11,
      maxLengthIdentity: 18,
      isShowMore: false,
      showCheckbox: false,
      searchCell: false,
      pageIndex: 1,
      pageSize: 12,
      total: 1,
      showSizeChanger: true,
      pageSizeOption: [10, 15, 20, 25, 30],
      mtypeList: mtypeList,
      runTYpeList: runTYpeList,
      statusList: statusList,
      provinceList: '',
      cityList: '',
      areaList: '',
      searchs: {
        sName: '',
        mName: '',
        fzMan: '',
        mobile: '',
        address: {
          province: '',
          city: '',
          area: ''
        }
      },
      tableData: tableData
    }
  },
  filters: {
    openClose(value) {
      return value === 1 ? '禁用' : value === 0 ? '启用' : '---'
    }
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = false;
    },
    toRouter(index) {
      this.$router.push(index)
    },
    detail(item) {
      console.log(item);
      this.dialogVisible = true;
    },
    search() {
      // ...
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
  },
  components: {
  }
}
</script>

<style lang="scss">
@import '~common/scss/common.scss';
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