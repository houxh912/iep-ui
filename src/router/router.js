import VueRouter from 'vue-router'
import PageRouter from './page/'
import ViewsRouter from './views/'
import hrmsRouter from './hrms/'
import mlmsRouter from './mlms/'
import gpmsRouter from './gpms/'
import imsRouter from './ims/'
import componentsRouter from './components/'
import welRouter from './wel/'
import crmsRouter from './crms/'
import appRouter from './app/'
import cpmsRouter from './cpms/'
import AvueRouter from './avue-router'
import Store from '../store/'

const Router = new VueRouter({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0,
      }
    }
  },
  routes: [].concat([]),
})
AvueRouter.install(Router, Store)
Router.$avueRouter.formatRoutes(Store.state.user.menu, true)
Router.addRoutes([...PageRouter, ...ViewsRouter, ...hrmsRouter, ...imsRouter, ...componentsRouter, ...mlmsRouter, ...welRouter, ...gpmsRouter, ...crmsRouter, ...appRouter, ...cpmsRouter])
export default Router
