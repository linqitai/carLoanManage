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
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="拓展人">
            <el-input class="width200" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="代理人">
            <el-input class="width200" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select class="width130" v-model="form.region" placeholder="请选择活动区域">
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
            <el-select class="width130" v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select class="width130" v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select class="width130" v-model="form.region" placeholder="请选择活动区域">
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
          <el-form-item label="身份证正面">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="身份证反面">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button class="created" type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button class="created" type="primary" @click="onSubmit">保存</el-button>
          </el-form-item> -->
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    border-radius: 5px;
    border: 1px dashed #8c939d;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
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
