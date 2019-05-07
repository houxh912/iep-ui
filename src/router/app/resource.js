export default [
  {
    path: 'material',
    name: '材料库',
    icon: 'icon-dangan',
    count: 2010, //TODO:暂时假数据
    component: () => import('@/views/app/resource/material/'),
  },
  {
    path: 'training',
    name: '培训库',
    icon: 'icon-peixun',
    count: 2010,
    component: () => import('@/views/app/resource/training/'),
  },
  {
    path: 'client',
    name: '客户库',
    icon: 'icon-chengyuan',
    count: 2010,
    component: () => import('@/views/app/resource/client/'),
  },
  {
    path: 'qualification',
    name: '资质库',
    icon: 'icon-qingdankushoucang',
    count: 2010,
    component: () => import('@/views/app/resource/qualification/'),
  },
  {
    path: 'business',
    name: '商机库',
    icon: 'icon-shangjifaxian',
    count: 2010,
    component: () => import('@/views/app/resource/business/'),
  },
  {
    path: 'expert',
    name: '专家库',
    icon: 'icon-gerenzicai',
    count: 2010,
    component: () => import('@/views/app/resource/expert/'),
  },
  {
    path: 'product_ku',
    name: '产品库',
    icon: 'icon-chanpin',
    count: 2010,
    component: () => import('@/views/app/resource/productKu/'),
  },
]