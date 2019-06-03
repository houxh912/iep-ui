<template>
  <div>
    <basic-container>
      <page-header title="出题记录"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" icon="el-icon-plus" type="primary" plain>新增试题</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="title" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :dictsMap="dictsMap"
        :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" is-index>
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="text" @click="handleModify(scope.row)">重新编辑</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
const columnsMap = [
  {
    prop: 'field',
    label: '科目',
  },
  {
    prop: 'questionType',
    label: '题型',
  },
  {
    prop: 'kind',
    label: '题类',
  },
  {
    prop: 'title',
    label: '内容',
  },
  {
    prop: 'difficulty',
    label: '难度',
  },
  {
    prop: 'status',
    label: '状态',
  },
  {
    prop: 'username',
    label: '提交者',
  },
  {
    prop: 'creatTime',
    label: '提交时间',
  },
]
const dictsMap = {
  status: {
    0: '审核中',
    1: '通过',
    2: '未通过',
  },
}
import { getTestList } from '@/api/exam/createExam/newTest/newTest'
import AdvanceSearch from '@/views/exam/reviewCenter/testQuestionsLibrary/Page/AdvanceSearch'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  components: { AdvanceSearch },
  data () {
    return {
      columnsMap,
      dictsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getTestList)
    },
    /**
     * 新增试题
     */
    handleAdd () {
      this.$emit('onEdit')
    },

    /**
     * 重新编辑
     */
    handleModify (row) {
      console.log(row)
      this.$message('此功能开发中...')

    },
  },
}
</script>
