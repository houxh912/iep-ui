<template>
  <div>
    <basic-container>
      <iep-page-header title="抄送我的"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>发起申请</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="申请人" width="100px">
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <iep-button type="warning" @click="handleDetail(scope.row)" plain>查看</iep-button>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getCCPage } from '@/api/hrms/wel'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    ...mapMutations({
      setApprovalDialogShow: 'SET_APPROVAL_DIALOG_SHOW',
    }),
    handleDetail (row) {
      this.$router.push({
        path: `/hrms_spa/approval_detail/${row.id}`,
      })
    },
    handleAdd () {
      this.setApprovalDialogShow(true)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getCCPage)
    },
  },
}
</script>
<style scoped>
</style>
