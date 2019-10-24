<template>
  <div>
    <basic-container>
      <iep-page-header title="平台交易流水" :replaceText="replaceText" :data="statistics"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getPlatformPage } from '@/api/fams/block_chain'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap: {
        type: {
          'A': '转入',
          'L': '转出',
        },
        accountType: {
          '0': '系统',
          '1': '平台',
          '2': '联盟',
          '3': '组织',
          '4': '个人',
        },
      },
      columnsMap: [
        {
          prop: 'category',
          label: '交易类型',
          type: 'dictGroup',
          dictName: 'FAMS_I_CAN_FLOW_TYPE',
        },
        {
          prop: 'type',
          label: '类型',
          type: 'dict',
        },
        {
          prop: 'amount',
          label: '能贝数量',
        },
        {
          prop: 'realName',
          label: '交易对象',
        },
        {
          prop: 'accountType',
          label: '账户类型',
          type: 'dict',
        },
        {
          prop: 'currentAmount',
          label: '当前账户余额',
        },
        {
          prop: 'operationName',
          label: '操作人',
        },
        {
          prop: 'createTime',
          label: '发币日期',
        },
        {
          prop: 'remarks',
          label: '发行明细',
          type: 'detail',
        },
      ],
      statistics: [0, 0, 0, 0, 0],// 共发生56笔交易，24笔收入，共计20000，32笔支出，共计20000
      replaceText: (data) => `（共发生${data[0]}笔交易，${data[1]}笔收入，共计${data[2]}，${data[3]}笔支出，共计${data[4]}）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, getPlatformPage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>
