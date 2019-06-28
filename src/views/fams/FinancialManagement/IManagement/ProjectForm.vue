<template>
  <iep-dialog :dialog-show="dialogShow" title="项目关联回款表" width="700px" @close="close">
    <iep-table :isLoadTable="isLoadTable" :is-pagination="false" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable">
      <el-table-column label="回款状态">
        <template slot-scope="scope">
          <span>{{dictsMap.paymentStatus[scope.row.paymentStatus]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="提成">
        <template slot-scope="scope">
          <span>{{scope.row.payments}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-dropdown size="medium">
            <iep-button type="warning" plain>
              {{dictsMap.artificialPaymentStatus[scope.row.artificialPaymentStatus]}}<i class="el-icon-arrow-down el-icon--right"></i>
            </iep-button>
            <el-dropdown-menu slot="dropdown">
              <template v-for="(s,i) in dictsMap.artificialPaymentStatus">
                <el-dropdown-item :key="i" v-if="+i !== scope.row.artificialPaymentStatus" @click.native="handleChangeStatus(scope.row, i)">{{s}}</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </iep-table>
    <template slot="footer">
      <iep-button type="primary" @click="handleSubmit">提交</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getProjectPaymentPlanList, updatePayment } from '@/api/gpms/fas'
export default {
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      dictsMap: {
        paymentStatus: {
          1: '未逾期',
          2: '逾期',
        },
        artificialPaymentStatus: {
          0: '待处理',
          1: '未逾期',
          2: '逾期',
        },
      },
      columnsMap: [
        {
          prop: 'paymentAmount',
          label: '预计回款金额',
        },
        {
          prop: 'projectPaymentTime',
          label: '预计回款时间',
        },
      ],
      incomeId: '',
      actualRepayment: 0,
      dateCash: '',
    }
  },
  methods: {
    handleChangeStatus (row, value) {
      row.artificialPaymentStatus = value
    },
    close () {
      this.dialogShow = false
      this.multipleSelection = []
    },
    handleSubmit () {
      this.$confirm('是否确定修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const { data } = await updatePayment(this.pagedTable.map(m => {
          return {
            id: m.id,
            artificialPaymentStatus: m.artificialPaymentStatus,
            amount: m.payments,
          }
        }))
        if (data.data) {
          this.$message.success('操作成功')
          this.$emit('load-page')
        } else {
          this.$message(data.msg)
        }
        this.close()
      }).catch(() => {
      })
    },
    // handleSelectionChange (val) {
    //   this.multipleSelection = val.map(m => m.id)
    // },
    loadPage (id) {
      this.isLoadTable = true
      getProjectPaymentPlanList(id).then(({ data }) => {
        this.isLoadTable = false
        this.pagedTable = data.data
      })
    },
  },
}
</script>
