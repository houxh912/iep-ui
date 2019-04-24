export default [
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
]