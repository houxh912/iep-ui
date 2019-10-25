import Layout from '@/page/index/index'
export default [
  {
    path: '/tms',
    component: Layout,
    children: [
      {
        path: 'management/edit/:id',
        name: '标签编辑',
        component: () => import('@/views/tms/Management/ClusteringResult/Edit.vue'),
      },
      {
        path: 'list_edit/:id',
        name: '机构新增',
        component: () => import('@/views/tms/MechanismList/List/Edit'),
      },
      {
        path: 'nameList_edit/:id',
        name: '人名新增',
        component: () => import('@/views/tms/NameList/Whole/Edit'),
      },
    ],
  },
]
