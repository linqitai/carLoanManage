<template>
  <div class="experience">
    <div class="breadcrumbWrapper" ref="breadcrumbWrapper">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <img class="hoemIcon" src="../../../common/images/homeIconGray.png" alt="">
          <span class="text">当前位置</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="text">臻收银管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="text">代理商管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="mainColor">详情</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <el-form ref="form" class="formClass" :model="form" label-width="100px">
          <el-form-item label="代理人">{{form.agentName}}</el-form-item>
          <el-form-item label="添加人">{{form.creater ? form.creater : '--'}}</el-form-item>
          <el-form-item label="性别">{{form.sex === 1 ? "男":"女"}}</el-form-item>
          <el-form-item label="身份证号">{{form.idCardNo}}</el-form-item>
          <el-form-item label="手机号">{{form.mobilePhone}}</el-form-item>
          <el-form-item label="所在地">
            {{form.detailAdress}}
          </el-form-item>
          <el-form-item label="分润率">
            {{form.shearRate * 100 + "%"}}
          </el-form-item>
          <el-form-item label="服务码">{{form.code}}</el-form-item>
          <el-form-item label="状态">{{form.isUsing === 1 ? '正常使用':'禁用中'}}</el-form-item>
          <el-form-item label="加入时间">{{form.joinTime}}</el-form-item>
          <el-form-item label="账户类型">
            {{form.accountType === 1 ? '对私':''}}
          </el-form-item>
          <el-form-item label="开户人">
            {{form.developPerson}}
          </el-form-item>
          <el-form-item label="开户行">
            {{form.bank}}
          </el-form-item>
          <el-form-item label="银行卡号">
            {{form.bankCard}}
          </el-form-item>
          <el-form-item label="拓展人">{{form.developPerson}}</el-form-item>
          <!-- <el-form-item label="拓展人">{{form.developPerson + '/' + form.developPersonPhone}}</el-form-item> -->

          <el-form-item class="isEdit">
            <el-button type="primary" @click="edit">编辑</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="bottomTable" v-if="false">
        <h2>业务员</h2>
        <div class="tableClass">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { experienceRoleList, tableData } from 'common/js/config'
import { viewAgents } from "@/api/index"
import { getDateTime } from "common/js/times"
export default {
  data() {
    return {
      form: {
        name: null,
        region: []
      },
      imageUrl: null,
      tableData: tableData
    }
  },
  filters: {

  },
  mounted: function() {
    let agentid = parseInt(this.$route.query.agentid);
    if (agentid) {
      let params = {
        agentid: agentid
      }
      viewAgents(params).then(res => {
        if (res.code === 200) {
          this.form = res.result;
          this.form.joinTime = getDateTime(res.result.created);
          this.form.detailAdress = res.result.provinceName + res.result.cityName + res.result.areaName + res.result.address
        }
      })
    }
  },
  methods: {
    edit: function() {
      let agentid = parseInt(this.$route.query.agentid);
      this.$router.push('agentAdd?agentid=' + agentid);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/common.scss';
.storeManage {
  position: relative;
  width: 100%;
  height: 100%;
}

.searchCondition {
  width: 100%;
  padding-top: 10px;
}

.el-form-item {
  margin-bottom: 0px;
}

.created {
  margin: 50px 0 100px 150px;
}

.isEdit {
  position: absolute;
  top: 10px;
  right: 110px;
}

.bottomTable {
  border-top: 1px solid #efefef;
  padding-top: 10px;
}

.bottomTable h2 {
  font-size: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #efefef;
  padding-left: 20px;
  color: #646464;
}

.bottomTable .el-table {
  margin-top: 20px;
}

.home .contentWrapper .content .allWrapper {
  padding: 0;
}

.searchCondition {
  padding: 10px 20px 10px 20px;
}

.tableClass {
  padding: 0 20px 350px 20px;
}
</style>
