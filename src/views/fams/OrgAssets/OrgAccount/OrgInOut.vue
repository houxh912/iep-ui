<template>
  <div class="total-wrapper">
    <iep-slot-card class="total-item-2" title="组织收支">
      <template slot="right">
        <el-radio-group v-model="type" size="small" @change="loadPage">
          <el-radio-button label="1">月</el-radio-button>
          <el-radio-button label="2">季</el-radio-button>
          <el-radio-button label="3">年</el-radio-button>
        </el-radio-group>
      </template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="createTime" label="创建日期">
        </el-table-column>
        <el-table-column prop="actualIncome" label="实际收入">
        </el-table-column>
        <el-table-column prop="actualExpenditure" label="实际支出">
        </el-table-column>
        <el-table-column prop="budgetExpenditure" label="预算支出">
        </el-table-column>
      </el-table>
    </iep-slot-card>
    <iep-slot-card class="total-item-1" title="快捷入口">
      <iep-card-btn></iep-card-btn>
    </iep-slot-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getOrgBudgetList } from '@/api/fams/statistics'
import IepSlotCard from '@/views/fams/Components/SlotCard'
import IepCardBtn from '@/views/fams/Components/CardBtn'
export default {
  components: { IepSlotCard, IepCardBtn },
  data () {
    return {
      type: '1',
      rangeTime: [],
      tableData: [],
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getOrgBudgetList(this.type)
      this.tableData = data.data
    },
  },
}
</script>
<style lang="scss" scoped>
.total-wrapper {
  display: flex;
  .total-item-2 {
    flex: 2;
  }
  .total-item-1 {
    flex: 1;
    margin-left: 20px;
  }
}
</style>
