<template>
  <div>
    <operation-wrapper>
      <iep-button class="btn" type="primary" plain @click="handleAdd"><i class="el-icon-plus"></i>新增</iep-button>
    </operation-wrapper>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection>
      <el-table-column prop="operation" label="操作" width="200px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" type="warning" plain :disabled="scope.row.creatorId !== userInfo.userId">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" :disabled="scope.row.creatorId !== userInfo.userId">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <edit-dialog ref="EditDialog" @load-page="loadPage"></edit-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { fetchVisitList, deleteVisit, updateVisit, createVisit } from '@/api/crms/visiting_record'
import { columnsMap } from './options'
import EditDialog from './EditDialog'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  props: ['record'],
  components: { EditDialog },
  data () {
    return {
      columnsMap,
      id: this.record.id,
      userId: '',
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
    loadPage (param = { ...this.searchForm, id: this.id }) {
      this.loadTable(param, fetchVisitList)
    },
    handleAdd () {
      this.$refs['EditDialog'].dialogShow = true
      this.$refs['EditDialog'].methodName = '新增'
      this.$refs['EditDialog'].submitFn = createVisit
      this.$refs['EditDialog'].id = this.id
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
.el-tabs__item {
  height: 30px !important;
}
</style>
