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
            <span class="text">商户管理</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <span class="mainColor">商户管理</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="allWrapper">
        <div class="searchCondition">
          <div class="element">
            <p class="inline">时间</p>
            <div class="inline">
              <el-date-picker size="medium" class="inline" style="width:134px;" v-model="searchs.startTime" type="date" placeholder="开始时间" value-format="yyyy-MM-dd" @change="startTimeChange">
              </el-date-picker>
              <span class="inline">至</span>
              <el-date-picker size="medium" class="inline" value-format="yyyy-MM-dd" style="width:134px;" v-model="searchs.endTime" type="date" placeholder="结束时间" @change="endTimeChange">
              </el-date-picker>
            </div>
          </div>
          <div class="element">
            <p class="inline">商户名称</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="商户名称查询" class="input" v-model="searchs.mName" @keyup.enter.native="search"></el-input>
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
            <p class="inline">状态</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="searchs.status" placeholder="请选择" @change="search">
                <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">代理商</p>
            <div class="width120 inline">
              <el-input size="medium" clearable v-model="searchs.agent" placeholder="代理商查询" class="input" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <!-- <div class="element">
                <p class="inline">店铺地址</p>
                <div class="width140 inline">
                  <el-select size="medium" placeholder="请选择" @change="search">
                    <el-option v-for="item in runTYpeList1" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div> -->
          <div class="element">
            <el-button size="medium" class="searchBtn" @click.native="search">查询</el-button>
          </div>
        </div>
        <div class="tableWrapper">
          <el-table :data="tableData" stripe>
            <el-table-column fixed="left" prop="applyTime" label="申请时间" width="150"></el-table-column>
            <el-table-column prop="merchantname" label="商户名称" show-overflow-tooltip show-overflow-tooltip></el-table-column>
            <el-table-column prop="merchanttype" label="商户类型" :formatter="shopType" width="120"></el-table-column>
            <el-table-column prop="operatetype" label="经营类目" :formatter="manageType" width="120"></el-table-column>
            <el-table-column prop="address" label="店铺地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="responsiblename" label="负责人" width="100"></el-table-column>
            <el-table-column prop="sex" label="性别" :formatter="sexFilter" width="50"></el-table-column>
            <el-table-column prop="phone" label="手机号码" width="120"></el-table-column>
            <el-table-column prop="agentName" label="代理商" width="70"></el-table-column>
            <el-table-column prop="isaudit" label="状态" :formatter="stateType" width="150" fixed="right"></el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
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
        <div class="tableBottom">
          <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="searchs.pageIndex" :page-size="searchs.pageSize" :page-sizes="[8,10,12,14,16]" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mtypeList, runTYpeList1, statusList } from 'common/js/config'
import { sexFilter } from 'common/js/utils'
import { saveCurrentRow } from 'common/js/cache'
import { getDateHM, getDate } from 'common/js/times'
import { merchantList, auditEnabel, testC } from '@/api/index'
// import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      maxLengthMobile: 11,
      maxLengthIdentity: 18,
      isShowMore: false,
      showCheckbox: false,
      searchCell: false,
      total: 1,
      showSizeChanger: true,
      pageSizeOption: [10, 15, 20, 25, 30],
      mtypeList: mtypeList,
      runTYpeList1: runTYpeList1,
      statusList: statusList,
      provinceList: '',
      cityList: '',
      areaList: '',
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      searchs: {
        startTime: '',
        endTime: '',
        mName: '',
        mtype: '',
        runTYpe: '',
        pageIndex: 1,
        pageSize: 10,
        fzMan: '',
        mobile: '',
        status: '',
        agent: '',
        address: {
          province: '',
          city: '',
          area: ''
        }
      }
    }
  },
  filters: {
    openClose(value) {
      return value === 5 ? '禁用' : value === 8 ? '启用' : ''
    }
  },
  created() {
    this.search()
  },
  methods: {
    sexFilter(row) {
      return sexFilter(row);
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
          type = '未入驻';
          break;
        case 2:
          type = '已入驻未审核';
          break;
        case 3:
          type = '审核通过(后台)';
          break;
        case 4:
          type = '审核未通过(后台)';
          break;
        case 5:
          type = '审核通过(网商)';
          break;
        case 6:
          type = '审核未通过(网商)';
          break;
        case 7:
          type = '处理中';
          break;
        case 8:
          type = '禁用';
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
    search() {
      if (this.searchs.startTime && this.searchs.endTime && new Date(this.searchs.startTime) - new Date(this.searchs.endTime) > 0) {
        this.$message({
          type: 'error',
          message: '开始时间不能大于结束时间'
        });
        return
      }
      let params = {
        sdate: this.searchs.startTime ? getDate(this.searchs.startTime) : '',
        edate: this.searchs.endTime ? getDate(this.searchs.endTime) : '',
        merchantname: this.searchs.mName,
        merchanttype: this.searchs.mtype,
        operatecategory: this.searchs.runTYpe,
        responsiblename: this.searchs.fzMan,
        phone: this.searchs.mobile,
        agentName: this.searchs.agent,
        pageSize: this.searchs.pageSize,
        pageIndex: this.searchs.pageIndex,
        isaudit: this.searchs.status
      }
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
    moreBtn() {
      this.searchCell = !this.searchCell
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
    },
    endTimeChange(val) {
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
  components: {}
}
</script>

<style lang="scss" scoped>
.merchantManage {
  position: relative;
  width: 100%;
  height: 100%;
  .merchantManageWrapper {
    position: absolute;
    width: 100%;
    top: 0px;
    bottom: 0px;
    z-index: 0;
  }
}
</style>
