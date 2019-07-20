import Layout from '@/page/index/index'
export default [
  {
    path: '/comn',
    component: Layout,
    children: [
      {
        path: 'column_management/:id',
        name: '栏目管理',
        component: () => import(/* webpackChunkName: "conm" */'@/views/conm/ColumnManagement/index'),
      },
      {
        path: 'document_management/:id',
        name: '文档管理',
        component: () => import(/* webpackChunkName: "conm" */'@/views/conm/DocumentManagement/index'),
      },
      {
        path: 'document_management_detail/:id',
        name: '文档管理详情',
        component: () => import(/* webpackChunkName: "conm" */'@/views/conm/DocumentManagement/Detail'),
      },
    ],
  },
]
