<template>
  <div class="zsfComCalculation">
    <div class="nav">
      <el-breadcrumb separator="/">
        <img class="hoemIcon left mr3" src="../../../common/images/homeIconGray.png" alt="">
        <el-breadcrumb-item>
          <span class="text">当前位置</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="text">臻商分管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>提额历程</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
          <div class="element">
            <p class="inline">提额时间</p>
            <div class="inline">
              <el-date-picker class="inline" style="width:120px;" v-model="sdate" type="date" placeholder="开始时间"
                              @change="startTimeChange">
              </el-date-picker>
              <span class="inline">至</span>
              <el-date-picker class="inline" style="width:120px;" v-model="edate" type="date" placeholder="结束时间"
                              @change="endTimeChange">
              </el-date-picker>
            </div>
          </div>
          <div class="element">
            <p class="inline">手机号</p>
            <div class="width140 inline">
              <el-input type="number" v-model="mobile" placeholder="请输入手机号" class="input"
                        @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">姓名</p>
            <div class="width120 inline">
              <el-input v-model="name" placeholder="请输入姓名" class="input" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element ">
            <p class="inline ">提升额度</p>
            <div class="width120 inline ">
              <el-input type="number" v-model='quotaMin' placeholder="元 " class="input "></el-input>
            </div>
            <p class="inline ">至</p>
            <div class="width120 inline ">
              <el-input type="number" v-model='quotaMax' placeholder="元 " class="input "></el-input>
            </div>
          </div>
          <div class="element" @click="search()">
            <el-button type="primary" class="searchBtn">查询</el-button>
          </div>
          <div class="element" @click="moreBtn">
            <img class="moreIcon" src="../../../common/images/arrow_down.png" v-if="!searchCell">
            <img class="moreIcon iconTransform" src="../../../common/images/arrow_down.png" v-if="searchCell">
          </div>
        </div>
        <!--第二行-->
        <div class=" searchBox clear" v-if="searchCell" >
          <div class="element">
            <p class="inline">房产价值</p>
            <div class="width120 inline">
              <el-select v-model="house" placeholder="" @change="searchByHouseValue">
                <el-option v-for="item in houseState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">车辆价值</p>
            <div class="width120 inline">
              <el-select v-model="car" placeholder="" @change="searchByCarValue">
                <el-option v-for="item in carState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">是否店铺所有者</p>
            <div class="width120 inline">
              <el-select v-model="shopOwner" placeholder="" @change="search">
                <el-option v-for="item in shopOwnerState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">开门率</p>
            <div class="width120 inline">
              <el-select v-model="openDoor" placeholder="" @change="searchByOpenDoor">
                <el-option v-for="item in openDoorState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">臻收银</p>
            <div class="width120 inline">
              <el-select v-model="collectMoney" placeholder="" @change="search">
                <el-option v-for="item in collectMoneyState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!--第三行-->
        <div class=" searchBox clear" v-if="searchCell">
          <div class="element">
            <p class="inline">客流统计</p>
            <div class="width120 inline">
              <el-select v-model="people" placeholder="" @change="search">
                <el-option v-for="item in peopleState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">银行流水</p>
            <div class="width120 inline">
              <el-select v-model="bank" placeholder="" @change="search">
                <el-option v-for="item in bankState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">征信报告</p>
            <div class="width120 inline">
              <el-select v-model="report" placeholder="" @change="search">
                <el-option v-for="item in reportState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <!--表格-->
      <table style="width: 2000px;">
        <thead>
        <tr>
          <th class="width70">提额时间</th>
          <th class="width60">手机号</th>
          <th class="width60">姓名</th>
          <th class="width60">本地房产</th>
          <th class="width80">房产价值(万元)</th>
          <th class="width70">有无车辆</th>
          <th class="width80">车辆价值(万元)</th>
          <th class="width80">是否店铺所有者</th>
          <th class="width70">店铺月营收(元)</th>
          <th class="width50">员工人数</th>
          <th class="width80">店铺年租金(万元)</th>
          <th class="width50">开业时长</th>
          <th class="width80">所处区域</th>
          <th class="width70">近三个月开门率</th>
          <th class="width50">臻收银</th>
          <th class="width50">客流统计</th>
          <th class="width50">银行流水</th>
          <th class="width50">征信报告</th>
          <th class="width50">提升额度(元)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in getList" :key="item.id">
          <td class="width180">{{item.modifyDate | getDateHM}}</td>
          <td class="width60">{{item.mobile}}</td>
          <td class="width60">{{item.name}}</td>
          <td class="width60">{{item.house | houseStatus}}</td>
          <td class="width60">{{item.houseValue}}</td>
          <td class="width70">{{item.car | carStatus}}</td>
          <td class="width70">{{item.carValue}}</td>
          <td class="width50">{{item.shop | shopStatus}}</td>
          <td class="width50">{{item.monthlySales}}</td>
          <td class="width50">{{item.employeeNum}}</td>
          <td class="width50">{{item.annualRent}}</td>
          <td class="width50">{{item.startBusinessTime | startYearStatus}}</td>
          <td class="width50">{{item.area | areaStatus}}</td>
          <td class="width50">{{item.openRate}}</td>
          <td class="width50">{{item.openCashier}}</td>
          <td class="width50">{{item.footfall}}</td>
          <td class="width50">{{item.bankStatementFlag}}</td>
          <td class="width50">{{item.creditReportFlag}}</td>
          <td class="width50">{{item.promTotal}}</td>
        </tr>
        <tr v-show="getList.length === 0">
          <td class="noData" colspan="19">暂无数据</td>
        </tr>
        </tbody>
      </table>
      <div class="block" style="margin-top:10px" v-show="showPageTag">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="pageIndex" :page-size="pageSize" layout="total, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {format, getDate, getDateHM} from '../../../common/js/times'
  import {zsf, config} from '../../../api/index'

  export default {
    data() {
      return {
        mobile: '',
        name: '',
        total: '',
        searchCell: false,
        sdate: '',
        edate: '',
        house: '',
        car: '',
        openDoor: '',
        shopOwner: '',
        collectMoney: '',
        people: '',
        bank: '',
        report: '',
        getList: '',
        pageIndex: 1,
        pageSize: 16,
        showPageTag: false,
        quotaMin: '',
        quotaMax: '',
        // 房子
        houseState: [{
          value: '',
          label: '全部'
        }, {
          value: '0-0',
          label: '无'
        }, {
          value: '0-100',
          label: '100万以下'
        }, {
          value: '100-300',
          label: '100万-300万'
        }, {
          value: '300-800',
          label: '300万-800万'
        }, {
          value: '800',
          label: '800万以上'
        }],
        // 车
        carState: [{
          value: '',
          label: '全部'
        }, {
          value: '0-0',
          label: '无'
        }, {
          value: '0-20',
          label: '20万以下'
        }, {
          value: '20-50',
          label: '20万-50万'
        }, {
          value: '50-100',
          label: '50万-100万'
        }, {
          value: '100',
          label: '100万以上'
        }],
        // 是否店铺所有者
        shopOwnerState: [{
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '是'
        }, {
          value: '1',
          label: '否'
        }],
        // 开门率
        openDoorState: [{
          value: '',
          label: '全部'
        }, {
          value: '0.9',
          label: '≥90%'
        }, {
          value: '0.8-0.9',
          label: '80%-90%'
        }, {
          value: '0.7-0.8',
          label: '70%-80%'
        }, {
          value: '0-0.7',
          label: '≤70%'
        }],
        // 臻收银
        collectMoneyState: [{
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '有'
        }, {
          value: '1',
          label: '无'
        }],
        // 客流统计
        peopleState: [{
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '有'
        }, {
          value: '1',
          label: '无'
        }],
        // 银行流水
        bankState: [{
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '有'
        }, {
          value: '1',
          label: '无'
        }],
        // 统计报告
        reportState: [{
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '有'
        }, {
          value: '1',
          label: '无'
        }]
      }
    },
    created() {
      this.search();
    },
    filters: {
      getDateHM(t) {
        return getDateHM(t)
      },
      getDate(t) {
        return getDate(t)
      },
      houseStatus(t) {
        return t === 1 ? '有' : t === 0 ? '无' : ''
      },
      carStatus(t) {
        return t === 1 ? '有' : t === 0 ? '无' : ''
      },
      shopStatus(t) {
        return t === 1 ? '是' : t === 0 ? '否' : ''
      },
      startYearStatus(t) {
        return t === 0 ? '一年以内' : t === 1 ? '3年以内' : t === 2 ? '3年以上' : ''
      },
      areaStatus(t) {
        return t === 0 ? '郊区-工业区' : t === 1 ? '郊区-住宅区' : t === 2 ? '郊区-商业区' : t === 3 ? '城区-住宅区' : t === 4 ? '城区-商业区' : ''
      }
    },
    methods: {
      search() {
        let params = {
          mobile: this.mobile,
          page: this.pageIndex,
          size: this.pageSize,
          startDate: this.sdate ? getDate(this.sdate) : '',
          endDate: this.edate ? getDate(this.edate) : '',
          name: this.name,
          quotaMin: this.quotaMin,
          quotaMax: this.quotaMax,
          houseValueMin: this.houseValueMin,
          houseValueMax: this.houseValueMax,
          carValueMin: this.carValueMin,
          carValueMax: this.carValueMax,
          openDoorRateMin: this.openDoorRateMin,
          openDoorRateMax: this.openDoorRateMax,
          shop: this.shopOwner,
          cashier: this.collectMoney,
          fallfoot: this.people,
          bankStatementFlag: this.bank,
          creditReportFlag: this.report

        }
        axios.post(zsf + '/promoteQuota/queryForWeb', params, config).then(res => {
          if (res.data.code === 1000) {
            // this.getList = res.data.data.result ? res.data.data.result : '';
            this.$nextTick(() => {
              this.getList = res.data.data.result ? res.data.data.result : ''
              this.total = res.data.data.total
              if (this.total <= this.pageSize) {
                this.showPageTag = false
              } else {
                this.showPageTag = true
              }
            })
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(val)
        this.pageIndex = val
        this.search()
      },
      searchByHouseValue() {
        let price = this.house
        console.log(price)
        this.houseValueMin = price.split('-')[0]
        this.houseValueMax = price.split('-')[1]
        this.search()
      },
      searchByCarValue() {
        let price = this.car
        console.log(price)
        this.carValueMin = price.split('-')[0]
        this.carValueMax = price.split('-')[1]
        this.search()
      },
      searchByOpenDoor() {
        let price = this.openDoor
        console.log(price)
        this.openDoorRateMin = price.split('-')[0]
        this.openDoorRateMax = price.split('-')[1]
        this.search()
      },
      moreBtn() {
        this.searchCell = !this.searchCell
      },
      startTimeChange() {
        if (this.edate) {
          this.search()
        }
      },
      endTimeChange() {
        if (this.sdate) {
          this.search()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './comCalculation'
  /*.nopage{*/
  /*text-align: center;*/
  /*padding-top: 200px;*/
  /*}*/
</style>

