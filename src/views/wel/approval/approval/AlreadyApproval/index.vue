<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>发起申请</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage"></operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
      <template slot="before-columns">
        <el-table-column label="申请人" width="120px">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" width="100px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" @click="handleDetail(scope.row)" plain>查看</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { getAlreadyApprovalPage } from '@/api/hrms/wel'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap } from './options'
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
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleAdd () {
      this.setApprovalDialogShow(true)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/hrms_spa/approval_detail/${row.id}`,
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getAlreadyApprovalPage)
    },
  },
}
</script>
