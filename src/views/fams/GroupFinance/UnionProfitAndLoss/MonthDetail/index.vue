<template>
  <div>
    <basic-container>
      <iep-page-header title="集团月份盈亏"></iep-page-header>
      <iep-table :isLoadTable="isLoadTable" :isPagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" show-summary>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getUnionProfits } from '@/api/fams/statistics'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options.js'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
    }
  },
  computed: {
    year () {
      return +this.$route.query.year
    },
    month () {
      return this.$route.query.month
    },
  },
  created () {
    this.statistics = [this.year]
    this.loadPage()
  },
  methods: {
    async loadPage () {
      this.isLoadTable = true
      const { data } = await getUnionProfits(this.year, this.month)
      this.pagedTable = data.data
      this.isLoadTable = false
    },
  },
}
</script>