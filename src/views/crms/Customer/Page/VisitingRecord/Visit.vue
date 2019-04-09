<template>
  <div>
    <operation-wrapper>
      <iep-button class="btn" type="primary" plain @click="handleAdd"><i class="el-icon-plus"></i>新增</iep-button>
    </operation-wrapper>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection>
      <el-table-column label="创建人" width="250px" v-if="record.type =='3'">
        <template>
          <div class=' line'>
            <iep-img-avatar :size="30" :src="userInfo.avatar" alt="头像"></iep-img-avatar>
          </div>
          <div class='create-name line'>
            {{userInfo.realName}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="200px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" type="warning" plain :disabled="scope.row.userId !== userInfo.userId">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" :disabled="scope.row.userId !== userInfo.userId">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <edit-dialog ref="EditDialog" @load-page="loadPage"></edit-dialog>
    <visit-dialog ref="VisitDialog" @load-page="loadPage"></visit-dialog>
  </div>
</template> 

<script>
import mixins from '@/mixins/mixins'
import { fetchVisitLog, deleteVisitLog, updateVisitLog, createVisitLog, fetchVisitLogById } from '@/api/crms/visiting_record'
import { visitColumnsMap } from './options'
import EditDialog from './EditDialog'
import VisitDialog from './VisitDialog'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  props: ['record'],
  components: { EditDialog, VisitDialog },
  data () {
    return {
      id: this.record.id,
      columnsMap: visitColumnsMap,
      dialogShow: false,
      data: '',
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    handleAdd () {
      this.$refs['VisitDialog'].dialogShow = true
      this.$refs['VisitDialog'].methodName = '保存'
      this.$refs['VisitDialog'].formRequestFn = createVisitLog
      this.$refs['VisitDialog'].id = this.id
    },
    handleEdit (row) {
      fetchVisitLogById({ id: row.id }).then(res => {
        this.data = res.data.data
      })
      this.$refs['VisitDialog'].formData = { ...row }
      this.$refs['VisitDialog'].formData.meetingContent = this.data.meetingContent
      this.$refs['VisitDialog'].dialogShow = true
      this.$refs['VisitDialog'].methodName = '保存'
      this.$refs['VisitDialog'].id = this.id
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
