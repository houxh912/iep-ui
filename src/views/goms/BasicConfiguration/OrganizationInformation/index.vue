<template>
  <div>
    <basic-container>
      <h3>组织基本信息</h3>
      <el-form :model="gomsForm" ref="gomsForm" label-width="100px">
        <el-form-item label="组织Logo：">
          <img :src="formData.logo" alt="" id="logo" />
        </el-form-item>
        <el-form-item label="组织名称：" prop="username">
          <el-input type="text" v-model="formData.name" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="组织简称：" prop="realName">
          <el-input style="width:300px;" v-model="formData.orgAbrName" placeholder="请输入组织简称"></el-input>
        </el-form-item>
        <el-form-item label="成立时间：" prop="phone">
          <el-input style="width:300px;" v-model="formData.establishTime"></el-input>
        </el-form-item>
        <el-form-item label="创建人：" prop="username">
          <el-input style="width:300px;" v-model="formData.creator" type="text" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="realName">
          <el-input v-model="formData.contactMethod" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="组织简介：" prop="phone">
          <el-input v-model="formData.intro" type="textarea" placeholder="验证码登录使用"></el-input>
        </el-form-item>
        <el-form-item label="组织架构：" prop="username">
          <el-input v-model="formData.orgStructure" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="核心优势：" prop="realName">
          <el-input v-model="formData.coreAdvantage" type="textarea" placeholder="请输入核心优势"></el-input>
        </el-form-item>
        <el-form-item label="组织客服人员：" prop="phone">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="系统联系人员：" prop="phone">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getGomsInfo } from '@/api/admin/org'
import { mapState } from 'vuex'
import { handleImg } from '@/util/util'
export default {
  data () {
    return {

    }
  },
  created () {
    this.load()
  },
  computed: {
    ...mapState({
      orgId: state => state.user.userInfo.orgId,
    }),
  },
  methods: {
    load () {
      getGomsInfo(this.orgId).then(({ data }) => {
        this.formData = data.data
        handleImg(this.formData.logo, 'logo')
        console.log(this.formData)
      })
    },
  },
}
</script>

