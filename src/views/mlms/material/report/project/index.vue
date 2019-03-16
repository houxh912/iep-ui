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
        <form-dialog ref="form" :putFormData="getFormData" v-if="dialogState!=='detail'"></form-dialog>
        <detail-dialog ref="detail" v-else @handleUpdate="handleUpdate"></detail-dialog>
      </div>
    </div>

  </div>
</template>

<script>
import TimeLine from '../timeline'
import FormDialog from './formDialog'
import DetailDialog from './detailDialog'
import { createWeeks } from '../util'

export default {
  name: 'daily',
  components: { TimeLine, FormDialog, DetailDialog },
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
      dialogState: 'create',
    }
  },
  methods: {
    submit () {
    },
    search () {},
    // 切换周报
    actively (item, type) {
      console.log('item: ', item, 'type: ', type)
      if (type === 'week') {
        this.dialogState = 'detail'
      }
    },
    // 保存周报
    getFormData (data) {
      console.log('data: ', data)
    },
    // 编辑周报
    handleUpdate () {
      this.dialogState = 'create'
    },
  },
  created () {
    // 获取当前的时间，默认显示当前年-当前月
    let date = new Date()
    console.log('date: ', `${date.getFullYear()}-${date.getMonth()}`)
    this.timeLineOption.list = createWeeks(2019)
    console.log('list: ', this.list)
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
