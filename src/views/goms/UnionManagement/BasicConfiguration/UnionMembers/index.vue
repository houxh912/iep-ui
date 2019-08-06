<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAddOrg" type="primary" plain>添加组织</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage" prop="orgName">
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column prop="operation" label="操作" width="200">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" @click="handleEdit(scope.row)" plain>编辑</iep-button>
            <iep-button @click="handleRemoveOrg(scope.row)">移除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <add-org-dialog-form ref="AddOrgDialogForm" @load-page="loadPage"></add-org-dialog-form>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getUnionOrgPage, removeOrgById, addOrgById } from '@/api/goms/union'
import { putObj } from '@/api/admin/org'
import AddOrgDialogForm from './AddOrgDialogForm'
import DialogForm from './DialogForm'
import mixins from '@/mixins/mixins'
import { columnsMap, initForm } from './options'
export default {
  components: { AddOrgDialogForm, DialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      orgList: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].formRequestFn = putObj
      this.$refs['DialogForm'].dialogShow = true
    },
    handleRemoveOrg (id) {
      this._handleComfirm(id, removeOrgById, '移除组织')
    },
    handleAddOrg () {
      this.$refs['AddOrgDialogForm'].formRequestFn = addOrgById
      this.$refs['AddOrgDialogForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getUnionOrgPage)
    },
  },
}
</script>
