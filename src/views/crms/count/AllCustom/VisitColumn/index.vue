<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">拜访情况</span>
    </div>
    <div>
      <el-row>
        <el-col :span='12'>
          <div class="top">
            <span>拜访数量</span>
            <div class="inline">
              <el-radio-group v-model="type" size="mini" @change="changeType">
                <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="echarts odd">
            <visitNumber></visitNumber>
          </div>
        </el-col>
        <el-col :span='12'>
          <div class="top">客户出单拜访记录</div>
          <div class="echarts">
            <record></record>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import visitNumber from './Components/VisitNumber'
import Record from './Components/Record'
export default {
  components: { visitNumber, Record },
  data () {
    return {
      type: '1',
      tabList: [{ label: '按周', value: '1' }, { label: '按月', value: '2' }, { label: '季度', value: '3' }, { label: '年度', value: '4' }],
    }
  },
  methods: {
    changeType () {
      this.$message.success('功能开发中')
    },
  },
}
</script>

<style lang="scss" scoped>
.clearfix {
  .title {
    font-weight: 700;
    font-size: 18px;
  }
}
.inline {
  float: right;
}
.top {
  padding: 10px 30px 20px 10px;
}
.echarts {
  height: 300px;
}
.odd {
  margin-right: 20px;
}
</style>
