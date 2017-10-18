/*  说明：
 *  插件文件：utils.js
 *  作者：林祺泰  QQ：514917919
 * */
export default {
  install: function (Vue, options) {
    // 如果数据是空，就用isNull代替
    Vue.filter('isNull', function (value) {
      if (value === null || value === '') {
        return '---'
      } else {
        return value
      }
    })
    // 管理员状态( 0:禁用 1:启用),点击禁用,0,点击启用,1
    Vue.filter('adminerStatus', function (value) {
      if (value === 0) {
        return '禁用'
      } else if (value === 1) {
        return '启用'
      }
    })
    // 获取完整的时间（年月日）
    Vue.prototype.getFullDate = (t) => {
      var time = new Date(t)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
    }
    // 获取完整的时间
    Vue.prototype.getFullTime = (t) => {
      var time = new Date(t)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s)
    }
    // 验证手机号码
    Vue.prototype.checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        if (/^1[3|4|5|7|8][0-9]\d{8}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('手机号不合法'))
        }
      }
    }
  }
}
