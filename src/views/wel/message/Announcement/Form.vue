<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}公告`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="small">
        <el-form-item prop="name">
          <div slot="label">
            主题
            <iep-tip content="主题请务必包含关于+事由+通知类型，如关于学习内网2.0相关功能操作的通知。"></iep-tip>
            ：
          </div>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop="type">
          <iep-dict-select v-model="form.type" dict-name="ims_notify_type"></iep-dict-select>
        </el-form-item>
        <el-form-item label="内容：" prop="content">
          <iep-input-area type="textarea" v-model="form.content"></iep-input-area>
        </el-form-item>
        <el-form-item label="发布范围：" prop="receivers">
          <iep-contact-multiple v-model="form.receivers"></iep-contact-multiple>
        </el-form-item>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">提交</iep-button>
            <!-- <iep-button @click="handlePublish">保存并发布</iep-button> -->
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getAnnouncementById, postAnnouncement, putAnnouncement } from '@/api/ims/announcement'
import { initForm, formToDto } from './options'

export default {
  data () {
    return {
      id: +this.$route.params.id,
      backOption: {
        isBack: true,
      },
      form: initForm(),
      rules: {
        name: [
          { required: true, message: '请输入主题', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 3, max: 2000, message: '内容必须超过 3 个字符，但不得超过 2000 个字符', trigger: 'blur' },
        ],
        receivers: [
          { required: true, message: '请选择发布范围', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    formRequestFn () {
      if (this.id) {
        return putAnnouncement
      } else {
        return postAnnouncement
      }
    },
    methodName () {
      if (this.id) {
        return '修改'
      } else {
        return '发布'
      }
    },
  },
  created () {
    if (this.id) {
      getAnnouncementById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    }
  },
  methods: {
    handlePublish () {
      this.handleSubmit(true)
    },
    handleSubmit (isPublish) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const publish = isPublish === true ? true : false
          this.formRequestFn(formToDto(this.form), publish).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: `通知公告${this.methodName}成功`,
                type: 'success',
              })
              this.$router.history.go(-1)
            }
          })
        }
      })
    },
  },
}
</script>