import Layout from '@/page/index/index'
export default [
  {
    path: '/comn',
    component: Layout,
    children: [
      {
        path: 'column_management/:id',
        name: '栏目管理',
        component: () => import('@/views/conm/ColumnManagement/index'),
      },
      {
        path: 'document_management/:id',
        name: '文档管理',
        component: () => import('@/views/conm/DocumentManagement/index'),
      },
    ],
  },
]
