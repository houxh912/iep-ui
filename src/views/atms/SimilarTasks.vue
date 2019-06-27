<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="title" name="1">
        <div v-for="(item,index) in dataList" :key="index" class="piece" @click="handleDetail(item)">
          {{item}}
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
      title: '相似任务（3）',
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
  },
}
</script>
<style lang="scss">
.el-collapse {
  border: 0;
}
</style>