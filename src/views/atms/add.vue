<template>
  <div class="abs iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}任务`"></page-header>
      <el-form :model="formData" :rules="rules" ref="form" label-width="200px" class="form form-detail">
        <el-form-item label='任务名称' prop="tasktName">
          <el-input v-model="formData.tasktName" placeholder="请填写任务名称"></el-input>
        </el-form-item>

        <el-form-item label='所属任务' prop="ownTask" class="form-half">
          <iep-dict-select v-model="formData.ownTask" dict-name="prms_project_level"></iep-dict-select>
        </el-form-item>

        <el-form-item label='状态' prop="status" class="form-half">
          <iep-dict-select v-model="formData.status" placeholder="未完成" dict-name="prms_project_level"></iep-dict-select>
        </el-form-item>

        <el-form-item label='优先级' prop="priority" class="form-half">
          <iep-dict-select v-model="formData.priority" placeholder="普通" dict-name="prms_project_level"></iep-dict-select>
        </el-form-item>

        <el-form-item label='协同人' prop="synergist">
          <iep-contact-multiple v-model="formData.synergist"></iep-contact-multiple>
        </el-form-item>
        
        <el-form-item label='执行人' prop="executor">
          <iep-contact-multiple v-model="formData.executor"></iep-contact-multiple>
        </el-form-item>

        <el-form-item label='起止时间' prop="implementRangeTime" class="form-half">
          <iep-date-picker v-model="formData.implementRangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </iep-date-picker>
        </el-form-item>

        <el-form-item label='标签' prop="sign">
          <iep-tag v-model="formData.sign"></iep-tag>
        </el-form-item>

        <el-form-item label='备注' prop="remarks">
          <el-input v-model="formData.remarks" maxlength="300" :rows="4"></el-input>
        </el-form-item>

        <el-form-item label='子任务' prop="subtasks">
          <el-upload  class="upload-demo"  action="">
            <i class="button el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label='附件' prop="enclosure">
          <iep-upload v-model="formData.enclosure" :limit="limit"></iep-upload>
        </el-form-item>

        <el-form-item label='关联内容' prop="subtasks">
          <el-input v-model="formData.subtasks"></el-input>
        </el-form-item>
      </el-form>
      <footer-tool-bar>
        <iep-button type="primary">保存</iep-button>
        <iep-button>取消</iep-button>
      </footer-tool-bar>
    </basic-container>
  </div>
</template>

<script>
import { initForm, rules } from './options.js'
export default {
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
      formData: initForm(),
      rules,
      limit:1,
    }
  },
}
</script>

<style scoped lang="scss">
</style>