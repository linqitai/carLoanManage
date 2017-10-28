<template>
  <div class="mileage">
    <div class="nav">
      <el-breadcrumb separator="/">
        <img class="hoemIcon left mr3" src="../../../common/images/homeIconGray.png" alt="">
        <el-breadcrumb-item>
          <span class="text">当前位置</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="text">臻车贷管理</span>
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
              <el-date-picker class="inline" style="width:120px;" v-model="startTime" type="date" placeholder="开始时间" @change="startTimeChange">
              </el-date-picker>
              <span class="inline">至</span>
              <el-date-picker class="inline" style="width:120px;" v-model="endTime" type="date" placeholder="结束时间" @change="endTimeChange">
              </el-date-picker>
            </div>
          </div>
          <div class="element">
            <p class="inline">状态</p>
            <div class="width120 inline">
              <el-select v-model="applyStatus" placeholder="请选择" @change="search">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">平台选择</p>
            <div class="width120 inline">
              <el-select v-model="platform" placeholder="请选择" @change="search">
                <el-option v-for="item in platforms" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">所在省市</p>
            <div class="width140 inline">
              <el-input placeholder="请输入所在省市" class="input" v-model="cityOrProvince" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">姓名</p>
            <div class="width120 inline">
              <el-input v-model="name" placeholder="请输入姓名" class="input" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element" @click="search">
            <el-button type="" class="searchBtn">查询</el-button>
          </div>
          <div class="element" @click="moreBtn">
            <img class="moreIcon" src="../../../common/images/arrow_down.png" v-if="!searchCell">
            <img class="moreIcon iconTransform" src="../../../common/images/arrow_down.png" v-if="searchCell">
          </div>
        </div>
        <transition name="fade">
          <div class="searchBox clear" v-if="searchCell">
            <div class="element">
              <p class="inline">账号</p>
              <div class="width140 inline">
                <el-input v-model="zend" placeholder="请输入账号" class="input" @keyup.enter.native="search"></el-input>
              </div>
            </div>
            <div class="element">
              <p class="inline">身份证号</p>
              <div class="width180 inline">
                <el-input placeholder="请输入身份证号" class="input" v-model="carNum" @keyup.enter.native="search"></el-input>
              </div>
            </div>
            <div class="element">
              <p class="inline">手机号</p>
              <div class="width140 inline">
                <el-input type="text" v-model="mobile" placeholder="请输入手机号码" class="input" @keyup.enter.native="search"></el-input>
              </div>
            </div>
            <div class="element">
              <p class="inline">车辆估价</p>
              <div class="width120 inline priceBox">
                <el-select v-model="highPrice" placeholder="请选择" @change="searchByPrice">
                  <el-option v-for="item in highPrices" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <table>
        <thead>
          <tr>
            <th class="width80">时间</th>
            <th class="width60">账号</th>
            <th class="width180">车型</th>
            <th class="width60">上牌时间</th>
            <th class="width60">所在城市</th>
            <th class="width90">行驶里程/万公里</th>
            <th class="width70">车辆估价/万</th>
            <th class="width50">姓名</th>
            <th class="width100">身份证号</th>
            <th class="width50">手机号</th>
            <th class="width50">平台选择</th>
            <th class="width50">状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in getList" :key="item.value" v-show="getList.length > 0">
            <td class="width80">{{item.updated | getDate}}</td>
            <td class="width60">{{item.zedAccount}}</td>
            <td class="width180">
              <el-tooltip :content="item.title" placement="right" effect="light">
                <el-button size="mini" class="width180 ellipsis">{{item.title}}</el-button>
              </el-tooltip>
            </td>
            <td class="width60">{{item.regDate}}</td>
            <td class="width60">{{item.province}}{{item.city}}</td>
            <td class="width90">{{item.mile}}</td>
            <td class="width70">{{item.highPrice}}</td>
            <td class="width50">{{item.name}}</td>
            <td class="width100">{{item.carNum}}</td>
            <td class="width50">{{item.mobile}}</td>
            <td class="width50">{{item.pushPlatformType | getFormtype}}</td>
            <td class="width50">{{item.applyStatus | getStatus}}</td>
          </tr>
          <tr v-show="getList.length === 0">
            <td class="noData" colspan="12">暂无数据</td>
          </tr>
        </tbody>
      </table>
      <div class="block" style="margin-top:10px" v-show="showPageTag">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { format, getTime, getDate } from '../../../common/js/times'
import { getLimiteText } from '../../../common/js/utils'
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
      highPrice: '',
      cityOrProvince: '',
      zend: '',
      maxPrice: '',
      minPrice: '',
      platform: '',
      platforms: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '微贷网'
      }],
      highPrices: [{
        value: '',
        label: '全部'
      }, {
        value: '0-5',
        label: '0-5'
      }, {
        value: '5-15',
        label: '5-15'
      }, {
        value: '15-30',
        label: '15-30'
      }, {
        value: '30-50',
        label: '30-50'
      }, {
        value: '50-5000',
        label: '>50'
      }],
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '已评估'
      }, {
        value: '3',
        label: '已申请'
      }, {
        value: '5',
        label: '已提交'
      }],
      provinceCitys: [{
        label: '江苏',
        cities: []
      }, {
        label: '浙江',
        cities: []
      }],
      props: {
        value: 'label',
        children: 'cities'
      },
      pageIndex: 1,
      pageSize: 12,
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
    this.getval();
    // testKY();
  },
  filters: {
    getLimiteText(t) {
      return getLimiteText(t)
    },
    getFullDate(t) {
      return format(t)
    },
    getDate(t) {
      return getDate(t)
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
        zedAccount: this.zend,
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
      this.pageIndex = 1
      this.getval()
    },
    searchByPrice() {
      let price = this.highPrice
      console.log(price)
      this.minPrice = price.split('-')[0]
      this.maxPrice = price.split('-')[1]
      this.getval()
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

