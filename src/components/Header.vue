<template>
  <div class="header">
    <div class="mr20 right">
      <img class="logoIcon" src="../common/images/logo.png" alt="">
    </div>
    <div class="logoText ml20 left" @click="toFirstPage">臻商后台管理系统V1.0</div>
    <div class="mr40 right">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="headerUserInfo">
          <div class="userInfo left">{{username}}</div>
          <div class="ml10 left">{{role}}</div>
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
import { saveUserId } from 'common/js/cache'
export default {
  data() {
    return {
      role: '',
      username: 'admin'
    }
  },
  methods: {
    toFirstPage() {
      this.$router.push('./firstPage')
    },
    getUserInfo() {
      userInfo().then(res => {
        // console.log(res)
        if (res.code === 1002) {
          this.$router.push('/login')
        } else if (res.code === 0) {
          this.username = res.obj.username
          this.role = res.obj.roleName
          saveUserId(res.obj.userId)
          // console.log('role:' + this.role)
        }
      })
    },
    handleCommand(command) {
      if (command === 'loginout') {
        userLoginOut().then(res => {
          // console.log(res)
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
@import '../common/scss/mixin.scss';
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 42px;
  line-height: 42px;
  font-size: 22px;
  color: #ffffff;
  background: $mainColor;
  width: 100%;
  @include border_bottom($borderLineColor);
  .logoIcon {
    width: 24px;
    height: 24px;
  }
  .logoText {
    font-size: 14px;
    font-weight: 700;
    padding-left: 10px;
    cursor: pointer;
  }
  .headerUserInfo {
    color: #ffffff;
    cursor: pointer;
    height: 42px;
    overflow: hidden;
    .userInfo {
      background: url('../common/images/user.png') no-repeat 0 10px;
      background-size: 18px 18px;
      padding-left: 22px;
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
