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
          <span class="mainColor">新增</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="拓展人">
            <el-input class="width200" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="代理人">
            <el-input class="width200" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input class="width200" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input class="width200" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input class="width200" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="分润率">
            <el-input class="width200" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="账户类型">
            <el-input class="width200" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="开户人">
            <el-input class="width200" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="开户行">
            <el-input class="width200" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号">
            <el-input class="width200" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { experienceRoleList, tableData } from 'common/js/config'
export default {
  data() {
    return {
      form: {
        name: null,
        region: []
      }
    }
  },
  filters: {

  },
  methods: {
    onSubmit: function() {
      console.log(123);
    }
  },
  components: {

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
.searchCondition{
  width: 100%;
  padding-top: 10px;
}
.el-form-item{
    margin-bottom: 10px;
}
</style>
