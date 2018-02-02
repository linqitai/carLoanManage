<template>
  <div class="zsfMileage" ref="zsfMileage">
    <div class="breadcrumbWrapper" ref="breadcrumbWrapper">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <img class="hoemIcon" src="../../../common/images/homeIconGray.png" alt="">
          <span class="text">当前位置</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="text">臻商分管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="mainColor">自评历程</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
          <div class="element">
            <p class="inline">时间</p>
            <div class="inline">
              <el-date-picker size="medium" class="inline" style="width:140px;" v-model="sdate" type="date" placeholder="开始时间" @change="startTimeChange">
              </el-date-picker>
              <span class="inline">至</span>
              <el-date-picker size="medium" class="inline" style="width:140px;" v-model="edate" type="date" placeholder="结束时间" @change="endTimeChange">
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
            <p class="inline">身份证号</p>
            <div class="width180 inline">
              <el-input size="medium" placeholder="请输入身份证号" class="input" v-model="identityNo" :maxlength="maxlengthid" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">手机号</p>
            <div class="width140 inline">
              <el-input size="medium" type="number" v-model="mobile" placeholder="请输入手机号" class="input" :maxlength="maxlengthMobole" @keyup.enter.native="search"></el-input>
            </div>
          </div>
          <div class="element" v-if="searchCell">
            <p class="inline">动作</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="state" placeholder="" @change="search">
                <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element" v-if="searchCell">
            <p class="inline">婚姻状态</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="marriage" placeholder="" @change="search">
                <el-option v-for="item in marriageStates" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element" v-if="searchCell">
            <p class="inline">家庭收支</p>
            <div class="width120 inline">
              <el-input size="medium" type="number" v-model="savingMin" placeholder="元 " class="input"></el-input>
            </div>
            <p class="inline">至</p>
            <div class="width120 inline">
              <el-input size="medium" type="number" v-model="savingMax" placeholder="元" class="input"></el-input>
            </div>
          </div>
          <div class="element" v-if="searchCell">
            <p class="inline">自评分值</p>
            <div class="width120 inline">
              <el-input size="medium" type="number" v-model="scoreMin" placeholder="分" class="input"></el-input>
            </div>
            <p class="inline">至</p>
            <div class="width120 inline">
              <el-input size="medium" type="number" v-model="scoreMax" placeholder="分" class="input"></el-input>
            </div>
          </div>
          <div class="element" v-if="searchCell">
            <p class="inline">自评额度</p>
            <div class="width120 inline ">
              <el-input size="medium" type="number" v-model="quotaMin" placeholder="元" class="input"></el-input>
            </div>
            <p class="inline">至</p>
            <div class="width120 inline">
              <el-input size="medium" type="number" v-model="quotaMax" placeholder="元" class="input"></el-input>
            </div>
          </div>
          <div class="element" v-if="searchCell">
            <p class="inline">配偶职业</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="spouseOCP" placeholder="" @change="search">
                <el-option v-for="item in supStates" :key=" item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element" v-if="searchCell">
            <p class="inline">子女职业</p>
            <div class="width120 inline">
              <el-select size="medium" v-model="childOCP" placeholder="" @change="search">
                <el-option v-for="item in childStates" :key="item.value" :label="item.label" :value="item.value">
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
      <div class="tableWrapper">
        <el-table :data="getList" stripe>
          <el-table-column fixed="left" label="时间" min-width="150">
            <template slot-scope="scope">
              {{scope.row.date | getDateHM}}
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="手机号" min-width="120"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="identityNo" label="身份证号" width="170"></el-table-column>
          <el-table-column prop="" label="婚姻状态">
            <template slot-scope="scope">
              {{scope.row.marriage | getmarryStatus}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="配偶职业">
            <template slot-scope="scope">
              {{scope.row.spouseOCP | getsupStatus}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="子女职业">
            <template slot-scope="scope">
              {{scope.row.childOCP | getsupStatus}}
            </template>
          </el-table-column>
          <el-table-column prop="fmSaving" label="家庭收支(元)" min-width="100"></el-table-column>
          <el-table-column prop="score" label="自评分值(分)" min-width="100">
            <template slot-scope="scope">
              {{scope.row.score | getInt}}
            </template>
          </el-table-column>
          <el-table-column prop="quota" label="自评额度(元)" min-width="100"></el-table-column>
          <el-table-column fixed="right" label="动作" width="100">
            <template slot-scope="scope">
              {{scope.row.action | getStatus}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="block" style="margin-top:10px" v-show="showPageTag">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes="[8,10,12,14,16]" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
              </div> -->
      <div class="tableBottom" v-show="showPageTag">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" :page-sizes="[8,10,12,14,16]" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
      pageSize: 10,
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
      total: 1,
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
        // 设置面包屑导航的宽度
        // let width = this.$refs.zsfMileage.clientWidth
        // this.$refs.nav.style.width = width + 'px'
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
      this.pageSize = val
      this.zsfQuery()
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

