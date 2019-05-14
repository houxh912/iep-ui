<template>
  <div>
    <basic-container>
      <page-header title="组织预算"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Year'" v-slot:Year>
          <year v-loading="activeTab !=='Year'" @on-change-year="handleChangeYear"></year>
        </template>
        <template v-if="activeTab ==='Quarter'" v-slot:Quarter>
          <quarter v-loading="activeTab !=='Quarter'" :year-id="yearId"></quarter>
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
import Quarter from './Quarter/'
import Year from './Year/'
export default {
  components: { Monthly, Quarter, Year },
  data () {
    return {
      yearId: 0,
      quarterId: 0,
      MonthId: 0,
      tabList: [{
        label: '年度',
        value: 'Year',
      }, {
        label: '季度',
        value: 'Quarter',
      }, {
        label: '月度',
        value: 'Monthly',
      }],
      activeTab: 'Year',
    }
  },
  methods: {
    handleChangeYear (yearId) {
      this.yearId = yearId
    },
  },
}
</script>
