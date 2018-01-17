import storage from 'good-storage'

const CURRENT_ROW = '_currentRow'
const USERID = '_userId'

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