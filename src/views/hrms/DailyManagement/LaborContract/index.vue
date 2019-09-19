<template>
  <div>
    <basic-container>
      <iep-page-header title="劳动合同"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleBatchMessage">批量邮件提醒</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table class="dept-table" :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" :checkbox-init="checkboxInit" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
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
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="openEmployeeProfile(scope.row)" plain>编辑</iep-button>
              <iep-button v-if="(!scope.row.isSent) && scope.row.sortNumber" @click="sendMessage(scope.row)">邮件提醒</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getLaborContractPage, sendLaborContractEmail } from '@/api/hrms/daily_management'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      checkboxInit: (row) => {
        if ((!row.isSent) && row.sortNumber)
          return 1 //不可勾选
        else
          return 0 //可勾选
      },
      dictsMap: {
        isSent: {
          0: '未发',
          1: '已发',
        },
      },
      columnsMap: [
        {
          prop: 'startTime',
          label: '劳动合同开始时间',
          type: 'date',
          formatString: 'YYYY-MM-DD',
        },
        {
          prop: 'endTime',
          label: '劳动合同到期时间',
          type: 'date',
          formatString: 'YYYY-MM-DD',
        },
        {
          prop: 'isSent',
          label: '到期提醒状态',
          type: 'dict',
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
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    async handleBatchMessage () {
      const { data } = await sendLaborContractEmail(this.multipleSelection)
      if (data.data) {
        this.loadPage()
      } else {
        this.$message(data.msg)
      }
    },
    async sendMessage (row) {
      const { data } = await sendLaborContractEmail([row.id])
      if (data.data) {
        this.loadPage()
      } else {
        this.$message(data.msg)
      }
    },
    openEmployeeProfile (row) {
      this.$openPage(`/hrms_spa/employee_profile_edit/${row.userId}#LaborContract`)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getLaborContractPage)
    },
  },
}
</script>
