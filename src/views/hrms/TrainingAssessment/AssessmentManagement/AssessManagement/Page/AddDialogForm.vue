<template>
  <iep-dialog :dialog-show="dialogShow" title="发起考核" width="750px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="140px" class="form-detail">
      <el-form-item label="考核名称" prop="kpiName">
        <el-input v-model="form.kpiName"></el-input>
      </el-form-item>
      <el-form-item label="考核时间" prop="timeList">
        <iep-date-picker v-model="form.timeList" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </iep-date-picker>
      </el-form-item>
      <el-form-item label="考核模板" prop="templateId">
        <el-input v-model="form.templateName" placeholder="请选择考核模板" readonly @click.native="selectTpl"></el-input>
      </el-form-item>
      <el-form-item label="被考核人" prop="coversList">
        <iep-contact-multiple v-model="form.coversList"></iep-contact-multiple>
      </el-form-item>
      <el-form-item label="考核人" prop="assessorsList">
        <iep-contact-multiple v-model="form.assessorsList"></iep-contact-multiple>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="员工自评权重" prop="selfWeight">
            <el-input v-model="form.selfWeight"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="考核人评分权重" prop="assessorWeight">
            <el-input v-model="form.assessorWeight"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-form-item label="考核人评分方式" prop="scoringMethod">
        <el-select v-model="form.scoringMethod" placeholder="请选择">
          <el-option
            v-for="(item, index) in dictsMap.scoringMethod"
            :key="index"
            :label="item"
            :value="index">
          </el-option>
        </el-select>
      </el-form-item> -->
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
    <!-- 选择考核模板 -->
    <template-dialog ref="template" @template-success="templateSuccess"></template-dialog>
  </iep-dialog>
</template>

<script>
import { initFormData, rules, dictsMap } from '../options'
import TemplateDialog from './templateDialog'

export default {
  components: { TemplateDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initFormData(),
      rules,
      dictsMap,
    }
  },
  methods: {
    loadPage () {
      this.form = initFormData()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      console.log('form: ', this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.startTime = this.form.timeList[0]
          this.form.endTime = this.form.timeList[1]
          this.form.covers = this.form.coversList.users.map(m => m.id)
          this.form.assessors = this.form.assessorsList.users.map(m => m.id)
          this.formRequestFn(this.form).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
    selectTpl () {
      console.log('tpl')
      this.$refs['template'].open(this.form.templateId, this.form.templateName)
    },
    templateSuccess (id, name) {
      this.form.templateId = id
      this.form.templateName = name
    },
  },
  watch: {
    'form.selfWeight' (val) {
      if (val != '') this.form.assessorWeight = 100 - parseInt(val)
    },
    'form.assessorWeight' (val) {
      if (val != '') this.form.selfWeight = 100 - parseInt(val)
    },
  },
}
</script>

