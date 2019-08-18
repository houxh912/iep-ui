<template>
  <div>
    <operation-container>
      <template slot="left">
        <operation-wrapper>
          <span>{{year}}年度集团收入</span>
        </operation-wrapper>
      </template>
      <template slot="right">
        <iep-date-picker type="year" v-model="yearDate" size="small" @change="loadPage"></iep-date-picker>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :is-pagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
    </iep-table>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getUnionBudgetList } from '@/api/gpms/fas'
import { getYear } from '@/util/date'
export default {
  mixins: [mixins],
  data () {
    return {
      pagedTable: [],
      columnsMap: [
        {
          prop: 'orgName',
          label: '组织名称',
          width: '300',
        },
        {
          prop: 'oneQuarter',
          label: '一季度(元)',
        },
        {
          prop: 'twoQuarter',
          label: '二季度(元)',
        },
        {
          prop: 'threeQuarter',
          label: '三季度(元)',
        },
        {
          prop: 'fourQuarter',
          label: '四季度(元)',
        },
        {
          prop: 'projectedYear',
          label: '年度(元)',
        },
      ],
      isLoadTable: false,
      yearDate: new Date(),
    }
  },
  computed: {
    year () {
      return getYear(this.yearDate)
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      this.$openPage(`/fams/org_assets/estimated_income?orgId=${row.orgId}&orgName=${row.orgName}`)
    },
    handleChange () {
      this.loadPage()
    },
    loadPage () {
      this.isLoadTable = true
      getUnionBudgetList(this.year).then(({ data }) => {
        this.pagedTable = data.data
        this.isLoadTable = false
      })
    },
  },
}
</script>



