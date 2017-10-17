<template>
  <div class="header">
    <div class="logoText left">臻商-后台管理系统V1.0</div>

    <div class="mr20 right">
      <img src="../common/images/logo.png" alt="">
    </div>
    <div class="user-info mr20 right">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link colorWhite pointer">
          <i class="fa fa-user-circle-o" aria-hidden="true"></i>
          <i class="ml5">用户名</i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { userLoginOut } from '../api/index'
export default {
  data() {
    return {
      role: '',
      name: sessionStorage.getItem('adminerName')
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'loginout') {
        userLoginOut().then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$router.push('/login')
          }
        })
      } else if (command === 'personInfo') {
        this.$router.push('/personInfo')
      }
    }
  },
  created() {
    this.role = sessionStorage.getItem('role')
    if (this.role === '1') {
      this.role = '管理员'
      console.log('管理员')
    } else if (this.role === '0') {
      this.role = '超级管理员'
    }
    console.log('role:')
    console.log(sessionStorage.getItem('role'))
  }
}
</script>
<style lang="scss" scoped>
@import '../common/scss/common.scss';
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  font-size: 22px;
  line-height: 50px;
  color: #ffffff;
  background: $mainColor;
  .logoText {
    font-size: 18px;
    padding-left: 20px;
  }
}
</style>
