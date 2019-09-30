import Layout from '@/page/index/index'
const noAuth = {
    keepAlive: false,
    // isTab: false,
    // isAuth: false,
  }

export default [
    {
        path: '/views_spa',
        name: '栏目菜单',
        component: Layout,
        // redirect: '/govdata/detail',
        children: [
            {
                path: 'detail/:id',
                name: '政策详情',
                component: () => import('@/views/govdata/detail'),
                meta: noAuth,
              },
        ],
     
    },
]
