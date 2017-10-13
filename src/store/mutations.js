import * as types from './mutation-types'
const mutations = {
  [types.SET_STATUS](state, getStatus) {
    state.getStatus = getStatus
  }
}
export default mutations