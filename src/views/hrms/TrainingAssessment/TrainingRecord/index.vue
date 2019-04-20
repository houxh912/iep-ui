<template>
  <div>
    <basic-container>
      <page-header title="培训记录" :replaceText="replaceText" :data="statistics"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <el-dropdown size="medium">
            <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteBatch">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="title">
            <!-- <el-form :model="paramForm" label-width="80px" size="mini">
              <el-form-item label="培训主题">
                <el-input v-model="paramForm.theme" placeholder="请输入培训主题"></el-input>
              </el-form-item>
              <el-form-item label="培训老师">
                <el-input v-model="paramForm.teacher" placeholder="请输入培训主老师姓名"></el-input>
              </el-form-item>
              <el-form-item label="培训类型">
                <el-select v-model="paramForm.type" placeholder="请选择培训类型">
                  <el-option label="内网培训1" value="内网培训1"></el-option>
                  <el-option label="内网培训2" value="内网培训1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="培训时间">
                <div class="block">
                  <el-date-picker v-model="dateVal" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="2019-02-01" end-placeholder="2019-03-01" :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchPage">搜索</el-button>
                <el-button @click="clearSearchParam">清空</el-button>
              </el-form-item>
            </el-form> -->
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="180">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)" type="warning" plain>修改</iep-button>
              <iep-button @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>

<script>
import { getTrainingRecordPage, postTrainingRecord, putTrainingRecord, getTrainingRecordById, deleteTrainingRecordBatch, deleteTrainingRecordById } from '@/api/hrms/training_record'
import mixins from '@/mixins/mixins'
import { columnsMap, initForm, formToVo } from './options'
import DialogForm from './DialogForm'

export default {
  mixins: [mixins],
  components: { DialogForm },
  data () {
    return {
      columnsMap,
      statistics: [0, 0],
      replaceText: (data) => `（本周有${data[0]}个培训记录，下周有${data[1]}个培训计划)`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deleteTrainingRecordBatch)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteTrainingRecordById)
    },
    handleAdd () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].methodName = '创建'
      this.$refs['DialogForm'].formRequestFn = postTrainingRecord
      this.$refs['DialogForm'].dialogShow = true
    },
    handleEdit (row) {
      getTrainingRecordById(row.id).then(({ data }) => {
        this.$refs['DialogForm'].form = formToVo(data.data)
        this.$refs['DialogForm'].methodName = '编辑'
        this.$refs['DialogForm'].formRequestFn = putTrainingRecord
        this.$refs['DialogForm'].dialogShow = true
      })
    },
    async loadPage (param = this.paramForm) {
      const data = await this.loadTable(param, getTrainingRecordPage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>

<style>
</style>

