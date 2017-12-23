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
        <el-form ref="form" class="formClass" :model="form" label-width="100px">
          <el-form-item label="拓展人">123</el-form-item>
          <el-form-item label="代理人">456</el-form-item>
          <el-form-item label="添加人">456</el-form-item>
          <el-form-item label="性别">123</el-form-item>
          <el-form-item label="身份证号">456</el-form-item>
          <el-form-item label="手机号">15515268707</el-form-item>
          <el-form-item label="所在地">
            123456789
          </el-form-item>
          <el-form-item label="分润率">
            123456
          </el-form-item>
          <el-form-item label="服务码">15515268707</el-form-item>
          <el-form-item label="状态">15515268707</el-form-item>
          <el-form-item label="加入时间">15515268707</el-form-item>
          <el-form-item label="账户类型">
            123
          </el-form-item>
          <el-form-item label="开户人">
            123
          </el-form-item>
          <el-form-item label="开户行">
            123456
          </el-form-item>
          <el-form-item label="银行卡号">
            123456
          </el-form-item>
          <el-form-item class="isEdit">
            <el-button type="primary" @click="edit">编辑</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="bottomTable">
        <h2>业务员</h2>
        <div class="tableClass">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </div>
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
      },
      imageUrl: null,
      tableData: tableData
    }
  },
  filters: {

  },
  methods: {
    onSubmit: function() {
      console.log(123);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    edit: function() {
      this.$router.push('agentAdd');
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
  margin-bottom: 0px;
}
.created{
  margin: 50px 0 100px 150px;
}
.isEdit{
  position: absolute;
  top: 10px;
  right: 20px;
}
.bottomTable{
  border-top: 1px solid #efefef;
  padding-top: 10px;
}
.bottomTable h2{
  font-size: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #efefef;
  padding-left: 20px;
  color: #646464;
}
.bottomTable .el-table{
  margin-top: 20px;
}
.home .contentWrapper .content .allWrapper{
  padding: 0;
}
.searchCondition{
  padding: 10px 20px 10px 20px;
}
.tableClass{
  padding: 0 20px 350px 20px;
}
</style>
