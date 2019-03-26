<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" type="danger" icon="el-icon-plus" plain>发起申请</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage">
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
      <template slot="before-columns">
        <el-table-column label="申请人" width="120px">
          <template slot-scope="scope">
            <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" width="220px">
        <template>
          <el-button size="small" type="warning" plain>同意</el-button>
          <el-button size="small">拒绝</el-button>
          <el-button size="small">转交</el-button>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getExaminApprovalPage, postApproval } from '@/api/wel/administrative_approval'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import DialogForm from './DialogForm'
export default {
  mixins: [mixins],
  components: { DialogForm },
  data () {
    return {
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleAdd () {
      this.$refs['DialogForm'].methodName = '创建'
      this.$refs['DialogForm'].formRequestFn = postApproval
      this.$refs['DialogForm'].dialogShow = true
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getExaminApprovalPage)
    },
  },
}
</script>
