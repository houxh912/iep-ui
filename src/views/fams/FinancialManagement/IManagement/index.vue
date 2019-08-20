<template>
  <div>
    <basic-container>
      <iep-page-header title="收入管理" :replaceText="replaceText" :data="statistics"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleIncome()" type="primary" icon="el-icon-plus" plain>添加收入</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column prop="operation" label="操作" width="300" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleDetail(scope.row)" type="warning" plain>查看</iep-button>
              <iep-button v-if="isQichizhi" @click="handleEditProject(scope.row)">修改</iep-button>
              <iep-button v-if="scope.row.projectStatus===2" @click.stop="handleProcess(scope.row)">待处理</iep-button>
              <iep-button v-if="scope.row.projectStatus===2" @click.stop="handleIssued(scope.row)">提成发放</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <dialog-detail ref="DialogDetail" @load-page="loadPage"></dialog-detail>
    <project-form ref="ProjectForm" @load-page="loadPage"></project-form>
    <issued-form ref="IssuedForm" @load-page="loadPage"></issued-form>
    <relation-dialog-form ref="RelationDialogForm" @load-page="loadPage"></relation-dialog-form>
  </div>
</template>
<script>
import { getIncomePage, postIncome, getIncomeById } from '@/api/fams/income'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap, initForm } from './options'
import DialogForm from './DialogForm'
import ProjectForm from './ProjectForm'
import RelationDialogForm from './RelationDialogForm'
import IssuedForm from './IssuedForm'
import DialogDetail from './DialogDetail'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  components: { DialogForm, DialogDetail, ProjectForm, IssuedForm, RelationDialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      statistics: [0, 0, 0],
      replaceText: (data) => `（现金收入：${data[0]}元，银行存款收入${data[1]}元，总计收入${data[2]}元）`,
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
      this.$refs['RelationDialogForm'].id = row.incomeId
      this.$refs['RelationDialogForm'].loadPage()
      this.$refs['RelationDialogForm'].dialogShow = true
    },
    handleProcess (row) {
      this.$refs['ProjectForm'].incomeId = row.incomeId
      this.$refs['ProjectForm'].actualRepayment = row.amount
      this.$refs['ProjectForm'].dateCash = row.createTime
      this.$refs['ProjectForm'].loadPage(row.projectId)
      this.$refs['ProjectForm'].dialogShow = true
    },
    handleIssued (row) {
      this.$refs['IssuedForm'].incomeId = row.incomeId
      this.$refs['IssuedForm'].projectId = row.projectId
      this.$refs['IssuedForm'].actualRepayment = row.amount
      this.$refs['IssuedForm'].dateCash = row.createTime
      this.$refs['IssuedForm'].loadPage()
      this.$refs['IssuedForm'].dialogShow = true
    },
    handleDetail (row) {
      getIncomeById(row.incomeId).then(({ data }) => {
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
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, getIncomePage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>
