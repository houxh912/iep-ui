<template>
  <iep-dialog :dialog-show="dialogShow" title="选择模板" width="60%" @close="resetForm">
    <basic-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :isPagination="false" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template>
          <el-table-column label="模板名称">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              {{scope.row.createTime | parseToDay}}
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleSelect(scope.row)">选择</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <module-detail ref="modeleDetail"></module-detail>
  </iep-dialog>
</template>
<script>
import ModuleDetail from './moduleDetail'
// import { columnsMap, dictsMap } from '../../ModelManagement/options'
import mixins from '@/mixins/mixins'
import { getPage } from '@/api/ims/module_management'
export default {
  mixins: [mixins],
  components: {
    ModuleDetail,
  },
  data () {
    return {
      dialogShow: false,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    resetForm () {
      this.dialogShow = false
    },
    handleDetail (row) {
      this.$refs['modeleDetail'].templateId = row.templateId
      this.$refs['modeleDetail'].dialogShow = true
      this.$refs['modeleDetail'].loadPage()
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, getPage)
    },
  },
}
</script>
