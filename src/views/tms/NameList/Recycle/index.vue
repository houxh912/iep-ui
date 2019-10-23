<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button icon="el-icon-delete" @click="handleMoreDelete">删除</iep-button>
      </template>
      <template slot="right">
        <operation-search prop="name" advance-search @search-page="searchPage" placeholder="请输入名称进行搜索">
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection :dictsMap="dictsMap" @selection-change="selectionChange">
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleRecovery(scope.row)">撤销</iep-button>
            <iep-button @click="handleRealDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>>
<script>
import { columnsMap, dictsMap } from '../options'
import mixins from '@/mixins/mixins'
import AdvanceSearch from '../Whole/AdvanceSearch'
import { pageRecycleList, deleteRealPageById, recoveryById, deleteMoreRealPage } from '@/api/admin/name_list'

export default {
  components: { AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      isLoadTable: false,
      dictsMap,
      columnsMap,
      multipleSelection: '',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleRealDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteRealPageById)
    },
    selectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleRecovery (row) {
      recoveryById(row.id).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: '撤销成功',
            type: 'success',
          })
          this.loadPage()
        } else {
          this.$message(data.msg)
        }
      })
    },
    handleMoreDelete () {
      deleteMoreRealPage(this.multipleSelection).then(() => {
        this.loadPage()
      })
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, pageRecycleList)
    },
  },
}
</script>>