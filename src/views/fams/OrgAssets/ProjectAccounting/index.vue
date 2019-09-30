<template>
  <div>
    <basic-container>
      <iep-statistics-header :title="title" :dataMap="financialData">
        <template slot="left">
          <iep-tip icon="el-icon-question" content="待签项目金额为未签订合同的项目金额（包括历史项目）<br/>
                            合同金额：已经签订合同的项目金额（包括历史项目）<br/>
                            到账金额：已经到账的项目金额（历史项目除外）
                            未到账金额：签订合同后未到账的金额<br/>
                            开票金额：已经开发票的项目金额（历史项目除外）<br/>
                            应收账款金额：已经开发票的未到账的项目金额（历史项目除外）"></iep-tip>
        </template>
        <template slot="right">
          <operation-wrapper>
            <iep-button type="primary" @click="$openPage(`/fams_spa/org_payment_plan/0`)" plain>查看回款计划</iep-button>
            <iep-button @click="$openPage(`/fams_spa/business_indicator`)">本组织业务指标</iep-button>
          </operation-wrapper>
        </template>
      </iep-statistics-header>
      <operation-container style="margin-top: 10px;">
        <template slot="left">
          <!-- <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增业务指标</iep-button> -->
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="projectName" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <template slot="before-columns">
          <el-table-column label="项目编号" width="120px">
            <template slot-scope="scope">
              <iep-div-detail :value="scope.row.projectNum"></iep-div-detail>
            </template>
          </el-table-column>
          <el-table-column label="项目名称" width="250px">
            <template slot-scope="scope">
              <iep-div-detail :value="scope.row.projectName">
              </iep-div-detail>
              <a-tag v-if="scope.row.isHistory===2" color="orange">历</a-tag>
              <a-tag v-if="scope.row.projectType==='1'" color="pink">内</a-tag>
              <a-tag v-if="scope.row.isHistory===1 && scope.row.amount!==scope.row.projectIncome" color="red">未结清</a-tag>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="项目金额(预)" width="120px">
          <template slot-scope="scope">
            <iep-div-detail :value="项目金额(scope.row)"></iep-div-detail>
          </template>
        </el-table-column>
        <el-table-column label="合同金额">
          <template slot-scope="scope">
            <iep-div-detail :value="scope.row.amount"></iep-div-detail>
          </template>
        </el-table-column>
        <el-table-column label="开票金额">
          <template slot-scope="scope">
            <iep-div-detail :value="开票金额(scope.row)"></iep-div-detail>
          </template>
        </el-table-column>
        <el-table-column label="到账金额">
          <template slot-scope="scope">
            <iep-div-detail :value="到账金额(scope.row)"></iep-div-detail>
          </template>
        </el-table-column>
        <el-table-column label="开票应收账款金额" width="150px">
          <template slot-scope="scope">
            <iep-div-detail :value="应收账款金额(scope.row)"></iep-div-detail>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getProjectPage, getProjectPageByOrgId } from '@/api/fams/statistics'
import mixins from '@/mixins/mixins'
import { columnsMap, initForm } from './options'
import AdvanceSearch from './AdvanceSearch'
function initStatistics () {
  return [0, 0, 0, 0, 0, 0, 0]
}
export default {
  components: {
    AdvanceSearch,
  },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      statistics: initStatistics(),
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
    title () {
      const { name } = this.$route.query
      return name ? `项目核算(${name})` : '项目核算'
    },
    financialData () {
      return {
        '待签项目总金额': this.statistics[0],
        '合同总金额': this.statistics[1],
        '到账总金额': this.statistics[2],
        '未到账总金额': this.statistics[3],
        '开票总金额': this.statistics[4],
        '开票应收账款': this.statistics[5],
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    项目金额 (row) {
      if (row.isHistory === 2) {
        return row.amount
      } else {
        return row.projectAmount
      }
    },
    开票金额 (row) {
      if (row.isHistory === 2) {
        return row.amount
      } else {
        return row.invoicingAmount
      }
    },
    到账金额 (row) {
      if (row.isHistory === 2) {
        return row.amount
      } else {
        return row.projectIncome
      }
    },
    应收账款金额 (row) {
      if (row.isHistory === 2) {
        return 0
      } else {
        return !row.invoicingAmount ? '暂无' : (row.invoicingAmount - (row.projectIncome || 0))
      }
    },
    handleAdd () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].dialogShow = true
    },
    async loadPage (param = this.searchForm) {
      const pageFunction = this.id ? getProjectPageByOrgId(this.id) : getProjectPage
      const data = await this.loadTable(param, pageFunction)
      this.statistics = this.$fillStatisticsArray(initStatistics(), data.statistics)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/project_accounting/${row.id}`,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.ant-tag {
  margin-left: 5px;
  color: $--color-primary;
  background: #f8e8e9;
  border-color: #e3a4a6;
}
</style>
