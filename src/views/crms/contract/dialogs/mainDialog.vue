<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}合同`" width="60%" @close="resetForm('form')">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">

      <el-row>
        <el-form-item label="合同名称：" prop="name">
          <el-input v-model="formData.name" placeholder="当天日期（八位数字）+客户名称+项目内容名称+“合同”，如“20180306农业部政务资源目录梳理合同”。"></el-input>
        </el-form-item>
        <el-form-item label="关联项目：" prop="guanlian">
          <el-input v-model="formData.guanlian" placeholder="关联项目"></el-input>
        </el-form-item>
        <el-form-item label="合同说明 / 收款方式：" prop="fangan">
          <el-input type="textarea" v-model="formData.fangan" placeholder="合同说明/收款方式"></el-input>
        </el-form-item>
        <el-form-item label="业务类型：" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio v-for="item in dicData.select" :key="item.value" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="合同标签：" prop="biaoqian">
          <iep-tags v-model="formData.biaoqian" @addTags="addTags"></iep-tags>
        </el-form-item>
        <el-row>
          <el-col :span=12>
            <el-form-item label="签订日期：" prop="startTime">
              <el-date-picker
                v-model="formData.startTime"
                type="date"
                placeholder="选择签订日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="完结日期：" prop="endTime">
              <el-date-picker
                v-model="formData.endTime"
                type="date"
                placeholder="选择完结日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=12>
            <el-form-item label="委托单位：" prop="deptId1">
              <el-select v-model="formData.deptId1" placeholder="请选择">
                <el-option v-for="item in dicData.deptList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="签署单位：" prop="deptId2">
              <el-select v-model="formData.deptId2" placeholder="请选择">
                <el-option v-for="item in dicData.deptList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=12>
            <el-form-item label="签署部门：" prop="deptId3">
              <el-select v-model="formData.deptId3" placeholder="请选择">
                <el-option v-for="item in dicData.deptList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="承接部门：" prop="deptId4">
              <el-select v-model="formData.deptId4" placeholder="请选择">
                <el-option v-for="item in dicData.deptList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=12>
            <el-form-item label="市场经理：" prop="jingli">
              <el-input v-model="formData.jingli" placeholder="市场经理"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="合同金额：" prop="jine">
              <el-input v-model="formData.jine" placeholder="合同金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=12>
            <el-form-item label="合同级别：" prop="jibie">
              <el-select v-model="formData.jibie" placeholder="请选择">
                <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="合同状态：" prop="zhuangtai">
              <el-select v-model="formData.zhuangtai" placeholder="请选择">
                <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=12>
            <el-form-item label="保证金：" prop="baozhengjin">
              <el-input v-model="formData.baozhengjin" placeholder="保证金"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=20>
            <el-form-item label="合同上传：" prop="baozhengjin">
              <el-upload
                class="upload-demo"
                action="11111"
                :on-change="handleChange"
                :file-list="formData.list"
                :on-remove="onRemove">
                <iep-button size="small" type="primary">点击上传</iep-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>

    </el-form>
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
        list: [
          { name: '材料1', url: 'asd3asf3frfcv7g.xml' },
          { name: '材料2', url: 'asd3asf3frfcv7g.xml' },
        ],
      },
      rules,
      methodName: '新增',
      methodState: false,
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
    handleChange (file) {
      console.log('file: ', file)
    },
    onRemove (file) {
      console.log('file: ', file)
    },
    addTags () {
      this.$message('添加标签')
    },
  },
  watch: {
    methodName (newVal) {
      this.methodState = newVal === '详情'
    },
  },
}
</script>
