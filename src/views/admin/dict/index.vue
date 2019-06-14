<template>
  <div class="execution">
    <basic-container>
      <page-header title="字典管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" @click="handleAdd()" icon="el-icon-plus" plain>添加字典</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleChild(scope.row, scope.index)" icon="el-icon-plus" plain>子项
              </iep-button>
              <iep-button v-if="permissions.sys_dict_edit" @click="handleEdit(scope.row)" plain>编辑
              </iep-button>
              <iep-button v-if="permissions.sys_dict_del" @click="handleDeleteById(scope.row)" plain>删除
              </iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <child-form ref="ChildForm" @load-page="loadPage"></child-form>
  </div>
</template>

<script>
import { addObj, delObj, fetchList, putObj } from '@/api/admin/dict'
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
import ChildForm from './ChildForm'
import AdvanceSearch from './AdvanceSearch'
import { columnsMap, initMemberForm } from './options'

export default {
  name: 'DictPage',
  components: { DialogForm, ChildForm, AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].methodName = '添加'
      this.$refs['DialogForm'].formRequestFn = addObj
      this.$refs['DialogForm'].disabled = false
      this.$refs['DialogForm'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initMemberForm(), row)
      this.$refs['DialogForm'].methodName = '编辑'
      this.$refs['DialogForm'].formRequestFn = putObj
      this.$refs['DialogForm'].disabled = false
      this.$refs['DialogForm'].dialogShow = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.userId)
    },
    handleChild (row) {
      this.$refs['ChildForm'].id = row.id
      this.$refs['ChildForm'].dialogShow = true
      this.$refs['ChildForm'].loadPage()
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, fetchList)
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, delObj)
    },
  },
}
</script>