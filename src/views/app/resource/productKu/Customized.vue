<template>
  <div class="product-ku">
    <search @search-page="searchData"></search>
    <div class="deletion-box">
      <div class="codule-deletion">
        按分类：
        <div :class="productType==''?'color':''" class="piece-deletion" @click="tabProductType('')">全部</div>
        <div v-for="(item) in cpmsProductType" :key="item.value" :class="productType==item.value?'color':''" class="piece-deletion" @click="tabProductType(item.value)">{{item.label}}</div>
      </div>
    </div>
    <div class="module">
      <el-card class="module-item" v-for="(item,index) in moduleList" :key="index" shadow="hover" @click.native="handleleDetail(item)">
        <div class="content">
          <div class="img">
            <iep-img :src="item.imageUrl" alt></iep-img>
          </div>
          <div class="text">
            <h4 class="item-title">{{item.name}}</h4>
            <p class="con">{{item.synopsis}}</p>
            <div class="header clearfix">
              <span class="price">产品估值：¥{{item.valuation}}</span>
              <el-button @click.stop="handleProductClick(item.id)" icon="el-icon-plus"></el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from './Search'
import { getDetailsPage } from '@/api/app/cpms/channel'
import { putProductById } from '@/api/app/cpms/custom_module'

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
  components: {
    Search,
  },
  methods: {
    searchData (val) {
      this.params.current = 1
      this.paramForm = val
      this.getDetailsPage()
    },
    getDetailsPage () {
      getDetailsPage(Object.assign({}, this.params, { type: this.productType }, this.paramForm)).then(({ data }) => {
        this.moduleList = data.data.records
        this.total = data.data.total
      })
    },
    tabProductType (val) {
      this.productType = val
      this.getDetailsPage()
    },
    handleProductClick (productId) {
      putProductById(productId).then(() => {
        this.$emit('click-add')
      })
    },
    currentChange (val) {
      this.params.current = val
      this.getDetailsPage()
    },
    handleleDetail (row) {
      this.$router.push(`/app/product_detail/${row.id}`)
    },
  },
  created () {
    this.getDetailsPage()
  },
}
</script>

<style scoped lang="scss">
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
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
.module {
  display: grid;
  margin: 25px 0;
  grid-auto-flow: row dense;
  grid-row-gap: 30px;
  grid-column-gap: 30px;
  grid-template-columns: minmax(100px, 3fr) minmax(100px, 3fr) minmax(
      100px,
      3fr
    );
  .module-item {
    cursor: pointer;
    .img {
      margin-right: 15px;
      width: 120px;
      height: 120px;
      border: 1px solid #dcdfe6;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        transition: 0.5s;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      .price {
        display: inline-block;
        flex: 1;
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    .text {
      width: 55%;
      .item-title {
        max-width: 210px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .con {
        height: 47px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #999;
      }
    }
  }
}
.page {
  text-align: center;
}
</style>
<style scoped>
.header >>> .el-button {
  padding: 0;
  width: 22px;
  height: 22px;
  line-height: 22px;
  border-radius: 50%;
}
.module >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
.module >>> .el-card__body {
  padding: 0;
}
.module >>> .el-card.module-item {
  border: 1px solid #dcdfe6;
}
.img >>> .el-image {
  width: 120px;
  height: 120px;
}
.img >>> .el-image__inner {
  width: 120px;
  height: 120px;
}
</style>
