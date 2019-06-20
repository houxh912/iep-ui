<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange" v-for="(similarTasks,index) in similarTasksList" :key="index">
      <el-collapse-item :title="similarTasks.title" name="1">
        <div class="con" v-for="(item,index) in itemList" :key="index">
          <span class="name">
            <span class="sub-name">{{item.subName}}</span>{{item.name}}
          </span>
          <span class="time">{{item.time}}</span>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeNames: ['1'],
      similarTasksList: [
        {
          title: '流转日志',
        },
      ],
      itemList: [
        {
          subName: '潘超巧',
          name: '徐州市发改委营商环境评估项目',
          time: '今天 8:22',
        },
        {
          subName: '潘超巧',
          name: '22州市发改委营商环境评估项目',
          time: '昨天 8:22',
        },
        {
          subName: '潘超巧',
          name: '11徐州市发改委营商环境评估项目',
          time: '昨天 8:22',
        },
        {
          subName: '潘超巧',
          name: '11徐州市发改委营商环境评估项目',
          time: '6月2日 9:22',
        },
      ],
    }
  },
  methods: {
    handleDetail () {
    },
  },
}
</script>
<style lang="scss">
.con {
  display: flex;
  margin-bottom: 15px;
  flex-direction: column;
  .name {
    margin-bottom: 5px;
  }
  .sub-name {
    color: rgb(37, 88, 169);
  }
  .time {
    font-size: 12px;
    color: #999;
  }
}
</style>