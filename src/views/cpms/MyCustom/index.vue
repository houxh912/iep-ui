<template>
  <div>
    <basic-container>
      <iep-page-header title="我的定制"></iep-page-header>
      <operation-container>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" :dictsMap="dictsMap" :columnsMap="columnsMap" @current-change="handleCurrentChange">
        <template slot="before-columns">
          <el-table-column label="定制产品名称" width="350px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.customName}}</iep-table-link>
            </template>
          </el-table-column>
          <el-table-column label="提交时间">
            <template slot-scope="scope">
              {{scope.row.createTime | parseToDay}}
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleCancel(scope.row)" v-if="scope.row.status==0" type="warning" plain>取消</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../CustomManagement/options'
import { getExaminePage, deleteCustomById } from '@/api/app/cpms/custom_product'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
      pagedTable: [],
      isLoadTable: false,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/cpms_spa/my_custom_detail/${row.customId}`)
    },
    handleCancel (row) {
      this._handleGlobalDeleteById(row.customId, deleteCustomById)
    },
    async loadPage () {
      await getExaminePage().then((data) => {
        this.isLoadTable = true
        const { records, size, total, current } = data.data.data
        this.pagedTable = records
        const isBug = total / size + 1 === current
        if (isBug && total !== 0) {
          this.searchPage() // 防止分页为空页的情况
        } else {
          this.pagination = { current, size, total }
        }
        this.isLoadTable = false
      })
    },
  },
}
</script>
