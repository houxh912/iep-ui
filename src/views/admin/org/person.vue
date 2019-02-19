<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="username" label="姓名" width="180">
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <span>{{scope.row.isReview === 0 ? '通过' : ''}}</span>
        <span>{{scope.row.isReview === 1 ? '待审核' : ''}}</span>
        <span>{{scope.row.isReview === 2 ? '驳回' : ''}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">通过</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">驳回</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { applyPersonList } from '@/api/admin/org'
export default {
  props: {
    orgId: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      tableData: [],
    }
  },
  created () {
    this.load()
  },
  methods: {
    handleClick () {

    },
    load () {
      applyPersonList(this.orgId).then(({ data }) => {
        this.tableData = data.data
      })
    },
  },
}
</script>
