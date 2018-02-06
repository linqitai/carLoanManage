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
				}
			}
		},
		methods: {
			search: function() {
				zsyAnalyse(this.form).then(
					res => {
						console.log(res)
					}
				)
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
			dimensionSelect: function(val) {
				this.search()
			}
		},
		components: {
			searchCondition
		}
	}
</script>