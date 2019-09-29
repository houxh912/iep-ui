<template>
  <iep-dialog :dialog-show="dialogShow" title="选择模板" width="800px" @close="close" @slot-mounted="loadPage">

    <operation-container>
      <template slot="right">
        <operation-search @search-page="searchPage">
        </operation-search>
      </template>
    </operation-container>

    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" @click="handleDetail(scope.row)" plain>查看</iep-button>
            <iep-button @click="handleSelect(scope.row)" plain>选择</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <iep-dialog :dialog-show="dialogShow1" title="查看模板" width="800px" @close="dialogShow1=false">
      <iep-html class="template-content iep-basic-scroll" :value="content"></iep-html>
    </iep-dialog>
  </iep-dialog>
</template>
<script>
import mixins from '@/mixins/mixins'
import {
  getTemplatePage,
  getTemplateById,
} from '@/api/ims/common'
export default {
  mixins: [mixins],
  data () {
    return {
      content: '',
      dialogShow1: false,
      dialogShow: false,
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
  methods: {
    async handleDetail (row) {
      const { data } = await getTemplateById(row.templateId)
      this.content = data.data.content
      this.dialogShow1 = true
    },
    async handleSelect (row) {
      const { data } = await getTemplateById(row.templateId)
      console.log(data)
      this.$emit('fill-content', data.data.content)
      this.close()
    },
    close () {
      this.dialogShow = false
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, typeId: 1 }, getTemplatePage)
    },
  },
}
</script>

<style lang="scss" scoped>
.template-content {
  max-height: 300px;
}
</style>
