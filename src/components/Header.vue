<template>
  <div class="header">
    <div class="mr20 right">
      <img class="logoIcon" src="../common/images/logo.png" alt="">
    </div>
    <div class="logoText ml20 left">臻商-后台管理系统V1.0</div>
    <div class="mr20 right">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="headerUserInfo">
          <!-- <img class="userIcon left" src="../common/images/userIcon.png" alt="">
              <div class="ml5 right">{{username}}</div> -->
          <!-- <i class="fa fa-user-circle-o left" aria-hidden="true"></i> -->
          <!-- <div class="userInfo">{{username}}</div> -->
          <div class="userInfo">admin</div>
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
      username: 'admin'
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
  height: 42px;
  line-height: 42px;
  font-size: 22px;
  color: #ffffff;
  background: $mainColor;
  .logoIcon {
    width: 24px;
    height: 24px;
  }
  .logoText {
    font-size: 15px;
    line-height: 48px;
    padding-left: 2px;
  }
  .headerUserInfo {
    color: #ffffff;
    cursor: pointer;
    height: 42px;
    .userInfo {
      background: url('../common/images/userIcon.png') no-repeat 0 11px;
      background-size: 16px 16px;
      padding-left: 22px;
      font-weight: 100;
    }
  }
  .userIcon {
    height: 42px;
    line-height: 42px;
    width: 18px;
    height: 18px;
  }
}
</style>
