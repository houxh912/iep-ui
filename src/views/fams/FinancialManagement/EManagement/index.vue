<template>
  <div>
    <basic-container>
      <iep-page-header title="支出管理" :replaceText="replaceText" :data="statistics"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleExpenditure()" type="primary" icon="el-icon-plus" plain>添加支出</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="remarks"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column prop="operation" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleDetail(scope.row)" type="warning" plain>查看</iep-button>
              <iep-button v-if="isQichizhi" @click="handleEditProject(scope.row)">修改</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <dialog-detail ref="DialogDetail" @load-page="loadPage"></dialog-detail>
    <relation-dialog-form ref="RelationDialogForm" @load-page="loadPage"></relation-dialog-form>
  </div>
</template>
<script>
import { getExpenditurePage, postExpenditure } from '@/api/fams/expenditure'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap, initForm } from './options'
import DialogForm from './DialogForm'
import RelationDialogForm from './RelationDialogForm'
import DialogDetail from './DialogDetail'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  components: { DialogForm, DialogDetail, RelationDialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      statistics: [0, 0, 0],
      replaceText: (data) => `（现金支出：${data[0]}元，银行存款支出${data[1]}元，总计支出${data[2]}元）`,
    }
  },
  computed: {
    isQichizhi () {
      return [207, 1].includes(this.userInfo.userId)
    },
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleEditProject (row) {
      this.$refs['RelationDialogForm'].id = row.expenditureId
      this.$refs['RelationDialogForm'].loadPage()
      this.$refs['RelationDialogForm'].dialogShow = true
    },
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
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, getExpenditurePage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>
