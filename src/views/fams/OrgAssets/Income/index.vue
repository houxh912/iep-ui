<template>
  <div class="statistics iep-basic-scroll">
    <basic-container>
      <iep-page-header title="收入统计"></iep-page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Year'" v-slot:Year>
          <year v-loading="activeTab !=='Year'"></year>
        </template>
        <template v-if="activeTab ==='Quarter'" v-slot:Quarter>
          <quarter v-loading="activeTab !=='Quarter'"></quarter>
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
}
</script>
<style lang="css" scoped>
.statistics >>> .gutter {
  background: rgb(242, 244, 245);
}
</style>