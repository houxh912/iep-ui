<template>
  <div>
    <basic-container>
      <iep-page-header title="我的交易" :replaceText="replaceText" :data="statistics"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="userInfo.userId !== 1" type="primary" @click="handleTransaction" icon="el-icon-plus" plain>发起交易</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="hash" placeholder="输入Hash值查询交易信息">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm"></dialog-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { columnsMap } from './options'
import { getMyPage, getAmountByUserId } from '@/api/fams/block_chain'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      isLoadTable: false,
      replaceText: (data) => `（余额${data[0]}贝）`,
      statistics: [0],
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  created () {
    this.loadPage()
    this.loadSelfAmount()
  },
  methods: {
    handleTransaction () {
      this.$refs['DialogForm'].dialogShow = true
    },
    async loadPage (param = this.searchForm) {
      try {
        await this.loadTable(param, getMyPage)
      } catch (error) {
        this.$message(error.message)
      }
    },
    loadSelfAmount () {
      getAmountByUserId(this.userInfo.userId).then(({ data }) => {
        this.statistics = [data.data.balance]
      })
    },
  },
}
</script>
