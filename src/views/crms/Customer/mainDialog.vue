<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}客户`" width="50%" @close="loadPage">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">

      <el-form-item label="客户名单" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="区域类型" prop="type">
        <el-select v-model="formData.type" placeholder="请选择">
          <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户描述" prop="miaoshu">
        <el-input v-model="formData.miaoshu" placeholder="单位网址"></el-input>
      </el-form-item>
      <el-form-item label="" prop="name">
        <el-input v-model="formData.zhineng" placeholder="单位职能"></el-input>
      </el-form-item>
      <el-form-item label="" prop="name">
        <el-input v-model="formData.dizhi" placeholder="联系地址"></el-input>
      </el-form-item>
      <el-form-item label="" prop="name">
        <el-input v-model="formData.shuoming" placeholder="其他说明"></el-input>
      </el-form-item>
      <el-form-item label="市场经理" prop="jingli">
        <el-input v-model="formData.jingli"></el-input>
      </el-form-item>
      <el-form-item label="负责部门" prop="deptId">
        <el-select v-model="formData.deptId" placeholder="请选择">
          <el-option v-for="item in dicData.dept" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户类型" prop="leixing">
        <el-radio-group v-model="formData.leixing">
          <el-radio v-for="item in dicData.select" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="业务类型" prop="yewuleixing">
        <el-radio-group v-model="formData.yewuleixing">
          <el-radio v-for="item in dicData.select" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" prop="jutiyewu">
        <el-input v-model="formData.jutiyewu" placeholder="请填写具体业务类型"></el-input>
      </el-form-item>
      <el-form-item label="客户关系" prop="guanxi">
        <el-select v-model="formData.guanxi" placeholder="请选择">
          <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户标签" prop="kehubiaoqian">
        <el-input v-model="formData.kehubiaoqian" placeholder="添加标签，标签请用 , 或 ; 分开"></el-input>
      </el-form-item>
      <el-form-item label="相关产品" prop="chanpin">
        <el-input v-model="formData.chanpin" placeholder="相关产品"></el-input>
      </el-form-item>
      <el-form-item label="相关方案" prop="fangan">
        <el-input v-model="formData.fangan" placeholder="相关方案"></el-input>
      </el-form-item>
      <el-form-item label="跟进状态" prop="zhuangtai">
        <el-select v-model="formData.zhuangtai" placeholder="请选择">
          <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="submitForm('form')">{{methodName}}</el-button>
      <el-button @click="loadPage">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initFormData, rules } from './const/index'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      formData: initFormData(),
      rules: rules,
      dicData: {
        select: [
          {value: 1, label: '选项1'},
          {value: 2, label: '选项2'},
        ],
        dept: [
          {value: 1, label: '部门1'},
          {value: 2, label: '部门2'},
        ],
      },
    }
  },
  methods: {
    loadPage () {
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
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
