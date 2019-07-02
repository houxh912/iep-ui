<template>
  <div>
    <operation-container>
      <template slot="left">
        <operation-wrapper>
          <span>{{year}}年度{{orgName}}组织预计收入</span>
        </operation-wrapper>
      </template>
      <template slot="right">
        <iep-date-picker size="small" v-model="yearDate" align="right" type="year" placeholder="选择年" @change="handleChange()"></iep-date-picker>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :is-pagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable">
    </iep-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getOrgBudgetList } from '@/api/gpms/fas'
import { getYear, initNow } from '@/util/date'
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
      yearDate: initNow(),
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    year () {
      return getYear(this.yearDate)
    },
    orgId () {
      if (this.$route.query.orgId) {
        return +this.$route.query.orgId
      } else {
        return this.userInfo.orgId
      }
    },
    orgName () {
      if (this.$route.query.orgName) {
        return this.$route.query.orgName
      } else {
        return this.userInfo.orgName
      }
    },
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
        orgId: this.orgId,
      }).then(({ data }) => {
        this.pagedTable = data.data
        this.isLoadTable = false
      })
    },
  },
}
</script>



