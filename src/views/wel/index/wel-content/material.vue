<template>
  <div class="material">
    <div class="material-nav">
      <div class="title">推荐材料</div>
    </div>
    <div class="material-content">
      <el-row v-for="(item,index) in dataList" :key="index">
        <el-col :span="10">
          <div class="grid-content bg-purple title">{{item.title}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">{{item.type}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">{{item.author}}</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple text-right text-time">{{item.date}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        { title: '2011央企绩效评估方案', type: '市场项目', author: '李兰', date: '02-19' },
        { title: '2011央企绩效评估方案', type: '市场项目', author: '李兰', date: '02-19' },
        { title: '2011央企绩效评估方案', type: '市场项目', author: '李兰', date: '02-19' },
        { title: '2011央企绩效评估方案', type: '市场项目', author: '李兰', date: '02-19' },
        { title: '2011央企绩效评估方案', type: '市场项目', author: '李兰', date: '02-19' },
      ],
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.material {
  padding: 20px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  color: #5f5f5f;
  .material-nav {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .material-content {
    padding: 20px 0;
    font-size: 14px;
    .text-right {
      text-align: right;
    }
    .text-time {
      color: #999;
    }
  }
}
</style>
