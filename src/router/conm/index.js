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
        path: 'attribute_management/:id',
        name: '推荐位管理',
        component: () => import('@/views/conm/AttributeManagement/index'),
      },
      {
        path: 'a_d_slot_management/:id',
        name: '广告位管理',
        component: () => import('@/views/conm/ADSlotManagement/index'),
      },
      {
        path: 'a_d_management/:id',
        name: '广告管理',
        component: () => import('@/views/conm/ADManagement/index'),
      },
      {
        path: 'document_management/:id',
        name: '文档管理',
        component: () => import('@/views/conm/DocumentManagement/index'),
      },
      {
        path: 'document_management_detail/:id',
        name: '文档管理详情',
        component: () => import('@/views/conm/DocumentManagement/Detail'),
      },
    ],
  },
]
