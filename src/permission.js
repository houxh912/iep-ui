/**
 * 全站权限配置
 *
 */
import router from './router/router'
import store from '@/store'
import orderBy from 'lodash/orderBy'
import keyBy from 'lodash/keyBy'
// import { Message } from 'element-ui'
// import { getStore } from '@/util/store'
import { validatenull } from '@/util/validate'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false })
const lockPage = store.getters.website.lockPage // 锁屏页
router.beforeEach((to, from, next) => {
  // 缓冲设置
  // if (
  //   to.meta.keepAlive === true &&
  //   store.state.tags.tagList.some(ele => {
  //     return ele.value === to.fullPath
  //   })
  // ) {
  //   to.meta.$keepAlive = true
  // } else {
  //   NProgress.start()
  //   if (to.meta.keepAlive === true && validatenull(to.meta.$keepAlive)) {
  //     to.meta.$keepAlive = true
  //   } else {
  //     to.meta.$keepAlive = false
  //   }
  // }
  NProgress.start()
  const meta = to.meta || {}
  if (store.getters.access_token) {
    // debugger
    if (store.getters.isLock && to.path != lockPage) {
      next({ path: lockPage })
    } else if (to.path === '/login') {
      next('/')
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch('GetUserInfo')
          .then(() => {
            next({ ...to, replace: true })
          })
          .catch(() => {
            store.dispatch('FedLogOut').then(() => {
              next({ path: '/login' })
            })
          })
      } else {
        const parentPath = to.matched[0].path
        console.log(parentPath)
        const isMatchedMenu = store.getters.menuPathList.includes(parentPath)
        const currentMenu = store.getters.menu.find(m => m.path === parentPath)
        if (isMatchedMenu && currentMenu) {
          let Menus = [store.getters.mainMenu, ...store.getters.otherMenus]
          Menus = orderBy(Menus, ['sort'], ['asc'])
          console.log(currentMenu)
          const otherMenus = Menus.filter(m => m.path !== currentMenu.path)
          const otherMenusMap = keyBy(Menus, 'path')
          store.commit('SET_MAINMENU', currentMenu)
          store.commit('SET_OTHERMENUS', otherMenus)
          store.commit('SET_OTHERMENUSMAP', otherMenusMap)
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
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
  const title = store.getters.tag.label
  router.$avueRouter.setTitle(title)
})
