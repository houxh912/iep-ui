<template>
  <div class="training-con">
    <iepAppTabCard :title="title" :linkName="linkName" :data="data" isMore>
      <div class="training-notice">
        <div v-for="(item,index) in trainingNotice" :key="index" class="piece" @click="handleDetail(item)">
          <span class="name">{{item.trainingTheme}}</span>
          <span class="time">{{formatYear(item.startTime)}}</span>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>

<script>
import { getPastList } from '@/api/app/hrms'
// 根据传入的时间，返回YYYY-MM-DD
function formatYear (mill) {
  var y = new Date(mill)
  let raws = [
    y.getFullYear(),
    formatDig(y.getMonth() + 1),
    formatDig(y.getDate()),
    // y.getDay() || 7,
  ]
  let format = ['-', '-', '-']
  return String.raw({ raw: raws }, ...format)
}
// 月份日期前一位补0
function formatDig (num) {
  return num > 9 ? '' + num : '0' + num
}

export default {
  data () {
    return {
      title: '培训内容',
      data: '',
      trainingNotice: [],
      linkName: '/app/resource/training',
      formatYear,
    }
  },
  methods: {
    loadList () {
      getPastList().then(({ data }) => {
        this.trainingNotice = data.data.slice(0, 7)
      })
    },
    handleDetail (row) {
      this.$router.push(`/app/resource/training/training_detail/${row.id}`)
    },
  },
  created () {
    this.loadList()
  },
}
</script>

<style lang="scss" scoped>
.training-notice {
  .piece {
    cursor: pointer;
    position: relative;
    margin-left: 15px;
    .name {
      display: inline-block;
      width: 200px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .time {
      float: right;
      height: 30px;
      line-height: 30px;
      color: #666;
    }
    &:hover {
      color: #cb3737;
      &:before {
        background-color: #cb3737;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: -15px;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
  }
}
</style>
<style scoped>
.training-con >>> .el-card {
  height: 330px;
}
</style>
