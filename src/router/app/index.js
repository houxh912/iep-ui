import Layout from '@/page/index/index'
import resourceRoute from './resource'
const noAuth = {
  keepAlive: false,
  // isTab: false,
  // isAuth: false,
}
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
        meta: noAuth,
      },
      {
        path: 'person',
        name: '国脉人频道',
        component: () => import('@/views/app/person/'),
        meta: noAuth,
      },
      {
        path: 'products',
        name: '产品频道',
        component: () => import('@/views/app/products/'),
        meta: noAuth,
      },
      {
        path: 'project',
        name: '项目频道',
        component: () => import('@/views/app/project/'),
        meta: noAuth,
      },
      {
        path: 'brand',
        name: '品牌频道',
        component: () => import('@/views/app/brand/'),
        meta: noAuth,
      },
      {
        path: 'news',
        name: '要闻频道',
        component: () => import('@/views/app/news/'),
        meta: noAuth,
      },
      {
        path: 'resource',
        name: '资源频道',
        component: () => import('@/views/app/resource/'),
        meta: noAuth,
        redirect: '/app/resource/material',
        children: resourceRoute,
      },
      {
        path: 'data',
        name: '数据频道',
        component: () => import('@/views/app/data/'),
        meta: noAuth,
      },
      {
        path: 'wealth',
        name: '财富频道',
        component: () => import('@/views/app/wealth/'),
        meta: noAuth,
      },
      {
        path: 'college',
        name: '学院频道',
        component: () => import('@/views/app/college/'),
        meta: noAuth,
      },
      {
        path: 'search',
        name: '搜索频道',
        component: () => import('@/views/app/search/'),
        meta: noAuth,
      },
      {
        path: 'organization_style',
        name: '组织风采',
        component: () => import('@/views/app/organizationStyle/'),
        meta: noAuth,
      },
      {
        path: 'personal_style',
        name: '个人风采',
        component: () => import('@/views/app/personalStyle/'),
        meta: noAuth,
      },
    ],
  },
]
