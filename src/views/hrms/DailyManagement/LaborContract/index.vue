<template>
  <div>
    <basic-container>
      <iep-page-header title="劳动合同"></iep-page-header>
      <operation-container>
        <template slot="right">
          <iep-button @click="handleBatchMessage">批量提醒</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table class="dept-table" :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
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
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="openEmployeeProfile(scope.row)" plain>编辑</iep-button>
              <iep-button @click="sendMessage(scope.row)">提醒</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getLaborContractPage } from '@/api/hrms/daily_management'
import { createEmail } from '@/api/mlms/email/index'
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
    _createForm (userIds = []) {
      return {
        subject: '劳动合同到期提醒',
        receiverIds: userIds,
        content: '您的劳动合同即将到期，请及时签约新的合同。',
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.userId)
    },
    async handleBatchMessage () {
      const { data } = await createEmail(this._createForm(this.multipleSelection))
      console.log(data)
    },
    async sendMessage (row) {
      const { data } = await createEmail(this._createForm([row.userId]))
      console.log(data)
    },
    openEmployeeProfile (row) {
      this.$openPage(`/hrms_spa/employee_profile_edit/${row.userId}`)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getLaborContractPage)
    },
  },
}
</script>
