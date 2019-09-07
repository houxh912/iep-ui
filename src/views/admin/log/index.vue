<template>
  <div class="log">
    <basic-container>
      <iep-page-header title="日志管理"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="title">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column prop="operation" label="操作" min-width="100">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleDetails(scope.row)" plain>查看</iep-button>
              <iep-button v-if="sys_log_del" @click="handleDeleteById(scope.row)">刪除</iep-button>
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
import { mapGetters } from 'vuex'
import { delObj, getUnionPage, getObj } from '@/api/admin/log'
import { columnsMap, initMemberForm } from './options'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      sys_log_del: false,
    }
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.sys_log_del = this.permissions['sys_log_del']
    this.loadPage()
  },
  methods: {
    handleDetails (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initMemberForm(), row)
      this.$refs['DialogForm'].methodName = '查看'
      this.$refs['DialogForm'].formRequestFn = getObj
      this.$refs['DialogForm'].dialogShow = true
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, getUnionPage)
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.orgId, delObj)
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