<template>
  <div class="fund">
    <div class="content">
      <el-card shadow="never">
        <operation-container>
          <template slot="left">
            <span class="sub-title">项目核算</span>
          </template>
          <template slot="right">
            <operation-search @search-page="searchPage" prop="projectName" placeholder="请输入项目名称进行搜索"></operation-search>
          </template>
        </operation-container>
        <iep-divider />
        <div class="chart">
          <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange"></iep-table>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getProjectPage, getProjectPageByOrgId } from '@/api/fams/statistics'
import mixins from '@/mixins/mixins'
import { mapGetters } from 'vuex'
const columnsMap = [
  {
    prop: 'projectNum',
    label: '项目编号',
  },
  {
    prop: 'projectName',
    label: '项目名称',
  },
  {
    prop: 'createTime',
    label: '创建时间',
  },
  {
    prop: 'amount',
    label: '合同金额',
  },
  {
    prop: 'invoicingAmount',
    label: '开票金额',
  },
]
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      userId: '',
      orgId: '',
      isLoadTable: false,
    }
  },
  created () {
    this.userId = this.userInfo.userId
    this.orgId = this.userInfo.orgId
    this.loadPage()
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    isAbled () {
      return this.userInfo.userId === 1 || this.userInfo.userId === 2 || this.userInfo.userId === 3 || this.userInfo.userId === 451
    },
  },
  methods: {
    async loadPage (param = this.searchForm) {
      const pageFunction = this.isAbled ? getProjectPageByOrgId(this.orgId) : getProjectPage
      await this.loadTable(param, pageFunction)
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
.fund {
  .sub-title {
    font-size: 16px;
  }
  .chart {
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 25px;
    grid-column-gap: 25px;
    // grid-template-columns: minmax(100px, 5fr) minmax(100px, 2fr);
  }
}
</style>
<style lang="scss" scoped>
.fund ::v-deep .time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
}
.fund ::v-deep .time .el-button {
  padding: 5px 20px;
}
.fund ::v-deep .time .el-button.active,
.fund ::v-deep .time .el-button:focus {
  border-color: $--menu-color-primary;
  color: $--menu-color-primary;
}
.fund ::v-deep .block {
  width: 200px;
}
.fund ::v-deep .el-date-editor.el-input__inner {
  width: 100%;
}
.fund ::v-deep .el-card__body {
  height: 100%;
}
</style>

