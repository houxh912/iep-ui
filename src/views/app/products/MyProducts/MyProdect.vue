<template>
  <div class="product-ku">
    <div class="deletion-box">
      <div class="codule-deletion">
        按分类：
        <div :class="productType==''?'color':''" class="piece-deletion" @click="tabProductType('')">全部</div>
        <div v-for="(item) in cpmsProductType" :key="item.value" :class="productType==item.value?'color':''" class="piece-deletion" @click="tabProductType(item.value)">{{item.label}}</div>
      </div>
    </div>
    <iep-no-data v-if="!moduleList.length"></iep-no-data>
    <div class="my-products-box">
      <el-card shadow="never" v-for="(item) in moduleList" :key="item.id" class="module-list">
        <div @click="handleleDetail(item)">
          <iep-img :src="item.imageUrl" style="width: 100px;height:100px;"></iep-img>
          <hr>
          <span class="name">{{item.name}}</span>
          <p class="desc">{{item.synopsis}}</p>
          <RouterLink class="inline change" :to="`/app/product_details/${item.id}`">详情介绍>
          </RouterLink>
        </div>
      </el-card>

    </div>
    <!-- <div class="page">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDetailsPage } from '@/api/app/cpms/channel'
// import { putProductById } from '@/api/app/cpms/custom_module'

export default {
  data () {
    return {
      moduleList: [],
      paramForm: {},
      params: {
        current: 1,
        size: 12,
      },
      total: 0,
      productType: '',
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
    cpmsProductType () {
      return this.dictGroup['PRODUCT_TYPE']
    },
  },
  methods: {
    searchData (val) {
      this.params.current = 1
      this.paramForm = val
      this.getDetailsPage()
    },

    getDetailsPage () {
      getDetailsPage(Object.assign({}, this.params, this.paramForm, { type: this.productType })).then(({ data }) => {
        const moduleList = data.data.records
        this.total = data.data.total
        this.moduleList = moduleList.slice(0, 8)
      })
    },
    // handleProductClick (productId) {
    //   putProductById(productId).then(() => {
    //     this.$emit('click-add')
    //   })
    // },
    tabProductType (val) {
      this.productType = val
      this.getDetailsPage()
    },
    // currentChange (val) {
    //   this.params.current = val
    //   this.getDetailsPage()
    // },
    handleleDetail (row) {
      this.$router.push(`/app/product_detail/${row.id}`)
    },
  },
  created () {
    this.getDetailsPage()
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
