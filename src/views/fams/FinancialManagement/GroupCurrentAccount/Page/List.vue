<template>
  <div>
    <basic-container>
      <page-header title="集团往来账" :replaceText="replaceText" :data="[10 ,5,10,25]"></page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <el-form :model="paramForm" label-width="80px" size="mini">
              <el-form-item label="时间">
                <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="收/支">
                <el-radio v-model="radio" label="1">收</el-radio>
                <el-radio v-model="radio" label="2">支</el-radio>
              </el-form-item>
              <el-form-item label="类型">
                <el-select v-model="value" placeholder="请选择">
                  <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门">
                <el-select v-model="value" placeholder="请选择">
                  <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="线下公司">
                <el-select v-model="value" placeholder="请选择">
                  <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="收支方式">
                <el-select v-model="value" placeholder="请选择">
                  <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="银行账户">
                <el-select v-model="value" placeholder="请选择">
                  <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchPage">搜索</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange">
        <template slot="before-columns">
          <el-table-column label="流水号" width="90px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getGCJournalPage } from '@/api/fams/g_c_journal'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      classify: [
        {
          value: '选项1',
          label: '项目支出',
        },
        {
          value: '选项2',
          label: '项目收入',
        },
      ],
      form: {
        name: '',
      },
      columnsMap,
      paramForm: initSearchForm(),
      value: '',
      value1: '',
      radio: 2,
      replaceText: (data) => `（支出：${data[0]}笔，内部往来帐支出：${data[0]}收入：${data[0]}笔,集团往来账收入：${data[0]}贝，集团往来账：${data[0]}贝）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    // handleRejected (row) {
    //   console.log(row)
    //   this.$refs['RejectedDialog'].dialogShow = true
    // },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getGCJournalPage)
    },
  },
}
</script>
<style lang="scss" scoped>
.line {
  text-align: center;
}
</style>
