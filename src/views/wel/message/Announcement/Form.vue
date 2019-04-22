<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}公告`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="small">
        <el-form-item prop="name">
          <span slot="label">
            主题
            <iep-tip content="主题请务必包含关于+事由+通知类型，如关于学习内网2.0相关功能操作的通知。"></iep-tip>
            ：
          </span>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="type">
          <span slot="label">
            类型
            <iep-tip content="日常公告：关于学习、传达会议精神/要求、放假等日常的通知；</br>公司制度：制度规范类征集意见或实施等公布的通知；</br>培训通知：关于培训而发布的通知；</br>人事调动：关于人事任免而发布的通知；</br>其他通知：除上述提到的以外的通知。"></iep-tip>
            ：
          </span>
          <iep-dict-select v-model="form.type" dict-name="ims_notify_type"></iep-dict-select>
        </el-form-item>
        <el-form-item prop="content">
          <span slot="label">
            内容
            <iep-tip content="1、包含称呼、通知缘由、事项、要求和发文单位等内容；</br>2、分段陈述，默认字体与字号，带格式的文字粘贴请使用“格式清除”工具；"></iep-tip>
            ：
          </span>
          <iep-input-area type="textarea" v-model="form.content"></iep-input-area>
        </el-form-item>
        <el-form-item prop="receivers">
          <span slot="label">
            发布范围
            <iep-tip content="为该通知接收对象，一般以某个组织或群体为单位。"></iep-tip>
            ：
          </span>
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