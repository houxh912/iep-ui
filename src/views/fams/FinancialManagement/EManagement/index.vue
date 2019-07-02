<template>
  <div>
    <basic-container>
      <page-header title="支出管理" class="data-title"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleExpenditure()" type="danger" icon="el-icon-plus" plain>添加支出</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="remarks"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <dialog-detail ref="DialogDetail" @load-page="loadPage"></dialog-detail>
  </div>
</template>
<script>
import { getExpenditurePage, postExpenditure } from '@/api/fams/expenditure'
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
      this.$refs['DialogDetail'].id = row.expenditureId
      this.$refs['DialogDetail'].loadPage()
      this.$refs['DialogDetail'].dialogShow = true
    },
    handleExpenditure () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].formRequestFn = postExpenditure
      this.$refs['DialogForm'].form.orgId = this.userInfo.orgId
      this.$refs['DialogForm'].form.invoiceOrgId = this.userInfo.orgId
      this.$refs['DialogForm'].form.orgName = this.userInfo.orgName
      this.$refs['DialogForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getExpenditurePage)
    },
  },
}
</script>
