<template>
  <div class="loginWrap">
    <!-- <div class="loginBox"><img src="../../common/images/logo.png"></div> -->
    <div class="msLogin">
      <hr class="loginLine">
      <div class="msTitle">臻商后台管理系统V1.0</div>
      <!-- <img src="../../common/images/logo.png" class="right"> -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ruleForm">
        <el-form-item prop="username">
          <el-input type="text" placeholder="用户名" auto-complete="true" v-model="ruleForm.username" @keyup.enter.native="tonext(1)" :autofocus="autofocus"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" auto-complete="true" v-model="ruleForm.password" @keyup.enter.native="tonext(2)"></el-input>
        </el-form-item>
        <el-form-item prop="inputCode">
          <el-input type="text" placeholder="验证码" v-model="ruleForm.inputCode" style="width:220px;" @keyup.enter.native="submitForm('ruleForm')"></el-input>
          <img class="inputCodeImg" :src="imgUrl" alt="" @click="img">
        </el-form-item>
        <div class="loginBtn">
          <div class="imgBtn" :class="[ishover?'bgimghover':'bgimg']" @click="submitForm('ruleForm')" v-on:mouseover="hover" v-on:mouseleave="hover"></div>
          <!-- <img src="../../common/images/into.png" @click="submitForm('ruleForm')"> -->
        </div>
        <!-- <div class="login-btn">
          <el-button type="default" class="loginBtn" @click="submitForm('ruleForm')" ref="loginBtn">登录</el-button>
        </div> -->
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin, cdd } from '../../api/index'
const dir = cdd
export default {
  data: function() {
    return {
      ishover: false,
      autofocus: true,
      imgUrl: dir + '/checkCode.jpg' + '?' + Math.random(),
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
    var inputs = document.getElementsByTagName('input')
    // inputs[0].focus()
    console.log(inputs[0])
    console.log('focus')
  },
  methods: {
    hover() {
      this.ishover = !this.ishover
    },
    tonext(index) {
      var inputs = document.getElementsByTagName('input')
      inputs[index].focus()
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

<style lang="scss">
@import './Login.scss'
</style>