<template>
  <div class="material">
    <div class="material-nav">
      <div>推荐材料</div>
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
        { title: '2018年度文化和旅游部政府网站规划评测服务项目总结报告', type: '市场项目', author: '史晓梦', date: '04-01' },
        { title: '中国电建网站群安全防护总体方案（精简版）', type: '市场项目', author: '张炳强', date: '04-01' },
        { title: '浅析“互联网+”时代我国电子政务发展趋势', type: '外部材料', author: '周姣娜', date: '03-29' },
        { title: '湖南省“十三五”信息化发展规划专题调研活动方案', type: '市场项目', author: '李童', date: '03-29' },
        { title: '20190215青岛西海岸新区推行政务服务“一链办理”改革', type: '外部材料', author: '毛花', date: '03-28' },
      ],
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.material {
  padding: 15px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  color: #5f5f5f;
  .material-nav {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .material-content {
    padding: 10px 0;
    font-size: 14px;
    .text-right {
      text-align: right;
    }
    .text-time {
      color: #999;
    }
  }
  .title {
    padding: 5px 0;
    cursor: pointer;
    &:hover {
      color: #cb3737;
    }
  }
}
</style>
