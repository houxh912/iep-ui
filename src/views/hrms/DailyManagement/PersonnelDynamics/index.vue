<template>
  <div>
    <basic-container>
      <iep-page-header title="人事动态"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage" :is-default="false"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table class="dept-table" :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getPersonnelDynamicsPage } from '@/api/hrms/daily_management'
import mixins from '@/mixins/mixins'
import AdvanceSearch from '../LeaveHoliday/AdvanceSearch'
export default {
  components: {
    AdvanceSearch,
  },
  mixins: [mixins],
  data () {
    return {
      columnsMap: [
        {
          prop: 'id',
          label: '序号',
        },
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'applyType',
          label: '变动类型',
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
          prop: 'statusName',
          label: '状态',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getPersonnelDynamicsPage)
    },
  },
}
</script>
