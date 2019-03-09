<template>
  <iep-dialog :dialog-show="dialogShow" title="新建文档" width="40%" @close="resetForm('form')">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">

      <el-form-item label="名称：" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="介绍：" porp="jieshao">
        <el-input v-model="formData.jieshao" type="textarea" rows="5"></el-input>
      </el-form-item>
      <el-form-item label="正文：" porp="zhengwen">
        <el-input v-model="formData.zhengwen" type="textarea" rows="5"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="分类：" porp="fenlei1">
            <el-select v-model="formData.fenlei1" placeholder="请选择">
              <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="" porp="fenlei2" label-width="50px">
            <el-select v-model="formData.fenlei2" placeholder="请选择">
              <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="类型：" prop="leixing">
        <el-select v-model="formData.fenlei1" placeholder="请选择">
          <el-option v-for="item in dicData.select" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签：" prop="biaoqian">
        <el-input v-model="formData.biaoqian"></el-input>
      </el-form-item>
      <el-form-item label="是否投稿：" prop="tougao">
        <el-switch v-model="formData.tougao"></el-switch>
      </el-form-item>
      <el-form-item label="标题：" prop="biaoti">
        <el-input v-model="formData.biaoti"></el-input>
      </el-form-item>
      <el-form-item label="标题图：" prop="biaotitu">
        <el-input v-model="formData.biaotitu"></el-input>
      </el-form-item>
      <el-form-item label="相关用户：" prop="yonghu">
        <el-input v-model="formData.yonghu"></el-input>
      </el-form-item>


    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initLocalForm, rules } from './option'
import IepDialog from '@/components/IepDialog/'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      formData: initLocalForm(),
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
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initLocalForm()
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
  },
}
</script>
