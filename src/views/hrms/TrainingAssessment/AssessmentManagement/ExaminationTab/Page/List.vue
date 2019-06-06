<template>
  <div>
    <operation-container>
      <template slot="right">
        <operation-search @search="searchPage" advance-search>
          <el-form :model="paramForm" label-width="80px" size="mini">
            <!-- <el-form-item label="考核时间">
              <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item> -->
            <el-form-item label="被考核人">
              <el-input v-model="paramForm.name"></el-input>
            </el-form-item>
            <el-form-item label="考核名称">
              <el-input v-model="paramForm.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchPage">搜索</el-button>
              <el-button @click="clearSearchParam">清空</el-button>
            </el-form-item>
          </el-form>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :dictsMap="dictsMap" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
      <el-table-column prop="operation" label="操作" width="120">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="default" @click="handleCheck(scope.row)" v-if="scope.row.isChecked == 0">考核</iep-button>
            <iep-button type="default" @click="handleDelete(scope.row)" v-if="scope.row.status != 0">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <add-dialog-form ref="AddDialogForm" @load-page="loadPage"></add-dialog-form>
  </div>
</template>

<script>
import { getEvaluationKpiPage, deleteEvaluation, getEvaluationCreateKpi } from '@/api/hrms/cover'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap, initSearchForm } from '../options'
import AddDialogForm from './AddDialogForm'
import { dateFormat } from '@/util/date'

export default {
  mixins: [mixins],
  components: { AddDialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteEvaluation)
    },
    handleCheck (row) {
      getEvaluationCreateKpi(row.coverId).then(({data}) => {
        this.$refs['AddDialogForm'].open(data.data)
      })
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    loadPage (param = this.paramForm) {
      let fn = (m) => {
        m.time = `${dateFormat(m.startTime)} - ${dateFormat(m.endTime)}`
        return m
      }
      this.loadTable(param, getEvaluationKpiPage, fn)
    },
  },
}
</script>
