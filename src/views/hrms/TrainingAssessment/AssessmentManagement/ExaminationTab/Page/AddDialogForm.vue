<template>
  <iep-dialog :dialog-show="dialogShow" title="发起考核" width="750px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px" class="checks-dialog">
      <el-form-item label="考核名称：">
        <span>{{form.checkName}}</span>
      </el-form-item>
      <el-form-item label="考核时间：">
        <span>{{form.checkTime}}</span>
      </el-form-item>
      <el-form-item label="被考核人：">
        <span>{{form.checkUser}}</span>
      </el-form-item>
      <el-form-item label="考核内容：" prop="checks">
        <div class="item head">
          <div class="title">考核指标项</div>
          <div class="remark">考核指标说明</div>
          <div class="weight">权重%</div>
          <div class="input">打分</div>
        </div>
        <div class="item" v-for="(item, index) in form.kpiRelations" :key="index">
          <div class="title">
            <span>{{form.kpiRelations[index].item}}</span>
          </div>
          <div class="remark">
            <span>{{form.kpiRelations[index].checkExplan}}</span>
          </div>
          <div class="weight">
            <span>{{form.kpiRelations[index].weight}}</span>
          </div>
          <div class="input" :class="form.kpiRelations[index].error ? 'error' : ''">
            <el-input :placeholder="`分值:${form.kpiRelations[index].max}`" v-model="form.kpiRelations[index].score" @blur="blurScore"></el-input>
            <div class="cover-error">{{`最大分值为${form.kpiRelations[index].max}`}}</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="考核分值：">
        <el-input v-model="form.score" readonly class="score"></el-input>
      </el-form-item>
      <el-form-item label="考核评价：" prop="evaluate">
        <el-input type="textarea" rows=5 v-model="form.evaluate"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import { initFormData, rules, dictsMap } from '../options'
import './style.scss'
import { createKpi } from '@/api/hrms/cover'

export default {
  components: {  },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      rules,
      form: initFormData(),
      dictsMap,
    }
  },
  methods: {
    open (data) {
      this.dialogShow = true
      this.form.coverId = data.coverId
      this.form.checkName = data.detailsVO.kpiName
      this.form.checkTime = `${data.detailsVO.createTime} 至 ${data.detailsVO.endTime}`
      this.form.checkUser = data.userName
      for (let item of data.detailsVO.templateVO.checks) {
        this.form.kpiRelations.push({
          item: item.item,
          checkExplan: item.checkExplan,
          weight: item.weight,
          max: data.detailsVO.templateVO.score * data.detailsVO.assessorWeight / 100 * item.weight / 100,
          score: '',
          checkId: item.checkId,
          error: false,
        })
      }
      console.log('this.form: ', this.form)
    },
    loadPage () {
      this.form = initFormData()
      this.dialogShow = false
      this.$emit('load-page')
    },
    // 计算总分
    blurScore () {
      this.form.score = 0
      for (let item of this.form.kpiRelations) {
        if (item.score != '') this.form.score += parseInt(item.score)
      }
    },
    submitForm (formName) {
      // 首先判断是否所有的打分都正确填写了
      for (let item of this.form.kpiRelations) {
        if ( item.score == '' || parseInt(item.score) > parseInt(item.max) ) {
          item.error = true
          return
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createKpi(this.form).then(() => {
            this.$message({
              message: '考核成功',
              type: 'success',
            })
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

