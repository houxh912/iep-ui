<template>
  <el-form :model="form" label-width="95px" size="mini">
    <el-form-item label="考生姓名：">
      <el-input v-model="form.staffName" clearable></el-input>
    </el-form-item>
    <el-form-item label="所在组织：">
      <el-select v-model="form.department" clearable class="selectItem">
        <el-option v-for="(item, index) in depRes" :key="index" :label="item.name"
          :value="item.orgId"></el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="员工状态：">
      <el-select v-model="form.staffState" clearable class="selectItem">
        <el-option v-for="(item, index) in staffState" :key="index" :label="item.label"
          :value="item.value"></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="考试人员：">
      <el-select clearable class="selectItem" v-model="form.examinee">
        <el-option v-for="(item, index) in examinee" :key="index" :label="item.label"
          :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="排序方式：">
      <el-select clearable class="selectItem" v-model="form.examineeRankWay">
        <el-option v-for="(item, index) in examineeRankWay" :key="index" :label="item.label"
          :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <iep-button type="primary" @click="searchPage" style="margin-right:6px;">搜索</iep-button>
      <iep-button @click="handleClean">清空</iep-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { staffState,examinee,examineeRankWay } from './option'
import { getDepList } from '@/api/exam/testStatistics/examineeStatistics'
export default {
  name: 'AdvanceSearch',
  data () {
    return {
      staffState,
      examinee,
      examineeRankWay,
      form: {},
      res: {},
      depRes: {}, // 所在组织
    }
  },
  created () {
    this.getDepList()
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.form)
    },
    // 获取组织部门数据
    async getDepList () {
        const params = ''
        const { data } = await getDepList(params)
        this.depRes = data.data
    },
    /**
     * 清空按钮
     */
    handleClean () {
      this.form = {}
    },
  },
  watch: {
    form (n) {
      this.form = n
    },
  },
}
</script>
<style lang="scss" scoped>
.selectItem {
  width: 100%;
}
</style>
