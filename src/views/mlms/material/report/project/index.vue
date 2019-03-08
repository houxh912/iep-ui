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
        <time-line :list="list" ref="timeline" @actively="actively"></time-line>
      </div>
      <div class="form">
        <form-dialog ref="form" :putFormData="getFormData" v-if="dialogState!=='detail'"></form-dialog>
        <detail-dialog ref="detail" v-else @handleUpdate="handleUpdate"></detail-dialog>
      </div>
    </div>

  </div>
</template>

<script>
import TimeLine from './timeline'
import FormDialog from './formDialog'
import DetailDialog from './detailDialog'
export default {
  name: 'daily',
  components: { TimeLine, FormDialog, DetailDialog },
  data () {
    return {
      list: [
        { year: '2019年' },
        { date: '1月',
          children: [
            { title: '第一周', subTit: '01-04 ~ 01-10', content: '个人周报' },
            { title: '第二周', subTit: '01-11 ~ 01-17', content: '个人周报' },
            { title: '第三周', subTit: '01-18 ~ 01-24', content: '个人周报' },
            { title: '第四周', subTit: '01-25 ~ 02-02', content: '个人周报' },
          ],
        }, { date: '2月', 
          children: [
            { title: '第五周', subTit: '02-04 ~ 02-10', content: '个人周报' },
            { title: '第六周', subTit: '02-11 ~ 02-17', content: '个人周报' },
            { title: '第七周', subTit: '02-18 ~ 02-24', content: '个人周报' },
            { title: '第八周', subTit: '02-25 ~ 03-02', content: '个人周报' },
          ],
        },
      ],
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
    actively (index, type) {
      console.log('index: ', index, 'type: ', type)
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
