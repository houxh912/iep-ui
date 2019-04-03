<template>
  <div>
    <operation-wrapper>
      <iep-button class="btn" type="danger" plain @click="handleAdd"><i class="el-icon-plus"></i>新增</iep-button>
    </operation-wrapper>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection>
      <el-table-column prop="operation" label="操作" width="200px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" type="warning" plain>编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <edit-dialog ref="EditDialog" @load-page="loadPage"></edit-dialog>
    <visit-dialog ref="VisitDialog"></visit-dialog>
  </div>
</template> 

<script>
import mixins from '@/mixins/mixins'
import { fetchVisitLog, deleteVisitLog, updateVisitLog, createVisitLog } from '@/api/crms/visiting_record'
import { visitColumnsMap } from './options'
import EditDialog from './EditDialog'
import VisitDialog from './VisitDialog'
export default {
  mixins: [mixins],
  props: ['record'],
  components: { EditDialog, VisitDialog },
  data () {
    return {
      id: this.record.id,
      columnsMap: visitColumnsMap,
      dialogShow: false,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['VisitDialog'].dialogShow = true
      this.$refs['VisitDialog'].methodName = '保存'
      this.$refs['VisitDialog'].formRequestFn = createVisitLog
      this.$refs['VisitDialog'].id = this.id
    },
    handleEdit (row) {
      this.$refs['VisitDialog'].formData = { ...row }
      this.$refs['VisitDialog'].dialogShow = true
      this.$refs['VisitDialog'].methodName = '保存'
      this.$refs['VisitDialog'].formRequestFn = updateVisitLog
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteVisitLog)
    },
    loadPage (param = { ...this.searchForm, id: this.id }) {
      this.loadTable(param, fetchVisitLog)
    },
  },
}
</script>

<style>
</style>
