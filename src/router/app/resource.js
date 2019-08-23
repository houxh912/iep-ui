export default [
  {
    path: 'material',
    name: '材料库',
    icon: 'icon-dangan',
    count: 0,
    countName: 'countMaterial',
    component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/resource/material/'),
    children: [
      {
        path: 'material_detail/:id',
        name: '材料详情',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/materialDetail/'),
      },
    ],
  },
  {
    path: 'training',
    name: '培训库',
    icon: 'icon-peixun',
    count: 0,
    countName: 'countTraining',
    component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/resource/training/'),
    children: [
      {
        path: 'training_detail/:id',
        name: '培训详情',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/trainingDetails/'),
      },
    ],
  },
  {
    path: 'client',
    name: '客户库',
    icon: 'icon-chengyuan',
    count: 0,
    countName: 'countClient',
    component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/resource/client/'),
    children: [
      {
        path: 'client_detail/:id',
        name: '客户库详情',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/resource/client/clientDetail/'),
      },
    ],
  },
  {
    path: 'qualification',
    name: '资质库',
    icon: 'icon-qingdankushoucang',
    count: 0,
    countName: 'countHonor',
    component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/resource/qualification/'),
  },
  {
    path: 'business',
    name: '商机库',
    icon: 'icon-shangjifaxian',
    count: 0,
    countName: 'countOpportunity',
    component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/resource/business/'),
    children: [
      {
        path: 'business_detail/:id',
        name: '商机库详情',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/resource/business/businessDetail/'),
      },
    ],
  },
  {
    path: 'expert',
    name: '专家库',
    icon: 'icon-gerenzicai',
    count: 0,
    countName: 'countExpert',
    component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/resource/expert/'),
  },
  {
    path: 'product_ku',
    name: '模块库',
    icon: 'icon-chanpin',
    count: 0,
    countName: 'countProduct',
    component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/resource/productKu/'),
    children: [
      {
        path: 'product_customization',
        name: '产品定制',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/resource/productKu/ProductCustomization.vue'),
      },
    ],
  },
  {
    path: 'project_list',
    name: '项目库',
    icon: 'icon-xiangmu',
    count: 0,
    countName: 'countProject',
    component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/projectList/'),
    children: [
      {
        path: 'project_details/:id',
        name: '项目详情',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/projectDetails/'),
      },
    ],
  },
]