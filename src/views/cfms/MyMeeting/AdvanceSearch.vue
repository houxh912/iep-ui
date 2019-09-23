<template>
  <div>
    <el-form :model="form" label-width="80px" size="small" :inline="true">
      <el-form-item label="姓名">
        <el-input v-model="form.inName" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.inPhone" placeholder="请输入手机"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.inEmail" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.signupFlag" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label=" ">
        <el-button type="primary" @click="searchPage" size="mini">搜索</el-button>
        <el-button @click="clearSearchParam" size="mini">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { initSearchForm } from './option'
export default {
  props: ['id'],
  data () {
    return {
      form: {},
      options: [{ label: '已报名', value: 1 }, { label: '已签到', value: 2 }, { label: '已确认', value: 3 }],
    }
  },
  methods: {
    searchPage () {
      this.form.meetingId = this.id
      this.$emit('search-page', { ...this.form })
    },
    clearSearchParam () {
      this.form = initSearchForm()
    },
  },
}
</script>
