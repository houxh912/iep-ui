<template>
  <iep-fams-card title="财务资产">
    <template slot="right">
      <div style="width: 350px;">
        <el-date-picker v-model="rangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" size="mini">
        </el-date-picker>
      </div>
    </template>
    <div class="total-wrapper">
      <div class="total-item" v-for="(item, index) in financialData" :key="index">
        <div class="value">{{item}}</div>
        <div class="label">{{index}}</div>
      </div>
    </div>
  </iep-fams-card>
</template>
<script>
import IepFamsCard from './IepFamsCard'
export default {
  components: { IepFamsCard },
  data () {
    return {
      rangeTime: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          },
        }],
      },
      financialData: {
        '银行存款': 6325.5,
        '库存现金': 6325.5,
        '集团往来': 6325.5,
        '合同应收账款': 6325.5,
        '融资': 6325.5,
        '投资': 6325.5,
        '其他应收款': 6325.5,
        '组织拆借': 6325.5,
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.total-wrapper {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  .total-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgb(233, 233, 233);
    width: 100%;
    &:last-child {
      border-right: none;
    }
    .value {
      font-size: 24px;
      color: rgb(48, 49, 51);
    }
    .label {
      color: #999;
    }
  }
}
</style>
