<template>
  <div>
    <basic-container>
      <iep-page-header title="光彩国脉人" :replaceText="replaceText" :data="statistics"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" plain @click="handleAdd" icon="el-icon-plus">新增</iep-button>
        </template>
        <template slot="right">
          <operation-search>
            <!-- <advance-search @search-page="searchPage"></advance-search> -->
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
        </template>
        <el-table-column prop="operation" label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)" type="warning" plain>编辑</iep-button>
              <iep-button @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getGloriousPeoplePage, postGloriousPeopleCreate, deleteGloriousPeople, updateGloriousPeople } from '@/api/hrms/event_selection'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm, dictsMap } from './options'
import DialogForm from './DialogForm'
export default {
  mixins: [mixins],
  components: { DialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
      statistics: [20],
      replaceText: (data) => `（共${data[0]}条）`,
      pagedTable: [
      ],
    }
  },
  created () {
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].formRequestFn = postGloriousPeopleCreate
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].methodName = '新增'
    },
    handleEdit (row) {
      this.$refs['DialogForm'].id = row.splendorId
      this.$refs['DialogForm'].formRequestFn = updateGloriousPeople
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].loadTypeList()
      this.$refs['DialogForm'].methodName = '编辑'
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.splendorId, deleteGloriousPeople)
    },
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, getGloriousPeoplePage)
      this.$set(this.statistics, 0, data.total)
    },
  },
}
</script>