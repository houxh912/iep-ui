<template>
  <div class="librarys-header">
    <div class="left">
      <div :label="title" name="first">{{title}}</div>
    </div>
    <div class="right">
      <operation-search @search-page="searchPage" advance-search placeHolder="请输入项目名称" prop="projectName">
        <el-form :model="form" label-width="100px" size="small">
          <el-form-item label="项目名称：">
            <el-input v-model="form.projectName" placeHolder="请输入项目名称"></el-input>
          </el-form-item>
          <el-form-item label="所属组织：">
            <iep-select v-model="form.orgId" prefix-url="admin/org/all" style="width: 100%" clearable></iep-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="searchPage1" size="mini">搜索</el-button>
            <el-button @click="clearSearchParam" size="mini">清空</el-button>
          </el-form-item>
        </el-form>
      </operation-search>
    </div>
  </div>
</template>
<script>
// import { getTodayCount } from '@/api/app/mlms/index'

export default {
  data () {
    return {
      title: '项目库',
      data: '',
      form: {
        projectName: '',
        orgId: '',
      },
    }
  },
  methods: {
    // getCount () {
    //   getTodayCount().then(({data}) => {
    //     this.data = `（${data.data} 个投资项目）`
    //   })
    // },
    searchPage1 () {
      this.$emit('search_page', this.form)
    },
    searchPage (val) {
      this.$emit('search_page', val)
    },
    clearSearchParam () {
      this.form = {
        projectName: '',
        orgId: '',
      }
    },
  },
  created () {
    // this.getCount()
  },
}
</script>
<style lang="scss" scoped>
.librarys-header {
  height: 53px;
  padding-top: 12px;
  border-bottom: solid 1px #e6e6e6;
  .left {
    float: left;
    > div {
      display: inline-block;
      font-size: 18px;
      line-height: 40px;
      padding: 0 10px;
      border-bottom: 2px solid #ba1b21;
    }
    .data {
      font-size: 14px;
      color: #9b9b9b;
    }
  }
  .right {
    float: right;
  }
}
</style>
