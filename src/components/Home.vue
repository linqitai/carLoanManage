<template>
  <div class="home">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
export default {
  components: {
    vHead, vSidebar
  }
}
</script>
<style lang="scss">
.home {
  font-size: 13px;
  .content {
    background: none repeat scroll 0 0 #f2f2f2;
    position: absolute;
    left: 200px;
    right: 0;
    top: 70px;
    bottom: 0;
    width: auto;
    box-sizing: border-box;
    overflow-y: scroll;
    .nav {
      background: #ffffff;
      padding: 20px 0 20px 20px;
    }
    .base {
      padding: 20px;
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }
      .tableIncludeBtn {
        width: 100%;
        border: 1px solid #e1e6ef;
        background-color: #ffffff;
        thead {
          background-color: #cccccc;
        }
        tr th {
          padding: 16px 16px;
          text-align: center;
        }
        tr td {
          padding: 8px 16px;
          text-align: center;
        }
        tbody tr:hover {
          background-color: #F1F2F7;
        }
      }
      .baseTable {
        width: 100%;
        border: 1px solid #e1e6ef;
        thead {
          background-color: #e1e6ef;
        }
        tr th {
          padding: 16px 16px;
          text-align: center;
        }
        tr td {
          padding: 14px 16px;
          text-align: center;
        }
        tbody tr:hover {
          background-color: #F1F2F7;
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
.fade-leave-to
{
  opacity: 0
}
</style>
