<template>
  <basic-container>
    <iep-page-header title="我的报名"></iep-page-header>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columns" :cell-style="mixinsCellPointerStyle" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
        <el-table-column label="会议海报">
          <template slot-scope="scope">
            <div>
              <el-image :src="scope.row.urls" :fit="fit"></el-image>
            </div>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="200">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click="handleDetail(scope.row)">查看</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </basic-container>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columns } from './option'
import { getMymeetingPage } from '@/api/mcms/meeting'
export default {
  mixins: [mixins],
  data () {
    return {
      fit: 'contain',
      columns,
      isLoadTable: false,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = {}) {
      this.loadTable(param, getMymeetingPage)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/meeting/${row.id}`,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.el-image {
  width: 150px;
  height: 100px;
  border-radius: 10px;
}
</style>