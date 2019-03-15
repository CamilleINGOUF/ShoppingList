import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home'
import Lists from './views/Lists'
import About from './views/About'
import List from './views/List'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: List },
    { path: '/lists', component: Lists },
    { path: '/about', component: About }
  ]
})