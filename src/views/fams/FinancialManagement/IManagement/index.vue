<template>
  <div>
    <basic-container>
      <page-header title="收入管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleIncome()" type="danger" icon="el-icon-plus" plain>添加收入</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <template slot="before-columns">
          <el-table-column label="时间">
            <template slot-scope="scope">{{scope.row.createTime | parseToDay}}</template>
          </el-table-column>
        </template>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <dialog-detail ref="DialogDetail" @load-page="loadPage"></dialog-detail>
  </div>
</template>
<script>
import { getIncomePage, postIncome, getIncomeById } from '@/api/fams/income'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap, initForm } from './options'
import DialogForm from './DialogForm'
import DialogDetail from './DialogDetail'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  components: { DialogForm, DialogDetail },
  data () {
    return {
      dictsMap,
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
    handleDetail (row) {
      getIncomeById(row.incomeId).then(({ data }) => {
        console.log(data.data)
        this.$refs['DialogDetail'].form = data.data
        this.$refs['DialogDetail'].dialogShow = true
      })
    },
    handleIncome () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].formRequestFn = postIncome
      this.$refs['DialogForm'].form.orgId = this.userInfo.orgId
      this.$refs['DialogForm'].form.invoiceOrgId = this.userInfo.orgId
      this.$refs['DialogForm'].form.orgName = this.userInfo.orgName
      this.$refs['DialogForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getIncomePage)
    },
  },
}
</script>
