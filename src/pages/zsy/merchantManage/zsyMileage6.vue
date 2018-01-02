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
          <span class="text">其他管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="mainColor">意见反馈</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
          <el-form ref="form" :model="form" label-width="80px">
            <div class="element fl">
              <p class="inline">处理结果</p>
              <div class="width120 inline">
                <el-select size="medium" v-model="form.dealResult" placeholder="请选择">
                  <el-option v-for="item in form.mtypeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="element fr" @click="searchTable">
              <el-button size="medium" class="searchBtn">查询</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="tableWrapper">
        <el-table :data="tableData" stripe fit style="width: 100%" v-loading="loading">
          <el-table-column prop="operatorname" label="昵称"></el-table-column>
          <el-table-column prop="userName" label="账号"></el-table-column>
          <el-table-column prop="context" label="内容" show-overflow-tooltip></el-table-column>
          <el-table-column prop="submitTime" label="提交时间"></el-table-column>
          <el-table-column prop="mobile" label="手机号码"></el-table-column>
          <el-table-column prop="handleResult" label="处理结果"></el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status <= 0" @click="handleClick1(scope.row)" type="text" size="small">处理</el-button>
              <el-button v-if="scope.row.status > 0" @click="handleClick2(scope.row)" type="text" size="small">处理结果</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tableBottom">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="反馈处理"
      :visible.sync="dialogVisible1"
      width="30%"
      :center="true"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="element resultSelect">
          <p class="inline">结果</p>
          <div class="width120 inline">
            <el-select size="medium" v-model="dealForm.result" placeholder="请选择">
              <el-option v-for="item in dealForm.resultList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="element textInput">
          <p class="inline fl">备注</p>
          <div class="width240 inline fl">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" v-model="dealForm.remark"></el-input>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="submitDeal">提 交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="处理结果"
      :visible.sync="dialogVisible2"
      width="30%"
      :center="true"
      :before-close="handleClose">
      <div class="deal">处理人：{{resultDetail.hanlderName + '/' + resultDetail.hanlderPhone}}</div>
      <div class="deal">结果：{{resultDetail.handleStatus}}</div>
      <div class="deal">备注：{{resultDetail.remark}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="tijiao2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { mtypeList, runTYpeList, statusList, dealResultList, resultList } from 'common/js/config'
import { mileageList, handleMileage, handleDetail } from "@/api/index"
import { getDateTime } from "common/js/times"
export default {
  data() {
    return {
      form: {
        mtypeList: dealResultList,
        dealResult: '',
        pageSize: 10,
        pageIndex: 1
      },
      opinionId: null,
      dealForm: {
        opinionId: null,
        result: '',
        resultList: resultList,
        remark: null
      },
      handleStatus: null,
      resultDetail: {},
      mtypeList: [],
      tableData: [],
      currentPage: 1,
      totalNum: 0,
      dialogVisible1: false,
      dialogVisible2: false,
      loading: false
    }
  },
  filters: {

  },
  created: function() {
    this.searchTable();
  },
  methods: {
    searchTable: function() {
      this.loading = true;
      let params = {
        status: this.form.dealResult,
        pageSize: this.form.pageSize,
        pageIndex: this.form.pageIndex
      }
      mileageList(params).then(res => {
        if (res.code === 200) {
          this.loading = false;
          this.tableData = res.result;
          this.totalNum = res.count;
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].submitTime = getDateTime(this.tableData[i].created);
            if (this.tableData[i].status === 0) {
              this.tableData[i].handleResult = "未处理";
            } else if (this.tableData[i].status === 1) {
              this.tableData[i].handleResult = "不处理";
            } else {
              this.tableData[i].handleResult = "已处理";
            }
          }
        }
      })
    },
    handleClick1: function(row) {
      this.dealForm.opinionId = row.opinionId;
      this.dialogVisible1 = true;
    },
    handleClick2: function(row) {
      this.opinionId = row.opinionId;
      this.dialogVisible2 = true;
      let params = {
        opinionId: this.opinionId
      }
      handleDetail(params).then(res => {
        if (res.code === 200) {
          this.resultDetail = res.result;
          if (this.resultDetail.status === 0) {
            this.resultDetail.handleStatus = "未处理";
          } else if (this.resultDetail.status === 1) {
            this.resultDetail.handleStatus = "不处理";
          } else {
            this.resultDetail.handleStatus = "已处理";
          }
        }
      })
    },
    handleSizeChange: function(size) {
      this.form.pageSize = size;
      this.searchTable();
    },
    handleCurrentChange: function(currentPage) {
      this.form.pageIndex = currentPage;
      this.searchTable();
    },
    handleClose: function() {
      this.dialogVisible1 = false;
      this.dealForm.remark = '';
      this.dealForm.result = '';
      this.dealForm.opinionId = null;
      this.dialogVisible2 = false;
    },
    submitDeal: function() {
      this.$confirm('确认提交？')
          .then(_ => {
            if (!this.dealForm.opinionId) {
              this.$message({
                type: 'error',
                message: '缺少参数！'
              });
              this.dialogVisible1 = false;
              this.dealForm.remark = '';
              this.dealForm.result = '';
              this.dealForm.opinionId = null;
              return;
            }
            let params = {
              opinionId: this.dealForm.opinionId,
              remark: this.dealForm.remark,
              status: this.dealForm.result
            }
            handleMileage(params).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '处理完成！'
                });
                this.dialogVisible1 = false;
                this.dealForm.remark = '';
                this.dealForm.result = '';
                this.dealForm.opinionId = null;
                this.searchTable();
              }
            })
          }).catch(_ => {});
    },
    tijiao2: function() {
      this.dialogVisible2 = false;
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
  margin-top: 30px;
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
.el-button--primary{
  background-color: #00917e;
  border-color: #00917e;
}
.el-button--text{
  color: #00917e;
}
.resultSelect,
.textInput{
  margin-top: 10px;
}
.resultSelect .width120,
.textInput .width240{
  margin-left: 10px;
}
.textInput .width240{
  width: 75%;
  margin-left: 13px;
}
.resultSelect .width120{
  width: 200px;
}
.deal{
  margin: 10px 0;
}
</style>
