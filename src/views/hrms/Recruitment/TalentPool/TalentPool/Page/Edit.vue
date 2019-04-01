<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="never">
      <div slot="header" class="title">
        <span>{{methodName}}人才</span>
      </div>
      <el-form ref="form" class="form-detail" :model="form" label-width="120px" size="small">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <i class="header-icon el-icon-info"></i> 基础信息
            </template>
            <el-form-item label="姓名：" class="form-half">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别：" class="form-half">
              <el-radio-group v-model="form.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="头像：" class="">
              <iep-avatar v-model="form.avatar"></iep-avatar>
            </el-form-item>
            <el-form-item label="出生年月：" class="form-half">
              <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="年龄：" class="form-half">
              <el-input v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="外部头衔：" class="form-half">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="联系手机：" class="form-half">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" class="form-half">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="身高：" class="form-half">
              <el-input v-model="form.height">
                <template slot="append">cm</template>
              </el-input>
            </el-form-item>
            <el-form-item label="体重：" class="form-half">
              <el-input v-model="form.weight">
                <template slot="append">kg</template>
              </el-input>
            </el-form-item>
            <el-form-item label="民族：" class="form-half">
              <el-input v-model="form.nation"></el-input>
            </el-form-item>
            <el-form-item label="现住地址：">
              <div style="display:flex;">
                <iep-cascader style="flex:1;" v-model="form.cities" prefix-url="admin/city"></iep-cascader>
                <el-input style="flex:3;" v-model="form.address"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="政治面貌：" class="form-half">
              <iep-dict-select v-model="form.politics" dict-name="hrms_politics_face"></iep-dict-select>
            </el-form-item>
            <el-form-item label="健康状况：" class="form-half">
              <el-input v-model="form.health"></el-input>
            </el-form-item>
            <el-form-item label="婚姻状况：" class="form-half">
              <iep-dict-select v-model="form.marriage" dict-name="hrms_marriage_status"></iep-dict-select>
            </el-form-item>
            <el-form-item label="生育状况：" class="form-half">
              <iep-dict-select v-model="form.bear" dict-name="hrms_birth_status"></iep-dict-select>
            </el-form-item>
            <el-form-item label="毕业学校：" class="form-half">
              <el-input v-model="form.university"></el-input>
            </el-form-item>
            <el-form-item label="最高学历：" class="form-half">
              <iep-dict-select v-model="form.education" dict-name="hrms_highest_educational"></iep-dict-select>
            </el-form-item>
            <el-form-item label="员工关系：" class="form-half">
              <el-input v-model="form.relation"></el-input>
            </el-form-item>
            <el-form-item label="推荐人：" class="form-half">
              <el-input v-model="form.referrer"></el-input>
            </el-form-item>
            <el-form-item label="应聘渠道：" class="form-half">
              <iep-dict-select v-model="form.appWay" dict-name="hrms_app_way"></iep-dict-select>
            </el-form-item>
            <el-form-item label="来源类型：" class="form-half">
              <iep-dict-select v-model="form.source" dict-name="hrms_resume_source"></iep-dict-select>
            </el-form-item>
            <el-form-item label="兴趣爱好：" class="form-half">
              <el-input v-model="form.hobbies"></el-input>
            </el-form-item>
            <el-form-item label="特长及优势：">
              <el-input v-model="form.advantage"></el-input>
            </el-form-item>
            <el-form-item label="荣誉奖励：">
              <el-input v-model="form.honor"></el-input>
            </el-form-item>
            <el-form-item label="其他成果：">
              <el-input v-model="form.result"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="求职意向" name="2">
            <el-form-item label="应聘岗位：" class="form-half">
              <iep-cascader v-model="form.position" prefix-url="hrms/post_type"></iep-cascader>
            </el-form-item>
            <el-form-item label="到岗时间：" class="form-half">
              <iep-dict-select v-model="form.arrive" dict-name="hrms_arrive_time"></iep-dict-select>
            </el-form-item>
            <el-form-item label="期望薪资：" class="form-half">
              <el-input v-model="form.salary"></el-input>
            </el-form-item>
            <el-form-item label="期望工作地：" class="form-half">
              <el-input v-model="form.workPlace"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item v-if="methodName !=='新增'" title="学习工作经历" name="3">
            <el-form-item label="学习情况：">
              <inline-form-table :table-data="form.eduSituation" :columns="studyColumns" requestName="study" type="talent_pool" :rid="form.id" @load-page="loadPage"></inline-form-table>
            </el-form-item>
            <el-form-item label="工作经历：">
              <inline-form-table :table-data="form.workExperience" :columns="workExpColumns" requestName="work_exp" type="talent_pool" :rid="form.id" @load-page="loadPage"></inline-form-table>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item v-if="methodName !=='新增'" title="培训证书情况" name="4">
            <el-form-item label="培训情况：">
              <inline-form-table :table-data="form.trainingSituation" :columns="trainingColumns" requestName="training" type="talent_pool" :rid="form.id" @load-page="loadPage"></inline-form-table>
            </el-form-item>
            <el-form-item label="资质证书：">
              <inline-form-table :table-data="form.userCert" :columns="certificateColumns" requestName="certificate" type="talent_pool" :rid="form.id" @load-page="loadPage"></inline-form-table>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item v-if="methodName !=='新增'" title="附件上传" name="5">
            <el-form-item label="附件上传：">
              待完成
              <!-- <iep-upload v-model="form.attach"></iep-upload> -->
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </el-card>
    <footer-tool-bar>
      <iep-button @click="handleGoBack">返回</iep-button>
      <iep-button type="primary" @click="handleSubmit">提交</iep-button>
    </footer-tool-bar>
  </div>
</template>
<script>
import { getTalentPoolById } from '@/api/hrms/talent_pool'
import { initForm, formToDto } from '../options'
import { workExpColumns, studyColumns, trainingColumns, certificateColumns } from '@/views/hrms/Components/options'
import InlineFormTable from '@/views/hrms/Components/InlineFormTable/'
import { mergeByFirst } from '@/util/util'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  components: { InlineFormTable },
  data () {
    return {
      certificateColumns,
      trainingColumns,
      studyColumns,
      workExpColumns,
      activeNames: ['1'],
      methodName: '新增',
      form: initForm(),
      formRequestFn: () => { },
    }
  },
  created () {
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.id) {
      this.loadPage()
    }
  },
  methods: {
    loadPage () {
      getTalentPoolById(this.id).then(({ data }) => {
        this.form = mergeByFirst(initForm(), data.data)
      })
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
    handleSubmit () {
      this.formRequestFn(formToDto(this.form)).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: `人才库${this.methodName}成功`,
            type: 'success',
          })
          this.$emit('onGoBack')
        }
      })
    },
  },
}
</script>
<style scoped>
.edit-wrapper >>> .el-collapse-item__wrap {
  padding: 30px 70px 0 70px;
  border: none;
}
.edit-wrapper >>> .el-collapse {
  border: none;
}
.edit-wrapper >>> .el-collapse-item__header {
  background-color: #f8f8f8;
  font-size: 15px;
  font-weight: 700;
  padding-left: 20px;
  margin: 5px;
  border-radius: 5px;
  border: none;
}
</style>

<style lang="scss" scoped>
.edit-wrapper {
  margin: 5px 5px 50px 5px;
  .edit-card {
    .title {
      font-weight: 600;
      font-size: 16px;
    }
  }
}
</style>
