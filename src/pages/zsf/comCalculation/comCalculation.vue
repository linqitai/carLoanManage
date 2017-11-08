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
              <el-input type="number" v-model="mobile" placeholder="请输入手机号" class="input" :maxlength="maxlengthMobole"
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
              <el-input type="number " v-model="quotaMin " placeholder="元 " class="input "></el-input>
            </div>
            <p class="inline ">至</p>
            <div class="width120 inline ">
              <el-input type="number " v-model="quotaMax " placeholder="元 " class="input "></el-input>
            </div>
          </div>
          <div class="element" @click="search()">
            <el-button type="primary" class="searchBtn">查询</el-button>
          </div>
          <div class="element" @click="moreBtn">
            <img class="moreIcon" src="../../../common/images/arrow_down.png" width="32" v-if="!searchCell">
            <img class="moreIcon iconTransform" src="../../../common/images/arrow_down.png" width="32"
                 v-if="searchCell">
          </div>
        </div>
        <!--第二行-->
        <div class=" searchBox clear">
          <div class="element">
            <p class="inline">房产价值</p>
            <div class="width120 inline">
              <el-select v-model="house" placeholder="" @change="search">
                <el-option v-for="item in houseState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">车辆价值</p>
            <div class="width120 inline">
              <el-select v-model="car" placeholder="" @change="search">
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
              <el-select v-model="openDoor" placeholder="" @change="search">
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
        <div class=" searchBox clear">
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
      <table>
        <thead>
        <tr>
          <th class="width80">提额时间</th>
          <th class="width60">手机号</th>
          <th class="width60">姓名</th>
          <th class="width60">本地房产</th>
          <th class="width60">房产价值</th>
          <th class="width70">有无车辆</th>
          <th class="width70">车辆价值</th>
          <th class="width50">是否店铺所有者</th>
          <th class="width50">店铺月营收</th>
          <th class="width50">员工人数</th>
          <th class="width50">店铺年租金</th>
          <th class="width50">开业时长</th>
          <th class="width50">所处区域</th>
          <th class="width50">近三个月开门率</th>
          <th class="width50">臻收银</th>
          <th class="width50">客流统计</th>
          <th class="width50">银行流水</th>
          <th class="width50">征信报告</th>
          <th class="width50">提升额度</th>
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
          <td class="width90">{{item.mile}}</td>
          <td class="width70">{{item.highPrice}}</td>
          <td class="width50">{{item.name}}</td>
          <td class="width100">{{item.carNum}}</td>
          <td class="width50">{{item.mobile}}</td>
          <td class="width50">{{item.pushPlatformType | getFormtype}}</td>
          <td class="width50">{{item.applyStatus | getStatus}}</td>
          <td class="width50">{{item.submitStatus | getSubmitState}}</td>
        </tr>
        <tr v-show="getList.length === 0">
          <td class="noData" colspan="12">暂无数据</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {format, getDate} from '../../../common/js/times'
  import {zsf, config} from '../../../api/index'

  export default {
    data() {
      return {
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
        getList: [],
        // 房子
        houseState: [{
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '无'
        }, {
          value: '0',
          label: '100万以下'
        }, {
          value: '0',
          label: '100万-300万'
        }, {
          value: '0',
          label: '300万-800万'
        }, {
          value: '0',
          label: '800万以上'
        }],
        // 车
        carState: [{
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '无'
        }, {
          value: '0',
          label: '20万以下'
        }, {
          value: '0',
          label: '20万-50万'
        }, {
          value: '0',
          label: '50万-100万'
        }, {
          value: '0',
          label: '100万以上'
        }],
        // 是否店铺所有者
        shopOwnerState: [{
          value: '0',
          label: '全部'
        }, {
          value: '0',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }],
        // 开门率
        openDoorState: [{
          value: '0',
          label: '全部'
        }, {
          value: '0',
          label: '≥90%'
        }, {
          value: '0',
          label: '80%-90%'
        }, {
          value: '0',
          label: '70%-80%'
        }, {
          value: '0',
          label: '≤70%'
        }],
        // 臻收银
        collectMoneyState: [{
          value: '0',
          label: '全部'
        }, {
          value: '0',
          label: '有'
        }, {
          value: '0',
          label: '无'
        }],
        // 客流统计
        peopleState: [{
          value: '0',
          label: '全部'
        }, {
          value: '0',
          label: '有'
        }, {
          value: '0',
          label: '无'
        }],
        // 银行流水
        bankState: [{
          value: '0',
          label: '全部'
        }, {
          value: '0',
          label: '有'
        }, {
          value: '0',
          label: '无'
        }],
        // 统计报告
        reportState: [{
          value: '0',
          label: '全部'
        }, {
          value: '0',
          label: '有'
        }, {
          value: '0',
          label: '无'
        }]
      }
    },
    created() {
    },
    filters: {
//      carState(t)
    },
    methods: {
      search() {
        let params = {
//          startDate: this.sdate ? getDate(this.sdate) : '',
//          endDate: this.edate ? getDate(this.edate) : '',
          mobile: this.mobile
        //  name: this.name,               //
      //    fallfoot: this.people,               // 客流统计
      //    shop: this.shopOwner,                    // 有无店铺
      //    cashier: this.collectMoney,                // 臻收银
//          quotaMin:                // 提升额度最小值
//          quotaMax:
       //   startDate: this.sdate,
       //   endDate: this.edate,
//          carValueMin:
//          carValueMax:
//          houseValueMin:
//          houseValueMax:
//          openDoorRateMin:
//          openDoorRateMax:
       //   creditReportFlag: this.report,       // 征信报告
        //  bankStatementFlag: this.bank             // 银行流水
        }
        axios.post(zsf + '/promoteQuota/queryForWeb', params, config).then(res => {

        })
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

