<template>
  <div>
    <basic-container>
      <iep-page-header title="联盟组织"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAddOrg" type="primary" plain>批量添加组织</iep-button>
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
    </basic-container>
    <multiple-form ref="MultipleForm" @load-page="loadPage"></multiple-form>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { putObj } from '@/api/admin/org'
import { getUnionOrgPage, removeOrgById, getNotInUnionOrgPage, addOrgByIds } from '@/api/goms/union'
import MultipleForm from '@/views/goms/Components/MultipleForm.vue'
import DialogForm from './DialogForm'
import { columnsMap, initForm } from './options'
export default {
  components: { MultipleForm, DialogForm },
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
    handleRemoveOrg (row) {
      this._handleComfirm(row.orgId, removeOrgById, '移除组织')
    },
    handleAddOrg () {
      this.$refs['MultipleForm'].selectList = []
      this.$refs['MultipleForm'].searchForm = {}
      this.$refs['MultipleForm'].putRequestFunction = addOrgByIds
      this.$refs['MultipleForm'].getRequestFunction = getNotInUnionOrgPage
      this.$refs['MultipleForm'].loadPage()
      this.$refs['MultipleForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getUnionOrgPage)
    },
  },
}
</script>
