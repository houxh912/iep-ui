import Layout from '@/page/index/index'
export default [
  {
    path: '/app',
    component: Layout,
    redirect: '/app/index',
    children: [
      {
        path: 'index',
        name: '首页频道',
        component: () => import('@/views/app/index/'),
      },
      {
        path: 'person',
        name: '国脉人频道',
        component: () => import('@/views/app/person/'),
      },
      {
        path: 'products',
        name: '产品频道',
        component: () => import('@/views/app/products/'),
      },
      {
        path: 'project',
        name: '项目频道',
        component: () => import('@/views/app/project/'),
      },
      {
        path: 'brand',
        name: '品牌频道',
        component: () => import('@/views/app/brand/'),
      },
      {
        path: 'news',
        name: '要闻频道',
        component: () => import('@/views/app/news/'),
      },
      {
        path: 'resource',
        name: '资源频道',
        component: () => import('@/views/app/resource/'),
      },
      {
        path: 'data',
        name: '数据频道',
        component: () => import('@/views/app/data/'),
      },
      {
        path: 'wealth',
        name: '财富频道',
        component: () => import('@/views/app/wealth/'),
      },
      {
        path: 'college',
        name: '学院频道',
        component: () => import('@/views/app/college/'),
      },
      {
        path: 'search',
        name: '搜索频道',
        component: () => import('@/views/app/search/'),
      },
      {
        path: 'material',
        name: '材料库',
        component: () => import('@/views/app/material/'),
      },
      {
        path: 'training',
        name: '培训库',
        component: () => import('@/views/app/training/'),
      },
      {
        path: 'client',
        name: '客户库',
        component: () => import('@/views/app/client/'),
      },
      {
        path: 'qualification',
        name: '资质库',
        component: () => import('@/views/app/qualification/'),
      },
      {
        path: 'business',
        name: '商机库',
        component: () => import('@/views/app/business/'),
      },
      {
        path: 'expert',
        name: '专家库',
        component: () => import('@/views/app/expert/'),
      },
    ],
  },
]
