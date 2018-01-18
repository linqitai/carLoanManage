<template>
  <div class="QRcode">
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
          <span class="mainColor">收款码管理</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allWrapper">
      <div class="searchCondition">
        <div class="searchBox">
          <div class="element">
            <p class="inline">名称</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="名称查询" class="input" v-model="searchs.codename" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">所属门店</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="所属门店查询" class="input" v-model="searchs.shopname" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element">
            <p class="inline">所属商户</p>
            <div class="width140 inline">
              <el-input size="medium" clearable placeholder="所属商户查询" class="input" v-model="searchs.merchantname" @keyup.enter.native="searchData"></el-input>
            </div>
          </div>
          <div class="element" >
            <el-button size="medium" class="searchBtn" @click="searchData">查询</el-button>
          </div>
        </div>
      </div>
      <div class="tableWrapper">
        <el-table :data="tableData" stripe>
          <el-table-column fixed prop="codename" label="名称"></el-table-column>
          <el-table-column prop="shopid" label="编号"></el-table-column>
          <el-table-column prop="shopname" label="所属门店"></el-table-column>
          <el-table-column prop="merchantname" label="所属商户"></el-table-column>
          <el-table-column prop="created" label="添加时间">
            <template slot-scope="scope">
              {{scope.row.created | time}}
            </template>
          </el-table-column>
          <el-table-column prop="imageurl" fixed="right" label="图片">
            <template slot-scope="scope">
              <el-button @click="imgDetail(scope.$index,tableData)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-table :data="tableData" stripe style="min-width:1060px;max-width:1620px;width: 1150px;"></el-table> -->
        <el-dialog class="qrDialog" prop="showData" :title='showData.codename' :data="tableData" :visible.sync="dialogVisible" width="500" :before-close="handleClose">
          <div class="storeText">
            <span>所属门店:{{showData.shopname}}</span>
          </div>
          <div id="zsycode">
            <div class="code-head">
              <img class="logoIcon" src="../../../common/images/logo.png" alt="">
              <span class="head-title">臻收银</span>
            </div>
            <div class="code-content">
              <div class="pay">扫一扫，向我付钱</div>
              <div class="qrcode">
                <img :src="showData.imageurl" />
              </div>
              <div class="paymode">
                <img class="logoIcon" src="../../../common/images/alipay.png" alt="">
                <img class="logoIcon" src="../../../common/images/wxpay.png" alt="">
              </div>
            </div>
          </div>
          <el-button @click="download" class="down">下载</el-button>
        </el-dialog>
      </div>
      <div class="tableBottom">
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mtypeList, runTYpeList, statusList } from "common/js/config";
import { zsyQRcode } from "@/api/index.js";
import { getDateHM, getDate } from 'common/js/times'
export default {
  data() {
    return {
      // activeShop: '',
      showData: {},
      dialogVisible: false,
      maxLengthMobile: 11,
      maxLengthIdentity: 18,
      isShowMore: false,
      showCheckbox: false,
      searchCell: false,
      showSizeChanger: true,
      pageSizeOption: [10, 15, 20, 25, 30],
      mtypeList: mtypeList,
      runTYpeList: runTYpeList,
      statusList: statusList,
      provinceList: "",
      cityList: "",
      areaList: "",
      total: null,
      tableData: [],
      // shopname: "",
      searchs: {
        codename: "",
        shopname: this.$route.query.shopname,
        merchantname: "",
        pageIndex: 1,
        pageSize: 10
      },
      clickshowimg: null
    };
  },
  filters: {
    openClose(value) {
      return value === 1 ? "禁用" : value === 0 ? "启用" : "---";
    },
    time(value) {
      return getDateHM(value)
    }
  },
  created() {
    // this.imgDetail();
    this.searchData();
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = false;
    },
    toRouter(index) {
      this.$router.push(index);
    },
    download() {
      html2canvas(document.getElementById('zsycode'), {
        useCORS: true
      })
      .then(function(canvas) {
        var imgUri = canvas.toDataURL("image/png")
        var createAndDownloadFile = function(fileName, content) {
            var aTag = document.createElement('a');
            aTag.download = fileName;
            aTag.href = content;
            aTag.click();
        }
        createAndDownloadFile('qrcode.png', imgUri)
      })
    },
    search() {
      // ...
    },
    startTimeChange(val) {
      console.log("change：" + val);
    },
    endTimeChange(val) {
      console.log("change：" + val);
    },
    handleSizeChange(val) {
      this.searchs.pageSize = val;
      this.searchData();
    },
    handleCurrentChange(val) {
      this.searchs.pageIndex = val;
      this.searchData();
    },
    // 查看按钮
    imgDetail(index, rows) {
      this.rowIndex = index;
      this.dialogVisible = true;
      this.showData = rows[index]
      // this.activeShop = rows[index].shopname;
      // this.clickshowimg = rows[index].imageurl;
      // this.shopname = rows[index].shopname;
    },
    searchData() {
      zsyQRcode(this.searchs).then(res => {
        this.tableData = res.result;
        console.log(res, this.tableData);
        this.total = res.count;
      });
    }
  },
  components: {}
};
</script>

<style lang="scss">
@import "~common/scss/common.scss";
.QRcode {
  position: relative;
  width: 100%;
  height: 100%;
  #zsycode {
    margin: 0 auto;
    border: 1px solid #eee;
    border-radius: 20px;
    width: 310px;
    height: 350px;
    .code-head {
      height: 65px;
      font-size: 18px;
      color: #00917e;
      line-height: 50px;
      background-color: #fff;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      .logoIcon {
        vertical-align: middle;
      }
      .head-title {
        vertical-align: -webkit-baseline-middle;
      }
    }
    .code-content {
        background: #00917e;
        height: 285px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
      .pay {
        height: 46px;
        line-height: 46px;
        color: #fff;
        font-size: 20px;
      }
      .qrcode {
        padding: 10px;
        background: #fff;
        width: 160px;
        margin: 0 auto;
        height: 160px;
        img {
          width: 160px;
          height: 160px;
        }
      }
      .paymode {
        img {
          width: 30px;
          height: 30px;
          margin: 10px 15px;
        }
      }
    }
  }
  .down {
    margin-top: 10px;
  }
  .qrDialog {
    .el-dialog__title {
      display: block;
      text-align: center !important;
      font-size: $font-size-ll;
    }
    .el-dialog__body {
      text-align: center;
      padding: 0px 0px 20px 0;
    }
    .storeText {
      padding-bottom: 3px;
      font-size: $font-size-s;
    }
  }
}
</style>