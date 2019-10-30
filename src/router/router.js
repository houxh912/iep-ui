import Vue from 'vue'
import VueRouter from 'vue-router'
import PageRouter from './page/'
import hrmsRouter from './hrms/'
import mlmsRouter from './mlms/'
import icsRouter from './ics/'
import gpmsRouter from './gpms/'
import imsRouter from './ims/'
import componentsRouter from './components/'
import welRouter from './wel/'
import atmsRouter from './atms/'
import crmsRouter from './crms/'
import cfmsRouter from './cfms/'
// import appRouter from './app/'
import cpmsRouter from './cpms/'
import pgbdRouter from './pgbd/'
import famsRouter from './fams/'
import conmRouter from './conm/'
import tmsRouter from './tms/'
import exceptionRouter from './exception/'
import meeting from './meeting/'
import AvueRouter from './avue-router'
import Store from '../store/'

Vue.use(VueRouter)

const createRouter = () => new VueRouter({
  mode: 'history',
  routes: [],
})

const Router = createRouter()

export function initRouter (router, store) {
  AvueRouter.install(router, store)
  router.$avueRouter.formatRoutes(store.state.menu.menu, true)
  router.addRoutes([
    ...hrmsRouter,
    ...imsRouter,
    ...componentsRouter,
    ...mlmsRouter,
    ...icsRouter,
    ...welRouter,
    ...gpmsRouter,
    ...crmsRouter,
    // ...appRouter,
    ...cpmsRouter,
    ...famsRouter,
    ...conmRouter,
    ...PageRouter,
    ...atmsRouter,
    ...pgbdRouter,
    ...cfmsRouter,
    ...tmsRouter,
    ...exceptionRouter,
    ...meeting,
  ])
}

initRouter(Router, Store)

export function resetRouter () {
  const newRouter = createRouter()
  initRouter(newRouter, Store)
  Router.matcher = newRouter.matcher
}

export default Router
