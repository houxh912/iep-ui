<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}合同`" width="60%" @close="resetForm('form')">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">

      <el-form-item label="客户名称：" prop="name">
        <el-input v-model="formData.name" placeholder="客户名称" :disabled="methodState"></el-input>
      </el-form-item>
      <el-form-item label="项目名称：" prop="xiangmu">
        <el-input v-model="formData.xiangmu" placeholder="项目名称" :disabled="methodState"></el-input>
      </el-form-item>
      <el-form-item label="业务类型：" prop="type">
        <el-checkbox-group v-model="formData.type">
          <el-checkbox v-for="item in dicData.select" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="意向程度：" prop="status">
        <el-checkbox-group v-model="formData.status">
          <el-checkbox v-for="item in dicData.select" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="商机标签：" prop="biaoqian">
        <iep-tags v-model="formData.biaoqian" @addTags="addTags" :disabled="methodState"></iep-tags>
      </el-form-item>
      <el-form-item label="商机描述：" prop="miaoshu">
        <el-input type="textarea" v-model="formData.miaoshu" placeholder="商机描述" :disabled="methodState"></el-input>
      </el-form-item>
      <el-form-item label="发布者：">
        <el-input v-model="formData.fabuzhe" :disabled="true"></el-input>
      </el-form-item>

      <!-- 认领情况 -->
      <!-- <el-row> -->
      <el-form-item label="发布日期：">
        <el-input v-model="formData.faburiqi" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="认领人：">
        <el-input v-model="formData.renlingren" :disabled="true"></el-input>
      </el-form-item>
      <!-- </el-row> -->

    </el-form>
    <template slot="footer" v-if="!methodState">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
    <template slot="footer" v-else>
      <iep-button type="primary" @click="claimBusiness('form')">认领</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import IepDialog from '@/components/IepDialog/'
import { initFormData, rules } from '../options'
import iepTags from '@/components/IepTags'
export default {
  components: { IepDialog, iepTags },
  data () {
    return {
      formData: {
        biaoqian: ['标签1号'],
      },
      rules,
      methodName: '新增',
      dialogShow: false,
      formRequestFn: () => { },
      dicData: {
        select: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ],
        deptList: [
          { label: '部门1', value: 1 },
          { label: '部门2', value: 2 },
        ],
      },
    }
  },
  computed: {
    methodState () {
      return this.methodName === '详情'
    },
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initFormData()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.loadPage()
            this.dialogShow = false
          })
        } else {
          return false
        }
      })
    },
    addTags () {
      this.$message('添加标签')
    },
    claimBusiness (formName) {
      this.formRequestFn(this.formData.id).then(res => {
        if (res.data.data) {
          this.$message.success('认领成功！')
          this.loadPage()
          this.resetForm(formName)
        } else {
          this.$message.info(`操作失败，${res.data.msg}`)
        }
      })
    },
  },
}
</script>
