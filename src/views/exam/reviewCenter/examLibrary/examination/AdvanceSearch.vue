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
    <el-form-item label="启用状态">
      <el-select v-model="searchForm.state" clearable style="width:100%">
        <el-option :key="0" :value="0" label="启用"></el-option>
        <el-option :key="1" :value="1" label="禁用"></el-option>
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
