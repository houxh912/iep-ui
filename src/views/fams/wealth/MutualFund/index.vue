<template>
  <div>
    <basic-container>
      <page-header title="互助基金" :replaceText="replaceText" :data="statistics"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" icon="el-icon-magic-stick" @click="handleFund" plain>捐助</iep-button>
          <iep-button @click="handleFundRank">捐助排名</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <rank-dialog-form ref="RankDialogForm" @load-page="loadPage"></rank-dialog-form>
  </div>
</template>
<script>
import { getFundPage, postFund, getFundRankList, getMyFund } from '@/api/fams/fund'
import mixins from '@/mixins/mixins'
import { columnsMap, initForm } from './options'
import DialogForm from './DialogForm'
import RankDialogForm from './RankDialogForm'
export default {
  components: { DialogForm, RankDialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      statistics: [0, 0, 0],
      replaceText: (data) => `（捐助总金额：${data[0]}元，我捐助了：${data[1]}元，捐助排名：${data[2]}）`,
    }
  },
  created () {
    this.loadPage()
    this.loadMy()
  },
  methods: {
    loadMy () {
      getMyFund().then(({ data }) => {
        this.statistics = [data.data.total, data.data.my, data.data.rank]
      })
    },
    handleFundRank () {
      getFundRankList().then(({ data }) => {
        this.$refs['RankDialogForm'].pagedTable = data.data
        this.$refs['RankDialogForm'].dialogShow = true
      })
    },
    handleFund () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].formRequestFn = postFund
      this.$refs['DialogForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getFundPage)
    },
  },
}
</script>
