<template>
  <div>
    <basic-container>
      <page-header title="集团预计收入"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Year'" v-slot:Year>
          <year v-loading="activeTab !=='Year'"></year>
        </template>
        <template v-if="activeTab ==='Monthly'" v-slot:Monthly>
          <monthly v-loading="activeTab !=='Monthly'"></monthly>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import Monthly from './Monthly/'
import Year from './Year/'
export default {
  components: { Monthly, Year },
  data () {
    return {
      tabList: [{
        label: '年度',
        value: 'Year',
      }, {
        label: '月度',
        value: 'Monthly',
        disabled: true,
      }],
      activeTab: 'Year',
    }
  },
}
</script>
