import Layout from '@/page/index/index'
export default [
  {
    path: '/cpms_spa',
    component: Layout,
    redirect: '/cpms_spa/product_detail',
    children: [
      {
        path: 'product_edit/:id',
        name: '产品编辑',
        component: () => import('@/views/cpms/products/Page/Edit.vue'),
      },
      {
        path: 'module_edit/:id',
        name: '模块编辑',
        component: () => import('@/views/cpms/modules/Page/Edit.vue'),
      },
      {
        path: 'technology_edit/:id',
        name: '技术编辑',
        component: () => import('@/views/cpms/technologys/Page/Edit.vue'),
      },
    ],
  },
]
