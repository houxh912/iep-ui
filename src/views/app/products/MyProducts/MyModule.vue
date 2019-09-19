<template>
  <div class="product-ku">
    <!-- <div class="title">我的产品<span>（{{num[0]}}）</span></div> -->
    <div class="products-btn">
      <!-- <el-button size="small">产品官网</el-button>
      <el-button size="small">代理政策</el-button>
      <el-button size="small">我要代理</el-button>
      <el-button size="small">申请技术服务</el-button>
      <el-button size="small">联合开发</el-button> -->
      <!-- <el-button size="small" @click="()=>{this.$router.push('/app/resource/product_ku')}">产品定制</el-button> -->
    </div>
    <div class="deletion-box">
      <!-- <div class="codule-deletion">
        按分类：
        <div :class="moduleType==''?'color':''" class="piece-deletion" @click="tabModuleType('')">全部</div>
        <div v-for="(item) in cpmsModuleType" :key="item.value" :class="moduleType==item.value?'color':''" class="piece-deletion" @click="tabModuleType(item.value)">{{item.label}}</div>
      </div> -->
      <div class="products-deletion">
        按业务分类：
        <div v-for="(item) in productList" :key="item.id" :class="productId==item.id?'color':''" class="piece-deletion" @click="tabProductId(item.id)">{{item.name}}</div>
      </div>
    </div>
    <iep-no-data v-if="!moduleList.length"></iep-no-data>

    <el-scrollbar style="height:300px">
      <div class="my-products-box">
        <div v-for="(item,index) in moduleList" :key="index" class="piece" @click="getDetail(item.id)">
          <iep-img class="img" :src="item.imageUrl" alt=""></iep-img>
          <div class="text">
            <iep-div-detail :value="item.name"></iep-div-detail>
            <iep-div-detail class="introduction" :value="item.synopsis"></iep-div-detail>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getProductList } from '@/api/app/cpms/product'
import { getModuleList } from '@/api/app/cpms/module'
export default {
  data () {
    return {
      moduleType: '',
      productId: 1,
      num: [18],
      productList: [{
        id: 1,
        name: '数据体系',
      },
      {
        id: 2,
        name: '业务优化',
      },
      {
        id: 3,
        name: '组织进化',
      },
      {
        id: 4,
        name: '通用服务',
      },
      ],
      moduleList: [],
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
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
      this.loadModuleList()
    },
    async loadModuleList () {
      const { data } = await getModuleList({
        type: this.moduleType,
        serviceType: this.productId || undefined,
      })
      this.moduleList = data.data
    },
    async loadProductList () {
      await getProductList()
      // const productList = data.data
      // productList.unshift({
      //   id: 0,
      //   name: '全部',
      // })
      // this.productList = productList.slice(0, 4)
    },
    tabModuleType (val) {
      this.moduleType = val
      this.loadModuleList()
    },
    tabProductId (val) {
      this.productId = val
      this.loadModuleList()
    },
    getDetail (val) {
      this.$router.push({
        path: `/app/module_details/${val}`,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.my-products {
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
  .products-deletion {
    padding-left: 5px;
  }
  .codule-deletion,
  .products-deletion {
    text-align: left;
    margin: 10px 0 20px;
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
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    grid-template-columns: 1fr 1fr;
    .piece {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      transition: 0.5s;
      .img {
        float: left;
        width: 80px;
        height: 80px;
        border: 1px solid #ebeef5;
        overflow: hidden;
      }
      .text {
        display: flex;
        flex-direction: column;
        width: 440px;
        margin-left: 15px;
        text-align: left;
        .introduction {
          font-size: 14px;
          color: #999;
          height: 56px;
        }
      }
      &:hover .text {
        color: #cb3737;
      }
    }
  }
}
</style>
<style scoped>
.product-ku >>> .el-tabs__header {
  margin: 0;
}
</style>