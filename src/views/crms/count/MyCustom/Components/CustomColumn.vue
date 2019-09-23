<template>
  <el-card shadow="hover">
    <el-row class="custom">
      <el-col class="head">客户分析</el-col>
    </el-row>
    <el-row>
      <el-col :span='10'>
        <div class="echarts odd">
          <district></district>
        </div>
      </el-col>
      <el-col :span='10'>
        <div class="echarts">
          <business></business>
        </div>
      </el-col>
      <el-col :span='4'>
        <div class="echarts lines">
          <div class="line"></div>
          <div class="msg">您的客户中：</div>
          <div class="msg" v-if="isShow">{{region}}，{{proposal}}等居多</div>
          <div class="msg">平均拜访次数约：<span class="color">{{visits}}</span></div>
          <div class="msg">平均方案上传约：<span class="color">{{upload}}</span></div>
          <div class="suggest">建议多寻找{{info}}。</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import District from './District'
import Business from './Business'
import { getDistrictMax, getMyClientAverage, getMyClientRelaMax, getMyClientRelaMin } from '@/api/crms/count'
export default {
  components: { District, Business },
  data () {
    return {
      data: [
        { value: '0', name: '部委', label: 'ministriesCommissions' },
        { value: '0', name: '省级', label: 'provincialLevel' },
        { value: '0', name: '市级', label: 'cities' },
        { value: '0', name: '区级', label: 'county' },
        { value: '0', name: '园区', label: 'park' },
        { value: '0', name: '企业', label: 'enterprise' },
        { value: '0', name: '其他', label: 'other' },
      ],
      data1: [
        { value: '0', name: '核心客户', label: 'consulting' },
        { value: '0', name: '重要客户', label: 'information' },
        { value: '0', name: '一般客户', label: 'product' },
        { value: '0', name: '潜在客户', label: 'platform' },
        { value: '0', name: '其他客户', label: 'outsourcing' },
      ],
      info: '',
      business: [],
      region: '',
      type: '',
      businessMax: [],
      businessMin: [],
      ClientRelaMax: [],
      aaa: [],
      proposal: '',
      isShow: true,
      visits: '',
      upload: '',
    }
  },
  created () {
    this.load()
  },
  methods: {
    toPercent (num, total) {
      return (Math.round(num / total))
    },
    load () {
      // 我的客户区域类型最多
      getDistrictMax().then(res => {
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
        for (let i = 0; i < this.data.length; i++) {
          for (let index = 0; index < keys.length; index++) {
            if (this.data[i].label == keys[index]) {
              this.businessMax.push(this.data[i].name)
            }
          }
        }
        this.region = this.businessMax.join('，')

      })
      // 平均拜访次数、下载方案
      getMyClientAverage().then(res => {
        this.visits = this.toPercent(res.data.data.contactQuantity, res.data.data.clientQuantity)
        this.upload = this.toPercent(res.data.data.softwareQuantity, res.data.data.clientQuantity)
        if (this.visits == Infinity || window.isNaN(this.visits) === true) {
          this.visits = 0
        } else {
          this.visits = this.visits
        }
        if (this.upload == Infinity || window.isNaN(this.upload) === true) {
          this.upload = 0
        } else {
          this.upload = this.upload
        }
      })
      getMyClientRelaMax().then(res => {
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
        for (let i = 0; i < this.data1.length; i++) {
          for (let index = 0; index < keys.length; index++) {
            if (this.data1[i].label == keys[index]) {
              this.ClientRelaMax.push(this.data1[i].name)
            }
          }
        }
        this.proposal = this.ClientRelaMax.join('，')
      })
      getMyClientRelaMin().then(res => {
        let keys = []
        for (let index = 0; index < res.data.length; index++) {
          for (let key in res.data[index]) {
            keys.push(key)
          }
        }
        for (let i = 0; i < this.data1.length; i++) {
          for (let index = 0; index < keys.length; index++) {
            if (this.data1[i].label == keys[index]) {
              this.businessMin.push(this.data1[i].name)
            }
          }
        }
        this.info = this.businessMin.join('，')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.custom {
  .head {
    font-weight: 700;
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
  }
}
.echarts {
  height: 300px;
  margin-top: 20px;
  margin-right: 20px;
  position: relative;
  .msg {
    padding: 5px 0;
  }
  .suggest {
    margin-top: 20px;
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
