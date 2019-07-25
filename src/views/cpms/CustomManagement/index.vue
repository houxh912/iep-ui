<template>
  <div>
    <basic-container>
      <iep-page-header title="定制管理"></iep-page-header>
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
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="scope.row.status==0" type="warning" @click="handlePass(scope.row)" plain>通过</iep-button>
              <iep-button v-if="scope.row.status==0" @click="handleLoss(scope.row)">不通过</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
import { getExaminePage, adoptCustomById, refuseCustomById } from '@/api/app/cpms/custom_product'
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
      this.$router.push(`/cpms_spa/custom_management_detail/${row.customId}`)
    },
    handlePass (row) {
      adoptCustomById(row.customId).then(() => {
        this.loadPage()
      })
    },
    handleLoss (row) {
      refuseCustomById(row.customId).then(() => {
        this.loadPage()
      })
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
