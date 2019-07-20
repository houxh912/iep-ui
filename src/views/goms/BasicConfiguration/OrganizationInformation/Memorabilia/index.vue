<template>
  <div>
    <operation-container>
      <template slot="right">
          <operation-search @search-page="searchPage" prop="title"></operation-search>
        </template>
      <template slot="left">
        <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
      <el-table-column prop="operation" label="操作" width="250">
        <template slot-scope="scope">
          <operation-wrapper>
            <!-- <iep-button type="warning" @click="handleReview(scope.row)" plain>审核</iep-button> -->
            <iep-button @click="handleEdit(scope.row)" size="small">编辑</iep-button>
            <iep-button @click="handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <iep-review-confirm ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
  </div>
</template>

<script>
import DialogForm from './DialogForm'
// import AdvanceSearch from './AdvanceSearch'
import { deleteJobBatch, reviewApprovaBatch } from '@/api/goms/org_thing'
import mixins from '@/mixins/mixins'
import { columnsMap, initForm, dictsMap } from './options'
import { getOrgEventsPage, getOrgEventsById, orgEventsCreate, orgEventsUpdate, orgEventsDelete } from '@/api/admin/orgEvents'

export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      pagedTable:[],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deleteJobBatch)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, orgEventsDelete)
    },
    handleReview (row) {
      this.$refs['iepReviewForm'].title = '审核'
      this.$refs['iepReviewForm'].id = row.id
      this.$refs['iepReviewForm'].formRequestFn = reviewApprovaBatch
      this.$refs['iepReviewForm'].dialogShow = true
    },
    handleEdit (row) {
      getOrgEventsById(row.id).then(({data}) => {
        this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), data.data)
        this.$refs['DialogForm'].methodName = '修改'
        this.$refs['DialogForm'].formRequestFn = orgEventsUpdate
        this.$refs['DialogForm'].dialogShow = true
      })
    },
    handleAdd () {
      this.$refs['DialogForm'].methodName = '创建'
      this.$refs['DialogForm'].formRequestFn = orgEventsCreate
      this.$refs['DialogForm'].dialogShow = true
    },
    loadPage (param = {}) {
      this.loadTable(param, getOrgEventsPage)
    },
  },
}
</script>


