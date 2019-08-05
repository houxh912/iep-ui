<template>
  <el-form :model="searchForm" label-width="80px" size="mini">
    <el-form-item label="试卷名称">
      <el-input v-model="searchForm.title" placeholder="请输入试卷名称"></el-input>
    </el-form-item>
    <el-form-item label="试卷分类">
      <el-select v-model="searchForm.field" placeholder="请选择试卷分类" clearable style="width:100%">
        <el-option v-for="(item, index) in res.exms_subjects" :key="index" :label="item.label"
          :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <iep-button type="primary" @click="searchPage" style="margin-right:6px;">搜索</iep-button>
      <iep-button @click="handleClean">取消</iep-button>
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
