<template>
  <iep-dialog class="modules-dialog" :dialog-show="dialogShow" title="新增考核模版" width="700px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="模版名称：" prop="templateName">
        <el-input v-model="form.templateName"></el-input>
      </el-form-item>
      <el-form-item label="考核分值：" prop="score">
        <el-input v-model="form.score"></el-input>
      </el-form-item>
      <el-form-item label="考核内容：" prop="checks">
        <div class="item head">
          <div class="title">考核指标项</div>
          <div class="remark">考核指标说明</div>
          <div class="weight">权重%</div>
          <div class="button" @click="addChecks"><i class="el-icon-plus"></i></div>
        </div>
        <div class="item" v-for="(item, index) in form.checks" :key="index">
          <div class="title">
            <el-input v-model="form.checks[index].item" maxlength=20></el-input>
          </div>
          <div class="remark">
            <el-input v-model="form.checks[index].checkExplan" maxlength=100></el-input>
          </div>
          <div class="weight">
            <el-input v-model="form.checks[index].weight"></el-input>
          </div>
          <div class="button"><i class="el-icon-close" @click="deleteChecks(index, item)"></i></div>
        </div>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, rules } from '../options'
import { deleteCheckById } from '@/api/hrms/template'
import './style.scss'

export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
    }
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
    addChecks () {
      this.form.checks.push({
        item: '',
        checkExplan: '',
        weight: '',
      })
    },
    deleteChecks (index, item) {
      if (item.checkId) {
        this.$confirm('此操作会直接删除数据库中数据，且此操作不可逆，是否继续删除？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteCheckById(item.checkId).then(() => {
            this.form.checks.splice(index, 1)
          })
        }).catch(() => {

        })
      } else {
        this.form.checks.splice(index, 1)
      }
    },
  },
}
</script>

