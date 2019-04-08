import Layout from '@/page/index/index'
export default [
  {
    path: '/app',
    component: Layout,
    redirect: '/app/index',
    children: [
      {
        path: 'index',
        name: '首页',
        component: () => import('@/views/app/index/'),
      },
      {
        path: 'person',
        name: '国脉人',
        component: () => import('@/views/app/person/'),
      },
      {
        path: 'products',
        name: '产品',
        component: () => import('@/views/app/products/'),
      },
      {
        path: 'brand',
        name: '品牌',
        component: () => import('@/views/app/brand/'),
      },
      {
        path: 'news',
        name: '要闻',
        component: () => import('@/views/app/news/'),
      },
      {
        path: 'resource',
        name: '资源',
        component: () => import('@/views/app/resource/'),
      },
      {
        path: 'data',
        name: '数据',
        component: () => import('@/views/app/data/'),
      },
      {
        path: 'wealth',
        name: '财富',
        component: () => import('@/views/app/wealth/'),
      },
      {
        path: 'college',
        name: '学院',
        component: () => import('@/views/app/college/'),
      },
      {
        path: 'search',
        name: '搜索',
        component: () => import('@/views/app/search/'),
      },
    ],
  },
]
