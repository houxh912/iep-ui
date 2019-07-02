<template>
  <div>
    <operation-container>
      <template slot="left">
        <operation-wrapper>
          <span>{{year}}年度组织收入</span>
        </operation-wrapper>
      </template>
      <template slot="right">
        <iep-date-picker type="year" v-model="year" @change="loadPage"></iep-date-picker>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :is-pagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable">
    </iep-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getOrgBudgetList } from '@/api/gpms/fas'
import { getYear } from '@/util/date'
export default {
  data () {
    return {
      pagedTable: [],
      columnsMap: [
        {
          prop: 'projectedRevenue',
          label: '预计项目',
        },
        {
          prop: 'oneQuarter',
          label: '一季度',
        },
        {
          prop: 'twoQuarter',
          label: '二季度',
        },
        {
          prop: 'threeQuarter',
          label: '三季度',
        },
        {
          prop: 'fourQuarter',
          label: '四季度',
        },
        {
          prop: 'projectedYear',
          label: '年度',
        },
      ],
      isLoadTable: false,
      year: getYear(new Date()),
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleChange () {
      this.loadPage()
    },
    loadPage () {
      this.isLoadTable = true
      getOrgBudgetList({
        year: this.year,
        orgId: this.userInfo.orgId,
      }).then(({ data }) => {
        this.pagedTable = data.data
        this.isLoadTable = false
      })
    },
  },
}
</script>



