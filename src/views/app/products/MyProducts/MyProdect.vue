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
    <el-scrollbar style="height:300px">
      <div class="my-products-box">
        <div v-for="(item,index) in moduleList" :key="index" class="piece" @click="handleleDetail(item)">
          <iep-img class="img" :src="item.imageUrl" alt=""></iep-img>
          <div class="text">
            <span>{{item.name}}</span>
            <span class="introduction">{{item.synopsis}}</span>
          </div>
        </div>
      </div>
    </el-scrollbar>
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
        this.moduleList = moduleList
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
        span {
          display: block;
          transition: 0.5s;
          font-size: 16px;
          height: 28px;
          line-height: 28px;
        }
        .introduction {
          font-size: 14px;
          color: #999;
          height: 56px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
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
