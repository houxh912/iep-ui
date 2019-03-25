<template>
  <div class="record">
    <div class="head">
      <iep-button class="btn" type="danger" plain size="mini" @click="handleAdd"><i class="el-icon-plus"></i> 拜访日志</iep-button>
      <iep-button class="btn" type="danger" plain size="mini" @click="handleAdd"><i class="el-icon-plus"></i> 联系记录</iep-button>
    </div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection>
      <el-table-column prop="operation" label="操作" width="200px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" size="small" type="warning">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" size="small">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <edit-dialog ref="EditDialog" @load-page="loadPage"></edit-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import { fetchVisitList, deleteVisit, updateVisit, createVisit } from '@/api/crms/crm'
import EditDialog from './EditDialog'
export default {
  name: 'contract',
  mixins: [mixins],
  components: { EditDialog },
  data () {
    return {
      columnsMap,
      formData: {},
    }
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param) {
      let id = this.record.clientId
      this.loadTable({ ...param, clientId: id }, fetchVisitList)
    },
    handleAdd () {
      this.$refs['EditDialog'].dialogShow = true
      this.$refs['EditDialog'].methodName = '新增'
      this.$refs['EditDialog'].submitFn = createVisit
    },
    handleEdit (row) {
      this.$refs['EditDialog'].formData = { ...row }
      this.$refs['EditDialog'].dialogShow = true
      this.$refs['EditDialog'].methodName = '编辑'
      this.$refs['EditDialog'].submitFn = updateVisit

    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById([row.contactId], deleteVisit)
    },
  },

}
</script>

<style lang="scss" scoped>
.record {
  .head {
    margin-bottom: 10px;
    .btn {
      margin-right: 10px;
    }
  }
}
</style>
