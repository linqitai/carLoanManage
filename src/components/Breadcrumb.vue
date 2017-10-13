<template>
  <div class="nav">
    <el-breadcrumb separator="/">
      <template v-for="item in items">
        <el-breadcrumb-item :to="item.path" :key="item.title">{{item.title}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array
    }
  }
}
</script>
