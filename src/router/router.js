import VueRouter from 'vue-router'
import PageRouter from './page/'
import ViewsRouter from './views/'
import hrmsRouter from './hrms/'
import mlmsRouter from './mlms/'
import gpmsRouter from './gpms/'
import imsRouter from './ims/'
import componentsRouter from './components/'
import welRouter from './wel/'
import atmsRouter from './atms/'
import crmsRouter from './crms/'
import appRouter from './app/'
import cpmsRouter from './cpms/'
import famsRouter from './fams/'
import conmRouter from './conm/'
import exceptionRouter from './exception/'
import AvueRouter from './avue-router'
import Store from '../store/'
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }
const createRouter = () => new VueRouter({
  mode: 'history',
  routes: [],
})

let Router = createRouter()

export function initRouter (router, store) {
  AvueRouter.install(router, store)
  router.$avueRouter.formatRoutes(store.state.menu.menu, true)
  router.addRoutes([
    ...hrmsRouter,
    ...imsRouter,
    ...componentsRouter,
    ...mlmsRouter,
    ...welRouter,
    ...gpmsRouter,
    ...crmsRouter,
    ...appRouter,
    ...cpmsRouter,
    ...famsRouter,
    ...conmRouter,
    ...exceptionRouter,
    ...ViewsRouter,
    ...PageRouter,
    ...atmsRouter,
  ])
}

initRouter(Router, Store)

export function resetRouter () {
  const newRouter = createRouter()
  initRouter(newRouter, Store)
  Router = newRouter // the relevant part
}

export default Router
