<template>
  <div class="input-wrapper">
    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="small" v-model="input">
    </el-input>
    <el-button size="small" @click="handleSearch">搜索</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      input: '',
      paramObj: {
        name: '',
      },
    }
  },
  methods: {
    handleSearch () {
      this.$emit('search', this.paramObj)
    },
  },
}
</script>
<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  max-width: 500px;
}
</style>
