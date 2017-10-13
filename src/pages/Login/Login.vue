<template>
  <div class="login-wrap">
    <div class="ms-title">后台管理系统</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.account" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item prop="">
          <el-input placeholder="验证码" v-model="ruleForm.checkCode" style="width:220px;" @keyup.native="sure($event)"></el-input>
          <img :src="imgUrl" alt="" @click="img">
        </el-form-item>
        <p style="font-size:12px;line-height:28px;color:#ff4949;
                                margin-top:-25px;height:28px;">{{falval}}</p>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin } from '../../api/index'
import { ERR_OK } from '../../common/js/config'
export default {
  data: function() {
    return {
      imgUrl: '/zyd/common/checkCode.jpg',
      ruleForm: {
        account: '',
        password: '',
        checkCode: ''
      },
      falval: '',
      myurl: '',
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    submitForm(formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          let params = this.ruleForm
          userLogin(params).then((res) => {
            console.log(params)
            console.log(res)
            if (res.code === ERR_OK) {
              // localStorage.setItem('ms_username', self.ruleForm.username)
              sessionStorage.setItem('adminerName', res.obj.adminerName)
              sessionStorage.setItem('account', res.obj.account)
              sessionStorage.setItem('role', res.obj.role)
              sessionStorage.setItem('id', res.obj.id)
              self.$router.push('/stageReview')
            } else {
              this.falval = res.error
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    sure(ev) {
      if (ev.keyCode === 13) {
        this.submitForm('formName')
      }
    },
    img() {
      this.imgUrl = '/zyd/common/checkCode.jpg' + '?' + Math.random()
    }
  }
}
</script>

<style scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  background: #ccc;
}

.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}

img {
  float: right;
  margin-top: 2px;
}
</style>