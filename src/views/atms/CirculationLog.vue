<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange" v-for="(similarTasks,index) in similarTasksList" :key="index">
      <el-collapse-item :title="similarTasks.title" name="1">
        <div class="con" v-for="(item,index) in itemList" :key="index">
          <span class="name">
            <span class="sub-name">{{item.operatorName}}</span>{{item.remarks}}
          </span>
          <span class="time">{{item.operateTime | formatTime}}</span>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  props: {
    itemList: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data () {
    return {
      activeNames: ['1'],
      similarTasksList: [
        {
          title: '流转日志',
        },
      ],
    }
  },
  methods: {
    handleDetail () {
    },
    handleChange () {

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