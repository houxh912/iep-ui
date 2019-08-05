<template>
  <div class="statistics">
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
.statistics >>> .el-table__body-wrapper::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
.statistics >>> .el-table__body-wrapper::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
.statistics >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.statistics >>> .el-table__body-wrapper:hover::-webkit-scrollbar-thumb {
  display: block;
}
</style>