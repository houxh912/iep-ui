<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}建议`">
        <el-button @click="back">返回建议列表</el-button>
      </page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
        <iep-form-item class="form-half" label-name="建议主题" prop="theme">
          <el-input v-model="form.theme"></el-input>
        </iep-form-item>

        <iep-form-item class="form-half" prop="desc" label-name="建议内容">
          <iep-input-area v-model="form.desc"></iep-input-area>
        </iep-form-item>

        <iep-form-item prop="attendeeList" label-name="接收对象">
          <iep-contact-multiple v-model="attendeeList"></iep-contact-multiple>
        </iep-form-item>

        <iep-form-item class="form-half" prop="" label-name="附件">
          <iep-upload v-model="annexList" :limit="limit"></iep-upload>
        </iep-form-item>
        
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handlePublish">发送</iep-button>
            <iep-button @click="handleSubmit">保存</iep-button>
            <iep-button>取消</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { postPublishRecruitment, putPublishRecruitment } from '@/api/hrms/publish_recruitment'
import { initForm, formToDto, rules } from './options'
export default {
  data () {
    return {
      limit: 1,
      annexList: [],
      back: () => {
        this.$router.push('/hrms_spa/suggestion_list')
      },
      rules,
      form: initForm(),
      attendeeList: { // 比如接收人
        unions: [],
        orgs: [],
        users: [{
          id: 588,
          name: '张超',
        }],
      },
    }
  },
  computed: {
    methodName () {
      return this.id ? '编辑' : '新增'
    },
  },
  mounted () {
  },
  methods: {
    onGoBack () {
      this.$router.history.go(-1)
    },
    handlePublish () {
      this.handleSubmit(true)
    },
    handleSubmit (isPublish) {
      const submitFunction = this.id ? putPublishRecruitment : postPublishRecruitment
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const publish = isPublish === true ? true : false
          submitFunction(formToDto(this.form), publish).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: `新建${this.methodName}成功`,
                type: 'success',
              })
              this.onGoBack()
            }
          })
        }
      })

    },
  },
}
</script>
<style lang="css" scoped>
.el-form-item >>> .el-form-item__content {
  display: flex;
  flex-direction: column;
}
.el-tag-new.el-tag--white {
  background: none;
  border: 0;
  color: #606266;
  transition: 0.1s;
}
.el-tag-new >>> .el-icon-close {
  color: #333;
}
.el-tag-new >>> .el-icon-close:hover {
  background-color: #fff;
  color: #cb3737;
}
</style>
