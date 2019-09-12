<template>
  <div>
    <basic-container>
      <iep-page-header title="模板管理"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" @click="handleAdd" plain>添加模板</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleEdit(scope.row)" plain>编辑</iep-button>
              <iep-button @click="handleDel(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>

<script>
import { getTemplatePage, postTemplate, putTemplate, deleteTemplateById, getTemplateById } from '@/api/ims/common'
import mixins from '@/mixins/mixins'
import { initForm } from './options'
import DialogForm from './DialogForm'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap: [
        {
          prop: 'templateId',
          label: '序号',
        },
        {
          prop: 'name',
          label: '模板名称',
        },
        {
          prop: 'createTime',
          label: '创建时间',
          type: 'date',
          formatString: 'YYYY-MM-DD',
        },
        {
          prop: 'updateTime',
          label: '更新时间',
          type: 'date',
          formatString: 'YYYY-MM-DD',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].formRequestFn = postTemplate
      this.$refs['DialogForm'].dialogShow = true
    },
    handleDel (row) {
      this._handleGlobalDeleteById(row.templateId, deleteTemplateById, getTemplateById)
    },
    async handleEdit (row) {
      const { data } = await getTemplateById(row.templateId)
      this.$refs['DialogForm'].form = { ...data.data }
      this.$refs['DialogForm'].formRequestFn = putTemplate
      this.$refs['DialogForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, typeId: 1 }, getTemplatePage)
    },
  },
}
</script>
