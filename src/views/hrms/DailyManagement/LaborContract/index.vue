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
        <template slot="before-columns">
          <el-table-column label="序号" width="55">
            <template slot-scope="scope">
              {{scope.row.id}}
            </template>
          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              {{scope.row.userName}}<a-tag v-if="scope.row.sortNumber" color="orange">即将到期</a-tag>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <iep-button type="warning" @click="openEmployeeProfile(scope.row)" plain>编辑</iep-button>
          </template>
        </el-table-column>
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
          type: 'detail',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    openEmployeeProfile (row) {
      this.$openPage(`/hrms_spa/employee_profile_edit/${row.userId}`)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getLaborContractPage)
    },
  },
}
</script>
