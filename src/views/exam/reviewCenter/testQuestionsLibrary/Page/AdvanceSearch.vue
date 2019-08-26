<template>
  <el-form :model="form" label-width="80px" size="mini">
    <el-form-item label="题目：">
      <el-input v-model="form.title" clearable></el-input>
    </el-form-item>
    <el-form-item label="科目：">
      <el-select v-model="form.field" clearable class="selectItem">
        <el-option v-for="(item, index) in res.exms_subjects" :key="index" :label="item.label"
          :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="题型：">
      <el-select clearable class="selectItem" v-model="form.questionType">
        <el-option v-for="(item, index) in res.exms_question_type" :key="index" :label="item.label"
          :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="难度：">
      <el-select v-model="form.difficulty" clearable class="selectItem">
        <el-option v-for="(item, index) in res.exms_difficulty" :key="index" :label="item.label"
          :value="item.id"></el-option>
      </el-select>

    </el-form-item>
    <el-form-item label="状态：">
      <el-select v-model="form.status" clearable class="selectItem">
        <el-option :key="0" label="审核中" :value="0"></el-option>
        <el-option :key="1" label="已通过" :value="1"></el-option>
        <el-option :key="2" label="未通过" :value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <iep-button type="primary" @click="searchPage" style="margin-right:6px;">搜索</iep-button>
      <iep-button @click="handleClean">清空</iep-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getTestOption } from '@/api/exam/createExam/newTest/newTest'
export default {
  name: 'AdvanceSearch',
  data () {
    return {
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
    /**
    * 获取试题数据
    */
    async getTestOption () {
      const params = {
        numberList: [
          'exms_subjects',//考试科目
          'exms_question_type',//题型
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
