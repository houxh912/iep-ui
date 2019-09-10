<template>
  <div>
    <basic-container>
      <iep-page-header title="劳动合同"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table class="dept-table" :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getLaborContractPage } from '@/api/hrms/daily_management'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap: [
        {
          prop: 'id',
          label: '序号',
        },
        {
          prop: 'userName',
          label: '姓名',
        },
        {
          prop: 'startTime',
          label: '开始时间',
          type: 'date',
          formatString: 'YYYY-MM-DD',
        },
        {
          prop: 'endTime',
          label: '结束时间',
          type: 'date',
          formatString: 'YYYY-MM-DD',
        },
        {
          prop: 'companyName',
          label: '劳动合同公司',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getLaborContractPage)
    },
  },
}
</script>
