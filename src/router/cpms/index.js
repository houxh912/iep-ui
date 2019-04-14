import Layout from '@/page/index/index'
export default [
  {
    path: '/cpms_spa',
    component: Layout,
    redirect: '/cpms_spa/product_detail',
    children: [
      {
        path: 'product_detail',
        name: '产品详情',
        component: () => import('@/views/cpms/series/Page/Detail.vue'),
      },
      {
        path: 'module_detail',
        name: '模块详情',
        component: () => import('@/views/cpms/module_list/Page/Detail.vue'),
      },
      {
        path: 'technology_detail',
        name: '技术详情',
        component: () => import('@/views/cpms/tech_app/Page/Detail.vue'),
      },
    ],
  },
]
