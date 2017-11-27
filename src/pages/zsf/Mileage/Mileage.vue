<template>
  <div class="zsfMileage">
    <div class="nav">
      <el-breadcrumb separator="/">
        <img class="hoemIcon left mr3" src="../../../common/images/homeIconGray.png" alt="">
        <el-breadcrumb-item>
          <span class="text">当前位置</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="text">臻商分管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>自评历程</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
          <div class="element">
            <div class="element">
              <p class="inline">时间</p>
              <div class="inline">
                <el-date-picker class="inline" style="width:120px;" v-model="sdate" type="date" placeholder="开始时间" @change="startTimeChange">
                </el-date-picker>
                <span class="inline">至</span>
                <el-date-picker class="inline" style="width:120px;" v-model="edate" type="date" placeholder="结束时间" @change="endTimeChange">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="element">
            <p class="inline">姓名</p>
            <div class="width120 inline">
              <el-input v-model="name" placeholder="请输入姓名" class="input" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">身份证号</p>
            <div class="width180 inline">
              <el-input placeholder="请输入身份证号" class="input" v-model="identityNo" :maxlength="maxlengthid" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">手机号</p>
            <div class="width140 inline">
              <el-input type="number" v-model="mobile" placeholder="请输入手机号" class="input" :maxlength="maxlengthMobole" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">动作</p>
            <div class="width120 inline">
              <el-select v-model="state" placeholder="" @change="search">
                <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element" @click="search()">
            <el-button type="primary" class="searchBtn">查询</el-button>
          </div>
          <div class="element" @click="moreBtn">
            <img class="moreIcon" src="../../../common/images/arrow_down.png" width="32" v-if="!searchCell">
            <img class="moreIcon iconTransform" src="../../../common/images/arrow_down.png" width="32" v-if="searchCell">
          </div>
        </div>
        <!--第二行-->
        <div v-if="searchCell">
          <div class=" searchBox clear">
            <div class="element ">
              <p class="inline ">婚姻状态</p>
              <div class="width120 inline ">
                <el-select v-model="marriage " placeholder=" " @change="search ">
                  <el-option v-for="item in marriageStates " :key="item.value " :label="item.label " :value="item.value ">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="element ">
              <p class="inline ">家庭收支</p>
              <div class="width120 inline ">
                <el-input type="number " v-model="savingMin " placeholder="元 " class="input "></el-input>
              </div>
              <p class="inline ">至</p>
              <div class="width120 inline ">
                <el-input type="number " v-model="savingMax " placeholder="元 " class="input "></el-input>
              </div>
            </div>
            <div class="element ">
              <p class="inline ">自评分值</p>
              <div class="width120 inline ">
                <el-input type="number " v-model="scoreMin " placeholder="分 " class="input "></el-input>
              </div>
              <p class="inline ">至</p>
              <div class="width120 inline ">
                <el-input type="number " v-model="scoreMax " placeholder="分 " class="input "></el-input>
              </div>
            </div>
            <div class="element ">
              <p class="inline ">自评额度</p>
              <div class="width120 inline ">
                <el-input type="number " v-model="quotaMin " placeholder="元 " class="input "></el-input>
              </div>
              <p class="inline ">至</p>
              <div class="width120 inline ">
                <el-input type="number " v-model="quotaMax " placeholder="元 " class="input "></el-input>
              </div>
            </div>
          </div>
          <!--第三行-->
          <div class="searchBox clear ">
            <div class="element">
              <p class="inline">配偶职业</p>
              <div class="width120 inline">
                <el-select v-model="spouseOCP" placeholder="" @change="search">
                  <el-option v-for="item in supStates" :key=" item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="element">
              <p class="inline">子女职业</p>
              <div class="width120 inline">
                <el-select v-model="childOCP" placeholder="" @change="search">
                  <el-option v-for="item in childStates" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>
      <!--表格-->
      <table>
        <thead>
          <tr>
            <th class="width80">时间</th>
            <th class="width60">手机号</th>
            <th class="width50">姓名</th>
            <th class="width50">身份证号</th>
            <th class="width50">婚姻状态</th>
            <th class="width70">配偶职业</th>
            <th class="width70">子女职业</th>
            <th class="width50">家庭收支(元)</th>
            <th class="width50">自评分值(分)</th>
            <th class="width50">自评额度(元)</th>
            <th class="width50">动作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in getList" :key="item.value" v-show="getList.length > 0">
            <td class="width80">{{item.date | getDateHM}}</td>
            <td class="width60">{{item.mobile}}</td>
            <td class="width50">{{item.name}}</td>
            <td class="width50">{{item.identityNo}}</td>
            <td class="width50">{{item.marriage | getmarryStatus}}</td>
            <td class="width70">{{item.spouseOCP | getsupStatus}}</td>
            <td class="width70">{{item.childOCP | getsupStatus}}</td>
            <td class="width50">{{item.fmSaving}}</td>
            <td class="width50">{{item.score | getInt}}</td>
            <td class="width50">{{item.quota}}</td>
            <td class="width50">{{item.action | getStatus}}</td>
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
// import { ERR_OK } from '../../../common/js/config'
import axios from 'axios'
import { format, getDate, getDateHM } from '../../../common/js/times'
import { zsf, config } from '../../../api/index'
// import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      maxlengthMobole: 11,
      maxlengthid: 18,
      searchCell: false,
      pageIndex: 1,
      pageSize: 16,
      name: '',
      mobile: '',
      identityNo: '',  // 身份证号
      marriage: '',
      spouseOCP: '',  // 配偶职业
      childOCP: '',    // 子女职业
      startDate: '',
      endDate: '',
      sdate: '',
      edate: '',
      value: '',
      state: '',
      status: '',
      scoreMin: '',
      scoreMax: '',
      quotaMin: '',
      quotaMax: '',
      savingMin: '',
      savingMax: '',
      // pageInfo.page:'',  // 第几页
      // pageInfo.size: ''   // 每页几条
      getList: [],
      total: '',
      showPageTag: false,
      states: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '去自评'
      }, {
        value: '1',
        label: '自评提交'
      }, {
        value: '2',
        label: '重自评'
      }, {
        value: '3',
        label: '重自评提交'
      }, {
        value: '4',
        label: '去提额'
      }, {
        value: '5',
        label: '申请臻e贷'
      }, {
        value: '6',
        label: '申请臻分期'
      }],
      supStates: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '政府部门'
      }, {
        value: '2',
        label: '事业单位'
      }, {
        value: '4',
        label: '共同经营'
      }, {
        value: '3',
        label: '其他'
      }],
      marriageStates: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '已婚'
      }, {
        value: '0',
        label: '未婚'
      }, {
        value: '3',
        label: '再婚'
      }, {
        value: '2',
        label: '离异'
      }, {
        value: '4',
        label: '丧偶'
      }],
      childStates: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '政府部门'
      }, {
        value: '2',
        label: '事业单位'
      }, {
        value: '3',
        label: '其他'
      }]
    }
  },
  created() {
    this.zsfQuery();
  },
  filters: {
    getInt(t) {
      return t ? parseInt(t) : 0
    },
    getFullDate(t) {
      return format(t)
    },
    getDate(t) {
      return getDate(t)
    },
    getDateHM(t) {
      return getDateHM(t)
    },
    getmarryStatus(t) {
      return t === 0 ? '未婚' : t === 1 ? '已婚' : t === 2 ? '离异' : t === 3 ? '再婚' : t === 4 ? '丧偶' : ''
    },
    getsupStatus(t) {
      return t === 1 ? '政府部门' : t === 2 ? '事业单位' : t === 3 ? '其他' : t === 4 ? '共同经营' : '--'
    },
    getStatus(t) {
      return t === 0 ? '去自评' : t === 1 ? '自评提交' : t === 2 ? '重自评' : t === 3 ? '重自评提交' : t === 4 ? '去提额' : t === 5 ? '申请臻e贷' : t === 6 ? '申请臻分期' : ''
    }
  },
  methods: {
    zsfQuery() {
      let params = {
        name: this.name,
        mobile: this.mobile,
        date: this.date,
        identityNo: this.identityNo,
        marriage: this.marriage,
        spouseOCP: this.spouseOCP,
        childOCP: this.childOCP,
        startDate: this.sdate ? getDate(this.sdate) : '',
        endDate: this.edate ? getDate(this.edate) : '',
        action: this.state,
        scoreMin: this.scoreMin,
        scoreMax: this.scoreMax,
        quotaMin: this.quotaMin,
        quotaMax: this.quotaMax,
        savingMin: this.savingMin,
        savingMax: this.savingMax,
        page: this.pageIndex,
        size: this.pageSize
      }
      axios.post(zsf + '/selfeval/queryAction', params, config).then(res => {
        console.log(res)
        if (res.data.code === 1000) {
          this.getList = res.data.data.records ? res.data.data.records : []
          this.total = parseInt(res.data.data.total)
          console.log('total' + this.total)
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
      this.zsfQuery()
    },
    startTimeChange() {
      if (this.edate) {
        this.pageIndex = 1
        this.zsfQuery()
      }
    },
    endTimeChange() {
      if (this.sdate) {
        this.pageIndex = 1
        this.getval()
      }
    },
    moreBtn() {
      this.searchCell = !this.searchCell
      // console.log(this.searchCell)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(val)
      this.pageIndex = val
      this.zsfQuery()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './Mileage'
</style>

