export default [
    {
      path: 'general',
      name: '通用政策',
      icon: 'icon-dangan',
      component: () => import('@/views/app/policyCenter/general/'),
      children: [
        {
          path: 'general_detail/:id',
          name: '通用政策详情',
          component: () => import('@/views/app/policyCenter/detail'),
        },
      ],
    },
    {
        path: 'declare',
        name: '申报政策',
        icon: 'icon-dangan',
        component: () => import('@/views/app/policyCenter/declare/'),
        children: [
          {
            path: 'declare_detail/:id',
            name: '申报政策详情',
            component: () => import('@/views/app/policyCenter/detail'),
          },
        ],
      },
      {
        path: 'analysis',
        name: '政策解读',
        icon: 'icon-dangan',
        component: () => import('@/views/app/policyCenter/analysis/'),
        children: [
          {
            path: 'analysis_detail/:id',
            name: '政策解读详情',
            component: () => import('@/views/app/policyCenter/detail'),
          },
        ],
      },
      {
        path: 'information',
        name: '政策资讯',
        icon: 'icon-dangan',
        component: () => import('@/views/app/policyCenter/information/'),
        children: [
          {
            path: 'information_detail/:id',
            name: '政策资讯详情',
            component: () => import('@/views/app/policyCenter/detail'),
          },
        ],
      },
    ]