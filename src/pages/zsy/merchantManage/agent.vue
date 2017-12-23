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
          <span class="text">代理商管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="mainColor">代理商</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
          <el-form ref="form" :model="form" label-width="80px">
            <div class="element">
              <el-button size="medium" class="add-btn" @click="agentAdd">+ 新增</el-button>
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
                <el-input size="medium" clearable placeholder="请输入手机号" class="input" v-model="form.phone" @keyup.enter.native="searchTable"></el-input>
              </div>
            </div>
            <div class="element">
              <p class="inline">拓展人:</p>
              <div class="width160 inline">
                <el-input size="medium" clearable placeholder="请输入拓展人" class="input" v-model="form.expandPeople" @keyup.enter.native="searchTable"></el-input>
              </div>
            </div>
            <div class="element">
              <p class="inline">是否启用:</p>
              <div class="width120 inline">
                <el-select size="medium" v-model="form.enable" placeholder="请选择">
                  <!-- <el-option v-for="item in mtypeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option> -->
                </el-select>
              </div>
            </div>
            <div class="element">
              <p class="inline">店铺地址:</p>
              <div class="width120 inline">
                <el-select size="medium" v-model="form.province" placeholder="请选择">
                  <!-- <el-option v-for="item in mtypeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option> -->
                </el-select>
              </div>
              <div class="width120 inline">
                <el-select size="medium" v-model="form.city" placeholder="请选择">
                  <!-- <el-option v-for="item in mtypeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option> -->
                </el-select>
              </div>
              <div class="width120 inline">
                <el-select size="medium" v-model="form.county" placeholder="请选择">
                  <!-- <el-option v-for="item in mtypeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option> -->
                </el-select>
              </div>
            </div>
            <div class="element">
              <p class="inline">加入时间:</p>
              <div class="inline">
                <el-date-picker size="medium" class="inline" style="width:134px;" v-model="form.startTime" type="date" placeholder="开始时间">
                </el-date-picker>
                <span class="inline">至</span>
                <el-date-picker size="medium" class="inline" style="width:134px;" v-model="form.endTime" type="date" placeholder="结束时间">
                </el-date-picker>
              </div>
            </div>
            <div class="element search" @click="searchTable">
              <el-button size="medium" class="searchBtn">查询</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="tableWrapper">
        <el-table :data="tableData" stripe fit style="width: 100%">
          <el-table-column prop="date" label="昵称"></el-table-column>
          <el-table-column prop="name" label="账号"></el-table-column>
          <el-table-column prop="address" label="内容" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="提交时间"></el-table-column>
          <el-table-column prop="name" label="手机号码"></el-table-column>
          <el-table-column prop="province" label="处理结果"></el-table-column>
          <el-table-column prop="name" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick1(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="handleClick2(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tableBottom">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum">
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
      form: {
        region: [],
        startTime: null,
        endTime: null,
        agentName: null,
        phone: null,
        expandPeople: null,
        enable: [],
        province: [],
        city: [],
        county: []
      },
      dealForm: {
        region: [],
        desc: null
      },
      mtypeList: [],
      tableData: [
        {
          id: 1,
          date: '2016-05-03 23:12:08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          isopen: 1
        }, {
          id: 2,
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          isopen: 0
        }, {
          id: 3,
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          isopen: 0
        }, {
          id: 4,
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          isopen: 1
        }, {
          id: 5,
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          isopen: 1
        }, {
          id: 6,
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          isopen: 1
        }, {
          id: 7,
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          isopen: 1
        }, {
          id: 8,
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          isopen: 1
        }, {
          id: 9,
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          isopen: 1
        }, {
          id: 10,
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          isopen: 1
        }],
      currentPage: 1,
      totalNum: 400
    }
  },
  filters: {

  },
  methods: {
    agentAdd: function() {
      this.$router.push('agentAdd');
    },
    searchTable: function() {
      console.log(123);
    },
    handleClick1: function(row) {
      console.log(row, 1);
      this.dialogVisible1 = true;
    },
    handleClick2: function(row) {
      console.log(row, 2);
      this.dialogVisible2 = true;
    },
    handleSizeChange: function() {
      console.log(123);
    },
    handleCurrentChange: function() {
      console.log(456);
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.storeManage {
  position: relative;
  width: 100%;
  height: 100%;
}
.searchCondition{
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
.home .contentWrapper .content .allWrapper .searchCondition{
  min-width: auto;
}
.el-form{
  overflow: hidden;
}
.fl{
  float: left;
}
.home .contentWrapper .content .allWrapper .searchCondition .fr{
  float:right;
}
.home .contentWrapper .content .allWrapper{
  padding: 0 40px 0 40px;
}
.tableWrapper{
  margin-top: 20px;
}
.home .contentWrapper .content .allWrapper .tableBottom{
  margin-top: 20px;
}
.el-button--text{
  color: #00917e;
}
.element{
  margin-top: 20px;
}
</style>
