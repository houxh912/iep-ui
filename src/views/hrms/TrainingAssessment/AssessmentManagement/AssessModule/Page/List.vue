<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd()" type="danger" icon="el-icon-plus" plain>新增</iep-button>
        <iep-button type="default" plain @click.native="handleDeleteBatch">删除</iep-button>
      </template>
      <template slot="right">
        <operation-search @search="searchPage" advance-search>
          <el-form :model="paramForm" label-width="80px" size="mini">
            <el-form-item label="模板名称">
              <el-input v-model="paramForm.templateName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchPage">搜索</el-button>
              <el-button @click="clearSearchParam">清空</el-button>
            </el-form-item>
          </el-form>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
      <template slot="before-columns">
        <el-table-column label="模板名称">
          <template slot-scope="scope">
            <iep-table-link @click="handleDetail(scope.row)">{{scope.row.templateName}}</iep-table-link>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" type="warning" plain>修改</iep-button>
            <iep-button @click="handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <template-dialog ref="TemplateDialog" @load-page="loadPage"></template-dialog>
    <edit-dialog ref="EditDialog" @load-page="loadPage"></edit-dialog>
  </div>
</template>
<script>
import { getAssessmentManagementPage, postAssessmentManagement, deletePublishRecruitmentById, deletePublishRecruitment } from '@/api/hrms/assessment_management'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from '../options'
import TemplateDialog from './TemplateDialog'
import EditDialog from './EditDialog'
export default {
  mixins: [mixins],
  components: { TemplateDialog, EditDialog },
  data () {
    return {
      columnsMap,
      paramForm: initSearchForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['TemplateDialog'].formRequestFn = postAssessmentManagement
      this.$refs['TemplateDialog'].dialogShow = true
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deletePublishRecruitment)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deletePublishRecruitmentById)
    },
    handleEdit (row) {
      this.$refs['EditDialog'].form.id = row.id
      this.$refs['EditDialog'].formRequestFn = postAssessmentManagement
      this.$refs['EditDialog'].dialogShow = true
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getAssessmentManagementPage)
    },
  },
}
</script>
