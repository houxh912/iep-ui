import Layout from '@/page/index/index'
import resourceRoute from './resource'



const noAuth = {
  keepAlive: false,
  // isTab: false,
  // isAuth: false,
}
export default [
  {
    path: '/app',
    name: '首页',
    component: Layout,
    redirect: '/app/index',
    children: [
      {
        path: 'index',
        name: '首页频道',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/index/'),
        meta: noAuth,
      },
      {
        path: 'person',
        name: '国脉人频道',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/person/'),
        meta: noAuth,
      },
      {
        path: 'products',
        name: '产品频道',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/products/'),
        meta: noAuth,
      },
      {
        path: 'product_detail/:id',
        name: '产品详情',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/productDetail/'),
        meta: noAuth,
      },
      {
        path: 'project',
        name: '项目频道',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/project/'),
        meta: noAuth,
      },
      {
        path: 'brand',
        name: '品牌频道',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/brand/'),
        meta: noAuth,
      },
      {
        path: 'news',
        name: '要闻频道',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/news/'),
        meta: noAuth,
      },
      {
        path: 'resource',
        name: '资源频道',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/resource/'),
        meta: noAuth,
        redirect: '/app/resource/material',
        children: resourceRoute,
      },
      {
        path: 'data',
        name: '数据频道',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/data/'),
        meta: noAuth,
      },
      {
        path: 'wealth',
        name: '财富频道',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/wealth/'),
        meta: noAuth,
        children: [
          {
            path: 'wealth_details/:id',
            name: '投资详情',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/wealth/wealthDetails/'),
          },
        ],
      },
      {
        path: 'college',
        name: '学院频道',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/college/'),
        meta: noAuth,
      },
      {
        path: 'policyCenter',
        name: '政策中心频道',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/policyCenter/'),
        meta: noAuth,
      },
      {
        path: 'search',
        name: '搜索频道',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/search/'),
        meta: noAuth,
      },
      {
        path: 'organization_style/:id',
        name: '组织风采',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/organizationStyle/'),
        meta: noAuth,
      },
      {
        path: 'organization_details',
        name: '关于组织',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/organizationDetails/'),
        meta: noAuth,
        redirect: '/app/organization_details/introduction',
        children: [
          {
            path: 'introduction',
            name: '组织介绍',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/organizationDetails/introduction/'),
            meta: noAuth,
          },
          {
            path: 'member',
            name: '组织成员',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/organizationDetails/member/'),
            meta: noAuth,
          },
          {
            path: 'memorabilia',
            name: '组织大事记',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/organizationDetails/memorabilia/'),
            meta: noAuth,
          },
          {
            path: 'album',
            name: '组织相册',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/organizationDetails/album/'),
            meta: noAuth,
          },
          {
            path: 'honor',
            name: '组织荣誉',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/organizationDetails/honor/'),
            meta: noAuth,
          },
          {
            path: 'evaluation',
            name: '组织评价',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/organizationDetails/evaluation/'),
            meta: noAuth,
          },
        ],
      },
      {
        path: 'alliance_details',
        name: '关于联盟',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/allianceDetails/'),
        meta: noAuth,
        redirect: '/app/alliance_details/introduction',
        children: [
          {
            path: 'group',
            name: '集团概况',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/allianceDetails/group/'),
            meta: noAuth,
          },
          {
            path: 'culture',
            name: '企业文化',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/allianceDetails/culture/'),
            meta: noAuth,
          },
          {
            path: 'mechanism',
            name: '组织架构',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/allianceDetails/mechanism/'),
            meta: noAuth,
          },
          {
            path: 'team',
            name: '专家团队',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/allianceDetails/team/'),
            meta: noAuth,
          },
          {
            path: 'development',
            name: '发展历程',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/allianceDetails/development/'),
            meta: noAuth,
          },
          {
            path: 'business',
            name: '业务领域',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/allianceDetails/business/'),
            meta: noAuth,
          },
        ],
      },
      {
        path: 'newComers',
        name: '新人必读',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/newComers/'),
        meta: noAuth,
        redirect: '/app/newComers/guidelines',
        children: [
          {
            path: 'guidelines',
            name: '新员工入职指南',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/newComers/content'),
            meta: noAuth,
          },
          {
            path: 'publicityFilm',
            name: '国脉集团宣传片',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/newComers/content'),
            meta: noAuth,
          },
          {
            path: 'culture',
            name: '公司文化',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/newComers/content'),
            meta: noAuth,
          },
          {
            path: 'system',
            name: '业务体系',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/newComers/content'),
            meta: noAuth,
          },
          {
            path: 'operationalChart',
            name: '业务作战图',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/newComers/content'),
            meta: noAuth,
          },
          {
            path: 'specifications',
            name: '内网个人信息填写规范',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/newComers/content'),
            meta: noAuth,
          },
          {
            path: 'problems',
            name: '内网常见问题',
            component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/newComers/content'),
            meta: noAuth,
          },
        ],
      },
      {
        path: 'personal_style/:id',
        name: '个人风采',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/personalStyle/'),
        meta: noAuth,
      },
      {
        path: 'tag_library',
        name: '标签库',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/tagLibrary/'),
        meta: noAuth,
      },
      {
        path: 'module_details/:id',
        name: '展示模块详情',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/moduleDetails/'),
        meta: noAuth,
      },
      {
        path: 'technology_details/:id',
        name: '新技术详情',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/technologyDetails/'),
        meta: noAuth,
      },
      {
        path: 'tags_detail/:id',
        name: '标签页详情',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/tagLibrary/tagDetail/'),
        meta: noAuth,
      },
      {
        path: 'training_list',
        name: '培训列表',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/trainingList/'),
      },
      {
        path: 'video_detail',
        name: '视频详情',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/videoDetails/'),
      },
      {
        path: 'video_list',
        name: '视频列表',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/videoList/'),
      },
      {
        path: 'search_detail',
        name: '搜索结果',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/searchDetails/'),
      },
      {
        path: 'tobeBole',
        name: '争做伯乐',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/person/GovPersonContent/TobeBole/'),
      },
      {
        path: 'more_thought',
        name: '说说列表页',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/moreThoughts/'),
      },
      {
        path: 'more_thoughts',
        name: '新版说说',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/thoughtList/'),
      },
      {
        path: 'thought_detail/:id',
        name: '说说详情',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/thoughtList/thoughtDetail/'),
      },
      {
        path: 'subject_list',
        name: '说说话题详情页',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/thoughtList/subjectList/'),
      },
      {
        path: 'version_page',
        name: '版本记录',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/versionPage/'),
      },
      {
        path: 'project_details/:id',
        name: '频道项目详情',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/projectDetails/'),
      },
      {
        path: 'project_list',
        name: '项目列表',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/projectList/'),
      },
      {
        path: 'project_pk',
        name: '项目PK',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/projectList/projectPK/'),
      },
      {
        path: 'organizational_list',
        name: '组织列表',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/organizationalList/'),
      },
      {
        path: 'data_assets',
        name: '组织资产',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/data/organizationalAssets/component'),
      },
      {
        path: 'data_assets_detail',
        name: '数据资产',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/data/organizationalAssets/tab/component'),
      },
      {
        path: 'contract_list',
        name: '合同',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/resource/contractList/'),
      },
      {
        path: 'contract_detail/:id',
        name: '合同详情',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/resource/contractList/detail/'),
      },
      {
        path: 'recruitDetail/:id',
        name: '岗位详情',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/recruitDetail/'),
      },
      {
        path: 'news/news_detail/:id',
        name: '新闻详情',
        component: () => import(/* webpackChunkName: "app-channel" */'@/views/app/newsDetail/'),
      },
    ],
  },
]
