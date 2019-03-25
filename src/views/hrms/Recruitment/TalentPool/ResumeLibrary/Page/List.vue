<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleToTalentBatch" type="danger" icon="el-icon-plus" plain>放入人才库</iep-button>
        <el-dropdown size="medium">
          <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleDeleteBatch">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage" advance-search>
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
      <template slot="before-columns">
        <el-table-column label="姓名" width="90px">
          <template slot-scope="scope">
            <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click="handleToTalent(scope.row)">放入人才库</iep-button>
            <iep-button @click="handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import { getResumeLibraryPage, deleteTalentPoolById, deleteTalentPoolBatch, postToTalent } from '@/api/hrms/talent_pool'
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
import { columnsMap } from '../options'
export default {
  components: { AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleToTalentBatch () {
      this._handleComfirm(this.multipleSelection, postToTalent, '放入人才库')
    },
    handleToTalent (row) {
      this._handleComfirm([row.id], postToTalent, '放入人才库')
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deleteTalentPoolBatch)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteTalentPoolById)
    },
    handleAdd () {
      this.$emit('onEdit')
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getResumeLibraryPage)
    },
  },
}
</script>
