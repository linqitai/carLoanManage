import storage from 'good-storage'

const CURRENT_ROW = '_currentRow'
const USERID = '_userId'
const DETAILINFO = '_detailInfo'

export function saveCurrentRow(row) {
  storage.set(CURRENT_ROW, row)
}
export function getCurrentRow() {
  return storage.get(CURRENT_ROW, [])
}

export function saveUserId(value) {
  storage.set(USERID, value)
}
export function getUserId() {
  return storage.get(USERID, [])
}

export function saveDetailInfo(obj) {
  storage.set(DETAILINFO, obj)
}
export function getDetailInfo() {
  return storage.get(DETAILINFO, [])
}