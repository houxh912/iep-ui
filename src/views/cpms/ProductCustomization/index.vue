<template>
  <div>
    <basic-container>
      <iep-page-header title="定制产品"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" plain @click="handleProductClick">产品定制</iep-button>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :isPagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column prop="operation" label="操作" width="260">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <div class="counts">
        <span>
          <span class="size">{{size}}</span>个模块
        </span>
        <span>
          共计:
          <span class="count">{{count}}</span>
        </span>
      </div>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="sentProduct"></dialog-form>
  </div>
</template>

<script>
import { getCusList, deleteModuleById } from '@/api/app/cpms/custom_module'
import { columnsMap, initSearchForm, rules } from './options'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
export default {
  mixins: [mixins],
  components: {
    DialogForm,
  },
  data () {
    return {
      columnsMap,
      rules,
      size: 0,
      count: 0,
      form: initSearchForm(),
      pagedTable: [],
      ids: [],
      isLoadTable: false,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getCusList().then(({ data }) => {
        this.pagedTable = data.data
        this.size = data.data.length ? data.data.length : 0
        let arr = []
        let arrId = []
        data.data.forEach(item => {
          arr.push(item.preferentialPrice)
          arrId.push(item.id)
          let result = arr.reduce((total, currentValue) => {
            return total + currentValue
          })
          this.count = result
        })
        this.ids = arrId
      })
    },
    sentProduct () {
      this.loadPage()
      this.count = 0
    },
    handleProductClick () {
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].ids = this.ids
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteModuleById)
    },
  },
}
</script>
<style scoped lang='scss'>
.counts {
  padding: 15px;
  text-align: right;
  & > span {
    margin-right: 15px;
    font-size: 14px;
    .size,
    .count {
      font-size: 16px;
    }
    .count {
      color: #ba1b21;
    }
  }
}
</style>

