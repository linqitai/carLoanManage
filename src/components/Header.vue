<template>
  <div class="header">
    <div class="logo">车抵贷后台管理系统V1.0</div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="../assets/user.png" class="user-icon">
          <span style="margin-left:8px;margin-right:10px">{{role}} {{name}}</span>
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personInfo">个人信息</el-dropdown-item>
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      role: '',
      name: sessionStorage.getItem('adminerName')
    }
  },
  // computed: {
  //   username() {
  //     let usernames = localStorage.getItem('ms_username')
  //     return usernames ? usernames : this.name
  //   }
  // },
  methods: {
    handleCommand(command) {
      if (command === 'loginout') {
        localStorage.removeItem('ms_username')
        this.$router.push('/login')
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
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  color: #fff;
  background: #1f2d3d;
}

.header .logo {
  float: left;
  width: 250px;
  text-align: center;
  font-size: 16px;
}

.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
  .user-icon {
    vertical-align: middle;
  }
}

.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
