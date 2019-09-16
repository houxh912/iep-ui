<template>
  <div class="wapper">
    <operation-container>
      <template slot="right">
        <operation-search @search-page="searchPage" :params="searchForm.title" prop="title" advanceSearch>
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column prop="state" label="及格状态" width="120">
        <template slot-scope="scope">
          <el-tag type="error" size="medium" v-if="scope.row.state === 0">不及格</el-tag>
          <el-tag type="warning" size="medium" v-if="scope.row.state === 1">及格</el-tag>
          <el-tag type="success" size="medium" v-if="scope.row.state === 2">优秀</el-tag>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
import { getExamInationList } from '@/api/exam/examLibrary/examInation/examInation'
const columnsMap = [
  {
    label: '姓名',
    prop: 'username',
    width: 130,
  },
  {
    label: '所在组织',
    prop: 'title',
  },
  {
    label: '考试时间',
    prop: 'beginTime',
  },
  {
    label: '交卷时间',
    prop: 'endTime',
  },
  {
    label: '答题时长',
    prop: 'totalScore',
    width: 120,
  },
  {
    label: '成绩',
    prop: 'totalScore',
    width: 100,
  },
]
export default {
  mixins: [mixins],
  props: ['recordData'],
  components: { AdvanceSearch },
  data () {
    return {
      columnsMap,
    }
  },
  created () {
    console.log('recordData11', this.recordData)
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getExamInationList)
    },
  },
}
</script>
<style  scoped>
.wapper >>> .operation-container {
  margin-bottom: 8px;
}
</style>