<template>
  <div>
    <basic-container>
      <iep-page-header title="组织管理"></iep-page-header>
      <operation-container>
        <template slot="left">
          <!-- <iep-button v-if="sys_org_add" @click="handleAdd" type="primary" plain>添加组织</iep-button> -->
          <iep-button @click="handleReviewDialog" type="primary" plain>批量审核</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="orgName">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="sys_org_edit" type="warning" @click="handleEdit(scope.row)" plain>编辑</iep-button>
              <!-- <iep-button @click="handlePerson(scope.row, scope.index)">人员</iep-button> -->
              <iep-button v-if="scope.row.status === 1" type="default" @click="handleReviewDialog(scope.row, scope.index)">审核</iep-button>
              <iep-button v-if="sys_org_del" @click="handleDeleteById(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <person-dialog-form ref="personDialogForm" @load-page="loadPage"></person-dialog-form>
    <iep-review-confirm is-inverse ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import DialogForm from './DialogForm'
import PersonDialogForm from './PersonDialogForm'
import { addObj, putObj, delObj, fetchList, reviewById } from '@/api/admin/org'
import { dictsMap, columnsMap, initForm, initOrgSearchForm } from './options'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  components: { DialogForm, PersonDialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initOrgSearchForm(),
      sys_org_add: false,
      sys_org_edit: false,
      sys_org_del: false,
    }
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.sys_org_add = this.permissions['sys_org_add']
    this.sys_org_edit = this.permissions['sys_org_edit']
    this.sys_org_del = this.permissions['sys_org_del']
    this.loadPage()
  },
  methods: {
    clearSearchParam () {
      this.paramForm = initOrgSearchForm()
    },
    handlePerson (row) {
      this.$refs['personDialogForm'].orgId = row.orgId
      this.$refs['personDialogForm'].dialogShow = true
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.orgId, delObj)
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].methodName = '修改'
      this.$refs['DialogForm'].formRequestFn = putObj
      this.$refs['DialogForm'].dialogShow = true
    },
    handleAdd () {
      this.$refs['DialogForm'].methodName = '创建'
      this.$refs['DialogForm'].formRequestFn = addObj
      this.$refs['DialogForm'].dialogShow = true
    },
    handleReviewDialog (row) {
      if (row.orgId) {
        this.$refs['iepReviewForm'].id = row.orgId
      } else {
        // TODO: 是否多选提醒
        if (!this.multipleSelection.length) {
          this.$message('请先选择需要的选项')
          return
        }
        this.$refs['iepReviewForm'].ids = this.multipleSelection
      }
      this.$refs['iepReviewForm'].title = '审核'
      this.$refs['iepReviewForm'].formRequestFn = reviewById
      this.$refs['iepReviewForm'].status = 0
      this.$refs['iepReviewForm'].dialogShow = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.orgId)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, fetchList)
    },
  },
}
</script>
