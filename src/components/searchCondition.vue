<template>
  <el-row class="searchCondition" id="searchCondition">
    <el-col :span="20">
      <slot></slot>
    </el-col>
    <el-col :span="4">
      <div style="float:right">
        <div class="element">
          <el-button size="medium" class="searchBtn" @click="searchData">查询</el-button>
        </div>
        <div class="element" @click="moreBtn" v-if="isShowMoreBtn">
          <img class="moreIcon" src="../common/images/arrow_down.png" v-if="!isTwoLiine">
          <img class="moreIcon iconTransform" src="../common/images/arrow_down.png" v-if="isTwoLiine">
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      isShowMoreBtn: true,
      isTwoLiine: false
    }
  },
  created() {
    setTimeout(() => {
      let height = document.getElementById('searchCondition').offsetHeight
      console.log('height:' + height)
      if (height < 50) {
        this.isShowMoreBtn = false
      } else {
        this.isShowMoreBtn = true
        document.getElementById('searchCondition').style.height = '48px'
        this.isTwoLiine = false
      }
      document.getElementById('searchCondition').style.overflow = 'hidden'
      let height2 = document.getElementById('searchCondition').offsetHeight
      console.log('height2:' + height2)
    }, 20)
  },
  methods: {
    searchData() {
      this.$emit('clickSearchData')
    },
    moreBtn() {
      this.isTwoLiine = !this.isTwoLiine
      if (this.isTwoLiine) {
        document.getElementById('searchCondition').style.height = 'auto'
      } else {
        document.getElementById('searchCondition').style.height = '48px'
      }
      let height = document.getElementById('searchCondition').style.height
      console.log('height:' + height)
    }
  }
}
</script>