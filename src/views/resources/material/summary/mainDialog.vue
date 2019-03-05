<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}会议纪要`" width="70%" @close="resetForm">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">

      <el-form-item label="会议类型：" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio v-for="(item, value) in dictsMap.meetingType" :key="value" :label="value">{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="会议主题：" prop="zhuti">
        <el-input type="textarea" v-model="formData.zhuti"></el-input>
      </el-form-item>
      <el-form-item label="会议总结：" prop="zongjie">
        <el-input type="textarea" v-model="formData.zongjie"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="会议时间" prop="riqi">
            <el-date-picker v-model="formData.riqi" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="会议地点：" prop="didian">
            <el-input v-model="formData.didian"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="会议标签：" prop="biaoqian">
        <el-input v-model="formData.biaoqian"></el-input>
      </el-form-item>
      <el-form-item label="接收人" prop="jieshouren">
        <el-input v-model="formData.jieshouren"></el-input>
      </el-form-item>
      <el-form-item label="关联报表" prop="baobiao">
        <iep-button><i class="el-icon-plus"></i></iep-button>
      </el-form-item>
      <el-form-item label="关联项目" prop="xiangmu">
        <iep-button><i class="el-icon-plus"></i></iep-button>
      </el-form-item>
      
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initFormData, dictsMap } from './options'
export default {
  components: { IepDialog },
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      formData: initFormData(),
      rules: {},
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
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
    resetForm () {
      this.formData = initFormData()
      this.dialogShow = false
    },
  },
}
</script>
