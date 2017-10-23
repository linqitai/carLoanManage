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
          .titleIcon {
            margin-bottom: 3px;
          }
          .titleText {
            padding-left: 4px;
          }
          .el-submenu__title {
            height: 42px;
            line-height: 42px;
            @include border_bottom($color: #ffffff);
            color: #ffffff;
            &:hover {
              background-color: #14AC98;
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
          height: 12px;
        }
        .text {
          color: $mainColor;
          &:hover {
            color: $mainColor;
          }
        }
      }
    }
  }
}








/* transition name='fade' .fade-leave-active in below version 2.1.8 */

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>
