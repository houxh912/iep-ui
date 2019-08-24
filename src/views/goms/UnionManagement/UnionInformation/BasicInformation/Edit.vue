<template>
  <div class="iep-page-form">
    <basic-container>
      <iep-page-header title="修改联盟基本信息" :backOption="backOption">
        <template>
          <iep-button type="primary" @click="handleSubmit">保存</iep-button>
        </template>
      </iep-page-header>
      <el-form :model="form" class="form-detail" ref="form" size="small" label-width="120px">
        <el-form-item label="联盟Logo：">
          <iep-avatar v-model="form.logo"></iep-avatar>
        </el-form-item>
        <el-form-item label="联盟名称：" prop="name" class="form-half">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="成立时间：" prop="establishTime" class="form-half">
          <iep-date-picker type="date" v-model="form.establishTime"></iep-date-picker>
        </el-form-item>
        <el-form-item label="创建人：" prop="creator" class="form-half">
          <el-input v-model="form.creator.name" type="text" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="contactMethod" class="form-half">
          <el-input v-model="form.contactMethod" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="我能标签：">
          <iep-tag v-model="form.abilityTag"></iep-tag>
        </el-form-item>
        <el-form-item label="我要标签：">
          <iep-tag v-model="form.projectTag"></iep-tag>
        </el-form-item>
        <el-form-item label="我想标签：">
          <iep-tag v-model="form.learningTag"></iep-tag>
        </el-form-item>
        <el-form-item label="联盟简介：" prop="intro">
          <iep-input-area v-model="form.intro" placeholder="验证码登录使用"></iep-input-area>
        </el-form-item>
        <el-form-item label="核心优势：" prop="coreAdvantage">
          <iep-input-area v-model="form.coreAdvantage" placeholder="请输入核心优势"></iep-input-area>
        </el-form-item>
        <el-form-item label="联盟架构：" prop="structure">
          <iep-froala-editor v-model="form.structure"></iep-froala-editor>
        </el-form-item>
        <el-form-item label="联盟文化：" prop="unionCulture">
          <iep-froala-editor v-model="form.unionCulture"></iep-froala-editor>
        </el-form-item>
        <!-- <el-form-item label="联盟客服人员：" prop="phone">
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
import { initForm } from './options'
import { getUnionBySelf, putUnion } from '@/api/goms/union'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      form: initForm(),
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapState({
      orgId: state => state.user.userInfo.orgId,
    }),
  },
  methods: {
    handleSubmit () {
      putUnion(this.form).then(() => {
        this.$emit('onGoBack')
      })
    },
    loadPage () {
      getUnionBySelf(this.orgId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
  },
}
</script>
