<template>
  <div class="mileage">
    <div class="breadcrumbWrapper" ref="breadcrumbWrapper">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <img class="hoemIcon" src="../../../common/images/homeIconGray.png" alt="">
          <span class="text">当前位置</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="text">信用卡申请</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>历程</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
        	<div class="element">
            <div class="width210 inline">
              <el-input size="medium" v-model="form.nickName" placeholder="请输入姓名" class="input" >
              	<template slot="prepend">姓名</template>
              </el-input>
            </div>
          </div>
          <div class="element">
            <!--<p class="inline">账号</p>-->
            <div class="width210 inline">
              <el-input size="medium" v-model="form.phone" placeholder="请输入账号" class="input" >
              	<template slot="prepend">账号</template>
              </el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">时间</p>
            <div class="inline">
              <el-date-picker size="medium" class="inline" style="width:150px;" v-model="form.sdate" type="date" placeholder="开始时间" >
              </el-date-picker>
              <span class="inline">至</span>
              <el-date-picker size="medium" class="inline" style="width:150px;" v-model="form.edate" type="date" placeholder="结束时间" >
              </el-date-picker>
            </div>
          </div>
          <div class="element">
              <div class="width210 inline">
                <el-input size="medium" v-model="form.actionName" placeholder="请输入动作" class="input" >
                	<template slot="prepend">动作</template>
                </el-input>
              </div>
            </div>
            <div class="element">
              <p class="inline">所在地区</p>
              <div class="width120 inline">
                <el-select size="medium" v-model="adcodeProv" placeholder="请选择" clearable @change="searchCity">
                  <el-option v-for="item in provinces" :key="item.adcode" :label="item.name" :value="item.adcode" >
                  </el-option>
                </el-select>
              </div>
               <div class="width120 inline" v-if="visible">
                <el-select size="medium" v-model="adcodeCity" placeholder="请选择">
                  <el-option v-for="item in citys" :key="item.adcode" :label="item.name" :value="item.adcode">
                  </el-option>
                </el-select>
              </div>
            </div>
          <div class="element" @click="search">
            <el-button size="medium" class="searchBtn">查询</el-button>
          </div>
        </div>
      </div>
        <el-table :data="tableData" style="width: 100%">
				<el-table-column prop="createDate" :formatter="formatterDate" label="时间" align="left"></el-table-column>
				<el-table-column prop="nickName" :formatter="formatterName" label="姓名" align="left"></el-table-column>
				<el-table-column prop="phone" :formatter="formatterPhone" label="账号" align="center"></el-table-column>
				<el-table-column prop="area" :formatter="formatterArea" label="所在地区" align="center"></el-table-column>
				<el-table-column prop="actionName" label="动作" align="center"></el-table-column>
			</el-table>
      <div class="block" style="margin-top:30px" >
        <el-pagination v-if="total>form.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="form.pageIndex" :page-size="form.pageSize" layout="total,prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { format, getTime, getDateHM, getDate } from '../../../common/js/times'
import { zedCredit } from '@/api/index'
import { zedArea } from '@/api/index'

export default {
  data() {
    return {
      form: {
      	nickName: '',
      	phone: '',
      	actionName: '',
      	sdate: '',
      	edate: '',
      	pageIndex: 1,
      	pageSize: 10,
      },
      total: 0,
      tableData: [],
      provinces: [],
      citys: [],
      adcodeProv: '',
      adcodeCity: '',
      visible: false
    }
  },
  created() {
       this.searchData();
       this.searchPro();
  },
  methods: {
  	//姓名
  	formatterName(row,column) {
  		if (row.nickName) {
  			return row.nickName
  		} else {
  			return "游客"
  		}
  	},
  	//账号
  	formatterPhone(row,column) {
  		if (row.phone) {
  			return row.phone
  		} else {
  			return "/"
  		}
  	},
  	//转换时间
  	formatterDate(row,column) {
  		 if (row.createDate) {
        return getDateHM(row.createDate)
      } else {
        return "--"
      }
  	},
  	//地区
  	formatterArea(row,column) {
  		if (row.province) {
  			return JSON.parse(row.province).name + "-" + JSON.parse(row.city).name
  		} else {
  			return "未获取到地区"
  		}
  	},
    // table数据
    searchData() {
    	if (this.form.sdate && this.form.edate && new Date(this.form.sdate) - new Date(this.form.edate) > 0) {
        this.$message({
          type: 'error',
          message: '开始时间不能大于结束时间!'
        });
        return;
      }
      if (this.form.sdate) {
        this.form.sdate = getDate(this.form.sdate) + ' ' + '00:00:00';
      }
      if (this.form.edate) {
        this.form.edate = getDate(this.form.edate) + ' ' + '23:59:59';
      }
    	let params = {
    		nickName: this.form.nickName,
      	phone: this.form.phone,
      	actionName: this.form.actionName,
      	sdate: this.form.sdate,
      	edate: this.form.edate,
      	province: this.adcodeProv,
      	city: this.adcodeCity,
      	pageIndex: this.form.pageIndex,
      	pageSize: 10
    	}
      zedCredit(params).then(res => {
      	this.tableData = res.result
      	this.total = res.count
      })
    },
    //地区查询
    searchPro() {
    	let dataProv = {
    		level: 'province',
    		adcode: 100000
    	}
    	zedArea(dataProv).then(res => {
    	  this.provinces = res.result;
    	})
    },
    //城市查询
    searchCity() {
    		this.visible = true;
    	  this.adcodeCity = '';
    	  console.log(this.adcodeProv)
    			let dataCity = {
    			level: 'city',
    		  adcode: this.adcodeProv
    		}
    		zedArea(dataCity).then(res => {
    			console.log(res)
    			this.citys = res.result
    		})
    },
    //点击查询按钮
    search() {
    	this.form.pageIndex = 1
    	this.searchData()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(val)
      this.form.pageIndex = val
      this.searchData()
    }
  }
}
</script>

<style lang="scss" scoped>
/*@import './Mileage'*/
</style>

