<template>
  <div class="resources">
    <el-card class="index-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="cardTitle" style="font-size:18px;">{{title}}</span>
        <el-button class="charge" type="text">换一批</el-button>
      </div>
      <div>
        <div class="classify">
          <span class="sub-title">分类：</span>
          <span class="appellation" v-for="name in nameList" :key="name.id">{{name.name}}</span>
        </div>
        <div class="resourcesList">
          <div v-for="(item,index) in resourcesList" :key="index" class="piece">
            <span :class="item.icon" class="icon"></span>
            <span class="name">{{item.name}}</span>
            <span class="number">{{item.number}}</span>
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
      title: '光彩国脉人',
      nameList: [
        {
          id: '1',
          name: '技术之星',
        },
        {
          id: '2',
          name: '品牌达人',
        },
        {
          id: '3',
          name: '销售达人',
        },
        {
          id: '4',
          name: '材料达人',
        },
        {
          id: '5',
          name: '贡献达人',
        },
      ],
      resourcesList: [
        { icon: 'el-icon-question', name: '材料库', number: '222' },
        { icon: 'el-icon-question', name: '材料库', number: '222' },
        { icon: 'el-icon-question', name: '材料库', number: '222' },
        { icon: 'el-icon-question', name: '材料库', number: '222' },
        { icon: 'el-icon-question', name: '材料库', number: '222' },
        { icon: 'el-icon-question', name: '材料库', number: '222' },
        { icon: 'el-icon-question', name: '材料库', number: '222' },
        { icon: 'el-icon-question', name: '材料库', number: '222' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.resources {
  .classify {
    &:first .appellation {
      color: #cb3737;
      background: #fef0f0;
      border-color: #cb3737;
    }
  }
  .appellation {
    margin: 0 10px;
    padding: 5px 15px;
    border-radius: 20px;
    border: 1px solid #fff;
    cursor: pointer;
    &:hover,
    &:focus {
      color: #cb3737;
      background: #fef0f0;
      border-color: #cb3737;
    }
  }
}
.resourcesList {
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 40px;
  grid-column-gap: 20px;
  padding: 20px 0 13px;
  .piece {
    width: 100%;
    text-align: center;
    .icon {
      width: 50%;
      height: 100%;
      font-size: 40px;
      padding: 11px 0;
      border-radius: 50%;
      background-color: #f0f0f0;
      text-align: center;
      display: block;
      margin: 0 auto;
    }
    .name,
    .number {
      width: 50%;
      display: block;
      margin: 0 auto;
    }
    .name {
      height: 30px;
      line-height: 30px;
    }
    .number {
      color: #999;
    }
  }
}
</style>
<style scoped>
.resources >>> .charge {
  float: right;
  padding: 5px 0;
  color: #cb3737;
}
</style>
