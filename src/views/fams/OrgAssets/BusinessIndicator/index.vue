<template>
  <div>
    <basic-container>
      <iep-page-header title="业务指标"></iep-page-header>
      <operation-container style="margin-top: 10px;">
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增业务指标</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <template slot="before-columns">
          <el-table-column label="时间">
            <template slot-scope="scope">
              {{scope.row.businessYear + '年' + scope.row.businessMonth + '月'}}
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <iep-button @click.stop="handleEdit(scope.row)">编辑</iep-button>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOrgProjectPage } from '@/api/fams/statistics'
import DialogForm from './DialogForm'
import AdvanceSearch from './AdvanceSearch'
import mixins from '@/mixins/mixins'
import { columnsMap, initForm } from './options'
export default {
  components: { DialogForm, AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].form.orgId = this.userInfo.orgId
      this.$refs['DialogForm'].isEdit = false
      this.$refs['DialogForm'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = { ...row }
      this.$refs['DialogForm'].isEdit = true
      this.$refs['DialogForm'].dialogShow = true
    },
    handleDetail (row) {
      this.$openPage(`/fams_spa/project/${row.orgId}?name=${row.orgName}`)
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, getOrgProjectPage)
    },
  },
}
</script>
<style scoped>
</style>
