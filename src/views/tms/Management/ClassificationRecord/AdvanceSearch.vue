<template>
  <div>
    <el-form :model="form" label-width="100px" size="small">
      <el-form-item label="记录时间：">
        <el-date-picker v-model="form.createTime" type="date" placeholder="请选择记录时间" size="small" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="操作人">
        <el-input v-model="form.creatorName"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="searchPage" size="mini">搜索</el-button>
        <el-button @click="clearSearchParam" size="mini">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export const initSearchForm = () => {
  return {
    createTime: '',
    creatorName: '',
  }
}
export default {
  data () {
    return {
      form: {
        createTime: '',
        creatorName: '',
      },
      isLoading: true,
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.form)
    },
    clearSearchParam () {
      this.form = initSearchForm()
      this.$emit('clear-search-param')
    },
  },
}
</script>
<style lang="scss" scoped>
.inline-input {
  width: 100%;
}
</style>

