<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">出单分析</span>
      <operation-search @search-page="searchPage" advance-search class="search">
        <advance-search @search-page="searchPage"></advance-search>
      </operation-search>
    </div>
    <div>
      <el-row>
        <div class="echarts">
          <el-row>
            <el-col :span="10">
              <district></district>
            </el-col>
            <el-col :span="9">
              <business></business>
            </el-col>
            <el-col :span="5">
              <div class="echarts lines">
                <div class="line"></div>
                <div class="percent">
                  <el-progress type="circle" :percentage="percent" color="#D56368" :stroke-width="10" status="text">
                    {{percent+'%'}} <br>
                    出单率
                  </el-progress>
                </div>
                <div class="msg">{{region}}客户，{{business}}类客户居多,为{{percent+'%'}}；</div>
                <div class="suggest">建议：拜访次数至少到达3次；方案至少达到2份</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import Business from './Business'
import District from './District'
import AdvanceSearch from './AdvanceSearch'
import { getAllClientNum } from '@/api/crms/count'
import { getBusiness } from '@/api/crms/count'
import { getDistrict } from '@/api/crms/count'
export default {
  components: { Business, District, AdvanceSearch },
  data () {
    return {
      percent: 70,
      business: '',
      region: '',
    }
  },
  created () {
    this.load()
  },
  methods: {
    searchPage () {
    },
    toPercent (num, total) {
      return (Math.round(num / total * 10000) / 100.00)// 小数点后两位百分比
    },
    load () {
      getAllClientNum().then(res => {
        this.percent = this.toPercent(res.data.data.contractQuantity, res.data.data.clientQuantity)
      })
      getBusiness().then(res => {
        this.business = res.data.data[0].marketManager
      })
      getDistrict().then(res => {
        this.region = res.data.data[0].marketManager
      })
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
.echarts {
  height: 300px;
  padding: 15px 10px;
  position: relative;
  .percent {
    width: 100%;
    text-align: center;
    margin: 10px 0;
  }
  .msg {
    padding: 5px 0;
  }
  .suggest {
    margin-top: 15px;
  }
}
.lines {
  padding-left: 20px;
  .line {
    position: absolute;
    left: 0;
    height: 100%;
    width: 2px;
    background: #eee;
  }
}
</style>
