<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang="scss">
@import './common/scss/common';
.el-pager{
  li{
    &.active{
      border-color:$mainColor !important;
      background-color: $mainColor !important;
    }
  }
}
</style>
