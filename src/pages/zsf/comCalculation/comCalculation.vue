<template>
  <div class="zsfComCalculation">
    <div class="breadcrumbWrapper">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <img class="hoemIcon" src="../../../common/images/homeIconGray.png" alt="">
          <span class="text">当前位置</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="text">臻商分管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="mainColor">提额历程</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
          <div class="element">
            <p class="inline">提额时间</p>
            <div class="inline">
              <el-date-picker class="inline" style="width:140px;" v-model="sdate" type="date" placeholder="开始时间" @change="startTimeChange">
              </el-date-picker>
              <span class="inline">至</span>
              <el-date-picker class="inline" style="width:140px;" v-model="edate" type="date" placeholder="结束时间" @change="endTimeChange">
              </el-date-picker>
            </div>
          </div>
          <div class="element">
            <p class="inline">手机号</p>
            <div class="width140 inline">
              <el-input type="number" v-model="mobile" placeholder="请输入手机号" class="input" @keyup.enter.native="search"></el-input>
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
          <div class="element" v-if="searchCell">
            <p class="inline">房产价值</p>
            <div class="width120 inline">
              <el-select v-model="house" placeholder="" @change="searchByHouseValue">
                <el-option v-for="item in houseState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element" v-if="searchCell">
            <p class="inline">车辆价值</p>
            <div class="width120 inline">
              <el-select v-model="car" placeholder="" @change="searchByCarValue">
                <el-option v-for="item in carState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element" v-if="searchCell">
            <p class="inline">是否店铺所有者</p>
            <div class="width120 inline">
              <el-select v-model="shopOwner" placeholder="" @change="search">
                <el-option v-for="item in shopOwnerState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element" v-if="searchCell">
            <p class="inline">安保服务</p>
            <div class="width120 inline">
              <el-select v-model="openDoor" placeholder="" @change="searchByOpenDoor">
                <el-option v-for="item in openDoorState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element" v-if="searchCell">
            <p class="inline">臻收银</p>
            <div class="width120 inline">
              <el-select v-model="collectMoney" placeholder="" @change="search">
                <el-option v-for="item in collectMoneyState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element" v-if="searchCell">
            <p class="inline">客流统计</p>
            <div class="width120 inline">
              <el-select v-model="people" placeholder="" @change="search">
                <el-option v-for="item in peopleState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element" v-if="searchCell">
            <p class="inline">银行流水</p>
            <div class="width120 inline">
              <el-select v-model="bank" placeholder="" @change="search">
                <el-option v-for="item in bankState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element" v-if="searchCell">
            <p class="inline">征信报告</p>
            <div class="width120 inline">
              <el-select v-model="report" placeholder="" @change="search">
                <el-option v-for="item in reportState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <el-button size="medium" type="primary" class="searchBtn left" @click.native="search()">查询</el-button>
            <div class="ml10 right">
              <img class="moreIcon" src="../../../common/images/arrow_down.png" width="32" v-if="!searchCell" @click="moreBtn">
              <img class="moreIcon iconTransform" src="../../../common/images/arrow_down.png" width="32" v-if="searchCell" @click="moreBtn">
            </div>
          </div>
        </div>
      </div>
      <!--表格-->
      <div class="tableWrapper" style="overflow: auto;">
        <table class="tableList" style="min-width:2000px;width:99%;">
          <thead>
            <tr>
              <th class="width70">提额时间</th>
              <th class="width40">手机号</th>
              <th class="width30">姓名</th>
              <th class="width30">本地房产</th>
              <th class="width60">房产价值(万元)</th>
              <th class="width40">有无车辆</th>
              <th class="width60">车辆价值(万元)</th>
              <th class="width50">店铺所有者</th>
              <th class="width60">店铺月营收(元)</th>
              <th class="width50">员工人数</th>
              <th class="width70">店铺年租金(万元)</th>
              <th class="width50">开业时长</th>
              <th class="width50">所处区域</th>
              <th class="width60 bg">资产与经营(元)</th>
              <th class="width50 bg">银行流水(元)</th>
              <th class="width50 bg">征信报告(元)</th>
              <th class="width50 bg">安保服务(元)</th>
              <th class="width50 bg">客流统计(元)</th>
              <th class="width50 bg">臻收银(元)</th>
              <th class="width60 bg">总提升额度(元)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in getList" :key="item.id">
              <td class="width70 fix">{{item.modifyDate | getDateHM}}</td>
              <td class="width40 fix">{{item.mobile}}</td>
              <td class="width30 fix">{{item.name}}</td>
              <td class="width50">{{item.house | houseStatus}}</td>
              <td class="width60">{{item.houseValue | assetStatus}}</td>
              <td class="width40">{{item.car | carStatus}}</td>
              <td class="width60">{{item.carValue | assetStatus}}</td>
              <td class="width50">{{item.shop | shopStatus}}</td>
              <td class="width60">{{item.monthlySales | assetStatus}}</td>
              <td class="width50">{{item.employeeNum | assetStatus}}</td>
              <td class="width60">{{item.annualRent | assetStatus}}</td>
              <td class="width50">{{item.startBusinessTime | startYearStatus}}</td>
              <td class="width50">{{item.area | areaStatus}}</td>
              <td class="widtt60">{{item.asset | assetStatus}}</td>
              <td class="width50">{{item.bankStatementFlag | assetStatus}}</td>
              <td class="width60">{{item.creditReportFlag | assetStatus}}</td>
              <td class="width50" id="protect">
                <a type="text" @click="securityBtn(item.isInstallAB, item.rate)">{{item.security | assetStatus}}</a>
                <!--安保对话框-->
                <el-dialog title="安保服务详情" :visible.sync="centerDialogVisible" center>
                  <div class="dialog-div">
                    <p>使用时长：{{isInstallAB | isInstallABStatus}}</p>
                    <p>近三个月开门率：{{dialogRate | rateStatus}}%</p>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="centerDialogVisible = false">关 闭</el-button>
                  </span>
                </el-dialog>
              </td>
              <td class="width50" id="people">
                <a type="text" @click="passengerBtn(item.installDays, item.threeWeekPeople, item.nineWeekPeople)">{{item.passenger | assetStatus}}</a>
                <!--客流对话框-->
                <el-dialog title="客流统计详情" :visible.sync="centerDialogVisible1" center>
                  <div class="dialog-div">
                    <p>使用时长：{{installDays | rateStatus}}天</p>
                    <p>前9周周平均客流：{{threeWeekPeople | rateStatus}}人</p>
                    <p>后3周周平均客流：{{nineWeekPeople | rateStatus}}人</p>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="centerDialogVisible1 = false">关 闭</el-button>
                  </span>
                </el-dialog>
              </td>
              <td class="width50">{{item.openCashier | assetStatus}}</td>
              <td class="width50">{{item.promTotal | assetStatus}}</td>
            </tr>
            <tr v-show="getList.length === 0">
              <td class="noData" colspan="20">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="block" style="margin-top:10px" v-show="showPageTag">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
import { format, getDate, getDateHM } from '../../../common/js/times'
import { zsf, config } from '../../../api/index'

export default {
  data() {
    return {
      installDays: '',
      threeWeekPeople: '',
      nineWeekPeople: '',
      dialogRate: '',
      isInstallAB: '',
      centerDialogVisible: false,
      centerDialogVisible1: false,
      mobile: '',
      name: '',
      total: 1,
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
      pageSize: 10,
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
        value: '0',
        label: '0-5000'
      }, {
        value: '1',
        label: '5000-10000'
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
        label: '0-10000'
      }, {
        value: '1',
        label: '10000-20000'
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
      return t === undefined ? '---' : t === 1 ? '有' : t === 0 ? '无' : ''
    },
    carStatus(t) {
      return t === undefined ? '---' : t === 1 ? '有' : t === 0 ? '无' : ''
    },
    shopStatus(t) {
      return t === undefined ? '---' : t === 1 ? '是' : t === 0 ? '否' : ''
    },
    startYearStatus(t) {
      return t === undefined ? '---' : t === 0 ? '一年以内' : t === 1 ? '3年以内' : t === 2 ? '3年以上' : ''
    },
    areaStatus(t) {
      return t === undefined ? '---' : t === 0 ? '郊区-工业区' : t === 1 ? '郊区-住宅区' : t === 2 ? '郊区-商业区' : t === 3 ? '城区-住宅区' : t === 4 ? '城区-商业区' : ''
    },
    isInstallABStatus(t) {
      return t === 0 ? '未安装' : '已安装'
    },
    rateStatus(t) {
      return t === undefined ? '0' : t
    },
    assetStatus(t) {
      return t === undefined ? '---' : t
    }
  },
  methods: {
    securityBtn(isInstallAB, rate) {
      this.centerDialogVisible = true
      this.dialogRate = rate
      this.isInstallAB = isInstallAB
    },
    passengerBtn(installDays, threeWeekPeople, nineWeekPeople) {
      this.centerDialogVisible1 = true
      this.installDays = installDays
      this.threeWeekPeople = threeWeekPeople
      this.nineWeekPeople = nineWeekPeople
    },
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
        //          openDoorRateMin: this.openDoorRateMin,
        //          openDoorRateMax: this.openDoorRateMax,
        securityMoneyFlag: this.openDoor,
        shop: this.shopOwner,
        cashier: this.collectMoney,
        fallFootMoneyFlag: this.people,
        bankStatementFlag: this.bank,
        creditReportFlag: this.report

      }
      axios.post(zsf + '/promoteQuota/queryForWeb', params, config).then(res => {
        if (res.data.code === 1000) {
          // this.getList = res.data.data.result ? res.data.data.result : '';
          this.$nextTick(() => {
            this.getList = res.data.data.result ? res.data.data.result : ''
            this.total = res.data.data.total
            console.log(res.data.data.result)
            //              this.asset = (res.data.data.asset === undefined) ? -1 : res.data.data.asset;
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
