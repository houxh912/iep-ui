<template>
  <div>
    <basic-container>
      <page-header title="培训记录" :replaceText="replaceText" :data="[5 ,10]"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="(scope.row)" type="danger" icon="el-icon-plus">新增</iep-button>
          <el-dropdown size="medium">
            <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>删除</el-dropdown-item>
              <el-dropdown-item divided>导入</el-dropdown-item>
              <el-dropdown-item>导出</el-dropdown-item>
              <el-dropdown-item>分享</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <el-form :model="paramForm" label-width="80px" size="mini">
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
                  <el-date-picker v-model="dateVal" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="2019-02-01" end-placeholder="2019-03-01" :picker-options="pickerOptions2">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchPage">搜索</el-button>
                <el-button @click="clearSearchParam">清空</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)" plain>修改</iep-button>
              <iep-button @click="(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <edit-dialog ref="EditDialog" @load-page="loadPage"></edit-dialog>
  </div>
</template>

<script>
import { getTrainingRecordPage } from '@/api/hrms/training_record'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from './options'
import EditDialog from './EditDialog'
export default {
  mixins: [mixins],
  components: { EditDialog },
  data () {
    return {
      columnsMap,
      paramForm: initSearchForm(),
      replaceText: (data) => `（本周有${data[0]}个培训记录，下周有${data[1]}个培训计划)`,
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          },
        }],
      },
      dateVal: '',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleEdit (row) {
      console.log(row)
      this.$refs['EditDialog'].dialogShow = true
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
      this.$emit('clear-search-param')
    },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getTrainingRecordPage)
    },
    searchPage () {
      this.$emit('search-page', this.paramForm)
    },
  },
}
</script>

<style>
</style>

