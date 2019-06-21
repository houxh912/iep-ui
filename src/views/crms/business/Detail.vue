<template>
<!-- 商机认领户后消息提示跳转的详情 -->
  <div>
    <basic-container>
      <page-header title="合作机会"></page-header>
      <el-form :model="formData" label-width="100px" size="small">
        <el-form-item label="客户名称：">
          {{formData.clientName}}
        </el-form-item>
        <el-form-item label="项目名称：">
          {{formData.projectName}}
        </el-form-item>
        <el-form-item label="业务类型：">
          <el-tag type="info" class="tag-style" v-for="(item,index) in formData.businessType" :key="index">{{item.commonName}}</el-tag>
        </el-form-item>
        <el-form-item label="意向程度：">
          <a-tag type="info">{{formData.intentionLevelValue}}</a-tag>
        </el-form-item>
        <el-form-item label="商机描述：">
          <span>{{formData.opportunityDes}}</span>
        </el-form-item>
        <el-form-item label="商机标签：">
          <iep-tag-detail v-model="formData.tags"></iep-tag-detail>
        </el-form-item>
        <el-form-item label="发布者：">
          <span>{{formData.publisher}} </span>
        </el-form-item>
        <el-form-item label="发布日期：">
          <span>{{formData.publishDate}}</span>
        </el-form-item>
        <el-form-item label="认领状态：">
          <span>{{formData.statusValue}}</span>
        </el-form-item>
        <el-form-item label="创建状态：">
          <span v-if="formData.isCreate==0">未创建</span>
          <span v-if="formData.isCreate==1">已创建</span>
        </el-form-item>
        <el-form-item label="认领人：" v-if="formData.statusKey == 1">
          <span>{{formData.reciver}}</span>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>

<script>
import { getBusinessById } from '@/api/crms/business'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      formData: {},
      methodName: '',
      drawerShow: false,
      record: {
        id: this.$route.query.id,
      },
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    getBusinessById(this.record.id).then(res => {
      this.formData = res.data.data.data
      this.formData.tags = res.data.data.data.tags.map(m => m.commonName)
    })
  },
}
</script>
<style>
.tag-style {
  margin-right: 10px;
}
</style>
