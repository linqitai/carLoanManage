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
          <span class="mainColor">代理商管理</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <search-condition @clickSearchData="searchTable">
        <el-form ref="form" :model="form" label-width="80px">
          <div class="element">
            <el-button size="medium" class="add-btn" @click="agentAdd">+ 新增</el-button>
          </div>
          <div class="element">
            <p class="inline">加入时间:</p>
            <div class="inline">
              <el-date-picker size="medium" class="inline" style="width:138px;" v-model="form.startDate" type="date" placeholder="开始时间">
              </el-date-picker>
              <span class="inline">至</span>
              <el-date-picker size="medium" class="inline" style="width:138px;" v-model="form.endDate" type="date" placeholder="结束时间">
              </el-date-picker>
            </div>
          </div>
          <div class="element">
            <p class="inline">代理人:</p>
            <div class="width160 inline">
              <el-input size="medium" clearable placeholder="请输入代理人" class="input" v-model="form.agentName" @keyup.enter.native="searchTable"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">手机号:</p>
            <div class="width160 inline">
              <el-input size="medium" clearable placeholder="请输入手机号" class="input" v-model="form.mobilePhone" @keyup.enter.native="searchTable"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">拓展人:</p>
            <div class="width160 inline">
              <el-input size="medium" clearable placeholder="请输入拓展人" class="input" v-model="form.developPerson" @keyup.enter.native="searchTable"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">是否启用:</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="form.isUsing" placeholder="请选择">
                <el-option v-for="item in isUsingList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">店铺地址:</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="form.province" placeholder="请选择" @change="provinceChange">
                <el-option v-for="item in form.provinceList" :key="item.adcode" :label="item.name" :value="item.adcode">
                </el-option>
              </el-select>
            </div>
            <div class="width120 inline" v-if="form.province">
              <el-select size="medium" v-model="form.city" placeholder="请选择" @change="cityChange">
                <el-option v-for="item in form.cityList" :key="item.adcode" :label="item.name" :value="item.adcode">
                </el-option>
              </el-select>
            </div>
            <div class="width120 inline" v-if="form.city">
              <el-select size="medium" v-model="form.county" placeholder="请选择" @change="countyChange">
                <el-option v-for="item in form.countyList" :key="item.adcode" :label="item.name" :value="item.adcode">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-form>
      </search-condition>
      <div class="tableWrapper">
        <el-table :data="tableList" stripe fit v-loading="loading">
          <el-table-column prop="joinTime" label="加入时间" min-width="160px" fixed="left"></el-table-column>
          <el-table-column prop="agentName" label="代理人" min-width="80px"></el-table-column>
          <el-table-column prop="sexs" label="性别" min-width="50px"></el-table-column>
          <el-table-column prop="idCardNo" label="身份证号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="mobilePhone" label="手机号" min-width="125px"></el-table-column>
          <el-table-column prop="code" label="服务码"></el-table-column>
          <el-table-column prop="detailAddress" label="所在地" show-overflow-tooltip min-width="150px"></el-table-column>
          <el-table-column prop="shearRatePresent" label="分润率（%）" min-width="115px"></el-table-column>
          <el-table-column prop="states" label="状态" min-width="110px"></el-table-column>
          <el-table-column prop="developPerson" label="拓展人"></el-table-column>
          <el-table-column prop="" label="操作" min-width="135px" fixed="right">
            <template slot-scope="scope">
              <el-button @click="handleClick1(scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="handleClick2(scope.row)" type="text" size="small">{{scope.row.editUse}}</el-button>
              <el-button @click="handleClick3(scope.row)" type="text" size="small">商户</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tableBottom" v-if="total>form.pageSize">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { isUsingList, sexList, mtypeList, runTYpeList, statusList, tableData, PAGESIZES } from 'common/js/config'
import { agentlist, updateUsing, cityList } from "@/api/index"
import { getDateTime, getDate } from "@/common/js/times"
import searchCondition from 'components/searchCondition.vue'
export default {
  data() {
    return {
      loading: false,
      form: {
        startDate: null,
        endDate: null,
        agentName: null,
        mobilePhone: null,
        developPerson: null,
        isUsing: null,
        province: null,
        provinceList: [],
        city: null,
        cityList: [],
        county: null,
        countyList: [],
        pageSize: 10,
        pageIndex: 1
      },
      sexList: sexList,
      isUsingList: isUsingList,
      dealForm: {
        region: [],
        desc: null
      },
      mtypeList: [],
      tableList: [],
      currentPage: 1,
      total: 0,
      pageSizes: PAGESIZES
    }
  },
  filters: {

  },
  created: function() {
    this.searchTable();
    this.selectProvince();
  },
  methods: {
    agentAdd: function() {
      this.$router.push('agentAdd');
    },
    selectProvince() {
      let params = {
        level: "province",
        adcode: 100000
      };
      cityList(params).then(res => {
        if (res.code === 200) {
          this.form.provinceList = res.result;
        }
      })
    },
    provinceChange(val) {
      this.form.province = val;
      this.form.city = null;
      this.form.county = null;
      let params = {
        level: "city",
        adcode: val
      }
      cityList(params).then(res => {
        if (res.code === 200) {
          console.log(res);
          this.form.cityList = res.result;
        }
      })
    },
    cityChange(val) {
      this.form.city = val;
      this.form.county = null;
      let params = {
        level: "district",
        adcode: val
      }
      cityList(params).then(res => {
        if (res.code === 200) {
          console.log(res);
          this.form.countyList = res.result;
        }
      })
    },
    countyChange(val) {
      this.form.county = val;
    },
    searchTable: function() {
      if (this.form.startDate && this.form.endDate && new Date(this.form.startDate) - new Date(this.form.endDate) > 0) {
        this.$message({
          type: 'error',
          message: '开始时间不能大于结束时间!'
        });
        return;
      }
      if (this.form.startDate) {
        this.form.startDate = getDate(new Date(this.form.startDate)) + " 00:00:00";
      }
      if (this.form.endDate) {
        this.form.endDate = getDate(new Date(this.form.endDate)) + " 23:59:59";
      }
      this.loading = true;
      let params = {
        agentName: this.form.agentName,
        mobilePhone: this.form.mobilePhone,
        developPerson: this.form.developPerson,
        province: this.form.province,
        city: this.form.city,
        area: this.form.county,
        isUsing: this.form.isUsing,
        sdate: this.form.startDate,
        edate: this.form.endDate,
        pageSize: this.form.pageSize,
        pageIndex: this.form.pageIndex
      };
      agentlist(params).then(res => {
        this.loading = false;
        if (res.code === 200) {
          this.tableList = res.result;
          this.total = res.count;
          for (let i = 0; i < this.tableList.length; i++) {
            if (this.tableList[i].isUsing === 0) {
              this.tableList[i].states = "禁用";
            } else {
              this.tableList[i].states = "正常使用";
            }
            if (this.tableList[i].isUsing === 0) {
              this.tableList[i].editUse = "启用";
            } else {
              this.tableList[i].editUse = "禁用";
            }
            if (this.tableList[i].sex === 1) {
              this.tableList[i].sexs = "男";
            } else {
              this.tableList[i].sexs = "女";
            }
            this.tableList[i].shearRatePresent = this.tableList[i].shearRate * 100;
            this.tableList[i].joinTime = getDateTime(this.tableList[i].created);
            this.tableList[i].detailAddress = this.tableList[i].provinceName + this.tableList[i].cityName + this.tableList[i].areaName + this.tableList[i].address;
          }
        };
      })
    },
    handleClick1: function(row) {
      this.$router.push('agentDetail?agentid=' + row.agentid);
    },
    handleClick2: function(row) {
      let isUsing;
      if (row.isUsing === 0) {
        isUsing = 1;
      } else {
        isUsing = 0;
      }
      let params = {
        agentid: row.agentid,
        isUsing: isUsing
      }
      console.log(this.tableList);
      updateUsing(params).then(res => {
        if (res.code === 200) {
          this.searchTable();
        }
      })
    },
    handleClick3: function(row) {
      console.log(row.code);
      this.$router.push(`merchantManage?code=${row.code}&from='agent'`);
    },
    handleSizeChange: function(size) {
      this.form.pageSize = size;
      this.searchTable();
    },
    handleCurrentChange: function(currentPage) {
      this.form.pageIndex = currentPage;
      this.searchTable();
    }
  },
  components: {
    searchCondition
  }
}
</script>

<style lang="scss" scoped>
.storeManage {
  position: relative;
  width: 100%;
  height: 100%;
}

.searchCondition {
  width: 100%;
}

.add-btn {
  width: 90px;
  background-color: #029e8a;
  border-color: #029e8a;
  color: #fff;
}

.add-btn:active {
  background-color: #048473;
  border-color: #048473;
}

.home .contentWrapper .content .allWrapper .searchCondition {
  min-width: auto;
}

.el-form {
  overflow: hidden;
}

.fl {
  float: left;
}

.home .contentWrapper .content .allWrapper .searchCondition .fr {
  float: right;
}

.home .contentWrapper .content .allWrapper {
  padding: 0 40px 0 40px;
}

.home .contentWrapper .content .allWrapper .tableBottom {
  margin-top: 20px;
}

.el-button--text {
  color: #00917e;
}

.element {
  margin-top: 20px;
}
</style>
