<template>
  <el-form :form="searchForm" label-width="80px" size="mini">
    <el-form-item label="考试名称">
      <el-input v-model="searchForm.title"></el-input>
    </el-form-item>
    <el-form-item label="考试科目">
      <el-select v-model="searchForm.field" clearable style="width:100%">
        <el-option v-for="(item, index) in res.exms_subjects" :key="index" :label="item.label" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="考试类型">
      <el-select v-model="searchForm.type" clearable style="width:100%">
        <el-option :key="0" :value="0" label="考试模式"></el-option>
        <el-option :key="1" :value="1" label="练习模式"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="阅卷状态">
      <el-select v-model="searchForm.state" clearable style="width:100%">
        <el-option :key="0" :value="0" label="已阅卷"></el-option>
        <el-option :key="1" :value="1" label="未阅卷"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="排序方式">
      <el-select v-model="searchForm.sort" clearable style="width:100%">
        <el-option :key="0" :value="4" label="合格率从高到低"></el-option>
        <el-option :key="1" :value="1" label="考试人数从高到低"></el-option>
        <el-option :key="2" :value="2" label="及格人数从高到低"></el-option>
        <el-option :key="3" :value="3" label="平均分数从高到低"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <iep-button type="primary" @click="searchPage" style="margin:0 10px;">搜索</iep-button>
      <iep-button style="margin:0 10px" @click="handleClean">清空</iep-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getTestOption } from '@/api/exam/createExam/newTest/newTest'
export default {
  name: 'AdvanceSearch',
  data () {
    return {
      searchForm: {},
      res: [],
    }
  },
  created () {
    this.getTestOption()
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.searchForm)
    },
    /**
     * 获取试题数据
     */
    async getTestOption () {
      const params = {
        numberList: [
          'exms_subjects',//考试科目
        ],
      }
      const { data } = await getTestOption(params)
      this.res = data
    },
    /**
     * 清空按钮
     */
    handleClean () {
      this.searchForm = {}
    },
  },
  watch: {
    searchForm (n) {
      this.searchForm = n
    },
  },
}
</script>
