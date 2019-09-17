<template>
  <el-form :form="searchForm" label-width="80px" size="mini">
    <el-form-item label="所在组织">
      <el-select style="width:100%" v-model="searchForm.orgId" placeholder="请选择组织" clearable>
        <el-option v-for="(item, index) in resdata" :key="index" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="及格状态">
      <el-select v-model="searchForm.state" clearable style="width:100%">
        <el-option :key="0" :value="0" label="优秀"></el-option>
        <el-option :key="1" :value="1" label="及格"></el-option>
        <el-option :key="2" :value="2" label="不及格"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="排序方式">
      <el-select v-model="searchForm.sort" clearable style="width:100%">
        <el-option :key="0" :value="0" label="合格率从高到低"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <iep-button type="primary" @click="searchPage" style="margin:0 10px;">搜索</iep-button>
      <iep-button style="margin:0 10px" @click="handleClean">清空</iep-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getOrgList } from '@/api/evaluate/org'
export default {
  name: 'AdvanceSearch',
  data () {
    return {
      searchForm: {},
      resdata: [],
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
    getTestOption () {
      getOrgList().then(res => {
        this.resdata = res.data.data
      })

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
