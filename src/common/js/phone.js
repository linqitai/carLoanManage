export default {
  checkPhone (rule, value, callback) {
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
