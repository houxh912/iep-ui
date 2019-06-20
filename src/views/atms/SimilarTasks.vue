<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange" v-for="(similarTasks,index) in similarTasksList" :key="index">
      <el-collapse-item :title="similarTasks.title" name="1">
        <IepAppListCard :dataList="dataList" @click="handleDetail"></IepAppListCard>
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
          title: '相似任务（3）',
        },
      ],
      dataList: [
        {
          name: '徐州市发改委营商环境评估项目',
        },
        {
          name: '22州市发改委营商环境评估项目',
        },
        {
          name: '11徐州市发改委营商环境评估项目',
        },
        {
          name: '11徐州市发改委营商环境评估项目',
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
.el-collapse {
  border: 0;
}
</style>