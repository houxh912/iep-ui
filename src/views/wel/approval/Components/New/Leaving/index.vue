<template>
  <div class="iep-page-form">
    <el-form ref="form" class="form-detail" :model="form" label-width="120px" size="small">
      <el-form-item label="申请人：" class="form-half">
        <span>{{form.name}}</span>
      </el-form-item>
      <el-form-item label="发起时间：" class="form-half">
        <span>{{form.nowTime}}</span>
      </el-form-item>
      <el-form-item label="请假类型：" class="form-half">
        <iep-dict-select v-model="form.leaveType" dict-name="hrms_levae_type"></iep-dict-select>
      </el-form-item>
      <el-form-item label="请假时长：" class="form-half">
        <!-- <iep-input-number v-model="form.duration"></iep-input-number> -->
        <el-input v-model="form.duration"></el-input>
      </el-form-item>
      <el-form-item label="开始时间：" class="form-half">
        <iep-date-picker v-model="form.startTime" type="date" placeholder="选择日期"></iep-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：" class="form-half">
        <iep-date-picker v-model="form.endTime" type="date" placeholder="选择日期"></iep-date-picker>
      </el-form-item>
      <el-form-item label="申请理由：">
        <el-input type="textarea" v-model="form.reason"></el-input>
      </el-form-item>
      <el-form-item label="附件：">
        <iep-upload v-model="form.annex">请上传附件</iep-upload>
      </el-form-item>
      <el-form-item label="审批人：">
        <iep-contact-multiple-user v-model="form.approver"></iep-contact-multiple-user>
      </el-form-item>
      <el-form-item label="抄送人：">
        <iep-contact-multiple-user v-model="form.cc"></iep-contact-multiple-user>
      </el-form-item>
      <el-form-item label="">
        <operation-wrapper>
          <iep-button type="primary" @click="handleSubmit">提交</iep-button>
          <iep-button @click="handlePublish">撤销</iep-button>
        </operation-wrapper>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import IepContactMultipleUser from '@/components/IepContact/MultipleUser'
import { initForm } from './options'
import mixins from '../mixins'
export default {
  props: {
    fn: {
      type: Function,
      required: true,
    },
  },
  mixins: [mixins],
  components: { IepContactMultipleUser },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
      form: initForm(),
    }
  },
  created () {
    this.loadSelf()
  },
  methods: {
    loadSelf () {
      this.fn().then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
    handlePublish () {
    },
  },
}
</script>