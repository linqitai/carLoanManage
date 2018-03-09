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
            <el-autocomplete
              v-model="form.developPerson"
              :fetch-suggestions="developPersonClick"
              placeholder="请输入内容"
              @select="handleSelect"
              v-if="!readonly"
            ></el-autocomplete>
            <span v-if="readonly">{{form.developPerson}}</span>
          </el-form-item>
          <el-form-item label=" ">
            <el-input class="width200" v-model.trim="form.agentName" placeholder="请输入代理人" v-if="!readonly"></el-input>
            <span v-if="readonly">{{form.agentName}}</span>
          </el-form-item>
          <el-form-item label="性别">
            <el-select class="width130" v-model.trim="form.sex" placeholder="请选择性别" v-if="!readonly">
              <el-option v-for="item in form.sexSelect" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span v-if="readonly">{{form.sex === 1 ? '男' : '女'}}</span>
          </el-form-item>
          <el-form-item label="身份证号" prop="idCard">
            <el-input class="width200" v-model.trim="form.idCardNo" :maxlength="18" placeholder="请输入身份证号" v-if="!readonly"></el-input>
            <span v-if="readonly">{{form.idCardNo}}</span>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input class="width200" v-model.number="form.mobilePhone" :maxlength="11" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="所在地">
            <el-select class="width130" v-model.trim="form.province" placeholder="请选择省" @change="provinceChange">
              <el-option v-for="item in form.provinceList" :key="item.adcode" :label="item.name" :value="item.adcode">
              </el-option>
            </el-select>
            <el-select class="width130" v-if="form.province" v-model.trim="form.city" placeholder="请选择市" @change="cityChange">
              <el-option v-for="item in form.cityList" :key="item.adcode" :label="item.name" :value="item.adcode">
              </el-option>
            </el-select>
            <el-select class="width130" v-if="form.city" v-model.trim="form.area" placeholder="请选择区" @change="countyChange">
              <el-option v-for="item in form.countyList" :key="item.adcode" :label="item.name" :value="item.adcode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input class="width200" v-model.trim="form.address" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="分润率">
            <el-input class="width120" v-model.trim="form.shearRate" placeholder="请输入分润率"></el-input>&nbsp;&nbsp;%
          </el-form-item>
          <el-form-item label="账户类型">
            <!-- <el-input class="width200" v-model.trim="form.name"></el-input> -->
            对私
          </el-form-item>
          <el-form-item label="开户人">
            <!-- <el-input class="width200" v-model.trim="form.name"></el-input> -->
            未填写
          </el-form-item>
          <el-form-item label="开户行">
            <el-input class="width200" v-model.trim="form.bank" placeholder="请输入开户行"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号">
            <el-input class="width200" v-model.trim="form.bankCard" placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="身份证正面" v-if="editPage">
            <el-upload
              class="avatar-uploader"
              action="//up.qbox.me"
              :data="form.imgForm1"
              :auto-upload="true"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload1">
              <img v-if="form.imageUrl1" :src="form.imageUrl1" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <i v-if="form.imageUrl1" class="el-icon-close closeimg" @click.stop="imgRemove1"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="身份证反面" v-if="editPage">
            <el-upload
              class="avatar-uploader"
              action="//up.qbox.me"
              :data="form.imgForm2"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload2">
              <img v-if="form.imageUrl2" :src="form.imageUrl2" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <i v-if="form.imageUrl2" class="el-icon-close closeimg" @click.stop="imgRemove2"></i>
            </el-upload>
          </el-form-item>
          <el-form-item v-if="editPage">
            <el-button class="created" type="primary" @click="onSubmit">立即创建</el-button>
            <el-button  @click="cancleSubmit">取消</el-button>
          </el-form-item>
          <el-form-item v-if="!editPage">
            <el-button class="created" type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { experienceRoleList, tableData, sexAddList } from 'common/js/config'
import { zsPToken, addAgents, viewAgents, cityList, updateAgents, developPersonList } from '@/api/index'
import { getUserId, getUserMobile } from 'common/js/cache'
export default {
  data() {
    return {
      readonly: false,
      form: {
        developPerson: null,
        agentName: null,
        sexSelect: sexAddList,
        sex: null,
        idCardNo: null,
        mobilePhone: null,
        province: null,
        provinceList: [],
        city: null,
        cityList: [],
        area: null,
        countyList: [],
        address: null,
        shearRate: null,
        bank: null,
        bankCard: null,
        imageUrl1: null,
        imageUrl2: null,
        imgForm1: {
          key: '',
          token: ''
        },
        imgForm2: {
          key: '',
          token: ''
        }
      },
      tableData: tableData,
      editPage: true,
      imageUrl1: null,
      imageUrl2: null,
      developPersonList: [],
      loading: false
    }
  },
  filters: {

  },
  mounted: function() {
    this.selectProvince();
    let agentid = parseInt(this.$route.query.agentid);
    if (agentid) {
      this.editPage = false;
      this.readonly = true;
      let paramsView = {
        agentid: agentid
      }
      viewAgents(paramsView).then(res => {
        if (res.code === 200) {
          this.form.developPerson = res.result.developPerson;
          this.form.agentName = res.result.agentName;
          this.form.mobilePhone = res.result.mobilePhone;
          this.form.idCardNo = res.result.idCardNo;
          this.form.province = res.result.province;
          this.form.city = res.result.city;
          this.form.area = res.result.area;
          this.form.address = res.result.address;
          this.form.shearRate = res.result.shearRate * 100;
          this.form.bank = res.result.bank;
          this.form.bankCard = res.result.bankCard;
          this.form.imageUrl1 = res.result.idCardFrontUrl;
          this.form.imageUrl2 = res.result.idCardBackUrl;
          this.form.sex = res.result.sex;
          let paramsCity = {
            level: "city",
            adcode: res.result.province
          }
          cityList(paramsCity).then(res => {
            this.form.cityList = res.result;
          })
          let paramsArea = {
            level: "district",
            adcode: res.result.city
          }
          cityList(paramsArea).then(res => {
            this.form.countyList = res.result;
          })
        }
      })
    } else {
      console.log(456);
    }
    zsPToken().then(res => {
      if (res.code === 200) {
        this.form.imgForm1.token = res.result;
        this.form.imgForm2.token = res.result;
      }
    })
  },
  methods: {
    handleSelect(item) {
      console.log(item);
      this.form.developPerson = item.realName;
    },
    selectProvince() {
      let params = {
        level: "province",
        adcode: 100000
      };
      cityList(params).then(res => {
        if (res.code === 200) {
          this.form.provinceList = res.result;
        }
      })
    },
    provinceChange(val) {
      this.form.province = val;
      this.form.city = null;
      let params = {
        level: "city",
        adcode: val
      }
      cityList(params).then(res => {
        if (res.code === 200) {
          console.log(res);
          this.form.cityList = res.result;
        }
      })
    },
    cityChange(val) {
      this.form.city = val;
      this.form.area = null;
      let params = {
        level: "district",
        adcode: val
      }
      cityList(params).then(res => {
        if (res.code === 200) {
          console.log(res);
          this.form.countyList = res.result;
        }
      })
    },
    countyChange(val) {
      this.form.area = val;
    },
    onSubmit: function() {
      let agentid = parseInt(this.$route.query.agentid);
      console.log(agentid);
      if (!this.form.developPerson) {
        this.$message({
          type: 'error',
          message: '请输入拓展人姓名！'
        });
        return;
      }
      if (!this.form.agentName) {
        this.$message({
          type: 'error',
          message: '请输入代理商姓名！'
        });
        return;
      }
      if (!this.form.sex) {
        this.$message({
          type: 'error',
          message: '请选择性别！'
        });
        return;
      }
      if (!this.form.idCardNo) {
        this.$message({
          type: 'error',
          message: '请输入身份证号！'
        });
        return;
      }
      var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      if (!reg.test(this.form.idCardNo)) {
        this.$message({
          type: 'error',
          message: '请输入合法身份证号！'
        });
        return;
      }
      if (!this.form.mobilePhone) {
        this.$message({
          type: 'error',
          message: '请输入手机号！'
        });
        return;
      }
      let phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!phoneReg.test(this.form.mobilePhone)) {
        this.$message({
          type: 'error',
          message: '请输入11位合法手机号！'
        });
        return;
      }
      if (!this.form.province) {
        this.$message({
          type: 'error',
          message: '请选择省！'
        });
        return;
      }
      if (!this.form.city) {
        this.$message({
          type: 'error',
          message: '请选择市！'
        });
        return;
      }
      if (!this.form.area) {
        this.$message({
          type: 'error',
          message: '请选择区！'
        });
        return;
      }
      if (!this.form.address) {
        this.$message({
          type: 'error',
          message: '请输入详细地址！'
        });
        return;
      }
      if (!this.form.shearRate) {
        this.$message({
          type: 'error',
          message: '请输入分润率！'
        });
        return;
      }
      var shearRateReg = /^[0-9]*\.?[0-9]+$/;
      if (!shearRateReg.test(this.form.shearRate)) {
        this.$message({
          type: 'error',
          message: '请输入小数！'
        });
        return;
      }
      if (!this.form.bank) {
        this.$message({
          type: 'error',
          message: '请输入开户行！'
        });
        return;
      }
      if (!this.form.bankCard) {
        this.$message({
          type: 'error',
          message: '请输入银行卡号！'
        });
        return;
      }
      var pattern = /^([1-9]{1})(\d{14})$/;
      if (!pattern.test(this.form.bankCard)) {
        this.$message({
          type: 'error',
          message: '请输入合法银行卡号！'
        });
        return;
      }
      if (agentid) {
        let params = {
          creater: getUserId(),
          agentid: agentid,
          developPerson: this.form.developPerson,
          agentName: this.form.agentName,
          sex: this.form.sex,
          idCardNo: this.form.idCardNo,
          mobilePhone: this.form.mobilePhone,
          province: this.form.province,
          city: this.form.city,
          area: this.form.area,
          address: this.form.address,
          shearRate: this.form.shearRate / 100,
          bank: this.form.bank,
          bankCard: this.form.bankCard
        };
        updateAgents(params).then(res => {
          console.log('addParams:')
          console.log(params)
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '保存成功！'
            });
            this.$router.push('agent');
          }
        })
      } else {
        if (!this.form.imageUrl1) {
          this.$message({
            type: 'error',
            message: '请上传身份证正面照片！'
          });
          return;
        }
        if (!this.form.imageUrl2) {
          this.$message({
            type: 'error',
            message: '请上传身份证背面照片！'
          });
          return;
        }
        let params = {
          developPerson: this.form.developPerson,
          agentName: this.form.agentName,
          sex: this.form.sex,
          idCardNo: this.form.idCardNo,
          mobilePhone: this.form.mobilePhone,
          province: this.form.province,
          city: this.form.city,
          area: this.form.area,
          address: this.form.address,
          shearRate: this.form.shearRate / 100,
          bank: this.form.bank,
          bankCard: this.form.bankCard,
          idCardFrontUrl: this.form.imageUrl1,
          idCardBackUrl: this.form.imageUrl2
        };
        addAgents(params).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '创建成功！'
            });
            this.$router.push('agent');
          }
        })
      }
    },
    handleAvatarSuccess1(res, file) {
      this.imageUrl1 = URL.createObjectURL(file.raw);
      console.log(this.form.imgForm1.key);
      this.form.imageUrl1 = 'http://qiniujiexino2opublic.51icare.cn/' + this.form.imgForm1.key;
      console.log(this.form.imageUrl1);
    },
    handleAvatarSuccess2(res, file) {
      this.imageUrl2 = URL.createObjectURL(file.raw);
      console.log(this.form.imgForm2.key);
      this.form.imageUrl2 = 'http://qiniujiexino2opublic.51icare.cn/' + this.form.imgForm2.key;
      console.log(this.form.imageUrl2);
    },
    beforeAvatarUpload1(file) {
      let key = file.name;
      console.log(key);
      this.form.imgForm1.key = new Date().getTime() + 'marktime' + key;
      console.log(this.form.imgForm1);
    },
    beforeAvatarUpload2(file) {
      let key = file.name;
      console.log(key);
      this.form.imgForm2.key = new Date().getTime() + 'marktime' + key;
      console.log(this.form.imgForm2);
    },
    imgRemove1() {
      this.form.imageUrl1 = '';
    },
    imgRemove2() {
      this.form.imageUrl2 = '';
    },
    cancleSubmit() {
      this.$router.push('agent');
    },
    developPersonClick(value, cb) {
      this.form.developPerson = value;
      if (value === '') {
        this.developPersonList = [];
        cb(this.developPersonList);
        return
      }
      let params = {
        realName: value,
        pageSize: 10,
        pageIndex: 1
      }
      developPersonList(params).then(res => {
        if (res.code === 200) {
          this.developPersonList = res.result;
          this.developPersonList.map(v => {
            v.value = v.realName + "/" + v.mobile
          })
          cb(this.developPersonList)
          console.log(this.developPersonList);
        }
      })
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
.avatar-uploader{
  cursor: pointer;
	position: relative;
	overflow: hidden;
	width: 154px;
	height: 154px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
      img{
        display: block;
        width: 152px;
        height: 152px;
        border: 1px dashed #8c939d;
        border-radius: 5px;
      }
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
.avatar-uploader .closeimg {
		position: absolute;
		width: 22px;
		height: 22px;
		line-height: 22px;
		top: 0px;
		right: 0px;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 50%;
		color: #fff;
		font-size: 12px;
	}
</style>
