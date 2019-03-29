<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header :title="`${methodName}公告`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <el-form-item label="主题：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="属性：">
          <el-checkbox-group v-model="form.prop">
            <el-checkbox label="不允许评论" name="type" checked></el-checkbox>
            <el-checkbox label="置顶" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="发布范围：">
          <el-checkbox-group v-model="form.area">
            <el-checkbox label="当前组织" name="type" checked></el-checkbox>
            <el-checkbox label="联盟组织" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">提交</iep-button>
            <iep-button @click="handlePublish">保存并发布</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getAnnouncementById, postAnnouncement, putAnnouncement } from '@/api/ims/announcement'
import { initForm, formToDto } from './options'
import { mergeByFirst } from '@/util/util'
export default {
  data () {
    return {
      id: this.$route.query.id,
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
      form: initForm(),
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
        this.form = mergeByFirst(initForm(), data.data)
      })
    }
  },
  methods: {
    handlePublish () {
      this.handleSubmit(true)
    },
    handleSubmit (isPublish) {
      const publish = isPublish === true ? true : false
      this.formRequestFn(formToDto(this.form), publish).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: `招聘信息${this.methodName}成功`,
            type: 'success',
          })
          this.$emit('onGoBack')
        }
      })
    },
  },
}
</script>
<style scoped>
.edit-wrapper >>> .el-form {
  margin-right: 20%;
  margin-top: 50px;
}
</style>