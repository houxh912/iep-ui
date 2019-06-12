<template>
  <div>
    <page-header title="我的师傅"></page-header>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
      </template>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click="handleRelease(scope.row)">解除关系</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import { getMyMaster, deleteReleaseMentorById } from '@/api/wel/relationship_manage'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
    }
  },
  computed: {
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleRelease (row) {
      this._handleGlobalDeleteById(row.relatedId, deleteReleaseMentorById)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getMyMaster)
    },
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
</style>
