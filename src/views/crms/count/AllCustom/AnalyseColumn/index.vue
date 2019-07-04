<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">出单分析</span>
      <!-- <operation-search @search-page="searchPage" advance-search class="search">
        <advance-search @search-page="searchPage"></advance-search>
      </operation-search> -->
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
                <div class="msg" >
                  <span v-if="isShow">{{info}}客户，</span>
                  <span v-if="isShowOne">{{region}}等出单率居多,</span>
                  </div>
                <div class="suggest">{{zone}}，{{proposal}}最少</div>
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
import { getAllClientNum, getAllClientRelaMax, getAllClientRelaMin, getAllDistrictMax, getAllDistrictMin } from '@/api/crms/count'
export default {
  components: { Business, District },
  data () {
    return {
      percent: 70,
      business: [],
      info: '',
      proposal: '',
      region: '',
      zone: '',
      businessMin: [],
      businessMax: [],
      DistrictMax: [],
      DistrictMin: [],
      data: [
        { value: '0', name: '核心客户', label: 'consulting' },
        { value: '0', name: '重要客户', label: 'information' },
        { value: '0', name: '一般客户', label: 'product' },
        { value: '0', name: '潜在客户', label: 'platform' },
        { value: '0', name: '其他客户', label: 'outsourcing' },
      ],
      data1: [
        { value: '0', name: '核心客户', label: 'consulting' },
        { value: '0', name: '重要客户', label: 'information' },
        { value: '0', name: '一般客户', label: 'product' },
        { value: '0', name: '潜在客户', label: 'platform' },
        { value: '0', name: '其他客户', label: 'outsourcing' },
      ],
      data3: [
        { value: '0', name: '部委', label: 'ministriesCommissions' },
        { value: '0', name: '省级', label: 'provincialLevel' },
        { value: '0', name: '市级', label: 'cities' },
        { value: '0', name: '区级', label: 'county' },
        { value: '0', name: '园区', label: 'park' },
        { value: '0', name: '企业', label: 'enterprise' },
        { value: '0', name: '其他', label: 'other' },
      ],
      isShow: true,
      isShowOne:true,
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
      // 出单率
      getAllClientNum().then(res => {
        let percent = this.toPercent(res.data.data.contractQuantity, res.data.data.clientQuantity)
        if (percent == Infinity || window.isNaN(percent) === true) {
          this.percent = 0
        } else {
          this.percent = percent
        }
      })
      // 客户关系最多
      getAllClientRelaMax().then(res => {
        let keys = []
        for (let index = 0; index < res.data.length; index++) {
          for (let key in res.data[index]) {
            keys.push(key)
          }
        }
        for (let i in res.data) {
          let key = Object.keys(res.data[i])[0]
          if (res.data[i][key] == 0) {
            this.isShowOne = false
            break
          }
        }
        for (let i = 0; i < this.data.length; i++) {
          for (let index = 0; index < keys.length; index++) {
            if (this.data[i].label == keys[index]) {
              this.businessMax.push(this.data[i].name)
            }
          }
        }
        this.region = this.businessMax.join('，')
      })
      // 客户关系最少
      getAllClientRelaMin().then(res => {
        let keys = []
        for (let index = 0; index < res.data.length; index++) {
          for (let key in res.data[index]) {
            keys.push(key)
          }
        }
        for (let i = 0; i < this.data.length; i++) {
          for (let index = 0; index < keys.length; index++) {
            if (this.data[i].label == keys[index]) {
              this.businessMin.push(this.data[i].name)
            }
          }
        }
        this.proposal = this.businessMin.join('，')
      })
      // 区域类型最多
      getAllDistrictMax().then(res => {
        let keys = []
        for (let index = 0; index < res.data.length; index++) {
          for (let key in res.data[index]) {
            keys.push(key)
          }
        }
        for (let i in res.data) {
          let key = Object.keys(res.data[i])[0]
          if (res.data[i][key] == 0) {
            this.isShow = false
            break
          }
        }
        for (let i = 0; i < this.data3.length; i++) {
          for (let index = 0; index < keys.length; index++) {
            if (this.data3[i].label == keys[index]) {
              this.DistrictMax.push(this.data3[i].name)
            }
          }
        }
        this.info = this.DistrictMax.join('，')
      })
      // 区域类型最少
      getAllDistrictMin().then(res => {
        let keys = []
        for (let index = 0; index < res.data.length; index++) {
          for (let key in res.data[index]) {
            keys.push(key)
          }
        }
        for (let i = 0; i < this.data3.length; i++) {
          for (let index = 0; index < keys.length; index++) {
            if (this.data3[i].label == keys[index]) {
              this.DistrictMin.push(this.data3[i].name)
            }
          }
        }
        this.zone = this.DistrictMin.join('，')
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
