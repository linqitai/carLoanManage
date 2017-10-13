<template>
  <div>
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置</el-breadcrumb-item>
        <el-breadcrumb-item>分期审核</el-breadcrumb-item>
        <el-breadcrumb-item v-if="sureval === 5">审核</el-breadcrumb-item>
        <el-breadcrumb-item v-if="sureval !== 5">详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="base">
      <div style="height:30px;">
        <h2 style="float:left">安保套餐信息</h2>
        <h4 style="float:right;margin-right:30px;" v-if="status !== 5">{{statusAfter |getStatus}}{{failReason|getter}}</h4>
      </div>
      <div class="anbao">
        <div class="null"></div>
        <div class="title">
          <span>套餐金额　　　　</span>
          <span>{{getList.amount/100}}</span>
        </div>
        <div class="title">
          <span>合同编号　　　　</span>
          <span>{{getList.contractNo}}</span>
        </div>
        <div class="title">
          <span>安保期限　　　　</span>
          <span>{{getList.startDate}} 至 {{getList.endDate}}</span>
        </div>
        <div class="title">
          <span>申请时间　　　　</span>
          <span>{{getList.applyTime |getTime}}</span>
        </div>
         <div class="title">
          <span>初审时间　　　　</span>
          <span>{{getList.firstCheckTime |getTime}}</span>
        </div>
        <div class="title" v-show="status == 7">
          <span>复审时间　　　　</span>
          <span>{{getList.secondCheckTime |getTime}}</span>
        </div>
        <div class="title">
          <span>订单号　　　　　</span>
          <span>{{getList.orderNo}}</span>
        </div>
      </div>
      <h2>店铺信息</h2>
      <div class="anbao shop">
        <div class="null"></div>
        <div class="title">
          <span>门头店名　　　　</span>
          <span>{{getList.shopName}}</span>
        </div>
        <!-- <div class="title">
                                                                                    <span>营业执照店名　　　　</span>
                                                                                    <span>{{getList.startDate}}</span>
                                                                                  </div> -->
        <div class="title">
          <span>店铺编号　　　　</span>
          <span>{{getList.shopNo}}</span>
        </div>
        <div class="title">
          <span>店主姓名　　　　</span>
          <span>{{getList.name}}</span>
        </div>
        <div class="title">
          <span>店主手机号码　　</span>
          <span>{{getList.mobile}}</span>
        </div>
        <div class="title">
          <span>店主身份证号　　</span>
          <span>{{getList.idCardNo}}</span>
        </div>
        <div class="title">
          <span>实际经营地址　　</span>
          <span>{{getList.province}}{{getList.city}}{{getList.area}}{{getList.address}}</span>
        </div>
      </div>
      <h2>安保公司信息</h2>
      <div class="anbao company">
        <div class="null"></div>
        <div class="title">
          <span>服务公司　　　　</span>
          <span>{{getList.companyName}}</span>
        </div>
        <div class="title">
          <span>业务员　　　　　</span>
          <span>{{getList.employeeName}}/{{getList.eMobile}}</span>
        </div>
        <div class="title">
          <span>审核员　　　　　</span>
          <span v-if="reviews">{{reviews.employeeName}}/{{reviews.mobile}}</span>
        </div>
      </div>
      <h2>照片信息</h2>
      <div class="anbao pic">
        <div class="null"></div>
        <div class="imgshow">
          <div>门头照</div>
          <img :src="imgUrl6" alt="" style="height:180px;width:180px;">
        </div>
        <div class="imgshow">
          <div>店内照</div>
          <img :src="imgUrl7" alt="" style="height:180px;width:180px;">
        </div>
        <div class="imgshow">
          <div>店主与业务员合影</div>
          <img :src="imgUrl1" alt="" style="height:180px;width:180px;">
        </div>
        <!-- <div class="imgshow">
            <div>安保合同照片</div>
            <img :src="imgUrl2" alt="" style="height:180px;width:180px;">
          </div> -->
        <div class="imgshow">
          <div>营业执照照片</div>
          <img :src="imgUrl3" alt="" style="height:180px;width:180px;">
        </div>
        <div class="imgshow">
          <div>身份证正面</div>
          <img :src="imgUrl4" alt="" style="height:180px;width:180px;">
        </div>
        <div class="imgshow">
          <div>身份证反面</div>
          <img :src="imgUrl5" alt="" style="height:180px;width:180px;">
        </div>
      </div>
      <div class="anbao pic">
        <div class="imgshow" v-for="(item, index) in objList":key="item.key">
          <div>安保合同照片{{index+1}}</div>
          <img :src="item.path" alt="" style="height:180px;width:180px;">
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" size="small" style="text-align: center">
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <br/>
      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea" style="width:220px;margin-top:20px;">
      </el-input>
      <span slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibles">确 定</el-button>
      </span>
    </el-dialog>
    <br/>
    <div style="text-align: center;margin-bottom:20px;" v-show="status === '5'|| status === 5">
      <el-button type="primary" class="btn" @click="review" style="width:200px;">审核</el-button>
    </div>
  </div>
</template>
<script>
import { ERR_OK } from '../../common/js/config'
import { checkViewDetail, getListImg, insure, result, checkResult } from '../../api/index'
import { format } from '../../common/js/times'
export default {
  data() {
    return {
      getList: [],
      imgList: [],
      dialogVisible: false,
      options: [{
        value: '6',
        label: '审核驳回'
      }, {
        value: '7',
        label: '审核通过'
      }],
      value: '6',
      textarea: '',
      imgUrl1: '',
      imgUrl2: '',
      imgUrl3: '',
      imgUrl4: '',
      imgUrl5: '',
      imgUrl6: '',
      imgUrl7: '',
      statusAfter: '',
      sureval: '',
      failReason: '',
      objList: [],
      reviews: {}
    }
  },
  filters: {
    getStatus(t) {
      return t === 5 ? '待审核' : t === 6 ? '审核驳回' : t === 7 ? '审核通过' : ''
    },
    getter(t) {
      if (t) {
        return ` : ${t}`
      }
    },
    getTime(t) {
      if (t) {
        return format(t)
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    this.sureval = parseInt(this.$route.query.status)
    this.status = localStorage.getItem('ms_username')
    console.log(this.status)
    this.getval()
    this.getImg()
    this.result()
    console.log(this.id)
  },
  methods: {
    getval() {
      let params = {
        id: this.id
      }
      checkViewDetail(params).then(res => {
        console.log(res)
        if (res.code === ERR_OK) {
          this.getList = res.list[0]
          this.reviews = res.obj
          console.log(res)
        }
      })
    },
    aaaaa() {
      console.log(localStorage.getItem('ms_username'))
    },
    // 获取结果
    result() {
      let params = {
        applyId: this.id
      }
      checkResult(params).then((res) => {
        if (res.code === ERR_OK) {
          if (res.list.length > 0) {
            this.failReason = res.list[0].failReason
            this.statusAfter = res.list[0].statusAfter
          }
        }
      })
    },
    // 获取图片信息
    getImg() {
      let params = {
        applyId: this.id
      }
      getListImg(params).then(res => {
        if (res.code === ERR_OK) {
          this.imgList = res.list
          this.objList = res.obj.securityPactUrl
          console.log(5555)
          console.log(this.imgList)
          console.log(5555)
          for (let k of this.imgList) {
            if (k.imageType === 1) {
              this.imgUrl1 = k.path
            }
            if (k.imageType === 2) {
              this.imgUrl2 = k.path
            }
            if (k.imageType === 3) {
              this.imgUrl3 = k.path
            }
            if (k.imageType === 4) {
              this.imgUrl4 = k.path
            }
            if (k.imageType === 5) {
              this.imgUrl5 = k.path
            }
            if (k.imageType === 6) {
              this.imgUrl6 = k.path
            }
            if (k.imageType === 7) {
              this.imgUrl7 = k.path
            }
          }
        }
      })
    },
    dialogVisibles() {
      if (this.value === '6' && !this.textarea) {
        alert('驳回原因不能为空')
      } else {
        let params = {
          applyId: this.id,
          statusAfter: this.value,
          failReason: this.textarea
        }
        insure(params).then(res => {
          console.log(res)
          if (res.code === ERR_OK) {
            this.dialogVisible = false
            let data = {}
            result(data).then(res => {
              if (res.code === ERR_OK) {
                this.result()
                this.status = this.statusAfter
                localStorage.setItem('ms_username', this.value)
                window.location.reload()
              }
            })
          } else {
            alert(res.error)
          }
        })
      }
    },
    // 审核
    review() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
.base {
  background: rgb(242, 242, 242);
  h2 {
    font-size: 16px;
    margin-bottom: 15px;
  }
  .null {
    height: 5px;
  }
  .title {
    margin: 10px 0 20px 20px;
    height: 10px;
  }
  .anbao {
    background: white;
    height: 220px;
  }
  .company {
    height: 120px;
  }
  .pic {
    height: 240px;
  }
  .imgshow {
    height: 180px;
    width: 180px;
    float: left;
    margin: 15px 20px 0 0;
    div {
      margin-bottom: 15px;
    }
    img {
      height: 180px;
      width: 180px;
    }
  }
  .el-button--primary {
    text-align: center;
  }
  form {
    text-align: center;
  }
}
</style>

