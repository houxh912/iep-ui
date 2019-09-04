<template>
  <div>
    <search @search-page="searchData"></search>
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
    <div class="module">
      <el-card class="module-item" v-for="(item,index) in moduleList" :key="index" shadow="hover" @click.native="handleDetail(item)">
        <div class="content">
          <!-- <i class="iconfont icon-tongyongleiziyuanpeizhi"></i> -->
          <div class="img">
            <iep-img :src="item.imageUrl" alt></iep-img>
          </div>
          <div class="text">
            <h4 class="item-title">{{item.name}}</h4>
            <p class="con">{{item.synopsis}}</p>
            <div class="classTag">
              <el-tag type="white" v-for="(tag, index) in item.tagKeywords" :key="index">{{tag}}</el-tag>
            </div>
          </div>
        </div>
        <div class="header clearfix">
          <span class="price">模块指导价：¥{{item.guidePrice}}</span>
          <el-button @click.stop="handleModuleClick(item.id)" icon="el-icon-plus"></el-button>
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
import { getModulePage } from '@/api/app/cpms/channel'
import { putModuleById } from '@/api/app/cpms/custom_module'

export default {
  data () {
    return {
      moduleType: '',
      productId: 1,
      moduleList: [],
      paramForm: {},
      params: {
        current: 1,
        size: 12,
      },
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
        name: '公共服务',
      },
      ],
      total: 0,
    }
  },
  components: {
    Search,
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
    cpmsModuleType () {
      return this.dictGroup['cpms_module_type']
    },
    cpmsProductType () {
      return this.dictGroup['MODULE_SERVICE_TYPE']
    },
  },
  methods: {
    searchData (val) {
      this.paramForm = val
      this.params.current = 1
      this.getModulePage()
    },
    handleModuleClick (moduleId) {
      putModuleById(moduleId).then((data) => {
        const resData = data.data.data
        if (resData) {
          this.$message({
            message: '操作成功',
            type: 'success',
          })
        } else {
          this.$message({
            message: '请不要重复订购',
            type: 'warming',
          })
        }
        this.$emit('click-add')
      })
    },
    getModulePage () {
      getModulePage(Object.assign({        type: this.moduleType,
        serviceType: this.productId || undefined      }, this.params, this.paramForm)).then(({ data }) => {
        this.moduleList = data.data.records
        this.total = data.data.total
      })
    },
    tabModuleType (val) {
      this.moduleType = val
      this.getModulePage()
    },
    tabProductId (val) {
      this.productId = val
      this.getModulePage()
    },
    currentChange (val) {
      this.params.current = val
      this.getModulePage()
    },
    handleDetail (row) {
      this.$router.push(`/app/module_details/${row.id}`)
    },
  },
  created () {
    this.getModulePage()
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
// .codule-deletion,
// .products-deletion {
//   width: 50%;
//   text-align: left;
//   display: inline-block;
//   margin: 10px 0 20px;
//   .piece-deletion {
//     display: inline;
//     padding: 2px 10px;
//     border-radius: 12px;
//     border: 1px solid #ffffff;
//     margin: 0 10px;
//     cursor: pointer;
//     &:hover {
//       background-color: #fef6f4;
//       border: 1px solid #dc8687;
//       color: #dc8687;
//     }
//   }

//   .color {
//     background-color: #fef6f4;
//     border: 1px solid #dc8687;
//     color: #dc8687;
//   }
// }
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
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ebeef5;
    padding: 10px 15px;
    background-color: #fafafa;
    .price {
      display: inline-block;
      flex: 1;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 15px;
    overflow: hidden;
    i {
      display: inline-block;
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 30px;
      text-align: center;
      border-radius: 50%;
      background-color: #cb3737;
      color: #fff;
      &:hover {
        animation: iconRotate-data-v-300a8671 1s linear infinite;
      }
    }
    .img {
      margin-right: 10px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .text {
      width: 80%;
      .item-title {
        max-width: 210px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .con {
        margin-bottom: 5px;
        height: 47px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #999;
      }
      .classTag {
        width: 100%;
        height: 66px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        text-align: justify;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        .el-tag {
          display: inline-block;
          vertical-align: top;
          margin-right: 5px;
          margin-bottom: 5px;
          font-size: 14px;
          cursor: pointer;
          &:last-child {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &:hover {
            color: #cb3737;
            background: #fef0f0;
            border-color: #cb3737;
          }
        }
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
  cursor: pointer;
}
.img >>> .el-image {
  width: 60px;
  height: 60px;
  overflow: hidden;
}
.img >>> .el-image__inner:hover {
  opacity: 0.7;
}
.img >>> .el-image__inner {
  padding: 5px;
  width: 60px;
  height: 60px;
  transition: 0.5s;
}
</style>
