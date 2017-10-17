<template>
  <div class="login-wrap">
    <div class="msLogin">
      <div class="msTitle">臻商-后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm" @keyup.enter.native="submitForm('ruleForm')">
        <el-form-item prop="username">
          <el-input type="text" placeholder="用户名" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="">
          <el-input type="text" placeholder="验证码" v-model="ruleForm.inputCode" style="width:220px;"></el-input>
          <img :src="imgUrl" alt="" @click="img">
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')" ref="loginBtn">登录</el-button>
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
              // localStorage.setItem('ms_username', self.ruleForm.username)
              // sessionStorage.setItem('adminerName', res.obj.adminerName)
              // sessionStorage.setItem('account', res.obj.account)
              // sessionStorage.setItem('role', res.obj.role)
              // sessionStorage.setItem('id', res.obj.id)
              // self.$router.push('/stageReview')
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

<style scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  background: #ccc;
}

.msTitle {
  font-size: 28px;
  color: #000000;
  padding-bottom: 18px;
}

.msLogin {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 260px;
  transform: translate(-50%, -50%);
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