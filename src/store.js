import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shopLists: {}
  },

  mutations: {
    fetchShopsLists (state) {
      state.shopLists = window.localStorage.getItem('shopLists') || {lists: [], lastUpdate: ''}
      state.shopLists = typeof state.shopLists === 'string' ?  JSON.parse(state.shopLists) : state.shopLists
    },

    saveShopsLists (state) {
      window.localStorage.setItem('shopLists', JSON.stringify(state.shopLists))
    },

    deleteList (state, payload) {
      state.shopLists.lists = state.shopLists.lists.filter(list => list.name !== payload.name)
    },

    modifyList (state, payload) {
      state.shopLists.lists = state.shopLists.lists.map(list => {
        if(list.name !== payload.shopList.name)
          return {...list}
        return {...payload.shopList}
      })
      state.shopLists.lastUpdate = payload.shopList.name
    },

    addList (state, payload) {
      state.shopLists.lists.push(payload.shopList)
      state.shopLists.lastUpdate = payload.shopList.name
    },

    deleteItemInList (state, payload) {
      state.shopLists.lists.map(shopList => {
        if(shopList.name === payload.listName)
          shopList.list = shopList.list.filter(item => item.name !== payload.itemName)
        return {...shopList} 
      })
      state.shopLists.lastUpdate = payload.listName
    },

    modidyItemInList (state, payload) {
      state.shopLists.lists.map(shopList => {
        if(shopList.name === payload.listName)
          return {...shopList}
        return shopList.list.map(item => {
          if(item.name !== payload.itemName)
            return {...item}
          return {...payload.item}
        })
      })
      state.shopLists.lastUpdate = payload.listName
    },

    addItemInList (state, payload) {
      state.shopLists.lists.map(shopList => {
        if(shopList.name === payload.listName)
          shopList.list.push(payload.item)
        return {...shopList}
      })
      state.shopLists.lastUpdate = payload.listName
    }
  },

  actions : {
    deleteList (context, {name}) {
      context.commit('deleteList', {name})
      context.commit('saveShopsLists')
    },

    modifyList (context, {shopList}) {
      context.commit('modifyList', {shopList})
      context.commit('saveShopsLists')
    },

    addList (context, {name}) {
      context.commit('addList', {shopList: {list: [], budget: 50, name}})
      context.commit('saveShopsLists')
    },

    deleteItemInList (context, payload) {
      context.commit('deleteItemInList', payload)
      context.commit('saveShopsLists')
    },

    modidyItemInList (context, payload) {
      context.commit('modidyItemInList', payload)
      context.commit('saveShopsLists')
    },

    addItemInList (context, {listName, itemName}) {
      context.commit('addItemInList', {listName, item: {name: itemName, checked: false, price: 0}})
      context.commit('saveShopsLists')
    }
  },

  getters: {
    shopListByName: (state) => (name) => {
      return state.shopLists.lists.find(list => list.name === name) || {}
    },

    shopLists: state => {
      return state.shopLists
    },
    
    lastUpdatedList: (state, getters) => {
      if (state.shopLists.lastUpdate === '')
        return {}
      return getters.shopListByName(state.shopLists.lastUpdate)
    },
 
    listExists: (state) => (name) => {
      return state.shopLists.lists.find(list => list.name === name) || false
    },
 
    itemExistsInList: (state) => (listName, itemName) => {
      const shopList = state.shopLists.lists.find(list => list.name === listName) 
      return shopList.list.find(item => item.name === itemName) || false
    }
  }
})