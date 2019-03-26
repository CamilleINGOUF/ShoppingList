import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shopLists: {}
  },
  mutations: {
    fetchShopsLists (state) {
      state.shopLists = JSON.parse(window.localStorage.getItem('shopLists')) || {}
    }
  }
})