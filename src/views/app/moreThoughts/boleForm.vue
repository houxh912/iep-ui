<template>
  <div class="tobe-bole">
    <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="120px" style="margin-bottom: 50px;">
      <h2 class="title">争做伯乐</h2>

      <el-row>
        <el-col :span=12>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="手机：" prop="phone">
            <el-input v-model="formData.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="学历：" prop="">
            <iep-dict-select v-model="formData.materialType" dict-name="hrms_highest_educational"></iep-dict-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="应聘岗位：" prop="position">
            <!-- <el-input v-model="formData.positionId"></el-input> -->
            <iep-cascader v-model="formData.position" prefix-url="hrms/post_type"></iep-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <el-col class="hr">填写更多信息</el-col>

      <el-row>
        <el-col>
          <el-form-item label="头像：" prop="">
            <el-input v-model="formData.avatar"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="性别：" prop="">
            <el-radio-group v-model="formData.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="出生年月：" prop="">
            <IepDatePicker v-model="formData.birthday"></IepDatePicker>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="外部头衔：" prop="">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="邮箱：" prop="">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="身高：" prop="">
            <el-input v-model="formData.height"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="体重：" prop="">
            <el-input v-model="formData.weight"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="民族：" prop="">
            <el-input v-model="formData.nation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="政治面貌：" prop="">
            <el-input v-model="formData.politics"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-col :span=9>
            <el-form-item label="现住地址：">
              <iep-cascader v-model="formData.cities" prefix-url="admin/city"></iep-cascader>
            </el-form-item>
          </el-col>
          <el-col :span=15>
            <el-form-item label="" label-width="15px">
              <el-input style="flex:3;" v-model="formData.address"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span=12>
          <el-form-item label="健康状况：" prop="">
            <iep-dict-select v-model="formData.health" dict-name="hrms_highest_educational" />
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="婚姻状况：" prop="">
            <el-input v-model="formData.marriage"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="生育状况：" prop="">
            <el-input v-model="formData.bear"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="毕业学校：" prop="">
            <el-input v-model="formData.university"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="员工关系：" prop="">
            <el-input v-model="formData.relation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="应聘渠道：" prop="">
            <el-input v-model="formData.appWay"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="来源类型：" prop="">
            <el-input v-model="formData.source"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="兴趣爱好：" prop="">
            <el-input v-model="formData.hobbies"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="个人特长及优势：" prop="">
            <el-input v-model="formData.advantage"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="荣誉奖励：" prop="">
            <el-input v-model="formData.honor"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="其他成果：" prop="">
            <el-input v-model="formData.result"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="到岗时间：" prop="">
            <iep-dict-select v-model="formData.arrive" dict-name="hrms_arrive_time" />
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="期望薪资：" prop="">
            <iep-dict-select v-model="formData.salary" dict-name="hrms_wages_salaries" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item>
            <iep-button type="primary" @click="submitForm('form')" :loading="loadState">保存</iep-button>
            <iep-button @click="resetForm">重置</iep-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { initFormData, rules } from './option'
import { postResumeBlacklist } from '@/api/hrms/talent_pool'

export default {
  data () {
    return {
      formData: initFormData(),
      rules,
      loadState: false,
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadState = true
          this.formData.positionId = this.formData.position[1]
          postResumeBlacklist(this.formData).then(() => {
            this.loadState = false
            this.$message({
              message: '提交成功',
              type: 'success',
            })
            setTimeout(() => {
              this.resetForm()
            }, 1500)
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.$router.history.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
.tobe-bole {
  margin: 20px 20px 0 0;
  .title {
    font-size: 26px;
    margin-bottom: 35px;
  }
  .hr {
    background-color: #f8f8f8;
    margin: 10px 0 20px;
    padding: 10px 20px;
  }
  .el-button {
    margin-right: 20px;
  }
}
</style>
