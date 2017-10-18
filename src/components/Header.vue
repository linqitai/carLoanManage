<template>
  <div class="header">
    <div class="logoText left">臻商-后台管理系统V1.0</div>

    <div class="mr20 right">
      <img src="../common/images/logo.png" alt="">
    </div>
    <div class="mr20 right">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link colorWhite pointer">
          <img class="userIcon" src="../common/images/user.png" alt="">
          <i class="ml5">{{username}}</i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { userLoginOut, userInfo } from '../api/index'
export default {
  data() {
    return {
      role: '',
      username: ''
    }
  },
  methods: {
    getUserInfo() {
      userInfo().then(res => {
        console.log(res)
        if (res.code === 1002) {
          this.$router.push('/login')
        } else if (res.code === 0) {
          this.username = res.obj.username
          console.log('username:' + this.username)
        }
      })
    },
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
    this.getUserInfo()
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
  border-bottom: 1px solid #016458;
  .logoText {
    font-size: 18px;
    padding-left: 20px;
  }
  .userIcon{
    vertical-align: middle;
    height: 50px;
    line-height: 50px;
    width: 16px;
    height: 16px;
  }
}
</style>
