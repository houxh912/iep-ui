<template>
  <iep-dialog :dialog-show="dialogShow" title="提成发放" width="700px" @close="close">
    <iep-table :isLoadTable="isLoadTable" :is-pagination="false" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable">
      <el-table-column label="回款状态">
        <template slot-scope="scope">
          <el-dropdown size="medium">
            <iep-button type="warning" plain>
              {{dictsMap.status[scope.row.status]}}<i class="el-icon-arrow-down el-icon--right"></i>
            </iep-button>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item @click.native="handleRejected(scope.row)">驳回</el-dropdown-item> -->
              <!-- eslint-disable-next-line -->
              <template v-for="(s,i) in dictsMap.status">
                <el-dropdown-item :key="i" v-if="+i !== scope.row.status" @click.native="handleChangeStatus(scope.row)">{{s}}</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </iep-table>
  </iep-dialog>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getIssuedList, updatePayment } from '@/api/gpms/fas'
export default {
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      dictsMap: {
        status: {
          1: '待处理',
          2: '发放',
        },
      },
      columnsMap: [
        {
          prop: 'sortBy',
          label: '类属',
        },
        {
          prop: 'amount',
          label: '金额',
        },
      ],
      incomeId: '',
      projectId: '',
      actualRepayment: 0,
      dateCash: '',
    }
  },
  methods: {
    handleChangeStatus (row) {
      updatePayment({
        incomeId: this.incomeId,
        projectId: this.projectId,
        sortBy: row.sortBy,
      }).then(({ data }) => {
        console.log(data.data)
        this.loadPage()
      })
    },
    close () {
      this.dialogShow = false
      this.multipleSelection = []
    },
    loadPage () {
      this.isLoadTable = true
      getIssuedList(this.projectId).then(({ data }) => {
        this.isLoadTable = false
        this.pagedTable = data.data
      })
    },
  },
}
</script>
