<template>
  <div class="mileage">
    <div class="breadcrumbWrapper" ref="breadcrumbWrapper">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <img class="hoemIcon" src="../../../common/images/homeIconGray.png" alt="">
          <span class="text">当前位置</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="text">臻e贷管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>历程</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
          <div class="element">
            <p class="inline">时间</p>
            <div class="inline">
              <el-date-picker size="medium" class="inline" style="width:120px;" v-model="startTime" type="date" placeholder="开始时间" @change="startTimeChange">
              </el-date-picker>
              <span class="inline">至</span>
              <el-date-picker size="medium" class="inline" style="width:120px;" v-model="endTime" type="date" placeholder="结束时间" @change="endTimeChange">
              </el-date-picker>
            </div>
          </div>
          <div class="element">
            <p class="inline">姓名</p>
            <div class="width120 inline">
              <el-input size="medium" v-model="name" placeholder="请输入姓名" class="input" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">手机号</p>
            <div class="width140 inline">
              <el-input size="medium" type="text" v-model="mobile" placeholder="请输入手机号码" class="input" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">身份证号</p>
            <div class="width180 inline">
              <el-input size="medium" placeholder="请输入身份证号" class="input" v-model="carNum" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element" @click="search">
            <el-button size="medium" type="" class="searchBtn">查询</el-button>
          </div>
          <div class="element" @click="moreBtn">
            <img class="moreIcon" src="../../../common/images/arrow_down.png" v-if="!searchCell">
            <img class="moreIcon iconTransform" src="../../../common/images/arrow_down.png" v-if="searchCell">
          </div>
        </div>
        <transition name="fade">
          <div class="searchBox clear" v-if="searchCell">
            <div class="element">
              <p class="inline">动作</p>
              <div class="width120 inline">
                <el-select size="medium" v-model="action" placeholder="请选择" @change="search">
                  <el-option v-for="item in actions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="element">
              <p class="inline">信息</p>
              <div class="width100 inline">
                <el-input size="medium" v-model="info" placeholder="请输入信息" class="input" @keyup.enter.native="search"></el-input>
              </div>
            </div>
            <div class="element">
              <p class="inline">提款</p>
              <div class="width140 inline priceBox">
                <el-select size="medium" v-model="drawMoney" placeholder="请选择" @change="searchByDrawMoney">
                  <el-option v-for="item in drawMoneys" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="element">
              <p class="inline">还款</p>
              <div class="width140 inline priceBox">
                <el-select size="medium" v-model="giveMoney" placeholder="请选择" @change="searchByGiveMoney">
                  <el-option v-for="item in giveMoneys" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <table class="tableList">
        <thead>
          <tr>
            <th class="width80">时间</th>
            <th class="width60">姓名</th>
            <th class="width50">手机号</th>
            <th class="width100">身份证号</th>
            <th class="width60">动作</th>
            <th class="width60">信息</th>
            <th class="width70">提款</th>
            <th class="width70">还款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in getList" :key="item.value" v-show="getList.length > 0">
            <td class="width80">{{item.updated | getFullDate}}</td>
            <td class="width60">{{item.zedAccount}}</td>
            <td class="width200">{{item.title}}</td>
            <td class="width60">{{item.regDate}}</td>
            <td class="width60">{{item.province}}{{item.city}}</td>
            <td class="width70">{{item.mile}}</td>
            <td class="width70">{{item.drawMoney}}</td>
            <td class="width50">{{item.name}}</td>
          </tr>
          <tr v-show="getList.length === 0">
            <td class="noData" colspan="12">暂无数据</td>
          </tr>
        </tbody>
      </table>
      <div class="block" style="margin-top:10px" v-show="showPageTag">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { format, getTime } from '../../../common/js/times'
import { cheCredit } from '@/api/index'

export default {
  data() {
    return {
      searchCell: false,
      startTime: '',
      endTime: '',
      mobile: '',
      carNum: '',
      name: '',
      action: '',
      drawMoney: '',
      giveMoney: '',
      cityOrProvince: '',
      info: '',
      maxPrice: '',
      minPrice: '',
      platform: '',
      drawMoneys: [{
        value: '',
        label: '全部'
      }, {
        value: '0-5000',
        label: '5000以下'
      }, {
        value: '5000-10000',
        label: '5000-10000'
      }, {
        value: '10000-20000',
        label: '10000-20000'
      }, {
        value: '20000-90000000',
        label: '20000以上'
      }],
      giveMoneys: [{
        value: '',
        label: '全部'
      }, {
        value: '0-5000',
        label: '5000以下'
      }, {
        value: '5000-10000',
        label: '5000-10000'
      }, {
        value: '10000-20000',
        label: '10000-20000'
      }, {
        value: '20000-90000000',
        label: '20000以上'
      }],
      actions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '申请'
      }, {
        value: '2',
        label: '提交申请'
      }, {
        value: '3',
        label: '提款'
      }, {
        value: '4',
        label: '还款'
      }, {
        value: '5',
        label: '网商消息'
      }],
      pageIndex: 1,
      pageSize: 10,
      total: 1,
      applyStatus: '',
      timer: '',
      companyName: '',
      employeeName: '',
      showPageTag: false,
      getList: []
    }
  },
  created() {
    // this.getval();
    // testKY();
  },
  filters: {
    getFullDate(t) {
      return format(t)
    },
    getFormtype(t) {
      return t === 1 ? '微贷网' : ''
    },
    getStatus(t) {
      return t === 1 ? '已评估' : t === 3 ? '已申请' : t === 5 ? '已提交' : ''
    }
  },
  methods: {
    startTimeChange() {
      if (this.endTime) {
        this.getval()
      }
    },
    endTimeChange() {
      if (this.startTime) {
        this.getval()
      }
    },
    moreBtn() {
      this.searchCell = !this.searchCell
      // console.log(this.searchCell)
    },
    // 查看
    look() {
      this.$router.push('/look')
    },
    getval() {
      let params = {
        applyStatus: this.applyStatus,
        _startTime: this.startTime ? getTime(this.startTime) : '',
        _endTime: this.endTime ? getTime(this.endTime) : '',
        pushPlatformType: this.platform,
        zedAccount: this.info,
        cityOrProvince: this.cityOrProvince,
        name: this.name,
        carNum: this.carNum,
        mobile: this.mobile,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice
      }
      cheCredit(params).then(res => {
        console.log('list len:' + res.count)
        if (res.code === 0) {
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
      // this.getval()
    },
    searchByDrawMoney() {
      let m = this.drawMoney
      this.minPrice = m.split('-')[0]
      this.maxPrice = m.split('-')[1]
      // this.getval()
    },
    searchByGiveMoney() {
      let m = this.drawMoney
      this.minPrice = m.split('-')[0]
      this.maxPrice = m.split('-')[1]
      // this.getval()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(val)
      this.pageIndex = val
      this.getval()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './Mileage'
</style>

