import { getStore, setStore } from '@/util/store'
import { isURL } from '@/util/validate'
import {
  getUserInfo,
  loginByMobile,
  loginBySocial,
  loginByUsername,
  logout,
  refreshToken,
  loadAllDictMap,
} from '@/api/login'
import keyBy from 'lodash/keyBy'
import { deepClone, encryption, pickDeep } from '@/util/util'
import website from '@/const/website'
import { GetMenu } from '@/api/admin/menu'

function addPath (ele, first) {
  const propsConfig = website.menu.props
  const propsDefault = {
    name: propsConfig.name || 'name',
    label: propsConfig.label || 'label',
    path: propsConfig.path || 'path',
    icon: propsConfig.icon || 'icon',
    children: propsConfig.children || 'children',
  }
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0
  if (!isChild && first) {
    ele[propsDefault.path] = ele[propsDefault.path] + '/index'
    return
  }
  ele[propsDefault.children].forEach(child => {
    child[propsDefault.name] = `${child[propsDefault.name]}-${ele[propsDefault.name]}`
    if (!isURL(child[propsDefault.path])) {
      child[propsDefault.path] = `${ele[propsDefault.path]}/${child[propsDefault.path] ? child[propsDefault.path] : 'index'}`
    }
    addPath(child)
  })
}

function detachMenu (menu) {
  const menuPathList = menu.map(m => m.path)
  let mainMenu = {}
  const otherMenus = []
  for (const iterator of menu) {
    if (iterator.path === website.menu.firstMenu.modulePath) {
      mainMenu = deepClone(iterator)
    } else {
      otherMenus.push(iterator)
    }
  }
  const menusMap = keyBy(menu, 'path')
  return { mainMenu, otherMenus, menusMap, menuPathList }
}
const user = {
  state: {
    userInfo: {},
    permissions: {},
    roles: [],
    orgs: [],
    dictGroup: getStore({ name: 'dictGroup' }) || {},
    menu: getStore({ name: 'menu' }) || [],
    mainMenu: getStore({ name: 'main_menu' }) || {},
    otherMenus: getStore({ name: 'other_menus' }) || [],
    menusMap: getStore({ name: 'menus_map' }) || {},
    menuPathList: getStore({ name: 'menu_path_list' }) || [],
    expires_in:
      getStore({
        name: 'expires_in',
      }) || '',
    access_token:
      getStore({
        name: 'access_token',
      }) || '',
    refresh_token:
      getStore({
        name: 'refresh_token',
      }) || '',
  },
  actions: {
    // 获取全部字典
    LoadAllDictMap ({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        loadAllDictMap().then(res => {
          const { data } = res
          commit('SET_DICT_ALL', data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 根据用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const user = encryption({
        data: userInfo,
        key: 'gdscloudprisbest',
        param: ['password'],
      })
      return new Promise((resolve, reject) => {
        loginByUsername(user.username, user.password, user.code, user.randomStr)
          .then(response => {
            const data = response.data
            commit('SET_ACCESS_TOKEN', data.access_token)
            commit('SET_REFRESH_TOKEN', data.refresh_token)
            commit('SET_EXPIRES_IN', data.expires_in)
            commit('SET_MENU', [])
            commit('SET_MAINMENU', {})
            commit('SET_OTHERMENUS', [])
            commit('SET_MENUSMAP', {})
            commit('SET_MENUPATHLIST', [])
            commit('CLEAR_LOCK')
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 根据手机号登录
    LoginByPhone ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByMobile(userInfo.mobile, userInfo.code)
          .then(response => {
            const data = response.data
            commit('SET_ACCESS_TOKEN', data.access_token)
            commit('SET_REFRESH_TOKEN', data.refresh_token)
            commit('SET_EXPIRES_IN', data.expires_in)
            commit('CLEAR_LOCK')
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 根据OpenId登录
    LoginBySocial ({ commit }, param) {
      return new Promise((resolve, reject) => {
        loginBySocial(param.state, param.code)
          .then(response => {
            const data = response.data
            commit('SET_ACCESS_TOKEN', data.access_token)
            commit('SET_REFRESH_TOKEN', data.refresh_token)
            commit('SET_EXPIRES_IN', data.expires_in)
            commit('CLEAR_LOCK')
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(res => {
            const data = res.data.data || {}
            commit('SET_USERIFNO', data.sysUser)
            commit('SET_ROLES', data.roles || [])
            commit('SET_PERMISSIONS', data.permissions || [])
            commit('SET_ORGS', data.orgs || [])
            resolve(data)
          })
          .catch(() => {
            reject()
          })
      })
    },
    // 刷新token
    RefreshToken ({ commit, state }) {
      return new Promise((resolve, reject) => {
        refreshToken(state.refresh_token)
          .then(response => {
            const data = response.data
            commit('SET_ACCESS_TOKEN', data.access_token)
            commit('SET_REFRESH_TOKEN', data.refresh_token)
            commit('SET_EXPIRES_IN', data.expires_in)
            commit('CLEAR_LOCK')
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登出
    LogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit('SET_MENU', [])
            commit('SET_MAINMENU', {})
            commit('SET_OTHERMENUS', [])
            commit('SET_MENUSMAP', {})
            commit('SET_MENUPATHLIST', [])
            commit('SET_PERMISSIONS', [])
            commit('SET_ORGS', [])
            commit('SET_USER_INFO', {})
            commit('SET_ACCESS_TOKEN', '')
            commit('SET_REFRESH_TOKEN', '')
            commit('SET_EXPIRES_IN', '')
            commit('SET_ROLES', [])
            commit('DEL_ALL_TAG')
            commit('CLEAR_LOCK')
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 注销session
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_PERMISSIONS', [])
        commit('SET_ORGS', [])
        commit('SET_USER_INFO', {})
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        commit('SET_ROLES', [])
        commit('DEL_ALL_TAG')
        commit('CLEAR_LOCK')

        commit('SET_MENU', [])
        commit('SET_MAINMENU', {})
        commit('SET_OTHERMENUS', [])
        commit('SET_MENUSMAP', {})
        commit('SET_MENUPATHLIST', [])
        resolve()
      })
    },
    // 获取系统菜单
    GetMenu ({ commit, state }) {
      commit('SET_MENU', [])
      commit('SET_MAINMENU', {})
      commit('SET_OTHERMENUS', [])
      commit('SET_MENUSMAP', {})
      commit('SET_MENUPATHLIST', [])
      return new Promise(resolve => {
        GetMenu().then(res => {
          const data = res.data.data
          let menu = deepClone(data)
          menu.forEach(ele => {
            addPath(ele)
          })
          commit('SET_MENU', menu)
          if (state.menuPathList.length === 0) {
            const { mainMenu, otherMenus, menusMap, menuPathList } = detachMenu(menu)
            commit('SET_MAINMENU', mainMenu)
            commit('SET_OTHERMENUS', otherMenus)
            commit('SET_MENUSMAP', menusMap)
            commit('SET_MENUPATHLIST', menuPathList)
          }
          resolve(menu)
        })
      })
    },
  },
  mutations: {
    SET_DICT_ALL: (state, dictGroup) => {
      for (const key in dictGroup) {
        if (dictGroup.hasOwnProperty(key)) {
          const element = dictGroup[key]
          dictGroup[key] = pickDeep(element)
        }
      }
      state.dictGroup = dictGroup
      setStore({
        name: 'dictGroup',
        content: state.dictGroup,
        type: 'session',
      })
    },
    SET_ACCESS_TOKEN: (state, access_token) => {
      state.access_token = access_token
      setStore({
        name: 'access_token',
        content: state.access_token,
        type: 'session',
      })
    },
    SET_EXPIRES_IN: (state, expires_in) => {
      state.expires_in = expires_in
      setStore({
        name: 'expires_in',
        content: state.expires_in,
        type: 'session',
      })
    },
    SET_REFRESH_TOKEN: (state, rfToken) => {
      state.refresh_token = rfToken
      setStore({
        name: 'refresh_token',
        content: state.refresh_token,
        type: 'session',
      })
    },
    SET_USERIFNO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      setStore({
        name: 'menu',
        content: menu,
        type: 'session',
      })
    },
    SET_MENUSMAP: (state, menusMap) => {
      state.menusMap = menusMap
      setStore({
        name: 'menus_map',
        content: menusMap,
        type: 'session',
      })
    },
    SET_OTHERMENUS: (state, otherMenus) => {
      state.otherMenus = otherMenus
      setStore({
        name: 'other_menus',
        content: otherMenus,
        type: 'session',
      })
    },
    SET_MAINMENU: (state, mainMenu) => {
      state.mainMenu = mainMenu
      setStore({
        name: 'main_menu',
        content: mainMenu,
        type: 'session',
      })
    },
    SET_MENUPATHLIST: (state, menuPathList) => {
      state.menuPathList = menuPathList
      setStore({
        name: 'menu_path_list',
        content: menuPathList,
        type: 'session',
      })
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_PERMISSIONS: (state, permissions) => {
      const list = {}
      for (let i = 0; i < permissions.length; i++) {
        list[permissions[i]] = true
      }
      state.permissions = list
    },
    SET_ORGS: (state, orgs) => {
      state.orgs = orgs
    },
  },
}
export default user
