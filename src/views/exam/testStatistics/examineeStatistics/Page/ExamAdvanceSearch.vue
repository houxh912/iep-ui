<template>
  <el-form :model="form" label-width="95px" size="mini">
    <el-form-item label="考试名称：">
      <el-input v-model="form.examName" clearable></el-input>
    </el-form-item>
    <el-form-item label="考试科目：">
      <el-select v-model="form.examSub" clearable class="selectItem">
        <el-option v-for="(item, index) in res.exms_subjects" :key="index" :label="item.label"
          :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="考试类型：">
      <el-select v-model="form.examType" clearable class="selectItem">
        <el-option v-for="(item, index) in examType" :key="index" :label="item.label"
          :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="成绩状态：">
      <el-select v-model="form.isPass" clearable class="selectItem">
        <el-option v-for="(item, index) in isPass" :key="index" :label="item.label"
          :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="排序方式：">
      <el-select v-model="form.examRankWay" clearable class="selectItem">
        <el-option v-for="(item, index) in examRankWay" :key="index" :label="item.label"
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
import { examType,isPass,examRankWay } from './option'
import { getTestOption } from '@/api/exam/testStatistics/examineeStatistics'
export default {
  name: 'ExamAdvanceSearch',
  data () {
    return {
      examType,
      isPass,
      examRankWay,
      form: {},
      res: {},
    }
  },
  created () {
    this.getTestOption()
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.form)
    },
    // 获取组织部门数据
    async getTestOption () {
        const params = {
        numberList: [
          'exms_subjects',//考试科目
          'exms_question_type',//题型
          'exms_question_category',//题类
          'exms_difficulty',//难度
        ],
      }
      const { data } = await getTestOption(params)
      this.res = data
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