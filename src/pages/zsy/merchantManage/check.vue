<template>
  <div class="check">
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
          <span class="text">商户管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="text">审核</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="mainColor">下一步</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="infoBox">
        <div class="title">清算信息</div>
        <div class="contentText">
          <div class="lineText">
            <span class="label">T+0到账</span>
            <span class="value">
              <el-checkbox @change="T0Click1" class="fl" :checked="clearmode" :disabled="!clearmode">支持</el-checkbox>
            </span>
          </div>
          <div class="lineText">
            <span class="label">渠道类型</span>
            <span class="value">
              <span class="width80 left">
                <el-checkbox @change="supportAliClick1" checked class="fl" v-model="supportAli">支付宝</el-checkbox>
              </span>
              <span v-if="isDisabledHB2">
                <span class="t0money">T+1费率&#x3000;<input type="text" placeholder="0.38" v-model="aliratesT1"> %</span>
                <span class="t1money" v-if="isDisabledHB4">T+0费率&#x3000;<input type="text" placeholder="0.38" v-model="aliratesT0"> %</span>
              </span>
              <br/><br/>
              <span class="width80 left">
                <el-checkbox @change="supportWechatClick1" checked class="fl" v-model="supportWechat">微信支付</el-checkbox>
              </span>
              <span v-if="isDisabledHB3">
                <span class="t0money">T+1费率&#x3000;<input type="text" placeholder="0.38" v-model="wechatratesT1"> %</span>
                <span class="t1money" v-if="isDisabledHB4">T+0费率&#x3000;<input type="text" placeholder="0.38" v-model="wechatratesT0"> %</span>
              </span>
            </span>
          </div>
          <div class="lineText">
            <span class="label">交易类型</span>
            <el-checkbox-group v-model="tradetypes">
              <el-checkbox label="01">正扫交易</el-checkbox>
              <el-checkbox label="02">反扫交易</el-checkbox>
              <el-checkbox label="06">退款交易</el-checkbox>
              <el-checkbox label="08">动态订单扫码</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="lineText">
            <span class="label">禁用支付方式</span>
            <el-checkbox-group v-model="deniedpays" @change="handleCheckedCitiesChange2">
              <span class="value">
                <el-checkbox class="fl" label="01" key="1" @change="changeHB">禁用花呗（支付宝）</el-checkbox>
              </span>
              <span class="value">
                <el-checkbox class="fl" label="02" key="2">禁用信用卡（微信支付刷卡支付（被扫）模式无法禁用信用卡支付）</el-checkbox>
              </span>
            </el-checkbox-group>
            <br>
          </div>
          <div class="values" v-if="isDisabledHB">
            <el-checkbox class="fl" label="03" key="3">买家不可使用(花呗分期)</el-checkbox>
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="title">微信公众号</div>
        <div class="contentText">
          <div class="lineText">
            <span class="label">关注的公众号</span>
            <span class="value">
              <el-radio @change="radioClick" v-model="radio" label='2' class="fl">商户自有公众号</el-radio>
            </span>
            <span class="value">
              <el-radio @change="radioClick" v-model="radio" label='1' class="fl">捷信安保公众号</el-radio>
            </span>
          </div>
          <div class="lineText">
            <span class="label">APPID</span>
            <span class="value"><input type="text" v-if="radio == '2'" v-model="appId"></span>
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="title">审核信息</div>
        <div class="contentText">
          <div class="lineText">
            <span class="label">申请时间</span>
            <span class="value">{{applyTime | format}}</span>
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="title">备忘信息</div>
        <div class="contentText">
          <!-- <div class="lineText" v-if="infor.isaudit !== 1 && infor.isaudit !== 4 && infor.isaudit !== 7 && infor.isaudit !== 2 && infor.isaudit !== 6">
                <span class="label">公众号类型</span>
                <span class="value">{{publicNumType | publicNumTypeState}}</span>
              </div> -->
          <el-table stripe>
            <el-table-column fixed prop="created" label="时间" width="180"></el-table-column>
            <el-table-column prop="name" label="负责人" width="120"></el-table-column>
            <el-table-column prop="memoContent" label="备忘信息" width="400" show-overflow-tooltip=""></el-table-column>
          </el-table>
          <el-button size="medium" class="btn mt10" @click="memoDialog">备忘</el-button>
          <el-dialog width="40%" title="备忘" :visible.sync="showMemoType">
            <div class="element">
              <p class="width100 textLeft inline">状态：</p>
              <div class="inline">
                <el-select size="medium" placeholder="请选择" v-model="memoStatus">
                  <el-option v-for="item in memoList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="element">
              <p class="width100 textLeft inline">备忘：</p>
              <div class="inline">
                <textarea class="inline-textarea" v-model="memoContent"></textarea>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button size="medium" type="primary">确定</el-button>
            </div>
          </el-dialog>
          <el-button size="medium" class="btn mt10" @click="sendToBankBtn">提交至网商</el-button>
          <el-dialog title="提示" :visible.sync="sureToBankDialogVisible" width="30%" center>
            <span>确认提交至网商银行？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="sureToBankDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="sendBankYes">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog width="40%" title="短信验证码" :visible.sync="showEditMobile">
            <div class="element">
              <p class="width100 textLeft inline">手机号码</p>
              <div class="inline">{{phone}}</div>
            </div>
            <div class="element">
              <p class="width100 textLeft inline">验证码</p>
              <div class="width140 inline">
                <el-input size="medium" clearable placeholder="请输入验证码" class="input"></el-input>
              </div>
              <el-button size="medium" type="primary" @click="codeClick">获取验证码</el-button>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button size="medium" type="primary" @click="codeYesClick">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { memoList } from 'common/js/config'
import { getDetailInfo } from 'common/js/cache'
import { format } from 'common/js/times'
import { auditMybank, updateLocalClearmode, sendMsgCode, save } from '@/api/index'

export default {
  data() {
    return {
      showMemoType: false,
      sureToBankDialogVisible: false,
      showEditMobile: false,
      radio: '',
      isDisabledHB: true,
      supportAli: false,
      supportWechat: false,
      aliratesT0: 0.38,
      aliratesT1: 0.38,
      wechatratesT0: 0.38,
      wechatratesT1: 0.38,
      appId: '',
      publicNumType: '',
      tradetypeNames: ['上海', '北京', '广州', '深圳'],
      tradetypes: ['01', '02', '06', '08'],
      deniedpays: ['02'],
      supportStage: false,
      supportAliValue: 1,
      supportWechatValue: 1,
      supportStageValue: '02',
      memoList: memoList,
      isDisabledHB2: 1,
      isDisabledHB3: 1,
      isDisabledHB4: true,
      memoStatus: '',
      memoContent: '',
      supportT0: ''
    }
  },
  filters: {
    format(value) {
      return format(value)
    },
    publicNumTypeState(value) {
      return value === 1 ? '合作机构公众号（捷信安保公众号）' : value === 2 ? '商户自有公众号' : value === 3 ? '其他商户公众号' : '---'
    }
  },
  created() {
    let detailInfo = getDetailInfo()
    console.log(`detailInfo:`)
    console.log(detailInfo)
    this.clearmode = detailInfo.clearmode === 2 ? true : false
    this.customerid = detailInfo.customerid;
    this.autidId = detailInfo.autidId;
    this.phone = detailInfo.phone;
    this.supportT0 = detailInfo.supportT0;
    // this.clearmode = this.$route.params.clearmode === 2 ? 1 : 0;
    this.publicNumType = detailInfo.publicNumType
    this.radio = JSON.stringify(detailInfo.publicNumType)
    this.applyTime = detailInfo.applyTime
  },
  methods: {
    changeHB(val) {
      console.log('val:')
      console.log(val)
      if (val) {
        this.isDisabledHB = false
        this.supportStage = false
        this.supportStageValue = '02'
      } else {
        this.isDisabledHB = true
        this.supportStage = true
        this.supportStageValue = '01'
      }
    },
    supportAliClick1(val) {
      this.supportAli = val
      if (this.supportAli === true) {
        this.supportAliValue = 1
        this.isDisabledHB2 = true
        this.aliratesT1 = this.aliratesT1
        this.aliratesT0 = this.aliratesT0
      } else {
        this.supportAliValue = 2
        this.isDisabledHB2 = false
        this.aliratesT1 = ''
        this.aliratesT0 = ''
      }
    },
    supportWechatClick1(val) {
      this.supportWechat = val
      if (this.supportWechat === true) {
        this.supportWechatValue = 1
        this.isDisabledHB3 = true
        this.wechatratesT1 = this.wechatratesT1
        this.wechatratesT0 = this.wechatratesT0
      } else {
        this.supportWechatValue = 2
        this.isDisabledHB3 = false
        this.wechatratesT1 = ''
        this.wechatratesT0 = ''
      }
    },
    supportStageClick(val) {
      if (val) {
        this.supportStageValue = '01'
      } else {
        this.supportStageValue = '02'
      }
    },
    T0Click1(val) {
      console.log(val)
      console.log('val.this.supportT0' + this.supportT0)
      if (val) {
        this.isDisabledHB4 = true
        this.supportT0 = '1'
      } else {
        this.isDisabledHB4 = false
        this.supportT0 = '2'
        this.aliratesT0 = ''
        this.wechatratesT0 = ''
      }
    },
    radioClick(val) {
      console.log(val)
    },
    memoDialog() {
      this.showMemoType = true
    },
    sendToBankBtn() {
      this.sendBank()
      this.sureToBankDialogVisible = true
    },
    sendBankYes() {
      let params = {
        customerid: this.customerid,
        autidId: 1
      }
      auditMybank(params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: `提交网商成功`
          })
          this.sureToBankDialogVisible = false
        } else if (res.code === 400) {
          this.$message({
            type: 'fail',
            message: res.msg
          })
          this.sureToBankDialogVisible = false
        }
      }).catch(res => {
        this.$message({
          type: 'fail',
          message: `提交网商失败`
        })
        this.sureToBankDialogVisible = false
      })
    },
    codeClick() {
      let params = {
        customerid: this.customerid,
        sign: 'aXU5JSUzekV2b2U4UWF0R3UhV3haSmlHNDh4ZkZqNEt0SmtyMjJ0OUl5JU54V08wJUJ0VzliZFFVcFdjcXZZNDFEeHVQT2xIV15pVyVpKldoZG8wSSU2aUhG',
        phone: this.phone,
        bizType: '01'
      }
      sendMsgCode(params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: `发送验证码成功`
          })
        }
      }).catch(res => {
        this.$message({
          type: 'fail',
          message: `发送验证码失败`
        })
      })
    },
    codeYesClick() {
      let params = {
        customerid: this.customerid,
        autidId: 1,
        msgCode: this.msgCode
      }
      auditMybank(params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: `提交网商成功`
          })
          this.showEditMobile = false
        }
      }).catch(res => {
        this.$message({
          type: 'fail',
          message: `提交网商失败`
        })
        this.showEditMobile = false
      })
    },
    handleCheckedCitiesChange(val) {
      console.log(this.tradetypes.toString());
    },
    handleCheckedCitiesChange2(val) {
    },
    sendBank() {
      // if (this.clearmode === 1) {
      //   this.clearmode = '2'
      //   this.supportT0 = '1'
      // } else {
      //   this.clearmode = '1'
      //   this.supportT0 = '2'
      // }
      if (this.radio === undefined) {
        this.$message({
          message: `请选择关注的公众号`
        })
        return
      }
      console.log('this.clearmode:' + this.clearmode)
      console.log('this.radio:' + this.radio)
      let params = {
        customerid: parseInt(this.customerid),
        clearmode: this.clearmode ? 2 : 1, // 1:结算到银行卡  2：结算到余利宝
        supportT0: this.supportT0 ? this.supportT0 : '',
        supportAli: parseInt(this.supportAliValue),
        supportWechat: parseInt(this.supportWechatValue),
        aliratesT0: this.aliratesT0.length !== 0 ? this.aliratesT0 / 100 : '',
        aliratesT1: this.aliratesT1.length !== 0 ? this.aliratesT1 / 100 : '',
        wechatratesT0: this.wechatratesT0.length !== 0 ? this.wechatratesT0 / 100 : '',
        wechatratesT1: this.wechatratesT1.length !== 0 ? this.wechatratesT1 / 100 : '',
        tradetypes: this.tradetypes.toString(),
        deniedpays: this.deniedpays.toString(),
        publicNumType: (this.radio === 'null' || this.radio === null) ? '' : this.radio,
        appId: this.appId,
        supportStage: this.supportStageValue
      }
      console.log('===============')
      console.log('radio:' + this.radio)
      console.log('appId:' + this.appId)
      console.log('params:')
      console.log(params)
      updateLocalClearmode(params).then(res => {
        console.log('res：')
        console.log(res)
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: `您已成功保存信息`
          })
          if (this.clearmode === '1') {
            this.sureToBankDialogVisible = true
            this.showEditMobile = false
          } else {
            this.sureToBankDialogVisible = false
            this.showEditMobile = true
          }
        }
        if (res.code === 400) {
          this.$message({
            message: `请修改已入驻未审核的商户(该用户审核未通过网商)`
          })
          this.sureToBankDialogVisible = false
        }
      }).catch(res => {
        this.$message({
          type: 'fail',
          message: `保存信息失败`
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './check.scss'
</style>
