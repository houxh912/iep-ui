<template>
  <div class="statistics">
    <basic-container>
      <iep-page-header title="组织预计支出"></iep-page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Year'" v-slot:Year>
          <year v-loading="activeTab !=='Year'" @on-change-year="handleChangeYear" @on-change-quarter="handleChangeQuarter"></year>
        </template>
        <template v-if="activeTab ==='Quarter'" v-slot:Quarter>
          <quarter v-loading="activeTab !=='Quarter'" :year="year" :year-id="yearId" :year-list="yearList"></quarter>
        </template>
        <template v-if="activeTab ==='Monthly'" v-slot:Monthly>
          <monthly v-loading="activeTab !=='Monthly'" :year="year" :quarter-id="quarterId" :quarter-list="quarterList"></monthly>
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
      year: 0,
      yearId: 0,
      yearList: [],
      quarterId: 0,
      quarterList: [],
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
    handleChangeYear (yearId, yearList, year) {
      this.yearId = yearId
      this.yearList = yearList
      this.year = year
    },
    handleChangeQuarter (quarterList, quarterId) {
      this.quarterList = quarterList
      this.quarterId = quarterId
    },
  },
}
</script>

<style lang="css" scoped>
.statistics >>> ::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
.statistics >>> ::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
.statistics >>> ::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.statistics >>> :hover ::-webkit-scrollbar-thumb {
  display: block;
}
</style>