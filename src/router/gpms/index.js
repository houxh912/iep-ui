import Layout from '@/page/index/index'
export default [
  {
    path: '/gpms_spa',
    component: Layout,
    redirect: '/gpms_spa/project/detail/:id',
    children: [
      {
        path: 'project/add_first',
        name: '选择项目主题',
        component: () => import('@/views/gpms/project/addFirst.vue'),
      },
      {
        path: 'project/add',
        name: '新增',
        component: () => import('@/views/gpms/project/add.vue'),
      },
      {
        path: 'project/add/:id',
        name: '编辑',
        component: () => import('@/views/gpms/project/add.vue'),
      },
      {
        path: 'project/recommend_add',
        name: '推荐新增',
        component: () => import('@/views/gpms/project/recommendAdd.vue'),
      },
      {
        path: 'project/detail/:id',
        name: '查看项目详情',
        component: () => import('@/views/gpms/detail.vue'),
      },
    ],
  },
]
