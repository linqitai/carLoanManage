<template>
  <div class="merchantManage">
    <div class="merchantManageWrapper">
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
            <span class="mainColor">商户管理</span>
          </el-breadcrumb-item>
          <!-- <el-breadcrumb-item>
                    <span class="mainColor">商户管理</span>
                  </el-breadcrumb-item> -->
        </el-breadcrumb>
      </div>
      <div class="allWrapper">
        <search-condition @clickSearchData="search">
          <div class="element">
            <p class="inline">时间</p>
            <div class="width110 inline">
              <el-select size="medium" v-model="searchs.timeType" placeholder="请选择" @change="changeTimeType">
                <el-option v-for="item in timeTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="width110 inline">
              <el-select size="medium" v-model="dataType" placeholder="请选择" @change="changeDataType">
                <el-option v-for="item in dataTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="inline" v-if="dataType==4">
              <el-date-picker size="medium" class="inline" style="width:138px;" v-model="searchs.startTime" type="date" placeholder="开始时间" value-format="yyyy-MM-dd" @change="startTimeChange">
              </el-date-picker>
              <span class="inline">至</span>
              <el-date-picker size="medium" class="inline" value-format="yyyy-MM-dd" style="width:138px;" v-model="searchs.endTime" type="date" placeholder="结束时间" @change="endTimeChange">
              </el-date-picker>
            </div>
          </div>
          <div class="element">
            <p class="inline">状态</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="searchs.audits" placeholder="请选择" @change="search">
                <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">商户类型</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="searchs.mtype" placeholder="请选择" @change="search">
                <el-option v-for="item in mtypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">商户名称</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="商户名称查询" class="input" v-model="searchs.mName" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">经营类目</p>
            <div class="width140 inline">
              <el-select size="medium" v-model="searchs.runTYpe" placeholder="请选择" @change="search">
                <el-option v-for="item in runTYpeList1" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">负责人</p>
            <div class="width120 inline">
              <el-input size="medium" clearable v-model="searchs.fzMan" placeholder="负责人查询" class="input" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">手机号码</p>
            <div class="width130 inline">
              <el-input size="medium" clearable v-model="searchs.mobile" placeholder="手机号码查询" :maxlength="maxLengthMobile" class="input" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">代理商</p>
            <div class="width120 inline">
              <el-input size="medium" clearable v-model="searchs.agent" placeholder="代理商查询" class="input" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">店铺地址:</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="searchs.province" placeholder="请选择" @change="provinceChange">
                <el-option v-for="item in searchs.provinceList" :key="item.adcode" :label="item.name" :value="item.adcode">
                </el-option>
              </el-select>
            </div>
            <div class="width120 inline" v-if="searchs.province">
              <el-select size="medium" v-model="searchs.city" placeholder="请选择" @change="cityChange">
                <el-option v-for="item in searchs.cityList" :key="item.adcode" :label="item.name" :value="item.adcode">
                </el-option>
              </el-select>
            </div>
            <div class="width120 inline" v-if="searchs.city">
              <el-select size="medium" v-model="searchs.county" placeholder="请选择" @change="countyChange">
                <el-option v-for="item in searchs.countyList" :key="item.adcode" :label="item.name" :value="item.adcode">
                </el-option>
              </el-select>
            </div>
          </div>
        </search-condition>
        <div class="tableWrapper">
          <el-table :data="tableData" stripe>
            <el-table-column fixed="left" prop="submitTime" label="提交时间" :formatter="formatData" width="150"></el-table-column>
            <el-table-column prop="merchantname" label="商户名称" show-overflow-tooltip show-overflow-tooltip></el-table-column>
            <el-table-column prop="merchanttype" label="商户类型" :formatter="shopType" width="120"></el-table-column>
            <el-table-column prop="operatetype" label="经营类目" :formatter="manageType" width="90" show-overflow-tooltip=""></el-table-column>
            <el-table-column label="店铺地址" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.province + scope.row.city + scope.row.area + scope.row.address}}
              </template>
            </el-table-column>
            <el-table-column prop="responsiblename" label="负责人" width="100"></el-table-column>
            <el-table-column prop="sex" label="性别" :formatter="sexFilter" width="50"></el-table-column>
            <el-table-column prop="phone" label="手机号码" width="120"></el-table-column>
            <el-table-column prop="agentName" label="代理商" width="70" :formatter="agentNameFormat"></el-table-column>
            <el-table-column prop="isaudit" label="状态" :formatter="stateType" width="100" fixed="right"></el-table-column>
            <el-table-column label="操作" width="130" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" size="small" v-if="scope.row.isaudit !== 2 && scope.row.isaudit !== 6" @click="detail(scope.row, false)">详情
                </el-button>
                <el-button type="text" size="small" v-if="scope.row.isaudit === 2 || scope.row.isaudit === 6" @click="detail(scope.row, true)">审核
                </el-button>
                <el-button type="text" size="small" v-if="scope.row.isaudit == 5 || scope.row.isaudit == 8" @click="openOrClose(scope.row)">
                  {{scope.row.isaudit | openClose}}
                </el-button>
                <el-button type="text" size="small" v-if="scope.row.isaudit == 5 || scope.row.isaudit == 8" @click="toStoreManage(scope.row)">门店
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="tableBottom" v-if="total>searchs.pageSize">
          <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="searchs.pageIndex" :page-size="searchs.pageSize" :page-sizes="pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mtypeList, runTYpeList1, statusList, PAGESIZES } from 'common/js/config'
import { sexFilter } from 'common/js/utils'
import { saveCurrentRow } from 'common/js/cache'
import { getDateHM, getDate, format } from 'common/js/times'
import { merchantList, auditEnabel, testC, cityList } from '@/api/index'
import searchCondition from 'components/searchCondition.vue'
// import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      maxLengthMobile: 11,
      maxLengthIdentity: 18,
      showCheckbox: false,
      total: 1,
      showSizeChanger: true,
      pageSizeOption: [10, 15, 20, 25, 30],
      mtypeList: mtypeList,
      runTYpeList1: runTYpeList1,
      statusList: statusList,
      provinceList: '',
      areaList: '',
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      pageSizes: PAGESIZES,
      timeTypes: [
        // {
        //   value: '',
        //   label: '全部'
        // },
        {
          value: '1',
          label: '申请时间'
        }, {
          value: '2',
          label: '提交时间'
        }, {
          value: '3',
          label: '审核时间'
        }],
      dataType: '',
      dataTypes: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '今日'
      }, {
        value: '2',
        label: '本周'
      }, {
        value: '3',
        label: '本月'
      }, {
        value: '4',
        label: '其他'
      }],
      searchs: {
        timeType: '1', // timeType '':全部 1:申请时间 2：提交时间 3：审核时间
        startTime: '',
        endTime: '',
        mName: '',
        mtype: '',
        runTYpe: '',
        pageIndex: 1,
        pageSize: 10,
        fzMan: '',
        mobile: '',
        audits: '2,6',
        agent: '',
        province: null,
        provinceList: [],
        city: null,
        cityList: [],
        county: null,
        countyList: []
      }
    }
  },
  filters: {
    openClose(value) {
      return value === 5 ? '禁用' : value === 8 ? '启用' : ''
    }
  },
  created() {
    if (this.$route.query.from) {
      this.searchs.audits = ''
    }
    this.search()
    this.selectProvince();
  },
  methods: {
    agentNameFormat(row) {
      if (row.agentName === '' || row.agentName === null) {
        return '无'
      } else {
        return row.agentName
      }
    },
    testMTYPE() {
      console.log(this.searchs.mtype)
    },
    sexFilter(row) {
      return sexFilter(row);
    },
    // 商户类型过滤
    formatData: function(row, column) {
      return getDate(row.submitTime);
    },
    // 商户类型过滤
    shopType: function(row, column) {
      let type = '---';
      switch (row.merchanttype) { // merchanttype商户类型
        case 1:
          type = '个体工商户';
          break;
        case 2:
          type = '自然人';
          break;
        case 3:
          type = '企业商户';
          break;
      }
      return type;
    },
    // 状态过滤
    stateType: function(row, column) {
      let type = '---';
      switch (row.isaudit) { // 三种情况
        case 1:
          type = '待提交';
          break;
        case 2:
          type = '待审核';
          break;
        case 3:
          type = '网商审核中';
          break;
        case 4:
          type = '审核驳回';
          break;
        case 5:
          type = '正常使用';
          break;
        case 6:
          type = '网商驳回';
          break;
        case 7:
          type = '网商审核中';
          break;
        case 8:
          type = '禁用中';
          break;
      }
      return type;
    },
    // 经营类目过滤
    manageType: function(row, column) {
      let type = '---';
      switch (row.operatecategory) {
        case 1:
          type = '美食';
          break;
        case 2:
          type = '超市便利店';
          break;
        case 3:
          type = '休闲娱乐';
          break;
        case 4:
          type = '购物';
          break;
        case 5:
          type = '爱车';
          break;
        case 6:
          type = '生活服务';
          break;
        case 7:
          type = '教育培训';
          break;
        case 8:
          type = '医疗健康';
          break;
        case 9:
          type = '航旅';
          break;
        case 10:
          type = '专业销售/批发';
          break;
        case 11:
          type = '政府/社会组织';
          break;
      }
      return type;
    },
    selectProvince() {
      let params = {
        level: "province",
        adcode: 100000
      };
      cityList(params).then(res => {
        if (res.code === 200) {
          this.searchs.provinceList = res.result;
        }
      })
    },
    changeTimeType(val) {
      this.search()
    },
    // dataTypes: [{
    //     value: '',
    //     label: '全部'
    //   }, {
    //     value: '1',
    //     label: '今日'
    //   }, {
    //     value: '2',
    //     label: '本周'
    //   }, {
    //     value: '3',
    //     label: '本月'
    //   }, {
    //     value: '4',
    //     label: '其他'
    //   }],
    changeDataType(val) {
      console.log('val:' + val)
      if (val == 1) {
        this.searchs.startTime = getDate(new Date().getTime()) + ' 00:00:01'
        this.searchs.endTime = getDate(new Date().getTime()) + ' 23:59:59'
      } else if (val == 2) {
        this.searchs.startTime = getDate(new Date().getTime() - 60 * 60 * 24 * 7000) + ' 00:00:01'
        this.searchs.endTime = getDate(new Date().getTime()) + ' 23:59:59'
      } else if (val == 3) {
        this.searchs.startTime = getDate(new Date().getTime() - 60 * 60 * 24 * 30000) + ' 00:00:01'
        this.searchs.endTime = getDate(new Date().getTime()) + ' 23:59:59'
      } else if (val == '') {
        this.searchs.startTime = ''
        this.searchs.endTime = ''
      }
      console.log(`startTime:${this.searchs.startTime},endTime:${this.searchs.endTime}`)
      this.search()
    },
    provinceChange(val) {
      this.searchs.province = val;
      this.searchs.city = null;
      this.searchs.county = null;
      let params = {
        level: "city",
        adcode: val
      }
      cityList(params).then(res => {
        if (res.code === 200) {
          console.log(res);
          this.searchs.cityList = res.result;
        }
      })
    },
    cityChange(val) {
      this.searchs.city = val;
      this.searchs.county = null;
      let params = {
        level: "district",
        adcode: val
      }
      cityList(params).then(res => {
        if (res.code === 200) {
          console.log(res);
          this.searchs.countyList = res.result;
        }
      })
    },
    countyChange(val) {
      this.searchs.county = val;
    },
    search() {
      if (this.searchs.startTime && this.searchs.endTime && new Date(this.searchs.startTime) - new Date(this.searchs.endTime) > 0) {
        this.$message({
          type: 'error',
          message: '开始时间不能大于结束时间'
        });
        return
      }
      if (this.searchs.startTime) {
        this.searchs.startTime = getDate(new Date(this.searchs.startTime)) + " 00:00:00";
      }
      if (this.searchs.endTime) {
        this.searchs.endTime = getDate(new Date(this.searchs.endTime)) + " 23:59:59";
      }
      let params = {
        audits: this.searchs.audits,
        timeType: this.searchs.timeType,
        sdate: this.searchs.startTime,
        edate: this.searchs.endTime,
        merchantname: this.searchs.mName,
        merchanttype: this.searchs.mtype,
        operatecategory: this.searchs.runTYpe,
        responsiblename: this.searchs.fzMan,
        phone: this.searchs.mobile,
        agentName: this.searchs.agent,
        pageSize: this.searchs.pageSize,
        pageIndex: this.searchs.pageIndex,
        agentscode: this.$route.query.code,
        province: this.searchs.province,
        city: this.searchs.city,
        area: this.searchs.county
      }
      console.log('merchantList params:')
      console.log(params)
      merchantList(params).then(res => {
        this.tableData = res.result;
        this.total = res.count;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].applyTime = getDateHM(this.tableData[i].created);
        }
      })
    },
    tableSwitchChange(val) {
      if (parseInt(val) === 1) {
        this.tableSwitch1 = true;
        this.tableSwitch2 = false;
      } else if (parseInt(val) === 2) {
        this.tableSwitch1 = false;
        this.tableSwitch2 = true;
      }
    },
    toStoreManage(row) {
      this.$router.push('/storeManage?merchantname=' + row.merchantname)
    },
    openOrClose(row) {
      let cancalMsg = '操作已取消'
      if (row.isaudit === 5) { // 启用的值
        this.$prompt(`请输入禁用商户[${row.merchantname}]的原因`, '禁用商户', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          let params = {
            customerid: row.customerid,
            autidId: 1
          }
          auditEnabel(params).then(res => {
            if (res.code === 200) {
              this.search()
              this.$message({
                type: 'success',
                message: `你禁用商户[${row.merchantname}]的原因是: ` + value
              });
            } else {
              this.$message({
                type: 'fail',
                message: `服务器出错了`
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: cancalMsg
          });
        });
      } else if (row.isaudit === 8) {
        this.$confirm(`此操作将启用商户[${row.merchantname}], 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            customerid: row.customerid,
            isaudit: 5
          }
          testC(params).then(res => {
            if (res.code === 200) {
              this.search()
              this.$message({
                type: 'success',
                message: '启用成功'
              });
            } else {
              this.$message({
                type: 'fail',
                message: `服务器出错了`
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: cancalMsg
          })
        })
      }
    },
    detail(row, boolean) {
      this.$router.push(`/merchantManage/detail?customerid=${row.customerid}&type=${boolean}`);
    },
    searchEvent() {
    },
    startTimeChange(val) {
      this.searchs.startTime = val + ' 00:00:01'
      console.log(this.searchs.startTime)
    },
    endTimeChange(val) {
      this.searchs.endTime = val + ' 23:59:59'
      console.log(this.searchs.endTime)
    },
    // pageSizeChange(newIndex) {
    //   console.log('page size change event', newIndex)
    // },
    handleSizeChange(val) {
      this.searchs.pageSize = val;
      this.search()
    },
    handleCurrentChange(val) {
      this.searchs.pageIndex = val;
      this.search()
    }
  },
  components: {
    searchCondition
  }
}
</script>

<style lang="scss" scoped>
@import './merchantManage.scss'
</style>
