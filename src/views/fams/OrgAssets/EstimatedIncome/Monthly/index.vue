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
      <template slot="before-columns">
        <el-table-column label="月份" width="90px">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
      </template>
    </iep-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getOrgMonthBudgetList } from '@/api/gpms/fas'
import { getYear, initNow } from '@/util/date'
export default {
  data () {
    return {
      pagedTable: [],
      columnsMap: [
        {
          prop: 'intention',
          label: '初步意向',
        },
        {
          prop: 'programme',
          label: '方案递交',
        },
        {
          prop: 'pending',
          label: '执行待签',
        },
        {
          prop: 'incomeCollected',
          label: '签订待收',
        },
        {
          prop: 'total',
          label: '总计',
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
      getOrgMonthBudgetList({
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



