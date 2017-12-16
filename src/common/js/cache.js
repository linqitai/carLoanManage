import storage from 'good-storage'

const CURRENT_ROW = '_currentRow'

export function saveCurrentRow(row) {
  storage.set(CURRENT_ROW, row)
}
export function getCurrentRow() {
  return storage.get(CURRENT_ROW, [])
}
