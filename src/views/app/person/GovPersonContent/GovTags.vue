<template>
  <div class="leaderBoard">
    <el-card class="index-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="cardTitle" style="font-size:18px;">{{title}}</span>
      </div>
      <div>
        <div class="leaderBoardList">
          <div v-for="(item,index) in leaderBoardList" :key="index" class="piece">
            <span class="count" :class="item.color">{{index+1}}</span>
            <span class="name">{{item.name}}</span>
            <span class="num">{{item.num}}</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '国脉标签',
      leaderBoardList: [
        { name: '互联网+政务', num: '1222人', color: 'red' },
        { name: '服务', num: '421人', color: 'red' },
        { name: 'DIPS', num: '562人', color: 'red' },
        { name: '数据基因', num: '322人', color: '' },
        { name: '大数据', num: '5322人', color: '' },
        { name: '规划与咨询', num: '1222人', color: '' },
        { name: '项目管理', num: '88人', color: '' },
        { name: '数据治理', num: '321人', color: '' },
        { name: '营商环境', num: '342人', color: '' },
        { name: '微服务', num: '1320人', color: '' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.leaderBoard {
  .piece {
    cursor: pointer;
    .name {
      display: inline-block;
      width: 200px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }
    .count {
      display: inline-block;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      margin-right: 20px;
      background-color: #ccc;
      color: #fff;
      vertical-align: middle;
    }
    .red {
      background-color: #cb3737;
    }
    .num {
      float: right;
      color: #666;
    }
    &:hover {
      color: #cb3737;
    }
  }
}
</style>
