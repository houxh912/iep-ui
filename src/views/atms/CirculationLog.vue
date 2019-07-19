<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="title" name="2">
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
      activeNames: ['2'],
      title: '流转日志',
    }
  },
  methods: {
    handleDetail () {
    },
  },
}
</script>
<style lang="scss" scoped>
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