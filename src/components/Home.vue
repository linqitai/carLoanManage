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
import vSidebar from './MySidebar.vue'
export default {
  data() {
    return {
      isShowSidebar: true
    }
  },
  methods: {
    clickLeftBtn() {
      console.log('you click me')
      this.isShowSidebar = !this.isShowSidebar
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
  font-size: 13px;
  .contentWrapper {
    .sidebar {
      display: block;
      position: absolute;
      width: $sidebarWidth;
      left: 0;
      top: 42px;
      bottom: 0;
      background-color: #14AC98;
      overflow: hidden;
      .menu {
        background-color: #00917e;
        color: $menuColor;
        .borderTopParent {
          .el-submenu__title {
            padding-left: 28px !important;
            height: 42px;
            line-height: 46px;
            @include border_bottom($color: #ffffff);
            color: #ffffff;
            &:hover {
              background-color: #14AC98;
            }
            .titleIcon {
              margin-bottom: 1px;
            }
            .titleText {
              padding-left: 0px;
              font-size: 13px;
            }
            .el-submenu__icon-arrow{
              font-size: 8px;
              margin-top: -2px;
            }
          }
          &:first-child {
            @include border_top($color: #ffffff);
          }
          &:last-child {
            @include border_bottom($color: #ffffff);
          }
        }
        .child {
          font-size: 12px; // padding-left: 50px !important;
          height: 30px;
          line-height: 30px;
          color: $menuColor; // @include border_bottom($color: #ffffff);
          background-color: #00917e;
          &:hover {
            background-color: #00AF98;
          }
          .text {
            width: 120px;
            padding-left: 10px;
            @include border_bottom($color: #ffffff);
          }
        }
      }
    }
    .contentLeft {
      left: $sidebarWidth;
    }
    .contentLeft0 {
      left: 0;
    }
    .content {
      background: none repeat scroll 0 0 #f2f2f2;
      position: absolute;
      right: 0;
      top: 42px;
      bottom: 0;
      width: auto;
      box-sizing: border-box;
      overflow-y: scroll;
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
        z-index: 1001;
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
      .nav {
        background: #ffffff;
        padding: 12px 0 10px 20px;
        .hoemIcon {
          height: 11px;
        }
        .el-breadcrumb__item__inner{
          color: #00917e;
        }
        .text {
          color: #646464;
          &:hover {
            color: #646464;
          }
        }
      }
    }
  }
}
/* transition name='fade' .fade-leave-active in below version 2.1.8 */
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity .1s ease-in-out
// }

// .fade-enter,
// .fade-leave-to {
//   opacity: 0 .3s ease-in-out
// }
</style>
