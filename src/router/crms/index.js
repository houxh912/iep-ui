import Layout from '@/page/index/index'
export default [
  {
    path: '/crms_spa',
    component: Layout,
    redirect: '/crms_spa/customer_detail',
    children: [
      {
        path: 'customer_detail',
        name: '客户详情',
        component: () => import('@/views/crms/Customer/Page/Detail.vue'),
      },
    ],
  },
]
