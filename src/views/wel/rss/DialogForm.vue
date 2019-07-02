<template>
  <iep-dialog :dialog-show="dialogShow" title="订阅主题" width="700px" @close="close">
    <el-transfer style="text-align: left; display: inline-block" v-model="value" filterable :left-default-checked="[2, 3]" :right-default-checked="[1]" :titles="['全部主題', '已订阅']" :button-texts="['取消订阅', '订阅']" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" @change="handleChange" :data="data">
      <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
      <!-- <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button> -->
      <!-- <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button> -->
    </el-transfer>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, toDtoForm } from './options'
export default {
  data () {
    const generateData = () => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
        })
      }
      return data
    }
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      data: generateData(),
      value: [1, 4],
    }
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(toDtoForm(this.form)).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.close()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

