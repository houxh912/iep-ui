<template>
  <div>
    <basic-container>
      <!-- TODO: 费用统计 -->
      <!-- <iep-page-header title="费用管理" :replaceText="replaceText" :data="statistics"></iep-page-header> -->
      <iep-page-header title="费用管理"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="remarks">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleDetail(scope.row)" plain>查看</iep-button>
              <iep-button v-if="isQichizhi && [4,6].includes(scope.row.status)" @click="handleEditProject(scope.row)">修改</iep-button>
              <iep-button v-if="scope.row.status===2" @click="handlePass(scope.row)" plain>通过</iep-button>
              <iep-button v-if="scope.row.status===2" @click="handleReject(scope.row)">驳回</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <fee-pass-dialog-form ref="FeePassDialogForm" is-financial @load-page="loadPage"></fee-pass-dialog-form>
    <fee-reject-dialog-form ref="FeeRejectDialogForm" is-financial @load-page="loadPage"></fee-reject-dialog-form>
    <relation-dialog-form ref="RelationDialogForm" @load-page="loadPage"></relation-dialog-form>
  </div>
</template>

<script>
import { getFeePage } from '@/api/fams/fee'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
import RelationDialogForm from './RelationDialogForm'
import FeePassDialogForm from '@/views/fams/Components/FeePassDialogForm.vue'
import FeeRejectDialogForm from '@/views/fams/Components/FeeRejectDialogForm.vue'
import { mapGetters } from 'vuex'
export default {
  components: { FeePassDialogForm, FeeRejectDialogForm, RelationDialogForm },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      // TODO: 费用统计
      // statistics: [0, 0, 0, 0],
      // replaceText: (data) => `（待核准：${data[0]}笔，总计：${data[1]}，已确认：${data[2]}笔，总计：${data[3]}）`,
    }
  },
  computed: {
    isQichizhi () {
      return [207, 1].includes(this.userInfo.userId)
    },
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleEditProject (row) {
      this.$refs['RelationDialogForm'].id = row.costId
      this.$refs['RelationDialogForm'].loadPage()
      this.$refs['RelationDialogForm'].dialogShow = true
    },
    handlePass (row) {
      this.$refs['FeePassDialogForm'].id = row.costId
      this.$refs['FeePassDialogForm'].content = ''
      this.$refs['FeePassDialogForm'].dialogShow = true
    },
    handleReject (row) {
      this.$refs['FeeRejectDialogForm'].id = row.costId
      this.$refs['FeeRejectDialogForm'].content = ''
      this.$refs['FeeRejectDialogForm'].dialogShow = true
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/fee_detail/${row.costId}`,
        query: {
          approval: 'true',
        },
      })
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, getFeePage)
      // TODO: 费用统计
      // const data = await this.loadTable(param, getFeePage)
      // this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>