<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">签单金额</span>
      <div class="search">
        <div class="inline margin">
          <el-radio-group v-model="type" size="mini" @change="changeType">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="inline">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </div>
      </div>
    </div>
    <div>
      <el-row>
        <div class="echarts">
          <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
            <v-tooltip />
            <v-axis />
            <v-legend />
            <v-line position="week*value" />
            <v-point position="week*value" shape="circle" />
          </v-chart>
        </div>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import AdvanceSearch from './AdvanceSearch'
const data = [
  { week: '周一', value: 10 },
  { week: '周二', value: 8 },
  { week: '周三', value: 0 },
  { week: '周四', value: 8 },
  { week: '周五', value: 2 },
  { week: '周六', value: 8 },
  { week: '周日', value: 0 },
]

const scale = [{
  dataKey: 'value',
  min: 0,
}, {
  dataKey: 'year',
  min: 0,
  max: 1,
}]
export default {
  components: { AdvanceSearch },
  data () {
    return {
      data,
      scale,
      height: 300,
      type: '1',
      tabList: [{ label: '按周', value: '1' }, { label: '按月', value: '2' }, { label: '季度', value: '3' }, { label: '年度', value: '4' }],
    }
  },
  methods: {
    searchPage () {
      this.$message.success('功能开发中')
    },
    changeType () {
      this.$message.success('功能开发中')

    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: 700;
  font-size: 18px;
  padding-right: 10px;
}
.search {
  float: right;
  .margin {
    margin-right: 10px;
  }
  .inline {
    display: inline-block;
  }
}
.echarts {
  height: 300px;
  padding: 15px 10px;
  border: 1px solid #eee;
}
</style>
