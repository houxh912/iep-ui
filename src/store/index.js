import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
import cache from './modules/cache'
import common from './modules/common'
import app from './modules/app'
import tags from './modules/tags'
import gpms from './modules/gpms'
import fams from './modules/fams'
import hrms from './modules/hrms'
import notify from './modules/notify'
import im from './modules/im'
import cpms from './modules/cpms'
import ican from './modules/ican'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    user,
    menu,
    cache,
    common,
    tags,
    fams,
    gpms,
    hrms,
    notify,
    im,
    cpms,
    ican,
  },
  getters,
})

export default store
