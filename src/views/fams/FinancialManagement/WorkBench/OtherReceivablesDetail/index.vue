<template>
  <div>
    <basic-container>
      <iep-page-header title="其他应收账款"></iep-page-header>
      <operation-container>
        <template slot="right">
          <el-select size="small" v-model="type" placeholder="请选择其他应收款类别" @change="hanldeChange">
            <el-option v-for="item in otherReceivables" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <operation-search @search-page="searchPage" prop="projectName">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column prop="operation" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleIncome(scope.row)" type="primary" plain>新增</iep-button>
              <iep-button @click="handleShow(scope.row)">查看</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <incomes ref="Incomes" :forms="forms" @load-page="loadPage"></incomes>
  </div>
</template>

<script>
import { postIncome } from '@/api/fams/income'
import { mapGetters } from 'vuex'
import { getExpenditurePage } from '@/api/fams/expenditure'
import { getIncomeById } from '@/api/fams/income'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../../EManagement/options'
import DialogForm from '../../IManagement/DialogForm'
import Incomes from '../../EManagement/Incomes'
import { initForm } from '../../EManagement/options'
export default {
  components: { DialogForm, Incomes },
  mixins: [mixins],
  data () {
    return {
      type: '81',
      dictsMap,
      columnsMap,
      forms: [],
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
      'userInfo',
    ]),
    otherReceivables () {
      return this.dictGroup['fams_expenditure_type'].find(m => m.value === '17').children
    },
  },
  created () {
    this.type = this.otherReceivables[0].value
    this.loadPage()
  },
  methods: {
    handleShow (row) {
      // TODO: 给后端待完善
      row.incomeIds.map(async (idx) => {
        const data = (await getIncomeById(idx)).data.data
        this.forms.push(data)
      })
      this.$refs['Incomes'].dialogShow = true
    },
    handleIncome (row) {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].formRequestFn = postIncome
      this.$refs['DialogForm'].form.expenditureId = row.expenditureId
      this.$refs['DialogForm'].form.orgId = this.userInfo.orgId
      this.$refs['DialogForm'].form.invoiceOrgId = this.userInfo.orgId
      this.$refs['DialogForm'].form.orgName = this.userInfo.orgName
      this.$refs['DialogForm'].dialogShow = true
    },
    hanldeChange () {
      this.loadPage()
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, type: this.type }, getExpenditurePage)
      this.forms = []
    },
  },
}
</script>