import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  addressList: [],
  receptList: [],
  sendList: [],
  todoList: []
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
  },
  setAddressList (state, data) {
    state.addressList.push(data)
  },
  setEditAddressList (state, data) {
    for (var i = 0; i < state.addressList.length; i++) {
      if (state.addressList[i].id == data.id) {
        state.addressList[i] = data
      }
    }
  },
  saveTodoList (state, data) {
    state.todoList = data;
  }
}

const store = new Vuex.Store({
  state,
  mutations
})
export default store
