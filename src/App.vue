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
.el-pager {
  li {
    &.active {
      border-color: $mainColor !important;
      background-color: $mainColor !important;
    }
  }
}
.el-select-dropdown__item{
  padding:2px 10px !important;
  height: 26px !important;
}
.el-select-dropdown__item {
  &.selected {
    background-color: $mainColor !important;
  }
}

.loginWrap {
  .el-form-item {
    margin-bottom: 18px !important;
  }
  .el-input__inner {
    height: 32px !important;
  }
}
</style>
