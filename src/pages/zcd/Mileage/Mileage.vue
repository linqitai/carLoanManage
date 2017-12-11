<template>
  <div class="mileage" ref="mileage">
    <div class="breadcrumbWrapper" ref="breadcrumbWrapper">
      <el-breadcrumb separator="/">
        <img class="hoemIcon left mr3" src="../../../common/images/homeIconGray.png" alt="">
        <el-breadcrumb-item>
          <span class="text">当前位置</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="text">臻车贷管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="mainColor">历程</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
          <div class="element">
            <p class="inline">时间</p>
            <div class="inline">
              <el-date-picker size="medium" class="inline" style="width:140px;" v-model="startTime" type="date" placeholder="开始时间" @change="startTimeChange">
              </el-date-picker>
              <span class="inline">至</span>
              <el-date-picker size="medium" class="inline" style="width:140px;" v-model="endTime" type="date" placeholder="结束时间" @change="endTimeChange">
              </el-date-picker>
            </div>
          </div>
          <div class="element">
            <p class="inline">状态</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="applyStatus" placeholder="请选择" @change="search">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">提交状态</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="submitStatus" placeholder="请选择" @change="search">
                <el-option v-for="item in submitStatuOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">平台选择</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="platform" placeholder="请选择" @change="search">
                <el-option v-for="item in platforms" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
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
        <transition name="">
          <div class="searchBox clear" v-if="searchCell">
            <div class="element">
              <p class="inline">所在省市</p>
              <div class="width140 inline">
                <el-input size="medium" clearable placeholder="请输入所在省市" class="input" v-model="cityOrProvince" @keyup.enter.native="search"></el-input>
              </div>
            </div>
            <div class="element">
              <p class="inline">姓名</p>
              <div class="width120 inline">
                <el-input size="medium" clearable v-model="name" placeholder="请输入姓名" class="input" @keyup.enter.native="search"></el-input>
              </div>
            </div>
            <div class="element">
              <p class="inline">账号</p>
              <div class="width140 inline">
                <el-input size="medium" clearable v-model="zend" placeholder="请输入账号" class="input" @keyup.enter.native="search"></el-input>
              </div>
            </div>
            <div class="element">
              <p class="inline">身份证号</p>
              <div class="width180 inline">
                <el-input size="medium" :maxlength="maxLengthIdentity" clearable placeholder="请输入身份证号" class="input" v-model="carNum" @keyup.enter.native="search"></el-input>
              </div>
            </div>
            <div class="element">
              <p class="inline">手机号</p>
              <div class="width140 inline">
                <el-input size="medium" :maxlength="maxLengthMobile" clearable type="text" v-model="mobile" placeholder="请输入手机号码" class="input" @keyup.enter.native="search"></el-input>
              </div>
            </div>
            <div class="element">
              <p class="inline">车辆估价</p>
              <div class="width120 inline priceBox">
                <el-select size="medium" v-model="highPrice" placeholder="请选择" @change="searchByPrice">
                  <el-option v-for="item in highPrices" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="tableWrapper" v-if="tableSwitch1" style="overflow: auto;">
        <table class="tableList" style="min-width:1060px;width:99%;">
          <thead>
            <tr>
              <th class="width100">时间</th>
              <th class="width50">账号</th>
              <th class="width180">车型</th>
              <th class="width60">上牌时间</th>
              <th class="width80">所在城市</th>
              <th class="width90">行驶里程/公里</th>
              <th class="width70">车辆估价/万</th>
              <th class="width50">姓名</th>
              <th class="width100">身份证号</th>
              <th class="width50">手机号</th>
              <th class="width50">平台选择</th>
              <th class="width50">状态</th>
              <th class="width50">提交状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in getList" :key="item.value" v-show="getList.length > 0">
              <td class="width100">{{item.updated | getDateHM}}</td>
              <td class="width50">{{item.zedAccount}}</td>
              <td class="width180">
                <el-tooltip :content="item.title" placement="right" effect="light">
                  <el-button size="mini" class="width180 ellipsis">{{item.title}}</el-button>
                </el-tooltip>
              </td>
              <td class="width60">{{item.regDate}}</td>
              <td class="width80">{{item.province}}{{item.city}}</td>
              <td class="width90">{{item.inMile}}</td>
              <td class="width70">{{item.highPrice}}</td>
              <td class="width50">{{item.name}}</td>
              <td class="width100">{{item.carNum}}</td>
              <td class="width50">{{item.mobile}}</td>
              <td class="width50">{{item.pushPlatformType | getFormtype}}</td>
              <td class="width50">{{item.applyStatus | getStatus}}</td>
              <td class="width50">{{item.submitStatus | getSubmitState}}</td>
            </tr>
            <tr v-show="getList.length === 0">
              <td class="noData" colspan="13">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tableWrapper" v-if="tableSwitch2">
        <el-table :data="getList" max-height="540" style="min-width:1060px;max-width:1620px;width:99%">
          <el-table-column fixed label="时间" width="140">
            <template slot-scope="scope">
              {{scope.row.updated | getDateHM}}
            </template>
          </el-table-column>
          <el-table-column prop="zedAccount" label="账号" width="110"></el-table-column>
          <el-table-column label="车型" width="250">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.title" placement="right" effect="light">
                <span class="ellipsis">{{scope.row.title}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="上牌时间" width="140">
            <template slot-scope="scope">
              {{scope.row.regDate | getDateHM}}
            </template>
          </el-table-column>
          <el-table-column label="所在城市" width="140">
            <template slot-scope="scope">
              {{scope.row.province}}{{scope.row.city}}
            </template>
          </el-table-column>
          <el-table-column prop="inMile" label="行驶里程/公里" width="120"></el-table-column>
          <el-table-column prop="highPrice" label="车辆估价/万" width="100"></el-table-column>
          <el-table-column prop="name" label="姓名" width="70"></el-table-column>
          <el-table-column prop="carNum" label="身份证号" width="170"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="120"></el-table-column>
          <el-table-column label="平台选择" width="100">
            <template slot-scope="scope">
              {{scope.row.pushPlatformType | getFormtype}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="状态" width="80">
            <template slot-scope="scope">
              {{scope.row.applyStatus | getStatus}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="提交状态" width="80">
            <template slot-scope="scope">
              {{scope.row.submitStatus | getSubmitState}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tableBottom" v-show="showPageTag">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes="[10,12,14,16]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-radio-group v-model="tableSwitch" class="tableSwitch" size="mini" @change="tableSwitchChange">
          <el-radio-button label="1">大屏</el-radio-button>
          <el-radio-button label="2">中屏</el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>
<script>
import { format, getTime, getDateHM } from '../../../common/js/times'
import { getLimiteText } from '../../../common/js/utils'
import { cheCredit } from '@/api/index'

export default {
  data() {
    return {
      // selectedValue: '',
      // tableSwitchSelect: [{ label: '大屏幕', value: 0 }, { label: '中等屏幕', value: 1 }, { label: '小屏幕', value: 2 }],
      tableSwitch: 2, // 1：大屏幕，2：小屏幕
      tableSwitch1: false,
      tableSwitch2: true,
      tableData4: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      maxLengthMobile: 11,
      maxLengthIdentity: 18,
      searchCell: false,
      startTime: '',
      endTime: '',
      mobile: '',
      carNum: '',
      name: '',
      submitStatus: '',
      highPrice: '',
      cityOrProvince: '',
      zend: '',
      maxPrice: '',
      minPrice: '',
      platform: '',
      submitStatuOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '成功'
      }, {
        value: '-1',
        label: '失败'
      }],
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
    getSubmitState(t) {
      return t === 1 ? '成功' : t === -1 ? '失败' : ''
    },
    getLimiteText(t) {
      return getLimiteText(t)
    },
    getFullDate(t) {
      return format(t)
    },
    getDateHM(t) {
      return getDateHM(t)
    },
    getFormtype(t) {
      return t === 1 ? '微贷网' : ''
    },
    getStatus(t) {
      return t === 1 ? '已评估' : t === 3 ? '已申请' : t === 5 ? '已提交' : ''
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
      // // console.log(this.searchCell)
    },
    // 查看
    look() {
      this.$router.push('/look')
    },
    getval() {
      let params = {
        submitStatus: this.submitStatus,
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
        // console.log('list len:' + res.count)
        if (res.code === 0) {
          this.getList = res.list
          this.total = res.count
          if (this.total <= this.pageSize) {
            this.showPageTag = false
          } else {
            this.showPageTag = true
          }
        }
        // 设置面包屑导航的宽度
        // let width = this.$refs.mileage.scrollWidth
        // this.$refs.breadcrumb.style.width = width + 'px'
      })
    },
    // 查询
    search() {
      this.pageIndex = 1
      this.getval()
    },
    searchByPrice() {
      let price = this.highPrice
      // console.log(price)
      this.minPrice = price.split('-')[0]
      this.maxPrice = price.split('-')[1]
      this.getval()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getval()
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.pageIndex = val
      this.getval()
    }
  }
}
</script>

<style lang="scss">
@import './Mileage'
</style>

