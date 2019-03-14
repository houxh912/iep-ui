<template>
  <div>
    <basic-container>
      <page-header title="员工" :replaceText="replaceText" :data="[10 ,5, 1]"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleHeaderSetting">表头设置</iep-button>
          <el-dropdown size="medium">
            <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>导入</el-dropdown-item>
              <el-dropdown-item>导出</el-dropdown-item>
              <el-dropdown-item>分享</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <advance-search :form="paramForm" @search-page="searchPage" @clear-search-param="clearSearchParam"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="currentColumnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="姓名" width="90px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <el-dropdown size="medium">
                <iep-button plain>
                  变更<i class="el-icon-arrow-down el-icon--right"></i>
                </iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleInduction(scope.row)">入职</el-dropdown-item>
                  <el-dropdown-item @click.native="handelPositive(scope.row)">转正</el-dropdown-item>
                  <el-dropdown-item @click.native="handleTransfer(scope.row)">调动</el-dropdown-item>
                  <el-dropdown-item @click.native="handleDeparture(scope.row)">离职</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <iep-button @click="handleOpenGrowthFile(scope.row)">成长档案</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>修改</el-dropdown-item>
                  <el-dropdown-item>分享</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <header-setting ref="HeaderSetting" :default-columns-label="defaultColumnsLabel" @load-page="loadPage" @save="setHeaderSetting"></header-setting>
    <transfer-dialog ref="TransferDialog" @load-page="loadPage"></transfer-dialog>
    <departure-dialog ref="DepartureDialog" @load-page="loadPage"></departure-dialog>
    <induction-dialog ref="InductionDialog" @load-page="loadPage"></induction-dialog>
    <positive-dialog ref="PositiveDialog" @load-page="loadPage"></positive-dialog>
  </div>
</template>
<script>
import { getEmployeeProfilePage, postInduction, postPositive, postDeparture } from '@/api/hrms/employee_profile'
import mixins from '@/mixins/mixins'
import keyBy from 'lodash/keyBy'
import { columnsMap, initSearchForm, dictsMap } from '../options'
import HeaderSetting from './HeaderSetting'
import AdvanceSearch from './AdvanceSearch'
import TransferDialog from './TransferDialog'
import DepartureDialog from './DepartureDialog'
import InductionDialog from './InductionDialog'
import PositiveDialog from './PositiveDialog'
export default {
  mixins: [mixins],
  components: { HeaderSetting, AdvanceSearch, TransferDialog, DepartureDialog, InductionDialog, PositiveDialog },
  data () {
    return {
      dictsMap,
      columnsMap,
      defaultColumnsLabel: columnsMap.filter(m => !m.hidden).map(m => m.label),
      paramForm: initSearchForm(),
      replaceText: (data) => `（本周新增${data[0]}位正式员工，新增${data[1]}位实习生，离职${data[2]}人）`,
    }
  },
  computed: {
    currentColumnsMap () {
      const keyByColumns = keyBy(columnsMap, 'label')
      return this.defaultColumnsLabel.map(m => {
        return keyByColumns[m]
      })
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleTransfer (row) {
      console.log(row)
      this.$refs['TransferDialog'].dialogShow = true
    },
    handleDeparture (row) {
      this.$refs['DepartureDialog'].form.id = row.id
      this.$refs['DepartureDialog'].formRequestFn = postDeparture
      this.$refs['DepartureDialog'].dialogShow = true
    },
    handleInduction (row) {
      this.$refs['InductionDialog'].form.id = row.id
      this.$refs['InductionDialog'].formRequestFn = postInduction
      this.$refs['InductionDialog'].dialogShow = true
    },
    handelPositive (row) {
      this.$refs['PositiveDialog'].form.id = row.id
      this.$refs['PositiveDialog'].formRequestFn = postPositive
      this.$refs['PositiveDialog'].dialogShow = true
    },
    setHeaderSetting (col) {
      this.defaultColumnsLabel = col
    },
    handleHeaderSetting () {
      this.$refs['HeaderSetting'].columnsMap = columnsMap
      this.$refs['HeaderSetting'].dialogShow = true
    },
    handleOpenGrowthFile (row) {
      this.$router.push({
        path: `/info/growth_file/${row.id}`,
        query: { redirect: this.$route.fullPath },
      })
    },
    handleUpdate (row) {
      this.$router.push({
        path: `/info/information_management/${row.id}`,
        query: { redirect: this.$route.fullPath },
      })
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
      this.loadPage()
    },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getEmployeeProfilePage)
    },
    handleChange () {
      this.$emit('onEdit')
    },
    handleDetail (row) {
      console.log(row)
      this.$emit('onDetail')
    },
  },
}
</script>
