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
.el-breadcrumb {
  font-size: 13px !important;
}

.el-breadcrumb__inner {
  font-weight: normal !important;
}

.borderTopParent {
  .el-submenu__title {
    .titleText {
      color: #fff;
    }
    i {
      color: #fff;
    }
  }
}

.el-pager {
  li {
    &.active {
      border-color: $mainColor !important;
      background-color: $mainColor !important;
      color: #fff !important;
    }
  }
}

.el-select-dropdown__item {
  padding: 0px 10px !important;
  height: 26px !important;
  line-height: 26px !important;
  &.selected {
    background-color: $mainColor !important;
    color: #fff !important;
  }
  span {
    height: 26px !important;
    line-height: 26px !important;
  }
}
.el-button--mini {
  padding: 4px 10px !important;
}
.loginWrap {
  .el-form-item {
    margin-bottom: 18px !important;
  }
  .el-input__inner {
    height: 32px !important;
  }
}

table .el-button {
  border: none;
}

.el-dialog {
  box-shadow: none!important;
}

.el-dialog__footer {
  text-align: center;
}
</style>
