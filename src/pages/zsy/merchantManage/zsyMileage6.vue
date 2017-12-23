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
                <el-select size="medium" v-model="form.region" placeholder="请选择">
                  <!-- <el-option v-for="item in mtypeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option> -->
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
            <el-select size="medium" v-model="dealForm.region" placeholder="请选择">
              <!-- <el-option v-for="item in mtypeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option> -->
            </el-select>
          </div>
        </div>
        <div class="element textInput">
          <p class="inline fl">备注</p>
          <div class="width240 inline fl">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" v-model="dealForm.desc"></el-input>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="tijiao">提 交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="处理结果"
      :visible.sync="dialogVisible2"
      width="30%"
      :center="true"
      :before-close="handleClose">
      <div class="deal">处理人：周润发/15968598574</div>
      <div class="deal">结果：已处理</div>
      <div class="deal">备注：已联系上用户，并且已反馈给产品研发部门</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="tijiao2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { mtypeList, runTYpeList, statusList, tableData } from 'common/js/config'
export default {
  data() {
    return {
      form: {
        region: []
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
      totalNum: 400,
      dialogVisible1: false,
      dialogVisible2: false
    }
  },
  filters: {

  },
  methods: {
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
    },
    handleClose: function() {
      this.dialogVisible1 = false;
      this.dialogVisible2 = false;
    },
    tijiao: function() {
      this.$confirm('确认提交？')
          .then(_ => {
            this.dialogVisible1 = false;
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
