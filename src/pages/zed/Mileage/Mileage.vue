<template>
  <div class="nopage">
    此页面尚未开通
  </div>
</template>
<script>
import { format, getTime } from '../../../common/js/times'
import { cheCredit } from '@/api/index'
import searchCondition from 'components/searchCondition.vue'
export default {
  data() {
    return {
      searchCell: false,
      startTime: '',
      endTime: '',
      mobile: '',
      carNum: '',
      name: '',
      action: '',
      drawMoney: '',
      giveMoney: '',
      cityOrProvince: '',
      info: '',
      maxPrice: '',
      minPrice: '',
      platform: '',
      drawMoneys: [{
        value: '',
        label: '全部'
      }, {
        value: '0-5000',
        label: '5000以下'
      }, {
        value: '5000-10000',
        label: '5000-10000'
      }, {
        value: '10000-20000',
        label: '10000-20000'
      }, {
        value: '20000-90000000',
        label: '20000以上'
      }],
      giveMoneys: [{
        value: '',
        label: '全部'
      }, {
        value: '0-5000',
        label: '5000以下'
      }, {
        value: '5000-10000',
        label: '5000-10000'
      }, {
        value: '10000-20000',
        label: '10000-20000'
      }, {
        value: '20000-90000000',
        label: '20000以上'
      }],
      actions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '申请'
      }, {
        value: '2',
        label: '提交申请'
      }, {
        value: '3',
        label: '提款'
      }, {
        value: '4',
        label: '还款'
      }, {
        value: '5',
        label: '网商消息'
      }],
      pageIndex: 1,
      pageSize: 10,
      total: 1,
      applyStatus: '',
      timer: '',
      companyName: '',
      employeeName: '',
      showPageTag: false,
      getList: []
    }
  },
  created() {
    this.getval();
    // testKY();
  },
  filters: {
    getFullDate(t) {
      return format(t)
    },
    getFormtype(t) {
      return t === 1 ? '微贷网' : ''
    },
    getStatus(t) {
      return t === 1 ? '已评估' : t === 3 ? '已申请' : t === 5 ? '已提交' : ''
    }
  },
  methods: {
    startTimeChange() {
      if (this.endTime) {
        this.getval()
      }
    },
    endTimeChange() {
      if (this.startTime) {
        this.getval()
      }
    },
    moreBtn() {
      this.searchCell = !this.searchCell
      // console.log(this.searchCell)
    },
    // 查看
    look() {
      this.$router.push('/look')
    },
    getval() {
      let params = {
        applyStatus: this.applyStatus,
        _startTime: this.startTime ? getTime(this.startTime) : '',
        _endTime: this.endTime ? getTime(this.endTime) : '',
        pushPlatformType: this.platform,
        zedAccount: this.info,
        cityOrProvince: this.cityOrProvince,
        name: this.name,
        carNum: this.carNum,
        mobile: this.mobile,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice
      }
      cheCredit(params).then(res => {
        console.log('list len:' + res.count)
        if (res.code === 0) {
          this.getList = res.list
          this.total = res.count
          if (this.total <= this.pageSize) {
            this.showPageTag = false
          } else {
            this.showPageTag = true
          }
        }
      })
    },
    // 查询
    search() {
      this.getval()
    },
    searchByDrawMoney() {
      let m = this.drawMoney
      this.minPrice = m.split('-')[0]
      this.maxPrice = m.split('-')[1]
      this.getval()
    },
    searchByGiveMoney() {
      let m = this.drawMoney
      this.minPrice = m.split('-')[0]
      this.maxPrice = m.split('-')[1]
      this.getval()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(val)
      this.pageIndex = val
      this.getval()
    }
  },
  components: {
    searchCondition
  }
}
</script>

<style lang="scss" scoped>
@import './Mileage'
</style>

