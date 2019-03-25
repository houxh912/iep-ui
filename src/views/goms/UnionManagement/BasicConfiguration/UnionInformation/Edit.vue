<template>
  <div>
    <basic-container>
      <page-header title="修改组织基本信息" :backOption="backOption">
        <template>
          <iep-button type="primary" @click="handleSubmit">保存</iep-button>
        </template>
      </page-header>
      <el-form :model="form" ref="form" label-width="120px">
        <el-form-item label="组织Logo：">
          <iep-avatar v-model="form.logo"></iep-avatar>
        </el-form-item>
        <el-form-item label="组织名称：" prop="name">
          <el-input type="text" v-model="form.name" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="组织简称：" prop="orgAbrName">
          <el-input style="width:300px;" v-model="form.orgAbrName" placeholder="请输入组织简称"></el-input>
        </el-form-item>
        <el-form-item label="成立时间：" prop="establishTime">
          <iep-date-picker type="date" v-model="form.establishTime"></iep-date-picker>
        </el-form-item>
        <el-form-item label="创建人：" prop="creator">
          <el-input style="width:300px;" v-model="form.creator" type="text" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="contactMethod">
          <el-input v-model="form.contactMethod" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="组织简介：" prop="intro">
          <el-input v-model="form.intro" type="textarea" placeholder="验证码登录使用"></el-input>
        </el-form-item>
        <el-form-item label="组织架构：" prop="orgStructure">
          <el-input v-model="form.orgStructure" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="核心优势：" prop="coreAdvantage">
          <el-input v-model="form.coreAdvantage" type="textarea" placeholder="请输入核心优势"></el-input>
        </el-form-item>
        <!-- <el-form-item label="组织客服人员：" prop="phone">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="系统联系人员：" prop="phone">
          <el-input></el-input>
        </el-form-item> -->
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { initOrgForm } from './options'
import { getGomsInfo, putObj } from '@/api/admin/org'
import { mergeByFirst } from '@/util/util'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      form: initOrgForm(),
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
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
    handleSubmit () {
      putObj(this.form).then(() => {
        this.load()
      })
    },
    load () {
      getGomsInfo(this.orgId).then(({ data }) => {
        this.form = mergeByFirst(initOrgForm(), data.data)
      })
    },
  },
}
</script>
