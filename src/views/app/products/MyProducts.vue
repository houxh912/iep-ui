<template>
  <div class="my-products">
    <div class="title">我的产品<span>（{{num[0]}}）</span></div>
    <div class="products-btn">
      <el-button size="small">产品官网</el-button>
      <el-button size="small">代理政策</el-button>
      <el-button size="small">我要代理</el-button>
      <el-button size="small">申请技术服务</el-button>
      <el-button size="small">联合开发</el-button>
    </div>
    <div class="deletion-box">
      <div class="codule-deletion">
        按分类：
        <div v-for="(item,index) in cpmsModuleType" :key="index" :class="showClass1==index?'color':''" class="piece-deletion" @click="tab1(index)">{{item.label}}</div>
      </div>
      <div class="products-deletion">
        按产品：
        <div v-for="(item,index) in productList" :key="index" :class="showClass2==index?'color':''" class="piece-deletion" @click="tab2(index)">{{item.name}}</div>
      </div>
    </div>
    <div class="my-products-box">
      <el-card shadow="never" v-for="(item,index) in Module" :key="index" class="module-list">
        <i class="iconfont" :class="item.icon"></i>
        <hr>
        <span class="name">{{item.name}}</span>
        <p class="desc">{{item.desc}}</p>
        <RouterLink class="inline change" to="/app/module_details/">详情介绍>
        </RouterLink>
      </el-card>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getProductList } from '@/api/app/cpms/product'
export default {
  data () {
    return {
      showClass1: 0,
      showClass2: 0,
      num: [18],
      productList: [],
      Module: [
        { icon: 'icon-tongyongleiziyuanpeizhi', name: '资源配置模块', desc: '支持各单位应用系统的表结构导入本系统，通过配置可实现数据元配置。', to: '' },
        { icon: 'icon-qingdan', name: '清单管理模块', desc: '提供数据元的频率分析、同义词分析提供数据资源管理部门对彰据元、倍关联分析等功能', to: '' },
        { icon: 'icon-hetongbianzhi-', name: '目录编制模块', desc: '提供部门数据元、信息资源总屋排行可共享开放排行，热门资翻可', to: '' },
        { icon: 'icon-chaxun', name: '资源查询模块', desc: '表结构导入本系统，通过配置可实现资源查询模块。', to: '' },
        { icon: 'icon-tongji1', name: '数据元分析模块', desc: '提供数据元的频率分析、同义词分析提供数据资源管理部门对彰据元、倍关联分析等功能,频率分析统计', to: '' },
        { icon: 'icon-shenhexitong', name: '资源审核模块', desc: '息资源的常态化审核管理', to: '' },
        { icon: 'icon-yunzhuomian', name: '资源桌面导航模块', desc: '提供部门数据元、信息资源总屋排行可共享开放排行，热门资翻可', to: '' },
        { icon: 'icon-tongji1', name: '资源统计模块', desc: '支持各单位应用系统的表结构导入本系统，通过配置可实现资源统计。', to: '' },
      ],
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
    cpmsModuleType () {
      return this.dictGroup['cpms_module_type']
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      this.loadProductList()
    },
    async loadProductList () {
      const { data } = await getProductList()
      const productList = data.data
      productList.unshift({
        id: 0,
        name: '全部',
      })
      this.productList = productList.slice(0, 4)
    },
    tab1 (val) {
      this.showClass1 = val
    },
    tab2 (val) {
      this.showClass2 = val
    },
  },
}
</script>
<style lang="scss" scoped>
.my-products {
  grid-column-start: 1;
  grid-column-end: 4;
  text-align: center;
  .title {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    color: #333;
    span {
      font-size: 14px;
      color: #999;
    }
  }
  .products-btn {
    width: 100%;
  }
  .codule-deletion,
  .products-deletion {
    width: 50%;
    float: left;
    text-align: left;
    margin: 20px 0;
    .piece-deletion {
      display: inline;
      padding: 2px 10px;
      border-radius: 12px;
      border: 1px solid #ffffff;
      margin: 0 10px;
      cursor: pointer;
      &:hover {
        background-color: #fef6f4;
        border: 1px solid #dc8687;
        color: #dc8687;
      }
    }
    .color {
      background-color: #fef6f4;
      border: 1px solid #dc8687;
      color: #dc8687;
    }
  }
  .my-products-box {
    width: 100%;
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    grid-template-columns:
      minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr)
      minmax(100px, 1fr);
    .module-list {
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: #fafafa;
      }
      .iconfont {
        font-size: 46px;
        color: #999;
        display: block;
      }
      hr {
        margin: 20px 0 10px;
      }
      .name {
        font-size: 16px;
        color: #333;
        line-height: 55px;
      }
      .desc {
        line-height: 22px;
        height: 44px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .change {
        padding: 4px 20px;
        border-radius: 3px;
        font-size: 14px;
        text-align: center;
        color: #cb3737;
        margin-left: 10px;
        border: 1px solid #cb3737;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
        &:focus,
        &:hover {
          cursor: pointer;
          background-color: #cb3737;
          color: #fff;
          outline: none;
        }
      }
    }
  }
}
</style>
