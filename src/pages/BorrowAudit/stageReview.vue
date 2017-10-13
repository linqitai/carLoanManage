<template>
  <div>
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置</el-breadcrumb-item>
        <el-breadcrumb-item>分期审核</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="base">
      <div class="element">
        <p>状态</p>
        <div>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="element">
        <p>店名</p>
        <div>
          <el-input v-model="shopName" placeholder="请输入内容" class="input"></el-input>
        </div>
      </div>
      <div class="element">
        <p>申请时间</p>
        <div>
          <el-date-picker v-model="timer" type="daterange" placeholder="选择日期范围">
          </el-date-picker>
        </div>
      </div>
      <div class="element">
        <p>服务公司</p>
        <div>
          <el-input v-model="companyName" placeholder="请输入内容" class="input"></el-input>
        </div>
      </div>
      <div class="element">
        <p>业务员姓名</p>
        <div>
          <el-input v-model="employeeName" placeholder="请输入内容" class="input"></el-input>
        </div>
      </div>

      <div class="btn" @click="search">
        <el-button type="primary">查询</el-button>
      </div>
      <table>
        <thead>
          <tr>
            <th>订单编号</th>
            <th>店名</th>
            <th>分期金额</th>
            <th>申请时间</th>
            <th>业务员姓名</th>
            <th>服务公司</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in getList" :key="item.value" v-show="getList.length > 0">
            <td>{{item.orderNo}}</td>
            <td>{{item.shopName}}</td>
            <td>{{item.amount/100}}</td>
            <td>{{item.applyTime|getTime}}</td>
            <td>{{item.employeeName}}</td>
            <td>{{item.companyName}}</td>
            <td>{{item.checkStatus|getStatus}}</td>
            <td>
              <el-button type="primary" @click="review(index)" v-show="item.checkStatus ===5">审核</el-button>
              <el-button type="primary" @click="review(index)" v-show="item.checkStatus ===7||item.checkStatus ===6">详情</el-button>
            </td>
          </tr>
          <tr v-show="getList.length === 0">
            <td class="noData" colspan="8">暂无数据...</td>
          </tr>
        </tbody>
      </table>
      <div class="block" style="margin-top:20px" v-show="showPageTag">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { ERR_OK } from '../../common/js/config'
import { format } from '../../common/js/times'
import { checkView } from '../../api/index'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      shopName: '',
      options: [{
        value: '5',
        label: '待审核'
      }, {
        value: '7',
        label: '审核通过'
      }, {
        value: '6',
        label: '审核驳回'
      }],
      pageIndex: 1,
      pageSize: 10,
      total: 1,
      value: '',
      timer: '',
      companyName: '',
      employeeName: '',
      showPageTag: false,
      getList: []
    }
  },
  created() {
    // this.getval()
  },
  filters: {
    getTime(t) {
      return format(t)
    },
    getStatus(t) {
      return t === 5 ? '待审核' : t === 6 ? '审核驳回' : t === 7 ? '审核通过' : ''
    }
  },
  methods: {
    getval() {
      let params = {
        checkStatus: this.value,
        shopName: this.shopName,
        _startTime: this.timer[0] ? Date.parse(this.timer[0]) : '',
        _endTime: this.timer[1] ? Date.parse(this.timer[1]) : '',
        companyName: this.companyName,
        employeeName: this.employeeName,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      checkView(params).then(res => {
        console.log(res)
        if (res.code === ERR_OK) {
          this.getList = res.list
          this.total = res.count
          if (this.total <= this.pageSize) {
            this.showPageTag = false
          } else {
            this.showPageTag = true
          }
        }
      })
    },
    // 查询
    search() {
      this.getval()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(val)
      this.pageIndex = val
      this.getval()
    },
    // 审核
    review(index) {
      let id = this.getList[index].id
      let status = this.getList[index].checkStatus
      this.$router.push('/detailReview?id=' + id + '&status=' + status)
      localStorage.setItem('ms_username', status)
      this.setStatus()
    },
    // 详情
    detail() {

    },
    ...mapMutations({
      setStatus: 'SET_STATUS'
    }),
    // 查看
    look() {
      this.$router.push('/look')
    }
  }
}
</script>

<style lang="scss">
.base {
  table {
    border: 1px solid #e1e6ef;
    width: 1100px;
    margin-top: 30px;
    thead {
      background-color: #e1e6ef;
    }
    tr th,
    tr td {
      padding: 14px 16px;
      text-align: center;
    }
    tr:hover {
      background-color: #F1F2F7;
    }
  }
  .element {
    display: inline-block;
    margin-right: 15px;
    p {
      margin-bottom: 10px;
    }
    .input {
      width: 200px;
    }
  }
  .btn {
    display: inline-block;
  }
  .noData {
    font-size: 16px;
    padding: 30px;
  }
}
</style>

