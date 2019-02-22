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
        <el-button @click="handlePass(scope.row)" type="text" size="small">通过</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { applyPersonList, passPerson } from '@/api/admin/org'
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
    handlePass (row) {
      passPerson({
        orgId: this.orgId,
        userId: row.userId,
      }).then(() => {
        this.load()
      })
    },
    load () {
      applyPersonList(this.orgId).then(({ data }) => {
        this.tableData = data.data
      })
    },
  },
}
</script>
