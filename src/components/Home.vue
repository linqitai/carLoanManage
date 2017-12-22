<template>
  <div class="home">
    <v-head></v-head>
    <div class="contentWrapper">
      <v-sidebar v-if="isShowSidebar"></v-sidebar>
      <div class="content" :class="[isShowSidebar?'contentLeft':'contentLeft0']" ref="content">
        <div class="leftBtn" :class="[isShowSidebar?'imageArrowLeft':'imageArrowRight']" @click="clickLeftBtn"></div>
        <transition name="move">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './MySidebar2.0.vue'
export default {
  data() {
    return {
      isShowSidebar: true
    }
  },
  methods: {
    clickLeftBtn() {
      // console.log('you click me')
      this.isShowSidebar = !this.isShowSidebar
    },
    changeActiveIndex(index) {
      console.log('index:' + index)
      this.activeIndex = index
      console.log(this.activeIndex)
    }
  },
  components: {
    vHead, vSidebar
  }
}
</script>
<style lang="scss">
@import '../common/scss/common.scss';
@import '../common/scss/mixin.scss';
.home {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  font-size: 13px;
  .contentWrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .contentLeft {
      left: $sidebarWidth;
    }
    .contentLeft0 {
      left: 0;
    }
    .content {
      background-color: #ffffff;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      box-sizing: border-box;
      .leftBtn {
        position: absolute;
        left: -20px;
        top: 49%;
        width: 32px;
        height: 50px;
        border-radius: 10px;
        background-color: #ffffff;
        background-repeat: no-repeat;
        background-position: 19px 19px;
        z-index: 1;
        &.imageArrowLeft {
          background-image: url('../common/images/leftArrow.png');
          &:hover {
            background-color: #00917e;
            background-image: url('../common/images/leftArrowHover.png');
          }
        }
        &.imageArrowRight {
          background-image: url('../common/images/rightArrow.png');
          &:hover {
            background-color: #00917e;
            background-image: url('../common/images/rightArrowHover.png');
          }
        }
      }
      .breadcrumbWrapper {
        display: block;
        width: 100%; // min-width: $content-min-width;
        background: #ffffff;
        padding: 0px 20px;
        border-bottom: 1px solid #efefef;
        .el-breadcrumb {
          vertical-align: middle;
          align-items: center;
          height: $breadcrumbHeight;
          line-height: $breadcrumbHeight;
        }
        .hoemIcon {
          height: 12px;
        }
        .el-breadcrumb__item__inner {
          color: #00917e;
        }
        .text {
          color: #646464;
          &:hover {
            color: #646464;
          }
        }
      }
      .allWrapper {
        padding: 0px 20px 0px 20px;
        .searchCondition {
          width: 100%;
          min-width: $content-min-width;
          .searchBox {
            overflow: hidden;
            margin-top: 10px;
            margin-bottom: 10px;
            .searchBtn {
              background-color: $mainColor !important;
              color: #ffffff !important;
              &:hover {
                color: #ffffff !important;
                background-color: $colorBtnHover !important;
              }
              &:active {
                color: #ffffff !important;
                background-color: $menuHoverColor !important;
              }
            }
            .moreIcon {
              margin-top: 10px;
              width: 16px;
            }
          }
          .element {
            float: left;
            margin-right: 15px;
            .moreIcon {
              @include extend_click();
            }
            p {
              margin-bottom: 10px;
              margin-top: 10px;
            }
            &:last-child {
              margin-right: 0px;
            }
            .iconTransform {
              transform: rotate(180deg);
              -moz-transform: rotate(180deg);
              -webkit-transform: rotate(180deg);
              -o-transform: rotate(180deg);
              -ms-transform: rotate(180deg);
            }
          }
        } // 表格样式
        .tableList {
          border: 1px solid #e1e6ef;
          color: $tableTextColor;
          font-family: '微软雅黑'; // margin-top: 5px;
          thead {
            color: #ffffff;
            tr th {
              padding: 12px 8px;
              text-align: center;
              &:nth-of-type(2) {
                width: 100px;
              }
            }
          }
          tbody {
            background-color: #ffffff;
            tr {
              border-top: 1px solid $tableLineColor;
            }
            tr:hover {
              background-color: #f1f2f7;
            }
            tr td {
              padding: 4px 8px;
              text-align: center;
              line-height: 16px;
            }
          }
          .noData {
            font-size: 16px;
            padding: 30px;
          }
        }
        .tableBottom {
          margin-top: 10px;
          .pagination {
            float: left;
          }
          .tableSwitch {
            float: right;
          }
        }
        .tableWrapper-excel{
          float: right;
          font-size: 15px;
          margin-bottom: 10px;
          .tableWrapper-excel-pad{
             padding-right: 20px
           }
          .tableWrapper-excel-border{
            display: inline-block;
            width: 120px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            border: 1px solid black;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>
