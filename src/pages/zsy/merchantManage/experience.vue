<template>
  <div class="experience">
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
          <span class="mainColor">历程</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
          <div class="element">
            <p class="inline">时间</p>
            <div class="inline">
              <el-date-picker size="medium" class="inline" style="width:134px;" v-model="searchs.startTime" type="date" placeholder="开始时间" @change="startTimeChange">
              </el-date-picker>
              <span class="inline">至</span>
              <el-date-picker size="medium" class="inline" style="width:134px;" v-model="searchs.endTime" type="date" placeholder="结束时间" @change="endTimeChange">
              </el-date-picker>
            </div>
          </div>
          <div class="element">
            <p class="inline">姓名</p>
            <div class="width100 inline">
              <el-input size="medium" clearable placeholder="姓名查询" class="input" v-model="searchs.name" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">账号</p>
            <div class="width120 inline">
              <el-input size="medium" clearable placeholder="账号查询" class="input" v-model="searchs.account" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">角色</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="searchs.role" placeholder="请选择" @change="search">
                <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value">
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
              <p class="inline">商户</p>
              <div class="width140 inline">
                <el-input size="medium" clearable placeholder="商户查询" class="input" v-model="searchs.merchant" @keyup.enter.native="search"></el-input>
              </div>
            </div>
            <div class="element">
              <p class="inline">动作</p>
              <div class="width120 inline">
                <el-input size="medium" clearable placeholder="动作查询" class="input" v-model="searchs.action" @keyup.enter.native="search"></el-input>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="tableWrapper">
        <el-table :data="tableData" stripe style="min-width:800px;width: 940px;">
          <el-table-column prop="date" label="时间" width="200"></el-table-column>
          <el-table-column prop="name" label="姓名" width="150"></el-table-column>
          <el-table-column prop="name" label="账号" width="140"></el-table-column>
          <el-table-column prop="name" label="角色" width="100"></el-table-column>
          <el-table-column prop="name" label="商户" width="200"></el-table-column>
          <el-table-column prop="name" label="动作" width="140"></el-table-column>
        </el-table>
        <!-- <el-table :data="tableData" stripe style="min-width:1060px;max-width:1620px;width: 1150px;"></el-table> -->
        <el-dialog class="qrDialog" title="名称" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
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
import { experienceRoleList, tableData } from 'common/js/config'
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
      roleList: experienceRoleList,
      provinceList: '',
      cityList: '',
      areaList: '',
      searchs: {
        startTime: '',
        endTime: '',
        name: '',
        account: '',
        role: '',
        merchant: '',
        action: ''
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
    moreBtn() {
      console.log('click')
      this.searchCell = !this.searchCell
    },
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
.experience {
  position: relative;
  width: 100%;
  height: 100%;
  .qrDialog {
    .el-dialog__header {
      padding: 15px 0px 0px 0px;
    }
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