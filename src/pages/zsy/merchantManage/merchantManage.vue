<template>
  <div class="merchantManage">
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
            <el-date-picker size="medium" class="inline" style="width:134px;" v-model="searchs.startTime" type="date" placeholder="开始时间" @change="startTimeChange">
            </el-date-picker>
            <span class="inline">至</span>
            <el-date-picker size="medium" class="inline" style="width:134px;" v-model="searchs.endTime" type="date" placeholder="结束时间" @change="endTimeChange">
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
              <el-option v-for="item in runTYpeList" :key="item.value" :label="item.label" :value="item.value">
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
        <div class="element">
          <p class="inline">店铺地址</p>
          <div class="width140 inline">
            <el-select size="medium" v-model="searchs.runTYpe" placeholder="请选择" @change="search">
              <el-option v-for="item in runTYpeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="element">
          <el-button size="medium" class="searchBtn" @click.native="search">查询</el-button>
        </div>
      </div>
      <div class="tableWrapper">
        <el-table :data="tableData" stripe>
          <el-table-column fixed="left" prop="date" label="申请时间" width="170"></el-table-column>
          <el-table-column prop="name" label="商户名称"></el-table-column>
          <el-table-column prop="name" label="商户类型"></el-table-column>
          <el-table-column prop="name" label="经营类型"></el-table-column>
          <el-table-column label="店铺地址" width="120">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.address" placement="top" effect="light">
                <el-button type="text" size="small" class="width120 ellipsis">{{scope.row.address}}</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="负责人"></el-table-column>
          <el-table-column prop="name" label="性别"></el-table-column>
          <el-table-column prop="name" label="手机号码"></el-table-column>
          <el-table-column prop="name" label="状态"></el-table-column>
          <el-table-column prop="name" label="代理商"></el-table-column>
          <el-table-column label="操作" width="170" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="detail(scope.row)">详情</el-button>
              <el-button type="text" size="small" @click="detail(scope.row)">审核</el-button>
              <el-button type="text" size="small" @click="openOrClose(scope.row)">{{scope.row.isopen|openClose}}</el-button>
              <el-button type="text" size="small" @click="toStoreManage(scope.row)">门店</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tableBottom">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes="[8,10,12,14,16]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mtypeList, runTYpeList, statusList, tableData } from 'common/js/config'
import { saveCurrentRow } from 'common/js/cache'
// import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      maxLengthMobile: 11,
      maxLengthIdentity: 18,
      isShowMore: false,
      showCheckbox: false,
      searchCell: false,
      pageIndex: 1,
      pageSize: 10,
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
        startTime: '',
        endTime: '',
        mName: '',
        mtype: '',
        runTYpe: '',
        fzMan: '',
        mobile: '',
        status: '',
        agent: '',
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
    tableSwitchChange(val) {
      console.log(val)
      if (parseInt(val) === 1) {
        this.tableSwitch1 = true;
        this.tableSwitch2 = false;
      } else if (parseInt(val) === 2) {
        this.tableSwitch1 = false;
        this.tableSwitch2 = true;
      }
    },
    toStoreManage(row) {
      console.log(row)
      this.$router.push('/storeManage')
    },
    moreBtn() {
      console.log('click')
      this.searchCell = !this.searchCell
    },
    openOrClose(row) {
      let cancalMsg = '操作已取消'
      if (row.isopen === 1) {
        this.$prompt(`请输入禁用商户[${row.name}]的原因`, '禁用商户', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: `你禁用商户[${row.name}]的原因是: ` + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: cancalMsg
          });
        });
      } else {
        this.$confirm(`此操作将启用商户[${row.name}], 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '启用成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: cancalMsg
          })
        })
      }
    },
    // ...mapMutations({
    //   setStatus: 'SET_STATUS'
    // }),
    detail(item) {
      // let status = 2
      // this.setStatus(status)
      console.log(item);
      saveCurrentRow(item)
      this.$router.push('/merchantManageDetail')
    },
    search() {
      // ...
      console.log('search')
    },
    searchEvent() {
      console.log('searchEvent')
    },
    startTimeChange(val) {
      console.log('change：' + val)
    },
    endTimeChange(val) {
      console.log('change：' + val)
    },
    // pageSizeChange(newIndex) {
    //   console.log('page size change event', newIndex)
    // },
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
.merchantManage {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>