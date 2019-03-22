<template>
  <div class="project">

    <div class="search">
      <div class="item">
        <el-date-picker v-model="searchData.date" type="date" placeholder="选择日期" size="small"></el-date-picker>
      </div>
      <div class="item">
        <el-input v-model="searchData.title" placeholder="请输入关键词" size="small"></el-input>
      </div>
      <iep-button @click="search">搜索</iep-button>
    </div>
    <div class="content">
      <div class="timeline">
        <time-line ref="timeline" @actively="actively" :option="timeLineOption"></time-line>
      </div>
      <div class="form">
        <form-dialog ref="form" @putFormData="getFormData" v-if="dialogState!=='detail'"></form-dialog>
        <detail-dialog ref="detail" v-else @handleUpdate="handleUpdate" @handleCreate="handleCreate"></detail-dialog>
      </div>
    </div>
    <create-dialog ref="createDialog" @selectProject="selectProject"></create-dialog>

  </div>
</template>

<script>
import TimeLine from '../timeline'
import FormDialog from './formDialog'
import DetailDialog from './detailDialog'
import { createWeeks } from '../util'
import { getTableData, createData, updateData } from '@/api/mlms/material/report/project'
import CreateDialog from './createDialog'

export default {
  name: 'daily',
  components: { TimeLine, FormDialog, DetailDialog, CreateDialog },
  data () {
    return {
      timeLineOption: {
        list: [],
      },
      formData: {},
      searchData: {
        date: '',
        title: '',
      },
      dialogState: 'detail',
      requestFn: () => {},
    }
  },
  methods: {
    submit () {
    },
    search () {},
    // 切换周报
    actively (item, type) {
      if (type === 'week') {
        let year = new Date(item.timeStamp).getFullYear()
        this.dialogState = 'detail'
        getTableData({
          startTime: `${year}-${item.startTime} 00:00:00`,
          endTime: `${year}-${item.endTime} 00:00:00`,
        }).then(({data}) => {
          this.$refs['detail'].weeklyList = data.data
          this.$refs['detail'].activeName = -1
        })
      }
    },
    // 保存周报
    getFormData (data) {
      console.log('data: ', data)
      this.requestFn(data).then(() => {
        this.dialogState = 'detail'
      })
    },
    // 编辑周报
    handleUpdate (row) {
      console.log('row: ', row)
      this.dialogState = 'update'
      this.requestFn = updateData
      this.$nextTick(() => {
        row.paymentRelations = [
          { projectPaymentTime: '2月', paymentAmount: '100000' },
          { projectPaymentTime: '2月', paymentAmount: '100000' },
          { projectPaymentTime: '2月', paymentAmount: '100000' },
          { projectPaymentTime: '2月', paymentAmount: '100000' },
        ]
        this.$refs['form'].formData = row
      })
    },
    handleCreate () {
      this.$refs['createDialog'].dialogShow = true
      this.requestFn = createData
    },
    selectProject (projectId) {
      this.dialogState = 'create'
      this.$nextTick(() => {
        this.$refs['form'].formData.projectId = projectId
      })
    },
  },
  created () {
    // 获取当前的时间，默认显示当前年-当前月
    this.timeLineOption.list = createWeeks(2019)
  },
}
</script>

<style lang="scss" scoped>
.project {
  padding: 20px 0 0;
  .search {
    margin-bottom: 20px;
    .item {
      display: inline-block;
      width: 150px;
      margin-right: 15px;
    }
  }
  .content {
    display: flex;
    .timeline {
      width: 180px;
    }
    .form {
      flex: 1;
    }
  }
}
</style>
