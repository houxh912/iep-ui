<template>
  <div class="log">
    <basic-container>
      <iep-page-header title="令牌管理"></iep-page-header>
      <operation-container>
        <template slot="right">
          <!-- <iep-button icon="el-icon-refresh" circle @refresh-change="refreshChange"></iep-button>
          <iep-button icon="el-icon-menu" circle @click="handleCheckbox" :option="tableOption"></iep-button> -->
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column prop="operation" label="操作" min-width="80">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleDetail(scope.row)" plain>查看</iep-button>
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
import { fetchList } from '@/api/admin/token'
import { columnsMap, initForm } from './options'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      sys_token_del: false,
    }
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  created () {
    this.sys_token_del = this.permissions['sys_token_del']
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].methodName = '查看'
      this.$refs['DialogForm'].dialogShow = true
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, fetchList)
    },
  },
}
</script>