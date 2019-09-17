/**
 * 全站权限配置
 *
 */
import Vue from 'vue'
import router from './router/router'
import store from '@/store'
import orderBy from 'lodash/orderBy'
import { validatenull } from '@/util/validate'
import NProgress from 'nprogress'
import { Message } from 'element-ui'
import 'nprogress/nprogress.css'

const eventBus = new Vue()
Vue.prototype.$eventBus = eventBus

NProgress.configure({ showSpinner: false })

const lockPage = store.getters.website.lockPage // 锁屏页
router.beforeEach(async (to, from, next) => {
  const {
    access_token,
    isLock,
    roles,
    menuPathList,
    menu,
    mainMenu,
    otherMenus,
  } = store.getters
  NProgress.start()
  const meta = to.meta || {}
  if (access_token) {
    if (isLock && to.path != lockPage) {
      next({ path: lockPage })
    } else if (to.path === '/login') {
      next('/')
    } else {
      if (roles.length === 0) {
        try {
          const userInfo = await store.dispatch('GetUserInfo')
          if (userInfo.roles.length === 0) {
            Message('请检查你的角色权限')
            await store.dispatch('ClearUserInfo')
            next({ path: '/login' })
          } else {
            await store.dispatch('GetMenu')
            await store.dispatch('LoadAllDictMap')
            next({ ...to, replace: true })
          }
        } catch (error) {
          console.log(error)
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' })
          })
        }
      } else {
        if (to.matched.length) {
          const parentPath = to.matched[0].path
          const isMatchedMenu = menuPathList.includes(parentPath)
          const currentMenu = menu.find(m => m.path === parentPath)
          if (isMatchedMenu && currentMenu) {
            let Menus = [mainMenu, ...otherMenus]
            Menus = orderBy(Menus, ['sort'], ['asc'])
            const oMenus = Menus.filter(m => m.path !== currentMenu.path)
            store.commit('SET_MAINMENU', currentMenu)
            store.commit('SET_OTHERMENUS', oMenus)
          }
        }
        const value = to.query.src || to.fullPath
        const label = to.query.name || to.name
        if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
          store.commit('ADD_TAG', {
            label: label,
            value: value,
            params: to.params,
            query: to.query,
            group: router.$avueRouter.group || [],
          })
        }
        next()
      }
    }
  } else {
    if (meta.isAuth === false) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
    }
  }
})

router.afterEach((to) => {
  if (to.matched[0].path === '/app') {
    eventBus.$emit('SET_SCROLLTOTOP')
  }
  NProgress.done()
})
