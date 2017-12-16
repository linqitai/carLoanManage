<template>
  <div class="detail">
    <div class="breadcrumbWrapper" ref="breadcrumbWrapper">
      <el-breadcrumb separator="/">
        <!-- <img class="hoemIcon left mr3" src="../../../common/images/homeIconGray.png" alt=""> -->
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
          <span class="mainColor">详情</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="infoBox">
        <div class="title">店铺信息</div>
        <div class="contentText">
          <div class="lineText">
            <span class="label">商户名称</span>
            <span class="value">银泰商业城</span>
          </div>
          <div class="lineText">
            <span class="label">商户简称</span>
            <span class="value">银泰</span>
            <i v-if="status===statusNormal" class="iconfont icon-bianji-copy ml10 fontSizeM"></i>
          </div>
          <div class="lineText">
            <span class="label">商户类型</span>
            <span class="value">个体工商户</span>
          </div>
          <div class="lineText">
            <span class="label">商户号</span>
            <span class="value">64561545454545ddd</span>
          </div>
          <div class="lineText">
            <span class="label">登录账号</span>
            <span class="value">64561545</span>
          </div>
          <div class="lineText">
            <span class="label">营业执照号</span>
            <span class="value">64561545454545ddd</span>
          </div>
          <div class="lineText">
            <span class="label">客服电话</span>
            <span class="value">0571-88888888</span>
            <i v-if="status===statusNormal" class="iconfont icon-bianji-copy ml10 fontSizeM"></i>
          </div>
          <div class="lineText">
            <span class="label">经营类型</span>
            <span class="value">实体兼网络渠道</span>
            <i v-if="status===statusNormal" class="iconfont icon-bianji-copy ml10 fontSizeM"></i>
          </div>
          <div class="lineText">
            <span class="label">经营类目</span>
            <span class="value">超市便利店</span>
            <i v-if="status===statusNormal" class="iconfont icon-bianji-copy ml10 fontSizeM"></i>
          </div>
          <div class="lineText">
            <span class="label">店铺地址</span>
            <span class="value">浙江省杭州市西湖区郡原公元里13幢5楼</span>
            <i v-if="status===statusNormal" class="iconfont icon-bianji-copy ml10 fontSizeM"></i>
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="title">负责人</div>
        <div class="contentText">
          <div class="lineText">
            <span class="label">姓名</span>
            <span class="value">周润发</span>
          </div>
          <div class="lineText">
            <span class="label">手机号码</span>
            <span class="value">13958776325</span>
            <i v-if="status===statusNormal" class="iconfont icon-bianji-copy ml10 fontSizeM"></i>
          </div>
          <div class="lineText">
            <span class="label">身份证号</span>
            <span class="value">330681199402147845</span>
          </div>
          <img class="preview-img" v-for="(item, index) in list" :src="item.src" :key="item.src" height="100" @click="$preview.open(0, list)" v-show="false">
          <div class="lineText">
            <span class="label">身份证正面</span>
            <span class="value" @click="previewImg(0)">
              <img src="../../../common/images/identity.png" ref="img0">
            </span>
            <i v-if="status===statusNormal" class="iconfont icon-bianji-copy ml10 fontSizeM"></i>
          </div>
          <div class="lineText">
            <span class="label">身份证反面</span>
            <span class="value" @click="previewImg(1)">
              <img src="../../../common/images/identity.png" ref="img1">
            </span>
            <i v-if="status===statusNormal" class="iconfont icon-bianji-copy ml10 fontSizeM"></i>
          </div>
        </div>
      </div>
      <div class="infoBox" id="picInfo">
        <div class="title">图片资料</div>
        <div class="contentText">
          <img class="preview-img" v-for="(item, index) in listPicData" :src="item.src" :key="item.src" height="100" @click="$preview.open(0, listPicData)" v-show="false">
          <div class="lineText">
            <span class="label">营业执照</span>
            <span class="value" @click="previewImgPicData(0)">
              <img src="../../../common/images/identity.png" ref="imgPicData0">
            </span>
            <i v-if="status===statusNormal" class="iconfont icon-bianji-copy ml10 fontSizeM"></i>
          </div>
          <div class="lineText">
            <span class="label">门头照</span>
            <span class="value" @click="previewImgPicData(1)">
              <img src="../../../common/images/identity.png" ref="imgPicData1">
            </span>
            <i v-if="status===statusNormal" class="iconfont icon-bianji-copy ml10 fontSizeM"></i>
          </div>
          <div class="lineText">
            <span class="label">开户许可证</span>
            <span class="value" @click="previewImgPicData(2)">
              <img src="../../../common/images/identity.png" ref="imgPicData2">
            </span>
            <i v-if="status===statusNormal" class="iconfont icon-bianji-copy ml10 fontSizeM"></i>
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="title">
          提现银行卡
          <i v-if="status===statusNormal" class="iconfont icon-bianji-copy ml10 fontSizeM colorGray" @click="editBankCard"></i>
        </div>
        <el-dialog width="40%" title="编辑手机号码" :visible.sync="showEditBankEditInner">
          <div class="element">
            <p class="width100 textLeft inline">原手机号</p>
            <div class="inline">13355718375</div>
          </div>
          <div class="element">
            <p class="width100 textLeft inline">验证码</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="请输入验证码" class="input"></el-input>
            </div>
            <el-button size="medium" type="primary">获取验证码</el-button>
          </div>
          <div class="element">
            <p class="width100 textLeft inline">新手机号</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="请输入新手机号" class="input"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="width100 textLeft inline">验证码</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="请输入验证码" class="input"></el-input>
            </div>
            <el-button size="medium" type="primary">获取验证码</el-button>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button size="medium" type="primary" @click="showEditBankEdit = false">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑提现银行卡" :visible.sync="showEditBankEdit" width="40%">
          <div class="dialogContent">
            <div class="element">
              <p class="width100 textLeft inline">经营类型</p>
              <div class="inline">
                实体兼网络渠道
              </div>
            </div>
            <div class="element">
              <p class="width100 textLeft inline">开户人</p>
              <div class="inline">
                周润发
              </div>
            </div>
            <div class="element">
              <p class="width100 textLeft inline">开户行</p>
              <div class="inline">
                <!-- <el-input size="medium" clearable placeholder="请选择银行" class="input"></el-input> -->
                <el-select class="widt200" size="medium" placeholder="请选择" v-model="bank">
                  <el-option v-for="(item, index) in banksList" :key="item.index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="element">
              <p class="width100 textLeft inline">银行卡号</p>
              <div class="width200 inline">
                <el-input size="medium" clearable placeholder="请输入银行卡号" class="input"></el-input>
              </div>
            </div>
            <div class="element">
              <p class="width100 textLeft inline">银行预留手机号</p>
              <div class="inline">
                13958776325
              </div>
              <i v-if="status===statusNormal" class="iconfont icon-bianji-copy ml10 fontSizeM" @click="showEditBankEditInner=true"></i>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button size="medium" type="primary" @click="showEditBankEdit = false">确 定</el-button>
          </div>
        </el-dialog>
        <div class="contentText">
          <div class="lineText">
            <span class="label">结算方式</span>
            <span class="value">结算到余利宝</span>
          </div>
          <div class="lineText">
            <span class="label">账户类型</span>
            <span class="value">对私</span>
          </div>
          <div class="lineText">
            <span class="label">账户名称</span>
            <span class="value">臻商大数据科技有限公司</span>
          </div>
          <div class="lineText">
            <span class="label">开户人</span>
            <span class="value">周润发</span>
          </div>
          <div class="lineText">
            <span class="label">对公账号</span>
            <span class="value">6222555588889999</span>
          </div>
          <div class="lineText">
            <span class="label">开户行</span>
            <span class="value">中国工商银行</span>
          </div>
          <div class="lineText">
            <span class="label">银行卡号</span>
            <span class="value">6222555588889999</span>
          </div>
          <div class="lineText">
            <span class="label">银行预留手机</span>
            <span class="value">15984784587</span>
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="title">清算信息</div>
        <div class="contentText">
          <div class="lineText">
            <span class="label">结算方式</span>
            <span class="value">结算到余利宝</span>
          </div>
          <div class="lineText">
            <span class="label">T+0到账</span>
            <span class="value">支持</span>
          </div>
          <div class="lineText">
            <span class="label">渠道类型</span>
            <span class="value">
              <span class="width80 left">支付宝</span>T+0费率：0.38%
              <br/><br/>
              <span class="width80 left">微信支付</span>T+0费率：0.38%
            </span>
          </div>
          <div class="lineText">
            <span class="label">交易类型</span>
            <span class="value">正扫交易、反扫交易、退款交易</span>
          </div>
          <div class="lineText">
            <span class="label">禁用支付方式</span>
            <span class="value">信用卡（除微信支付刷卡支付（被扫）模式）</span>
          </div>
          <div class="lineText">
            <span class="label">花呗分期</span>
            <span class="value">买家可使用</span>
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="title">微信公众号</div>
        <div class="contentText">
          <div class="lineText">
            <span class="label">公众号类型</span>
            <span class="value">其他商户的公众号</span>
          </div>
          <div class="lineText">
            <span class="label">公众号商户号</span>
            <span class="value">dfasd5sd4f54a5sd4f5a4sd</span>
          </div>
          <div class="lineText">
            <span class="label">公众号授权目录</span>
            <span class="value">http://www.zsbigdata.com.cn/</span>
          </div>
          <div class="lineText">
            <span class="label">APPid（用于微信支付）</span>
            <span class="value">wx50f7f56689898ceb</span>
          </div>
          <div class="lineText">
            <span class="label">APPid（用于微信关注）</span>
            <span class="value">wx50f7f56689898ceb</span>
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="title">签署的协议</div>
        <div class="contentText">
          <div class="lineText">
            <a>《臻收银商户注册服务协议》、《臻收银服务隐私政策条款》、《移动支付收单服务协议》、《网商银行账户服务协议》、《余利宝服务协议》</a>
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="title">审核信息</div>
        <div class="contentText">
          <div class="lineText">
            <span class="label">申请时间</span>
            <span class="value">2017-11-20 15:15:15</span>
          </div>
          <div class="lineText">
            <span class="label">审核时间</span>
            <span class="value">2017-11-20 15:15:15</span>
          </div>
          <div class="lineText">
            <span class="label">审核人</span>
            <span class="value">某某某</span>
          </div>
        </div>
      </div>
      <div class="infoBox mb20">
        <div class="title">备忘信息</div>
        <div class="contentText mtb10">
          <el-table :data="beiwang" stripe>
            <el-table-column fixed prop="date" label="时间" width="180"></el-table-column>
            <el-table-column prop="name" label="负责人" width="120"></el-table-column>
            <el-table-column prop="word" label="备忘信息" width="400"></el-table-column>
          </el-table>
          <el-button size="medium" class="btn mt10">备忘</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import { mapGetters } from 'vuex'
import { getCurrentRow } from 'common/js/cache'
export default {
  data() {
    return {
      beiwang: [
        {
          date: '2017-01-08 20:18:56',
          name: '周润发',
          word: '这里是备忘信息'
        }, {
          date: '2017-01-08 20:18:56',
          name: '周润发2',
          word: '这里是备忘信息2'
        }, {
          date: '2017-01-08 20:18:56',
          name: '周润发2',
          word: '这里是备忘信息2'
        }],
      list: [{
        src: '',
        w: 600,
        h: 400
      }],
      listPicData: [{
        src: '',
        w: 600,
        h: 400
      }],
      list2: [{
        src: '',
        w: 600,
        h: 400
      }],
      bank: '',
      banksList: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '工商银行'
        }
      ],
      status: 2, // 1：待审核、驳回 2：正常情况
      statusNormal: 2,
      showEditBankEdit: false,
      showEditBankEditInner: false
    }
  },
  filters: {
    openClose(value) {
      return value === 1 ? '启用' : value === 0 ? '禁用' : '---'
    }
  },
  computed: {
    // ...mapGetters([
    //   'getStatus'
    // ])
  },
  created() {
    // ...
    console.log('status:')
    console.log(this.status)
    this.row = getCurrentRow()
    console.log('row：')
    console.log(this.row)
  },
  methods: {
    editBankCard() {
      this.showEditBankEdit = true
    },
    previewImg(index) {
      let count = 2
      let self = this
      let scp = []
      for (let j = 0; j < count; j++) {
        scp.push({
          src: self.$refs['img' + j].getAttribute('src'),
          w: 400,
          h: 300
        })
      }
      this.list = scp
      this.$preview.open(index, this.list)
    },
    previewImgPicData(index) {
      // let count = this.$refs.picInfo.length > 0 ? this.$refs.picInfo.length : 2
      let count = document.getElementById('picInfo').getElementsByClassName('lineText').length
      console.log(count)
      let self = this
      let scp = []
      for (let j = 0; j < count; j++) {
        scp.push({
          src: self.$refs['imgPicData' + j].getAttribute('src'),
          w: 400,
          h: 300
        })
      }
      this.listPicData = scp
      this.$preview.open(index, this.listPicData)
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
@import './detail'
</style>