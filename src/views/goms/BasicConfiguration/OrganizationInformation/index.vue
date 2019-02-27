<template>
  <div>
    <basic-container>
      <h3>组织基本信息</h3>
      <el-form :model="gomsForm" ref="gomsForm" label-width="100px">
        <el-form-item label="组织Logo：">
          <img :src="formData.logo" alt="" id="logo" style="width:100px;" />
        </el-form-item>
        <el-form-item label="组织名称：" prop="name">
          <el-input type="text" v-model="formData.name" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="组织简称：" prop="orgAbrName">
          <el-input style="width:300px;" v-model="formData.orgAbrName" placeholder="请输入组织简称"></el-input>
        </el-form-item>
        <el-form-item label="成立时间：" prop="establishTime">
          <el-input style="width:300px;" v-model="formData.establishTime"></el-input>
        </el-form-item>
        <el-form-item label="创建人：" prop="creator">
          <el-input style="width:300px;" v-model="formData.creator" type="text" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="contactMethod">
          <el-input v-model="formData.contactMethod" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="组织简介：" prop="intro">
          <el-input v-model="formData.intro" type="textarea" placeholder="验证码登录使用"></el-input>
        </el-form-item>
        <el-form-item label="组织架构：" prop="orgStructure">
          <el-input v-model="formData.orgStructure" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="核心优势：" prop="coreAdvantage">
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
import { initGomsForm } from './options'
import { getGomsInfo } from '@/api/admin/org'
import { mapState } from 'vuex'
import { handleImg } from '@/util/util'
export default {
  data () {
    return {
      gomsForm: initGomsForm(),
      formData: { 'orgId': 8, 'logo': 'image-cde6b6e3b38e4526b24f2bee00e7c15b.jpg', 'orgAbrName': '', 'establishTime': '2019-02-26 10:09:14', 'userId': 10, 'contactMethod': '', 'orgStructure': '', 'coreAdvantage': '', 'isNode': 0, 'delFlag': '0', 'createTime': '2019-02-23 16:42:28', 'updateTime': '2019-02-23 16:42:28', 'isOpen': 0, 'creator': '杜照鸿', 'name': '杜照鸿的组织', 'intro': '杜照鸿的组织' },
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
        this.gomsForm = initGomsForm()
        handleImg(this.formData.logo, 'logo')
      })
    },
  },
}
</script>

