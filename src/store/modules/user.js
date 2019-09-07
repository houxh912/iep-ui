import { getStore, setStore, setCookies, getCookies } from '@/util/store'
import { getUserInfo, loginByMobile, loginBySocial, loginByUsername, logout, refreshToken } from '@/api/login'
import { encryption } from '@/util/util'

const user = {
  state: {
    userInfo: {},
    permissions: {},
    roles: [],
    orgs: [],
    expires_in: getStore({ name: 'expires_in' }) || getCookies('expires_in') || '',
    access_token: getStore({ name: 'access_token' }) || getCookies('access_token') || '',
    refresh_token: getStore({ name: 'refresh_token' }) || getCookies('refresh_token') || '',
  },
  actions: {
    // 根据用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const user = encryption({
        data: userInfo,
        key: 'gdscloudprisbest',
        param: ['password'],
      })
      return new Promise((resolve, reject) => {
        loginByUsername(user.username, user.password, user.code, user.randomStr).then(({ data }) => {
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          commit('SET_EXPIRES_IN', data.expires_in)
          commit('CLEAR_LOCK')
          resolve(data)
        }).catch(error => {
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
    async GetUserInfo ({ commit }) {
      try {
        const { data } = await getUserInfo()
        const userInfo = data.data || {
          sysUser: {},
          roles: [],
          permissions: [],
          orgs: [],
        }
        commit('SET_USERIFNO', userInfo.sysUser)
        commit('SET_ROLES', userInfo.roles)
        commit('SET_PERMISSIONS', userInfo.permissions)
        commit('SET_ORGS', userInfo.orgs)
        return userInfo
      } catch (error) {
        console.log(error)
      }
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
    ClearUserInfo ({ commit }) {
      commit('SET_PERMISSIONS', [])
      commit('SET_ORGS', [])
      commit('SET_USER_INFO', {})
      commit('SET_ACCESS_TOKEN', '')
      commit('SET_REFRESH_TOKEN', '')
      commit('SET_EXPIRES_IN', '')
      commit('SET_ROLES', [])
      commit('DEL_ALL_TAG')
      commit('CLEAR_LOCK')
    },
    // 登出
    async LogOut ({ dispatch }) {
      try {
        await logout()
        await dispatch('ClearUserInfo')
        await dispatch('ClearMenu')
      } catch (error) {
        console.log(error)
      }
    },
    // 注销session
    async FedLogOut ({ dispatch }) {
      try {
        await logout()
        await dispatch('ClearUserInfo')
        await dispatch('ClearMenu')
      } catch (error) {
        console.log(error)
      }
    },
  },
  mutations: {
    SET_ACCESS_TOKEN: (state, access_token) => {
      state.access_token = access_token
      setCookies('access_token', access_token)
      setStore({
        name: 'access_token',
        content: state.access_token,
        type: 'session',
      })
    },
    SET_EXPIRES_IN: (state, expires_in) => {
      state.expires_in = expires_in
      setCookies('expires_in', expires_in)
      setStore({
        name: 'expires_in',
        content: state.expires_in,
        type: 'session',
      })
    },
    SET_REFRESH_TOKEN: (state, rfToken) => {
      state.refresh_token = rfToken
      setCookies('refresh_token', rfToken)
      setStore({
        name: 'refresh_token',
        content: state.refresh_token,
        type: 'session',
      })
    },
    SET_USERIFNO: (state, userInfo) => {
      state.userInfo = userInfo
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
