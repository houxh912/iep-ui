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
import famsRouter from './fams/'
import conmRouter from './conm/'
import exceptionRouter from './exception/'
import AvueRouter from './avue-router'
import Store from '../store/'

const Router = new VueRouter({
  mode: 'history',
  routes: [].concat([]),
})
AvueRouter.install(Router, Store)
Router.$avueRouter.formatRoutes(Store.state.menu.menu, true)
Router.addRoutes([
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
])
export default Router
