<template>
  <div class="reference">
    <el-table ref="dailyTable" :data="dailyTableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="realName" label="姓名" width="300"></el-table-column>
      <el-table-column prop="workSummary" label="工作内容"></el-table-column>
    </el-table>
    <div class="footer">
      <iep-button type="primary" @click="submitForm">确定</iep-button>
      <iep-button @click="cancelPage">返回</iep-button>
    </div>
  </div>
</template>

<script>
import { getWeekMonthReportByOrg } from '@/api/mlms/material/report/organize'
import { getMonday, dateFormat } from '../util'
export default {
  props: {
    type: {
      type: Number,
      default: 0,
    },
    time: {
      default: '',
    },
  },
  data () {
    return {
      dailyTableData: [],
      selectList: [],
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.selectList = val
    },
    submitForm () {
      let workSummary = ''
      for (let item of this.selectList) {
        workSummary += item.workSummary + '\r\n'
      }
      this.$emit('load_reference', workSummary, true)
    },
    cancelPage () {
      this.$emit('load_reference', {}, false)
    },
  },
  created () {
    // 0周报，1月报
    let time = ''
    if (this.type === 0) {
      time = getMonday(this.time).time
    } else {
      time = dateFormat(this.time, 'yyyy-MM') + '-01'
    }
    getWeekMonthReportByOrg({
      yearMonthTime: time,
      reportType: this.type,
    }).then(({ data }) => {
      this.dailyTableData = data.data.records
    })
  },
}
</script>

<style lang="scss" scoped>
.reference {
  .footer {
    margin-top: 20px;
    .el-button {
      margin-right: 25px;
    }
  }
}
</style>
