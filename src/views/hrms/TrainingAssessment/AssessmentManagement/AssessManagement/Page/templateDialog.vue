<template>
  <iep-dialog :dialog-show="dialogShow" title="关联考核模板" width="550px" @close="resetForm">
    
    <div class="search">
      <el-input v-model="searchForm.templateName"><el-button slot="append" icon="el-icon-search" @click="loadPage"></el-button></el-input>
    </div>
    <iep-table
      :isLoadTable="isLoadTable"
      :pagination="pagination" 
      :columnsMap="columnsMap" 
      :pagedTable="pagedTable" 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" >
        <el-table-column prop="operation" label="操作" width="150">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleSelect(scope.row)" size="small" :type="templateId == scope.row.templateId ? 'warning' : ''" plain>{{templateId == scope.row.templateId ? '已选中' : '选择'}}</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>

    <template slot="footer">
      <iep-button type="primary" @click="submitForm">确定</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from '@/mixins/mixins'
import { getTemplatePage } from '@/api/hrms/template'

export default {
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      pagedTable: [],
      columnsMap: [
        {
          label: '模板名称',
          prop: 'templateName',
        }, {
          label: '考核分数',
          prop: 'score',
        },
      ],
      templateId: '',
      templateName: '',
      searchForm: {
        templateName: '',
      },
    }
  },
  methods: {
    resetForm () {
      this.dialogShow = false
    },
    open (id, name) {
      this.dialogShow = true
      this.templateId = id
      this.templateName = name
      this.loadPage()
    },
    loadPage (param = {}) {
      this.loadTable(Object.assign({}, param, this.searchForm), getTemplatePage)
    },
    handleSelect (row) {
      if (this.templateId == row.templateId) {
        this.templateId = ''
        this.templateName = ''
      } else {
        this.templateId = row.templateId
        this.templateName = row.templateName
      }
    },
    submitForm () {
      this.$emit('template-success', this.templateId, this.templateName)
      this.dialogShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  margin-bottom: 20px;
}
</style>
