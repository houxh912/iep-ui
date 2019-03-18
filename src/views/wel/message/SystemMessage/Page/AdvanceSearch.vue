<template>
  <el-form :model="paramForm" label-width="80px" size="mini">
    <el-form-item label="主题">
      <el-input v-model="paramForm.name"></el-input>
    </el-form-item>
    <el-form-item label="分类">
      <el-select v-model="paramForm.organization" placeholder="请选择分类">
        <el-option label="全部"></el-option>
        <el-option label="分类一"></el-option>
        <el-option label="分类二"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="发布时间">
      <el-select v-model="paramForm.department" placeholder="请选择发布时间">
        <el-option label="最近三天"></el-option>
        <el-option label="最近一周"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <iep-button type="primary" @click="searchPage">搜索</iep-button>
      <iep-button>取消</iep-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      paramForm: this.form,
    }
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.paramForm)
    },
  },
  watch: {
    form (n) {
      this.paramForm = n
    },
  },
}
</script>
