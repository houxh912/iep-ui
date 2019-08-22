<template>
  <div class="expert-search">
    <div class="search-con">
      <operation-search @search-page="searchPage" :paramForm="paramForm" prop="content" advance-search>
        <el-form :model="paramForm" label-width="100px" size="small" class="form-detail">
          <el-form-item label="作者组织：">
            <iep-select v-model="paramForm.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择作者组织"></iep-select>
          </el-form-item>
          <el-form-item label="起始时间：">
            <el-date-picker v-model="paramForm.beginTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：">
            <el-date-picker v-model="paramForm.endTime" value-format="yyyy-MM-dd 23:59:59" type="date" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchPage(paramForm)">搜索</el-button>
            <el-button @click="clearSearchParam">清空</el-button>
          </el-form-item>
        </el-form>
      </operation-search>
    </div>
  </div>
</template>

<script>
const initParmas = () => {
  return {
    content: '',
    orgId: '',
    beginTime: '',
    endTime: '',
  }
}

export default {
  data () {
    return {
      paramForm: initParmas(),
    }
  },
  methods: {
    searchPage (val) {
      this.$emit('load-page', val)
    },
    clearSearchParam () {
      this.paramForm = initParmas()
    },
  },
}
</script>
<style scoped  lang="scss">
.expert-search {
  margin: 0 auto 25px;
  text-align: center;
  width: 300px;
  h3 {
    font-size: 24px;
    position: relative;
    .count {
      font-size: 14px;
      color: #999;
    }
    .publish {
      font-size: 14px;
      color: #cb3737;
      position: absolute;
      right: 0;
      line-height: 45px;
      cursor: pointer;
    }
  }
}
.search-con {
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
}
</style>
