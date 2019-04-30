import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
import common from './modules/common'
import app from './modules/app'
import tags from './modules/tags'
import logs from './modules/logs'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    user,
    menu,
    common,
    logs,
    tags,
  },
  getters,
})

export default store
