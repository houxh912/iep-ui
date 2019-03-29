<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">签单金额</span>
      <div class="search">
        <div class="inline">
          <el-radio-group v-model="type" size="small" @change="changeType">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="inline">
          <operation-search @search="searchPage" advance-search>
          </operation-search>
        </div>
      </div>
    </div>
    <div>
      <el-row>
        <div class="echarts">图表1</div>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      type: '1',
      tabList: [{ label: '按周', value: '1' }, { label: '按月', value: '2' }, { label: '季度', value: '3' }, { label: '年度', value: '4' }],
    }
  },
  methods: {
    searchPage () {

    },
    changeType () {

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
  .inline {
    display: inline-block;
  }
}
.echarts {
  height: 100px;
  padding: 15px 10px;
  border: 1px solid #eee;
}
</style>
