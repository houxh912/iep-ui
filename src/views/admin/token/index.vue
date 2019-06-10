<template>
  <div class="log">
    <basic-container>
      <page-header title="令牌管理"></page-header>
      <operation-container>
        <template slot="right">
          <!-- <iep-button icon="el-icon-refresh" circle @refresh-change="refreshChange"></iep-button>
          <iep-button icon="el-icon-menu" circle @click="handleCheckbox" :option="tableOption"></iep-button> -->
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column prop="operation" label="操作" min-width="100">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleDetails(scope.row)" plain>查看</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <iep-review-confirm is-inverse ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getUnionPage, fetchList } from '@/api/admin/token'
import { columnsMap, initMemberForm } from './options'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
  },
  methods: {
    handleDetails (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initMemberForm(), row)
      this.$refs['DialogForm'].methodName = '查看'
      this.$refs['DialogForm'].formRequestFn = fetchList
      this.$refs['DialogForm'].dialogShow = true
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, getUnionPage)
    },
    /**
     * 搜索回调
     */
    searchChange (form) {
      this.getList(this.page, form)
    },
    /**
     * 刷新回调
     */
    refreshChange () {
      this.getList(this.page)
    },
  },
}
</script>