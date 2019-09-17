<template>
  <div class="wapper">
    <operation-container>
      <template slot="right">
        <operation-search @search-page="searchPage" :params="searchForm.title" prop="username" advanceSearch>
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </iep-table>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
import { getScoreAnalysisById } from '@/api/exam/testStatistics/examStatistics'
const columnsMap = [
  {
    label: '姓名',
    prop: 'userName',
    width: 130,
  },
  {
    label: '所在组织',
    prop: 'orgName',
  },
  {
    label: '考试时间',
    prop: 'examTime',
  },
  {
    label: '交卷时间',
    prop: 'jiaojuanTime',
  },
  {
    label: '答题时长',
    prop: 'timeLong',
    width: 120,
  },
  {
    label: '成绩',
    prop: 'penScore',
    width: 100,
  },
  {
    label: '及格状态',
    prop: 'passingState',
    width: 120,
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
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      const params = {
        examId: this.recordData.row.id,
      }
      this.loadTable({ ...param, ...params }, getScoreAnalysisById)
    },
  },
}
</script>
<style  scoped>
.wapper >>> .operation-container {
  margin-bottom: 8px;
}
</style>