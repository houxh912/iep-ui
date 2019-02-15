import Layout from '@/page/index/'
export default [
  {
    path: '/demo',
    component: Layout,
    redirect: 'demoForm',
    children: [
      {
        path: 'demoForm',
        components: require('@/views/demo/form/index'),
      },
    ],
  },
  {
    path: '/customer',
    component: Layout,
    redirect: 'custom',
    children: [
      {
        path: 'custom',
        name: 'Custom',
        components: require('@/views/customer/custom/index'),
      },
    ],
  },
]
