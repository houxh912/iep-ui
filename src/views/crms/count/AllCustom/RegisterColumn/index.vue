<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">客户登记</span>
      <span> (客户数量：{{number.clientQuantity}}，联系人数量：{{number.contactQuantity}}，拜访次数：{{number.visitTheNumber}}) </span>
      <operation-search @search-page="searchPage" advance-search class="search">
        <advance-search @search-page="searchPage"></advance-search>
      </operation-search>
    </div>
    <div>
      <el-row>
        <el-col :span='12'>
          <div class="echarts odd">
            <count></count>
          </div>
        </el-col>
        <el-col :span='12'>
          <div class="top flag">市场经理</div>
          <div class="echarts">
            <manager></manager>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
          <div class="top">
            <span>区域类型</span>
          </div>
          <div class="echarts odd">
            <area-type> </area-type>
          </div>
        </el-col>
        <el-col :span='12'>
          <div class="top">
            <span>客户增长统计</span>
            <div class="inline">
              <el-radio-group v-model="type" size="mini" @change="changeType">
                <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="echarts">
            <increase></increase>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import Manager from './Components/Manager'
import Count from './Components/Count'
import AreaType from './Components/AreaType'
import Increase from './Components/Increase'
import AdvanceSearch from './AdvanceSearch'
import { getAllRejister } from '@/api/crms/count'
export default {
  components: { Manager, Count, AreaType, Increase, AdvanceSearch },
  data () {
    return {
      number: '',
      type: '1',
      tabList: [{ label: '按周', value: '1' }, { label: '按月', value: '2' }, { label: '季度', value: '3' }, { label: '年度', value: '4' }],
      current: 1,
    }
  },
  created () {
    getAllRejister().then((res) => {
      this.number = res.data.data
    })
  },
  methods: {
    changeType () {
      this.$message.success('功能开发中')

    },
    searchPage () {
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
    padding-right: 10px;
  }
}

.search {
  float: right;
}
.top {
  padding: 40px 20px 15px 20px;
  .more {
    float: right;
    margin-right: 20px;
    .border {
      margin-left: 10px;
      i {
        display: inline-block;
        padding: 5px;
        border: 1px solid #9c9c9c;
      }
      &:hover {
        color: blue;
      }
    }
  }
  .inline {
    float: right;
  }
}
.echarts {
  height: 300px;
}
.odd {
  margin-right: 20px;
}
.flag {
  padding-top: 10px;
}
</style>
