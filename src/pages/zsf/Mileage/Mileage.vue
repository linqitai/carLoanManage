<template>
  <div class="zsfMileage">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置</el-breadcrumb-item>
        <el-breadcrumb-item>风控管理</el-breadcrumb-item>
        <el-breadcrumb-item>历程</el-breadcrumb-item>
      </el-breadcrumb>
    </div>


    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">

          <div class="element">
            <p class="inline">时间:</p>
            <div class="width200 inline">
              <el-date-picker style="width:200px;" v-model="sdate" type="datetime" placeholder="选择日期范围">
              </el-date-picker>
            </div>
          </div>
          <div class="element">
            <p class="inline">至</p>
            <div class="width200 inline">
              <el-date-picker style="width:200px;" v-model="edate" type="datetime" placeholder="选择日期范围">
              </el-date-picker>
            </div>
          </div>
          <div class="element">
            <p class="inline">姓名:</p>
            <div class="width120 inline">
              <el-input v-model="name" placeholder="" class="input"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">身份证号:</p>
            <div class="width180 inline">
              <el-input placeholder="" class="input" v-model="identityNo" :maxlength="maxlengthid"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">手机号:</p>
            <div class="width140 inline">
              <el-input type="number" v-model="mobile" placeholder="" class="input"
                        :maxlength="maxlengthMobole"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">状态:</p>
            <div class="width120 inline">
              <el-select v-model="state" placeholder="">
                <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element" @click="search()">
            <el-button type="primary">查询</el-button>
          </div>
          <div class="element" @click="">
            <img class="moreIcon" src="../../../common/images/topIcon.png" width="32" v-if="!searchCell">
            <img class="moreIcon iconTransform" src="../../../common/images/topIcon.png" width="32" v-if="searchCell">
          </div>

        </div>
        <!--第二行-->

        <div class="searchBox clear" v-if="">
          <div class="element">
            <p class="inline">婚姻状态:</p>
            <div class="width120 inline">
              <el-select v-model="marriage" placeholder="">
                <el-option v-for="item in marriageStates" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">家庭收支:</p>
            <div class="width120 inline">
              <el-input type="number" v-model="savingMin" placeholder="" class="input"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">至</p>
            <div class="width120 inline">
              <el-input type="number" v-model="savingMax" placeholder="" class="input"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">自评分值:</p>
            <div class="width120 inline">
              <el-input type="number" v-model="scoreMin" placeholder="" class="input"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">至</p>
            <div class="width120 inline">
              <el-input type="number" v-model="scoreMax" placeholder="" class="input"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">自评额度:</p>
            <div class="width120 inline">
              <el-input type="number" v-model="quotaMin" placeholder="" class="input"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">至</p>
            <div class="width120 inline">
              <el-input type="number" v-model="quotaMax" placeholder="" class="input"></el-input>
            </div>
          </div>

        </div>

        <!--第三行-->
        <div class="searchBox clear" v-if="">
          <div class="element">
            <p class="inline">配偶职业:</p>
            <div class="width120 inline">
              <el-select v-model="spouseOCP" placeholder="">
                <el-option v-for="item in supStates" :key=" item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="element">
            <p class="inline">子女职业:</p>
            <div class="width120 inline">
              <el-select v-model="childOCP" placeholder="">
                <el-option v-for="item in childStates" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <!--------------------表格-->
      <table>
        <thead>
        <tr>
          <th class="width80">自评时间</th>
          <th class="width60">手机号</th>
          <th class="width60">姓名</th>
          <th class="width60">身份证号</th>
          <th class="width60">婚姻状态</th>
          <th class="width70">配偶职业</th>
          <th class="width70">子女职业</th>
          <th class="width50">家庭收支(元)</th>
          <th class="width50">自评分值(分)</th>
          <th class="width50">自评额度(元)</th>
          <th class="width50">状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in getList" :key="item.value" v-show="getList.length > 0">
          <td class="width80">{{item.date | getFullDate}}</td>
          <td class="width60">{{item.mobile}}</td>
          <td class="width60">{{item.name}}</td>
          <td class="width60">{{item.identityNo}}</td>
          <td class="width60">{{item.marriage | getmarryStatus}}</td>
          <td class="width70">{{item.spouseOCP | getsupStatus}}</td>
          <td class="width70">{{item.childOCP | getsupStatus}}</td>
          <td class="width50">{{item.fmSaving}}</td>
          <td class="width50">{{item.score | getInt}}</td>
          <td class="width50">{{item.quota}}</td>
          <td class="width50">{{item.status | getStatus}}</td>
        </tr>
        <tr v-show="getList.length === 0">
          <td class="noData" colspan="12">暂无数据</td>
        </tr>
        </tbody>
      </table>
      <div class="block" style="margin-top:10px" v-show="showPageTag">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>


    </div>

  </div>
</template>
<script>
  //   import { ERR_OK } from '../../../common/js/config'
  import axios from 'axios'
  import {format} from '../../../common/js/times'
  import {zsf, config} from '../../../api/index'
  // import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        maxlengthMobole: 11,
        maxlengthid: 18,
        searchCell: false,
        pageIndex: 1,    //
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
//        pageInfo.page:'',  // 第几页
//       pageInfo.size: ''   // 每页几条
        getList: [],
        total: '',
        showPageTag: false,
        states: [{
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '已自评'
        }, {
          value: '2',
          label: '借款'
        }, {
          value: '3',
          label: '提额'
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
          value: '0',
          label: '无配偶'
        }, {
          value: '3',
          label: '其他'
        }],
        marriageStates: [{
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '未婚'
        }, {
          value: '1',
          label: '已婚'
        }, {
          value: '3',
          label: '再婚'
        }, {
          value: '2',
          label: '离异'
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
          value: '0',
          label: '无配偶'
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
        return parseInt(t)
      },
      getFullDate(t) {
        return format(t)
      },
      getmarryStatus(t) {
        return t === 0 ? '未婚' : t === 1 ? '已经' : t === 2 ? '离异' : t === 3 ? '再婚' : ''
      },
      getsupStatus(t) {
        return t === 0 ? '无配偶' : t === 1 ? '政府部门' : t === 2 ? '事业单位' : t === 3 ? '其他' : ''
      },
      getStatus(t) {
        return t === 1 ? '已自评' : t === 2 ? '借款' : t === 3 ? '提额' : ''
      }
    },
    methods: {
      zsfQuery() {
        let params = {
          name: this.name,
          mobile: this.mobile,
          identityNo: this.identityNo,
          marriage: this.marriage,
          spouseOCP: this.spouseOCP,
          childOCP: this.childOCP,
          stateDate: this.sdate,
          endDate: this.edate,
          status: this.state,
          scoreMin: this.scoreMin,
          scoreMax: this.scoreMax,
          quotaMin: this.quotaMin,
          quotaMax: this.quotaMax,
          savingMin: this.savingMin,
          savingMax: this.savingMax,
          pageInfo: {size: this.pageSize, page: this.pageIndex}
        }
        axios.post(zsf + '/selfeval/query', params, config).then(res => {
          if (res.data.code === 1000) {
            this.getList = res.data.data.records
            this.total = res.data.data.total
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
        this.zsfQuery()
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

