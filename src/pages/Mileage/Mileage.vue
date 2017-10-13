<template>
  <div class="mileage">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置</el-breadcrumb-item>
        <el-breadcrumb-item>里程</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="base">
      <div class="searchCondition">
        <div class="element">
          <p>时间</p>
          <div>
            <el-date-picker v-model="timer" type="daterange" placeholder="选择日期范围">
            </el-date-picker>
          </div>
        </div>
        <div class="element">
          <p>状态</p>
          <div class="width120">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="element">
          <p>平台选择</p>
          <div class="width120">
            <el-select v-model="platform" placeholder="请选择">
              <el-option v-for="item in platforms" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="element">
          <p>手机号</p>
          <div class="width140">
            <el-input v-model="mobile" placeholder="请输入手机号码" class="input"></el-input>
          </div>
        </div>
        <div class="element">
          <p>账号</p>
          <div class="width140">
            <el-input v-model="zend" placeholder="请输入账号" class="input"></el-input>
          </div>
        </div>
        <div class="element">
          <p>姓名</p>
          <div class="width120">
            <el-input v-model="name" placeholder="请输入姓名" class="input"></el-input>
          </div>
        </div>
        <div class="element">
          <p>身份证号</p>
          <div class="width180">
            <el-input placeholder="请输入身份证号" class="input" v-model="carNum"></el-input>
          </div>
        </div>
        <div class="element">
          <p>所在城市</p>
          <el-input placeholder="请输入所在城市" class="input" v-model="cityOrProvince"></el-input>
          <!-- <div class="width180">
              <el-cascader :options="provinceCitys" @active-item-change="handleItemChange" :props="props"></el-cascader>
            </div> -->
        </div>
        <div class="element" style="margin-top:22px;margin-left:0px;" @click="search">
          <el-button type="primary">查询</el-button>
        </div>
      </div>
      <!-- <div>
                            <div class="element">
                              <p>业务员姓名</p>
                              <div>
                                <el-input v-model="employeeName" placeholder="请输入内容" class="input"></el-input>
                              </div>
                            </div>
                          </div> -->
      <table>
        <thead>
          <tr>
            <th>时间</th>
            <th>账号</th>
            <th>车型</th>
            <th>上牌时间</th>
            <th>所在城市</th>
            <th>行驶里程</th>
            <th>车辆估价</th>
            <th>姓名</th>
            <th>手机号</th>
            <th>身份证号</th>
            <th>平台选择</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in getList" :key="item.value" v-show="getList.length > 0">
            <td>{{item.updated}}</td>
            <td>{{item.zedAccount}}</td>
            <td>{{item.title}}</td>
            <td>{{item.regDate|getTime}}</td>
            <td>{{item.province}}{{item.city}}</td>
            <td>{{item.mile}}</td>
            <td>{{item.highPrice}}</td>
            <td>{{item.name}}</td>
            <td>{{item.mobile}}</td>
            <td>{{item.carNum}}</td>
            <td>{{item.pushPlatformType|getFormtype}}</td>
            <td>{{item.applyStatus |getStatus}}</td>
          </tr>
          <tr v-show="getList.length === 0">
            <td class="noData" colspan="12">暂无数据...</td>
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
import { cheCredit } from '../../api/index'
// import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      carNum: '',
      name: '',
      cityOrProvince: '',
      zend: '',
      platform: '',
      platforms: [{
        value: '0',
        label: '微贷'
      }],
      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '未审核'
      }, {
        value: '2',
        label: '初审通过'
      }, {
        value: '3',
        label: '初审未通过'
      }, {
        value: '4',
        label: '发送中'
      }, {
        value: '5',
        label: '已发送'
      }, {
        value: '6',
        label: '已放款'
      }, {
        value: '7',
        label: '未放款'
      }, {
        value: '8',
        label: '有违约'
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
    this.getval()
  },
  filters: {
    getTime(t) {
      if (t) {
        return format(t)
      }
    },
    getFormtype(t) {
      return t === 1 ? '微贷网' : ''
    },
    getStatus(t) {
      return t === 1 ? '已评估' : t === 3 ? '已申请' : t === 5 ? '申请成功' : ''
    }
  },
  methods: {
    handleItemChange(val) {
      console.log('active item:', val);
      setTimeout(_ => {
        if (val.indexOf('江苏') > -1 && !this.provinceCitys[0].cities.length) {
          this.provinceCitys[0].cities = [{
            label: '南京'
          }];
        } else if (val.indexOf('浙江') > -1 && !this.provinceCitys[1].cities.length) {
          this.provinceCitys[1].cities = [{
            label: '杭州'
          }, {
            label: '温州'
          }];
          this.provinceCitys[1].cities.push({ label: '宁波' })
        }
      }, 300);
    },
    // 查看
    look() {
      this.$router.push('/look')
    },

    getval() {
      let params = {
        applyStatus: this.value,
        _startTime: this.timer[0] ? Date.parse(this.timer[0]) : '',
        _endTime: this.timer[1] ? Date.parse(this.timer[1]) : '',
        pushPlatformType: this.platform,
        zedAccount: this.zend,
        cityOrProvince: this.cityOrProvince,
        name: this.name,
        carNum: this.carNum,
        mobile: this.mobile,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      cheCredit(params).then(res => {
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
    }
  }
}
</script>

<style lang="scss">
.mileage {
  .base {
    .searchCondition {
      overflow: hidden;
      .element {
        float: left;
        margin-right: 15px;
        p {
          margin-bottom: 10px;
        }
      }
      .btn {}
    }
    table {
      border: 1px solid #e1e6ef;
      width: 93%;
      margin-top: 20px;
      thead {
        background-color: #e1e6ef;
      }
      tbody {
        background-color: #ffffff;
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
    .noData {
      font-size: 16px;
      padding: 30px;
    }
  }
}
</style>

