<template>
  <div class="abs iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}任务`"></page-header>
      <el-form :model="form" :rules="rules" ref="form" label-width="200px" class="form form-detail">
        <el-form-item label='任务名称' prop="taskName">
          <el-input v-model="form.taskName" placeholder="请填写任务名称"></el-input>
        </el-form-item>

        <el-form-item label='所属任务' prop="ownTask" class="form-half">
          <iep-dict-select v-model="form.ownTask" dict-name="prms_project_level"></iep-dict-select>
        </el-form-item>

        <el-form-item label='状态' prop="taskStatus" class="form-half">
          <iep-dict-select v-model="form.taskStatus" placeholder="未完成" dict-name="atms_task_status"></iep-dict-select>
        </el-form-item>

        <el-form-item label='优先级' prop="priority" class="form-half">
          <iep-dict-select v-model="form.priority" placeholder="普通" dict-name="atms_task_priority"></iep-dict-select>
        </el-form-item>

        <el-form-item label='协同人' prop="synergist">
          <iep-contact-multiple v-model="form.synergist"></iep-contact-multiple>
        </el-form-item>
        
        <el-form-item label='执行人' prop="executor">
          <iep-contact-multiple v-model="form.executor"></iep-contact-multiple>
        </el-form-item>

        <el-form-item label='起止时间' prop="implementRangeTime" class="form-half">
          <iep-date-picker v-model="form.implementRangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </iep-date-picker>
        </el-form-item>

        <el-form-item label='标签' prop="sign">
          <iep-tag v-model="form.sign"></iep-tag>
        </el-form-item>

        <el-form-item label='备注' prop="remarks">
          <el-input v-model="form.remarks" maxlength="300" :rows="4"></el-input>
        </el-form-item>

        <el-form-item label='附件' prop="attach">
          <iep-upload v-model="form.attach" :limit="limit"></iep-upload>
        </el-form-item>

        <el-form-item label='关联内容' prop="links">
          <el-input v-model="form.links"></el-input>
        </el-form-item>
      </el-form>
      <footer-tool-bar>
        <iep-button type="primary" @click="handleSubmit">保存</iep-button>
        <iep-button @click="onGoBack">取消</iep-button>
      </footer-tool-bar>
    </basic-container>
  </div>
</template>

<script>
import { postAtms } from '@/api/atms/index'
import { initForm, formToDto } from './options.js'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      methodName: '新增',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.close()
        },
      },
      form: initForm(),
      // rules,
      limit:1,
    }
  },
  methods: {
    handleSubmit (isPublish) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const publish = isPublish === true ? true : false
          postAtms(formToDto(this.form), publish).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: `${this.methodName}任务成功`,
                type: 'success',
              })
              this.onGoBack()
            } else {
              this.$message(data.msg)
            }
          })
        }
      })
    },
    onGoBack () {
      this.$router.history.go(-1)
    },
  },
}
</script>

<style scoped lang="scss">
</style>