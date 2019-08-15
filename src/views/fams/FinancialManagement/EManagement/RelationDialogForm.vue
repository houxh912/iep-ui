<template>
  <iep-dialog :dialog-show="dialogShow" title="修改关联" width="700px" @close="close">
    <el-form class="form-detail" :model="form" size="small" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="关联合同：">
        <iep-contract-select v-model="form.protocolId" :contractName="form.protocolName" @relation-change="handleContractChange"></iep-contract-select>
      </el-form-item>
      <el-form-item label="关联项目：">
        <iep-project-select v-model="form.projectId" :projectName="form.projectName" @relation-change="handleProjectChange"></iep-project-select>
      </el-form-item>
      <el-form-item label="关联项目编号：">
        <iep-div-detail :value="form.serialNo"></iep-div-detail>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen">提交</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getExpenditureById, putExpenditure } from '@/api/fams/expenditure'
import { initForm, dictsMap, rules } from './options'
import formMixins from '@/mixins/formMixins'
import { mapGetters } from 'vuex'
export default {
  mixins: [formMixins],
  data () {
    return {
      id: '',
      dictsMap,
      dialogShow: false,
      methodName: '创建',
      form: initForm(),
      rules,
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
  },
  methods: {
    handleContractChange (v, n, value) {
      this.form.projectId = v && v.id
      this.form.projectName = v && v.name
      this.form.serialNo = v && v.serialNo
      this.form.protocolName = value && value.name
    },
    handleProjectChange (v, n, value) {
      this.form.protocolId = v && v.id
      this.form.protocolName = v && v.name
      this.form.serialNo = value && value.serialNo
      this.form.projectName = value && value.name
    },
    loadPage () {
      getExpenditureById(this.id).then(({ data }) => {
        this.form = data.data
        this.form.serialNo = data.data.projectNumber
        this.forms = []
      })
    },
    async submitForm () {
      const { data } = await putExpenditure(this.form)
      if (data.data) {
        this.$message.success('操作成功')
        this.close()
      } else {
        this.$message(data.msg)
      }
    },
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
