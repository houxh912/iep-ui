<template>
  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="'商机'+methodName" width="40%" @close="loadPage">
    <el-form :model="formData" label-width="100px" size="small">
      <el-form-item label="客户名称：">
        <span>{{formData.clientName}}</span>
      </el-form-item>
      <el-form-item label="项目名称：">
        <span>{{formData.projectName}}</span>
      </el-form-item>
      <el-form-item label="业务类型：">
        <el-tag type="info" class="tag-style" v-for="(item,index) in formData.businessType" :key="index">{{item.commonName}}</el-tag>
      </el-form-item>
      <el-form-item label="意向程度：">
        <a-tag type="info">{{formData.intentionLevel[0].commonName}}</a-tag>
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
        <span>{{formData.status[0].commonName}}</span>
      </el-form-item>
      <el-form-item label="创建状态：">
        <span v-if="formData.isCreate==0">未创建</span>
        <span v-if="formData.isCreate==1">已创建</span>
      </el-form-item>
      <el-form-item label="认领人：" v-if="formData.status[0].commonId == 1">
        <span>{{formData.reciver}}</span>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button class="btn" @click="handleGoBack">返回</iep-button>
      <iep-button type="primary" @click="claimBusiness" v-if="this.formData.status[0].commonId == 0" v-show="this.userInfo.userId !==this.formData.creatorId">认领</iep-button>
    </template>
  </iep-drawer>
</template>

<script>
import { claimById } from '@/api/crms/business'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      formData: {},
      methodName: '',
      drawerShow: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    handleCancel () {
      this.drawerShow = false
    },
    loadPage () {
      this.drawerShow = false
      this.$emit('load-page')
    },
    // 认领商机
    claimBusiness () {
      let claim = {
        opportunityId: this.formData.opportunityId,
        status: this.formData.status[0].commonId,
        creatorId: this.formData.creatorId,
      }
      this.$confirm('此操作将认领该条商机, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        claimById({ ...claim }).then(res => {
          if (res.status == 200) {
            this.$message.success('认领成功！')
            this.drawerShow = false
            this.$emit('load-page')
          } else {
            this.$message.info(`认领失败，${res.data.msg}`)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消认领',
        })
      })
    },
    handleGoBack () {
      this.drawerShow = false
    },
  },
}
</script>
<style>
.tag-style {
  margin-right: 10px;
}
</style>
