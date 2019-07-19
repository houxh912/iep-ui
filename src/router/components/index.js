import Layout from '@/page/index/index'
export default [
  {
    path: '/components_spa',
    component: Layout,
    redirect: '/components_spa/demo',
    children: [
      {
        path: 'demo',
        name: '组件库演示',
        component: () => import(/* webpackChunkName: "components" */'@/components/demo/index'),
      },
      {
        path: 'charts',
        name: '图标库演示',
        component: () => import(/* webpackChunkName: "components" */'@/components/demo/charts'),
      },
      {
        path: 'self',
        name: '重写库演示',
        component: () => import(/* webpackChunkName: "components" */'@/components/demo/self'),
      },
    ],
  },
]
