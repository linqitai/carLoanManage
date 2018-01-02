<template>
  <div class="operatorManage">
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
          <span class="mainColor">操作员管理</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
          <div class="element">
            <p class="inline">姓名</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="姓名查询" class="input" v-model="searchs.username" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">性别</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="searchs.sex" placeholder="请选择" @change="searchData">
                <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">角色</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="searchs.type" placeholder="请选择" @change="searchData" >
                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">手机号码</p>
            <div class="width130 inline">
              <el-input size="medium" clearable placeholder="手机号码查询" :maxlength="maxLengthMobile" class="input" v-model="searchs.mobile" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">所在店铺</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="所在店铺查询" class="input" v-model="searchs.shopname" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">所属商户</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="所属商户查询" class="input" v-model="searchs.merchantname" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element" >
            <el-button size="medium" class="searchBtn" @click="searchData">查询</el-button>
          </div>
        </div>
      </div>
      <div class="tableWrapper">
        <el-table :data="tableData" stripe style="width: 1270px;">
          <el-table-column prop="username" label="姓名" width="120"></el-table-column>
          <el-table-column prop="sex" label="性别" width="120"></el-table-column>
          <el-table-column prop="type" label="角色" width="120"></el-table-column>
          <el-table-column prop="mobile" label="手机号码" width="150"></el-table-column>
          <el-table-column prop="idcard" label="身份证号" width="180"></el-table-column>
          <el-table-column prop="shopname" label="所在店铺" width="200"></el-table-column>
          <el-table-column prop="merchantname" label="所属商户" width="200">
            <!-- <template slot-scope="scope">
              <el-button type="text" size="small">{{scope.row.merchantname}}</el-button>
            </template> -->
          </el-table-column>
          <el-table-column prop="createtime" label="添加时间" width="180"></el-table-column>
        </el-table>
        <!-- <el-table :data="tableData" stripe style="min-width:1060px;max-width:1620px;width: 1150px;"></el-table> -->
      </div>
      <div class="tableBottom">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { SexList, TypeList } from "common/js/config";
import { zsyOper } from "@/api/index.js";
export default {
  data() {
    return {
      maxLengthMobile: 11,
      maxLengthIdentity: 18,
      isShowMore: false,
      showCheckbox: false,
      searchCell: false,
      pageIndex: 1,
      pageSize: 12,
      total: null,
      showSizeChanger: true,
      pageSizeOption: [10, 15, 20, 25, 30],
      sexList: SexList,
      typeList: TypeList,
      provinceList: "",
      cityList: "",
      areaList: "",
      tableData: [],
      searchs: {
        username: "",
        sex: "",
        operatorname: "",
        mobile: "",
        idcard: "",
        shopname: "",
        merchantname: "",
        createtime: "",
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
  },
  methods: {
    searchData() {
      zsyOper(this.searchs).then(res => {
        this.tableData = res.result;
        this.total = res.count;
      });
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
    search() {
      // ...
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
    // pageSizeChange(newIndex) {
    //   console.log('page size change event', newIndex)
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
.operatorManage {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>