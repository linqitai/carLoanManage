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
        <el-breadcrumb-item>报表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
		<div class="allWrapper">
			<search-condition @clickSearchData="search">
				<div class="element">
					<p class="inline">时间: </p>
					<div class="inline width120">
						<el-select size="medium" v-model="thisTime" placeholder="请选择" @change="timeChange">
							<el-option v-for="item in timeType" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
        <div v-if="thisTime == 8" class="element">
          <div class="inline">
            <el-date-picker size="medium" class="inline" style="width:150px;" value-format="yyyy-MM-dd 00:00:00" v-model="form.sdate" type="date" placeholder="开始时间">
            </el-date-picker>
            <span class="inline">至</span>
            <el-date-picker size="medium" class="inline" style="width:150px;" value-format="yyyy-MM-dd 23:59:59" v-model="form.edate" type="date" placeholder="结束时间">
            </el-date-picker>
          </div>
        </div>
				<div class="element">
					<p class="inline">维度: </p>
					<div class="inline width120">
						<el-select size="medium" v-model="form.dimension" placeholder="请选择" @change="dimensionSelect">
							<el-option  label="银行" :value="1"></el-option>
							<el-option  label="地区" :value="2"></el-option>
						</el-select>
					</div>
				</div>
      </search-condition>
			<div class="choose-block">系统流量：{{choose}} 次  
				<el-tooltip class="item" effect="dark" content="系统流量：进入“选择银行“界面的次数" placement="right">
					<i class="el-icon-question"></i>
				</el-tooltip>
			</div>
			<el-table v-if="form.dimension == 1" :data="table_blank" stripe>
				<el-table-column prop="actionName" label="类目"></el-table-column>
				<el-table-column prop="operate" label="操作数（次）"></el-table-column>
				<el-table-column prop="operateRate" :formatter="formatterMath('operateRate')" label="操作率（%）" tip="ceshi" :render-header="renderHeader"></el-table-column>
				<el-table-column prop="chooseRate" :formatter="formatterMath('chooseRate')" label="银行选择率（%）" :render-header="renderHeader"></el-table-column>
			</el-table>
			<el-table show-summary :summary-method="getSummaries" max-height="400" v-if="form.dimension == 2" :data="table_area" stripe>
				<el-table-column prop="actionName" label="类目"></el-table-column>
				<el-table-column prop="operate" label="操作数（次）"></el-table-column>
				<!-- <el-table-column prop="operate" label="日期" :render-header="renderHeader"></el-table-column> -->
				<el-table-column prop="operateRate" :formatter="formatterMath('operateRate')" label="操作率（%）" :render-header="renderHeader"></el-table-column>
				<el-table-column prop="chooseRate" :formatter="formatterMath('chooseRate')" label="地区占比（%）" :render-header="renderHeader"></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import searchCondition from 'components/searchCondition.vue'
	import moment from 'moment'
	import { zsyAnalyse } from '@/api/index'
	export default {
		data() {
			return {
				choose: null,
				thisTime: 1,
				timeType: [
					{value: 1, label: "全部"},
					{value: 2, label: "今日"},
					{value: 3, label: "昨日"},
					{value: 4, label: "本周"},
					{value: 5, label: "上周"},
					{value: 6, label: "本月"},
					{value: 7, label: "上月"},
					{value: 8, label: "其它"},
				],
				form: {
					sdate: "",
					edate: "",
					dimension: 1
				},
				sum_area: {},
				table_blank: [],
				table_area: [],
			}
		},
		methods: {
			search: function() {
				zsyAnalyse(this.form).then(
					res => {
						this.choose = res.result.choose
						if (this.form.dimension == 1) {
							this.table_blank = res.result.resultlist
						} else {
							this.sum_area = res.result.resultlist[res.result.resultlist.length - 1]
							res.result.resultlist.splice(res.result.resultlist.length - 1, 1)
							this.table_area = res.result.resultlist
						}
					}
				)
			},
			getSummaries: function(params) {
				return [this.sum_area.actionName,this.sum_area.operate,this.sum_area.operateRate + '%','100%']
			},
			timeChange: function(val) {
				let weekOfday = moment().format('E');//计算今天是这周第几天
				let monthOfday = moment().format('D')//计算今天是这月第几天 
				switch (val) {
					case 1:
						this.form.sdate = "";
						this.form.edate = "";
						break;
					case 2:
						this.form.sdate = moment().format("YYYY-MM-DD 00:00:00")
						this.form.edate = moment().format("YYYY-MM-DD HH:mm:ss")
						break;
					case 3:
						this.form.sdate = moment().subtract(1, 'days').format("YYYY-MM-DD 00:00:00")
						this.form.edate = moment().subtract(1, 'days').format("YYYY-MM-DD 23:59:59")
						break;
					case 4:
						this.form.sdate = moment().subtract(weekOfday - 1, 'days').format("YYYY-MM-DD 00:00:00")
						this.form.edate = moment().format("YYYY-MM-DD HH:mm:ss")
						break;
					case 5:
						this.form.sdate = moment().subtract(weekOfday - 1 + 7, 'days').format("YYYY-MM-DD 00:00:00")
						this.form.edate = moment().subtract(weekOfday - 1 + 1, 'days').format("YYYY-MM-DD 23:59:59")
						break;
					case 6:
						this.form.sdate = moment().format("YYYY-MM-00 00:00:00")
						this.form.edate = moment().format("YYYY-MM-DD HH:mm:ss")
						break;
					case 7:
						this.form.sdate = moment().subtract(1, 'months').format("YYYY-MM-00 00:00:00")
						this.form.edate = moment().subtract(monthOfday, 'days').format("YYYY-MM-DD 23:59:59")
						break;
					case 8:
						this.form.sdate = "";
						this.form.edate = "";
						break;
				}
				this.search()
			},
			renderHeader(createElement, { column }) {
				let content = ''
				switch (column.label) {
					case '操作率（%）':
						content = '操作率=操作数/系统流量'
						break;
					case '银行选择率（%）':
						content = '银行选择率=操作数/合计操作数'
						break;
					case '地区占比（%）':
						content = '地区占比=操作数/合计操作数'
						break;
					default:
						break;
				}
				return (
					<div class="th-pos">
						{column.label}
						<el-tooltip class="item" effect="dark" content={content} placement="bottom-end">
							<i class="el-icon-question"></i>
						</el-tooltip>
					</div>
					
				)
      },
			dimensionSelect: function(val) {
				this.search()
			},
			formatterMath: function(prop) {
				return function(row) {
					return row[prop] + '%'
				}
			}
		},
		created() {
			this.search()
		},
		components: {
			searchCondition
		}
	}
</script>

<style lang="scss" scoped>
.th-pos {
	position: relative;
	top: 2px;
	line-height: 1!important;
}
.choose-block {
	margin: 10px 5px;
	font-size: 15px;
	i {
		color: #333;
	}
}
</style>