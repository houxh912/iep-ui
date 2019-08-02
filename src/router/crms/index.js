import Layout from '@/page/index/index'
export default [
  {
    path: '/crms_spa',
    component: Layout,
    redirect: '/crms_spa/customer_detail/:id',
    children: [
      {
        path: 'customer_detail/:id',
        name: '客户详情',
        component: () => import('@/views/crms/Customer/Page/DetailNews.vue'),
      },
    ],
  },
  {
    path: '/crms_spa',
    component: Layout,
    redirect: '/crms_spa/business_detail/:id',
    children: [
      {
        path: 'business_detail/:id',
        name: '商机详情',
        component: () => import('@/views/crms/business/Detail.vue'),
      },
    ],
  },
]
