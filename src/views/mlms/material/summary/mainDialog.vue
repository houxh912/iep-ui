<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}会议纪要`" width="70%" @close="resetForm">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">

      <el-form-item label="会议类型：" prop="meetingType">
        <el-radio-group v-model="formData.meetingType">
          <el-radio v-for="(item, value) in dictsMap.meetingType" :key="value" :label="+value" @change="typeChange">{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="拜访对象：" prop="visitingUserId" v-if="formData.type == 1">
        <iep-tags v-model="formData.visitingUserId"></iep-tags>
      </el-form-item>
      <el-form-item :label="`${formData.type == 0 ? '会议主题':'会议标题'}：`" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="会议内容：" prop="meetingContent">
        <el-input type="textarea" v-model="formData.meetingContent" rows=5></el-input>
      </el-form-item>
      <el-form-item label="会议总结：" prop="meetingCon">
        <el-input type="textarea" v-model="formData.meetingCon" rows=5></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="thoughtsProblem" v-if="formData.type==1">
        <el-input type="textarea" v-model="formData.thoughtsProblem" rows=5></el-input>
      </el-form-item>
      <el-form-item label="感想与困惑：" prop="thoughtsProblem" v-if="formData.type==0">
        <el-input type="textarea" v-model="formData.thoughtsProblem" rows=5></el-input>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="会议时间" prop="meetingTime">
            <!-- <el-date-picker v-model="formData.meetingTime" type="date" placeholder="选择日期"></el-date-picker> -->
            <IepDatePicker v-model="formData.meetingTime"></IepDatePicker>
          </el-form-item>
        </el-col>
        <el-col :span=12 v-if="formData.type == 0">
          <el-form-item label="会议地点：" prop="meetinLocation">
            <el-input v-model="formData.meetinLocation"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="拜访形式：" prop="visitType" v-if="formData.type == 1">
        <el-radio-group v-model="formData.visitType">
          <el-radio v-for="(item, value) in dictsMap.visitType" :key="value" :label="+value">{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" prop="visitingAddress" v-if="formData.visitType == 0 && formData.type == 1">
        <el-input v-model="formData.visitingAddress" placeholder="请输入面访具体地址"></el-input>
      </el-form-item>
      <el-form-item label="会议标签：" prop="tagKeyWords">
        <iep-tags v-model="formData.tagKeyWords"></iep-tags>
      </el-form-item>
      <el-form-item label="接收人" prop="receiverIds">
        <iep-tags v-model="formData.receiverIds"></iep-tags>
      </el-form-item>
      <!-- <el-form-item label="关联报表" prop="baobiao">
        <iep-button><i class="el-icon-plus"></i></iep-button>
      </el-form-item>
      <el-form-item label="关联项目" prop="xiangmu">
        <iep-button><i class="el-icon-plus"></i></iep-button>
      </el-form-item> -->
      
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initFormData, dictsMap, rules } from './options'
import IepTags from '@/components/IepTags/input'

export default {
  components: { IepDialog, IepTags },
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      formData: initFormData(),
      rules,
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    submitForm (formName) {
      delete this.formData.createTime
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
    typeChange (val) {
      if (val == 6) {
        this.$set(this.formData, 'type', 1)
      } else {
        this.$set(this.formData, 'type', 0)
      }
    },
    visitTypeChange () {},
  },
}
</script>
