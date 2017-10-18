<template>
  <div class="loginWrap">
    <!-- <div class="loginBox"><img src="../../common/images/logo.png"></div> -->
    <div class="msLogin">
      <div class="msTitle left">臻商-后台管理系统</div><img src="../../common/images/logo.png" class="right">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input type="text" placeholder="用户名" v-model="ruleForm.username" @keyup.enter.native="tonext(1)"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="tonext(2)"></el-input>
        </el-form-item>
        <el-form-item prop="inputCode">
          <el-input type="text" placeholder="验证码" v-model="ruleForm.inputCode" style="width:220px;" @keyup.enter.native="submitForm('ruleForm')"></el-input>
          <img :src="imgUrl" alt="" @click="img">
        </el-form-item>
        <div class="login-btn">
          <el-button type="default" class="loginBtn" @click="submitForm('ruleForm')" ref="loginBtn">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin } from '../../api/index'
const dir = '/rz'
export default {
  data: function() {
    return {
      imgUrl: dir + '/checkCode.jpg?a=' + Math.random(),
      ruleForm: {
        username: '',
        password: '',
        inputCode: ''
      },
      myurl: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        inputCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    tonext(index) {
      var inputs = document.getElementsByTagName('input');
      inputs[index].focus();
    },
    submitForm(formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          let params = this.ruleForm
          userLogin(params).then((res) => {
            console.log(params)
            console.log(res)
            if (res.code === 0) {
              this.$router.push('/Mileage')
            } else {
              this.$message(res.error);
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    img() {
      this.imgUrl = dir + '/checkCode.jpg' + '?' + Math.random()
    }
  }
}
</script>

<style scoped lang="scss">
@import './Login.scss'
</style>