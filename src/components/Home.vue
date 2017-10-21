<template>
  <div class="home">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content">
      <transition name="move">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './MySidebar.vue'
export default {
  components: {
    vHead, vSidebar
  }
}
</script>
<style lang="scss">
@import '../common/scss/common.scss';
.home {
  font-size: 13px;
  .content {
    background: none repeat scroll 0 0 #f2f2f2;
    position: absolute;
    left: $sidebarWidth;
    right: 0;
    top: 42px;
    bottom: 0;
    width: auto;
    box-sizing: border-box;
    overflow-y: scroll;
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
