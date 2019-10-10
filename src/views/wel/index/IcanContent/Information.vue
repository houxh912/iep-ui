<template>
  <div class="information-wrapper">
    <div class="tabs-wrapper">
      <div class="tab-item" :class="{'active':activeId===item.id}" v-for="item in collections" :key="item.id">{{item.name}}</div>
    </div>
    <iep-no-data v-if="!listData.length"></iep-no-data>
    <div v-else class="list-wrapper">
      <div class="list-item" v-for="item in listData" :key="item.id">
        <el-link class="iep-ellipsis-flex" :title="item.name" @click="handleOpen(item)">{{item.name}}</el-link>
        <!-- <iep-div-detail class="link" :value="item.name"></iep-div-detail> -->
        <div class="time">{{item.time | parseToMonthDay}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeId: 1,
      collections: [
        {
          id: 1,
          name: '动态',
        },
        {
          id: 2,
          name: '公告',
        },
        {
          id: 3,
          name: '任务',
        },
        {
          id: 4,
          name: '机会',
        },
        {
          id: 5,
          name: '需求',
        },
        {
          id: 6,
          name: '问卷',
        },
        {
          id: 7,
          name: '考试',
        },
      ],
      listData: [
        {
          id: 1,
          name: '【公告】关于20190129微信优秀项目分享《浙江省工序对接全流程管理项目分享》的通知',
          time: '2019-10-10 10:10:10',
        },
        {
          id: 2,
          name: '【动态】关于规范国脉社群管理及相关培训的通知',
          time: '2019-10-10 10:10:10',
        },
        {
          id: 3,
          name: '【动态】关于20190122微信优秀项目分享《2018版浙江目录梳理项目经验分享》的通知',
          time: '2019-10-10 10:10:10',
        },
        {
          id: 4,
          name: '【动态】关于发布《国脉集团项目质量管理方法》（征求意见稿）的通知',
          time: '2019-10-10 10:10:10',
        },
        {
          id: 5,
          name: '【动态】关于20190122微信优秀项目分享《海沧公共安全数据标准化及数据模型项目分析》的通知',
          time: '2019-10-10 10:10:10',
        },
        {
          id: 6,
          name: '【动态】关于发布加快营商环境业务开展的通知',
          time: '2019-10-10 10:10:10',
        },
        {
          id: 7,
          name: '【动态】关于20191018微信培训内网《海沧公共安全数据标准化及数据模型项目分析》的通知',
          time: '2019-10-10 10:10:10',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.list-wrapper {
  height: 100%;
  width: 100%;
  padding: 10px 20px;
}
.list-item {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;

  .time {
    flex: 0 0 100px;
    text-align: right;
    color: #999;
  }
}
.information-wrapper {
  margin: 20px;
}
.tabs-wrapper {
  display: flex;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  .tab-item {
    margin: 0 20px;
    padding: 10px 0;
    cursor: pointer;
    &.active {
      color: $--color-primary;
      border-bottom: 2px solid $--color-primary;
    }
    &:hover {
      color: $--color-primary;
      border-bottom: 2px solid $--color-primary;
    }
  }
}
</style>
