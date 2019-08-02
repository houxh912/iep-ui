<template>
  <div>
    <el-form :model="form" label-width="100px" size="small">
      <el-form-item label="项目名称">
        <el-input v-model="form.projectName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="项目阶段">
        <iep-dict-select v-model="form.projectLevel" dict-name="prms_project_stage" style="width: 100%"></iep-dict-select>
      </el-form-item> -->
      <el-form-item label="项目状态">
        <el-select v-model="form.projectStatus" placeholder="请选择项目状态" clearable>
          <el-option v-for="(item, index) in projectStatusList" :key="index" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="searchPage" size="mini">搜索</el-button>
        <el-button @click="clearSearchParam" size="mini">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { initSearchForm } from './option'
export default {
  data () {
    return {
      form: initSearchForm(),
      projectStatusList: [
        { id: '1', label: '待提交' },
        { id: '2', label: '待审核' },
        { id: '3', label: '已立项' },
        { id: '4', label: '审核未通过' },
        { id: '5', label: '锁定' },
      ],
      isLoading: true,
    }
  },
  computed: {
  },
  // mounted () {
  //   this.restaurants = this.loadAll()
  // },
  created () {
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.form)
    },
    clearSearchParam () {
      this.form = initSearchForm()
    },
    handleSelect (item) {
      console.log(item)
    },
  },
}
</script>
<style lang="scss" scoped>
.inline-input {
  width: 100%;
}
</style>

