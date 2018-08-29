import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  addressList: [],
  receptList: [],
  sendList: []
}

var mutations = {
  addressList (state, data) {
    state.addressList = data
  },
  receptList (state, data) {
    state.receptList = data
  },
  sendList (state, data) {
    state.sendList = data
  }
}

const store = new Vuex.Store({
  state,
  mutations
})
export default store
