<template>
  <div class="similar-tasks">
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="`相似任务（${dataList.length}）`" name="1">
        <div v-for="(item,index) in dataList" :key="index" class="piece" @click="handleDetail(item.id)">
          {{item.name}}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data () {
    return {
      activeNames: ['1'],
    }
  },
  methods: {
    handleDetail (row) {
      this.$emit('click', row)
    },
  },
}
</script>
<style lang="scss" scoped>
.el-collapse {
  border: 0;
}
.piece{
  cursor: pointer;
  height: 34px;
  line-height: 34px;
  padding-left: 20px;
  position: relative;
  &:before{
    content: "";
    position: absolute;
    left: 6px;
    top:16px;
    width: 4px;
    height: 4px;
    border-radius:50%;
    background-color: #999; 
  }
}
</style>
<style scoped>
/* .similar-tasks >>> .el-collapse-item__content{
  padding: 0
} */
</style>
