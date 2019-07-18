<template>
  <div>
    <basic-container>
      <iep-page-header title="集团盈亏"></iep-page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Year'" v-slot:Year>
          <year v-loading="activeTab !=='Year'"></year>
        </template>
        <template v-if="activeTab ==='Month'" v-slot:Month>
          <month v-loading="activeTab !=='Month'"></month>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import Month from './Month/'
import Year from './Year/'
export default {
  components: { Month, Year },
  data () {
    return {
      tabList: [{
        label: '年度',
        value: 'Year',
      }, {
        label: '月度',
        value: 'Month',
      }],
      activeTab: 'Year',
    }
  },
}
</script>
