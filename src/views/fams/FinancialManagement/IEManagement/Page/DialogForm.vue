<template>
  <iep-dialog :dialog-show="dialogShow" title="新增支出" width="700px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="支出类型：">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支出时间：">
        <iep-date-picker v-model="form.startTime" type="date" placeholder="选择日期"></iep-date-picker>
      </el-form-item>
      <el-form-item label="支出部门：">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付方式：">
        <el-radio-group v-model="form.mode">
          <el-radio :label="0">现金</el-radio>
          <el-radio :label="1">银行存款</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="支出公司：">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in company" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="银行户头：">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in account" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联合同：">
        <el-button size="small" icon="el-icon-plus"></el-button>
        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
          {{tag}}
        </el-tag>
      </el-form-item>
      <el-form-item label="开票金额：">
        <el-input v-model="form.sum"></el-input>
      </el-form-item>
      <el-form-item label="计算税率：">
        <el-tag type="white">0</el-tag>
        <el-tag type="danger">3%</el-tag>
        <el-tag type="white">6%</el-tag>
      </el-form-item>
      <el-form-item label="支出金额：">
        <el-input v-model="form.sum"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initForm, rules } from './options'
export default {
  components: { IepDialog },
  data () {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
      desc: '',
      classify: [
        {
          value: '选项1',
          label: '项目税费',
        },
      ],
      department: [
        {
          value: '选项1',
          label: '全部',
        },
        {
          value: '选项2',
          label: '国脉海洋信息发展有限公司',
        },
      ],
      company: [
        {
          value: '选项1',
          label: '全部',
        },
        {
          value: '选项1',
          label: '国脉海洋信息发展有限公司',
        },
      ],
      account: [
        {
          value: '选项1',
          label: '国脉海洋信息发展有限公司',
        },
      ],
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
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
  },
}
</script>
<style lang="scss" scoped>
.el-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>

