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
            <el-popover placement="left" width="400" trigger="hover" @show="handleDetail(scope.row)">
              <el-card shadow="never">
                <div slot="header" class="clearfix">
                  <span>模板内容</span>
                </div>
                <iep-html :value="content"></iep-html>
              </el-card>
              <iep-button slot="reference" type="warning" plain>查看</iep-button>
            </el-popover>
            <iep-button @click="handleSelect(scope.row)" plain>选择</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>

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
    },
    async handleSelect (row) {
      const { data } = await getTemplateById(row.templateId)
      this.$emit('fill-content', data.data.content)
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

