<template>
  <el-card class="hot-news" shadow="never">
    <div slot="header" class="clearfix">
      <span class="sub-title">热点要闻</span>
    </div>
    <div v-for="hot in hotData" :key="hot.id">
      <div class="title-con"><i class="">·</i>{{hot.title}}</div>
    </div>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      hotData: [
        {
          id: '1',
          title: '这里是热点要闻的标题内容',
        },
        {
          id: '2',
          title: '这里是热点要闻的标题内容',
        },
        {
          id: '3',
          title: '这里是热点要闻的标题内容这里是热点要闻的标题内容',
        },
        {
          id: '4',
          title: '这里是热点要闻的标题内容这里是热点要闻的标题内容',
        },
        {
          id: '5',
          title: '这里是热点要闻的标题内容',
        },
        {
          id: '6',
          title: '这里是热点要闻的标题内容',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.hot-news {
  .title {
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: #cb3737;
    }
  }
  .grid-content {
    font-size: 14px;
  }
  .el-progress {
    width: 120px;
  }
  .text-right {
    text-align: right;
  }
  .text-time {
    color: #999;
  }
  .title-con {
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      color: #cb3737;
    }
    &:nth-child(1) {
      padding-top: 10px;
    }
    i {
      margin-right: 5px;
    }
  }
}
.el-card {
  border: 0;
}
.text {
  font-size: 14px;
}

.item {
  margin-right: 15px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
<style scoped>
.hot-news >>> .el-card__body {
  padding: 10px 0;
}
</style>
