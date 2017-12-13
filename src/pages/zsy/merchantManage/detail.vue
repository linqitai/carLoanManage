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
            <span class="label">商户类型</span>
            <span class="value">个体工商户</span>
          </div>
          <div class="lineText">
            <span class="label">营业执照号</span>
            <span class="value">64561545454545ddd</span>
          </div>
          <div class="lineText">
            <span class="label">客服电话</span>
            <span class="value">0571-88888888</span>
          </div>
          <div class="lineText">
            <span class="label">经营类型</span>
            <span class="value">实体兼网络渠道</span>
          </div>
          <div class="lineText">
            <span class="label">经营类目</span>
            <span class="value">超市便利店</span>
          </div>
          <div class="lineText">
            <span class="label">店铺地址</span>
            <span class="value">浙江省杭州市西湖区郡原公元里13幢5楼</span>
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
            <span class="label">身份证号</span>
            <span class="value">330681199402147845</span>
          </div>
          <img class="preview-img" v-for="(item, index) in list" :src="item.src" :key="item.src" height="100" @click="$preview.open(0, list)" v-show="false">
          <div class="lineText">
            <span class="label">身份证正面</span>
            <span class="value" @click="previewImg(0)">
              <img src="../../../common/images/identity.png" ref="img0">
            </span>
            <!-- <img class="preview-img" v-for="(item, index) in list1" :src="item.src" :key="item.src" height="100" @click="$preview.open(0, list1)" v-show="false"> -->
          </div>
          <div class="lineText">
            <span class="label">身份证反面</span>
            <span class="value" @click="previewImg(1)">
              <img src="../../../common/images/identity.png" ref="img1">
            </span>
            <!-- <img class="preview-img" v-for="(item, index) in list2" :src="item.src" :key="item.src" height="100" @click="$preview.open(0, list2)" v-show="false"> -->
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="title">图片资料</div>
        <div class="contentText">
          <img class="preview-img" v-for="(item, index) in listPicData" :src="item.src" :key="item.src" height="100" @click="$preview.open(0, listPicData)" v-show="false">
          <div class="lineText">
            <span class="label">营业执照</span>
            <span class="value" @click="previewImgPicData(0)">
              <img src="../../../common/images/identity.png" ref="imgPicData0">
            </span>
          </div>
          <div class="lineText">
            <span class="label">门头照</span>
            <span class="value" @click="previewImgPicData(1)">
              <img src="../../../common/images/identity.png" ref="imgPicData1">
            </span>
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="title">提现银行卡</div>
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
            <span class="label">开户人</span>
            <span class="value">周润发</span>
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
        <div class="title">提现银行卡</div>
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
import { mtypeList, runTYpeList, statusList, tableData } from 'common/js/config'
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
      tableSwitch: 2, // 1：大屏幕，2：小屏幕
      tableSwitch1: false,
      tableSwitch2: true,
      maxLengthMobile: 11,
      maxLengthIdentity: 18,
      dialog: false,
      isShowMore: false,
      showCheckbox: false,
      searchCell: false,
      pageIndex: 1,
      pageSize: 12,
      total: 1,
      showSizeChanger: true,
      pageSizeOption: [10, 15, 20, 25, 30],
      mtypeList: mtypeList,
      runTYpeList: runTYpeList,
      statusList: statusList,
      provinceList: '',
      cityList: '',
      areaList: '',
      searchs: {
        startTime: '',
        endTime: '',
        mName: '',
        mtype: '',
        runTYpe: '',
        fzMan: '',
        mobile: '',
        status: '',
        agent: '',
        address: {
          province: '',
          city: '',
          area: ''
        }
      },
      tableData: tableData
    }
  },
  filters: {
    openClose(value) {
      return value === 1 ? '启用' : value === 0 ? '禁用' : '---'
    }
  },
  methods: {
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
      let count = 2
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
    },
    previewImg2(index, ref) {
      this.list2[index].src = this.$refs[ref].getAttribute('src')
      this.$preview.open(index, this.list2)
    },
    tableSwitchChange(val) {
      console.log(val)
      if (parseInt(val) === 1) {
        this.tableSwitch1 = true;
        this.tableSwitch2 = false;
      } else if (parseInt(val) === 2) {
        this.tableSwitch1 = false;
        this.tableSwitch2 = true;
      }
    },
    moreBtn() {
      console.log('click')
      this.searchCell = !this.searchCell
    },
    open(isopen) {
      this.dialog = true
      console.log(isopen)
      if (isopen === 1) {
        // 这里调用接口
      }
    },
    close() {
      this.dialog = false
    },
    detail(row) {
      console.log(row);
      this.$router.push('/detail')
    },
    search() {
      // ...
    },
    startTimeChange(val) {
      console.log('change：' + val)
    },
    endTimeChange(val) {
      console.log('change：' + val)
    },
    // pageSizeChange(newIndex) {
    //   console.log('page size change event', newIndex)
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
@import './detail'
</style>