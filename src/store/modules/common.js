import { getStore, setStore } from '@/util/store'
import website from '@/const/website'

const common = {
  state: {
    isCollapse: false,
    screen: -1,
    windowSize: { width: 0, height: 0 },
    isWelcome: getStore({ name: 'isWelcome' }) || false,
    isLock: getStore({ name: 'isLock' }) || false,
    showCollapse: getStore({ name: 'showCollapse' }) || false,
    showSearch: getStore({ name: 'showSearch' }) || false,
    showMenu: getStore({ name: 'showMenu' }) || false,
    showMoney: getStore({ name: 'showMoney' }) || false,
    website: website,
  },
  actions: {},
  mutations: {
    SET_WELCOME: state => {
      state.isWelcome = !state.isWelcome
      setStore({
        name: 'isWelcome',
        content: state.isWelcome,
      })
    },
    SET_COLLAPSE: state => {
      state.isCollapse = !state.isCollapse
    },
    SET_SHOWCOLLAPSE: (state, active) => {
      state.showCollapse = active
      setStore({
        name: 'showCollapse',
        content: state.showCollapse,
      })
    },
    SET_SHOWMENU: (state, active) => {
      state.showMenu = active
      setStore({
        name: 'showMenu',
        content: state.showMenu,
      })
    },
    SET_SHOWMONEY: (state, active) => {
      state.showMoney = active
      setStore({
        name: 'showMoney',
        content: state.showMoney,
      })
    },
    SET_SHOWSEARCH: (state, active) => {
      state.showSearch = active
      setStore({
        name: 'showSearch',
        content: state.showSearch,
      })
    },
    SET_SCREEN: (state, screen) => {
      state.screen = screen
    },
    SET_WINDOWSIZE: (state, size) => {
      state.windowSize = size
    },
  },
}
export default common
