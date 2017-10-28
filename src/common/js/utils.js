/*  说明：
 *  插件文件：utils.js
 *  作者：林祺泰  QQ：514917919
 * */
// 管理员状态( 0:禁用 1:启用),点击禁用,0,点击启用,1
export function getLimiteText(value) {
  let len = 24
  if (value.length > len) {
    return value.substr(0, len) + '···'
  } else {
    return value
  }
}
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
    // 获取完整的时间（年月日）
    Vue.prototype.getFullDate = (t) => {
      var time = new Date(t)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
    }
  }
}
