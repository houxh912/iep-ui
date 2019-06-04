<template>
  <div class="modules">
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd()" type="primary" plain>新建模版</iep-button>
        <!-- <iep-button type="default" plain @click.native="handleDeleteBatch">删除</iep-button> -->
      </template>
      <template slot="right">
        <operation-search @search="searchPage" advance-search>
          <el-form :model="paramForm" label-width="80px" size="mini">
            <el-form-item label="模板名称">
              <el-input v-model="paramForm.assessName"></el-input>
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
            <iep-button @click="handleEdit(scope.row)" type="warning" plain :disabled="scope.row.status==1">修改</iep-button>
            <iep-button @click="handleDelete(scope.row)" :disabled="scope.row.status==1">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>

<script>
import { getTemplatePage, deleteTemplateById, createTemplate, updateTemplate, getTemplateById } from '@/api/hrms/template'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from '../options'
import DialogForm from './DialogForm'

export default {
  mixins: [mixins],
  components: { DialogForm },
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
      this.$refs['DialogForm'].formRequestFn = createTemplate
      this.$refs['DialogForm'].dialogShow = true
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deleteTemplateById)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.templateId, deleteTemplateById)
    },
    handleEdit (row) {
      getTemplateById(row.templateId).then(({data}) => {
        this.$refs['DialogForm'].form = data.data
        this.$refs['DialogForm'].methodName = '修改'
        this.$refs['DialogForm'].formRequestFn = updateTemplate
        this.$refs['DialogForm'].dialogShow = true
      })
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getTemplatePage)
    },
  },
}
</script>
