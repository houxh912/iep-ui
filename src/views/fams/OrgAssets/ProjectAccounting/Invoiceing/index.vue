<template>
  <iep-table :isLoadTable="isLoadTable" :is-pagination="false" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable">
    <el-table-column label="操作" width="100px">
      <template slot-scope="scope">
        <operation-wrapper>
          <iep-button @click="handleDetail(scope.row)" type="warning" plain>查看</iep-button>
        </operation-wrapper>
      </template>
    </el-table-column>
  </iep-table>
</template>
       
<script>
import { getProjectInvoiceingList } from '@/api/gpms/fas'
export default {
  data () {
    return {
      dictsMap: {
        status: {
          0: '待提交',
          1: '待确认',
          2: '已确认',
          3: '驳回',
        },
        invoicingType: {
          1: '增值税专用发票',
          2: '增值税普通发票',
          3: '其他',
        },
      },
      columnsMap: [
        {
          prop: 'buyerName',
          label: '购买方',
        },
        {
          prop: 'companyName',
          label: '销售方',
        },
        {
          prop: 'amount',
          label: '开票金额',
          width: '80',
        },
        {
          prop: 'createTime',
          label: '申请日期',
        },
        {
          prop: 'status',
          label: '状态',
          type: 'dict',
          width: '80',
        },
        {
          prop: 'auditorName',
          label: '核准人',
          width: '80',
        },
        {
          prop: 'auditingTime',
          label: '核准日期',
        },
      ],
      isLoadTable: true,
      pagedTable: [],
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/billing_detail/${row.id}`,
      })
    },
    loadPage () {
      this.isLoadTable = true
      getProjectInvoiceingList(this.id).then(({ data }) => {
        this.isLoadTable = false
        this.pagedTable = data.data
      })
    },
  },
}
</script>