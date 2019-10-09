<template>
  <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable" :pagination="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    <el-table-column prop="examStatus" label="考试状态" width="150">
      <template slot-scope="scope">
        <el-tag type="success" size="medium" v-if="scope.row.examStatus === 0">已报名</el-tag>
        <el-tag type="warning" size="medium" v-if="scope.row.examStatus === 1">进行中</el-tag>
        <el-tag type="warning" size="medium" v-if="scope.row.examStatus === 3">批卷中</el-tag>
        <el-tag type="info" size="medium" v-if="scope.row.examStatus === 4">已结束</el-tag>
        <el-tag type="success" size="medium" v-if="scope.row.examStatus === 8">已完成</el-tag>
      </template>
    </el-table-column>
  </iep-table>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getTestRecordPage } from '@/api/exam/personalCenter/testRecord/testRecord.js'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap: [
        {
          prop: 'id',
          label: '序号',
          width: '55',
        },
        {
          prop: 'fieldName',
          label: '科目',
          width: '200',
        },
        {
          prop: 'title',
          label: '考试名称',
        },
        {
          prop: 'beginTime',
          label: '参与考试时间',
        },
      ],
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, userId: this.id }, getTestRecordPage)
    },
  },
}
</script>
