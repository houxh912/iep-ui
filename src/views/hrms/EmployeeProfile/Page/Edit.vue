<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="员工信息管理"></page-header>
      <el-form ref="form" class="form-detail" :rules="rules" :model="form" label-width="140px" size="small">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <i class="header-icon el-icon-info"></i> 员工信息
            </template>
            <div>
              <div class="little-title">基础信息</div>
              <el-form-item label="姓名：" class="form-half">
                <span>{{form.name}}</span>
              </el-form-item>
              <el-form-item label="用户名：" class="form-half">
                <span>{{form.userName}}</span>
              </el-form-item>
              <el-form-item label="所属组织：" class="form-half">
                <span>舟山国脉海洋有限公司</span>
              </el-form-item>
              <el-form-item label="工号：" prop="staffId" class="form-half">
                <el-input v-model="form.staffId"></el-input>
              </el-form-item>
              <el-form-item label="头像：" class="">
                <iep-avatar v-model="form.avatar"></iep-avatar>
              </el-form-item>
              <el-form-item label="角色：" class="form-half">
                <iep-detail-tag :value="form.roleName"></iep-detail-tag>
              </el-form-item>
              <el-form-item label="资产所属公司：" class="form-half">
                <span>{{form.deptList.join('、')}}</span>
              </el-form-item>
              <el-form-item label="岗位：" class="form-half">
                <iep-cascader v-model="form.position" prefix-url="hrms/post_type"></iep-cascader>
              </el-form-item>
              <el-form-item label="外部头衔：" class="form-half">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="职务：" class="form-half">
                <iep-select prefix-url="hrms/job_system" v-model="form.jobId"></iep-select>
              </el-form-item>
              <el-form-item label="职称：" class="form-half">
                <iep-select prefix-url="hrms/title_system" v-model="form.titleId"></iep-select>
              </el-form-item>
              <el-form-item label="入职时间：" class="form-half">
                <IepDatePicker v-model="form.entryTime" type="date" placeholder="选择日期"></IepDatePicker>
              </el-form-item>
              <el-form-item label="转正时间：" class="form-half">
                <IepDatePicker v-model="form.positiveTime" type="date" placeholder="选择日期"></IepDatePicker>
              </el-form-item>
              <el-form-item label="员工状态：" class="form-half">
                <el-select v-model="form.status" placeholder="请选择" clearable>
                  <el-option v-for="(v,k) in dictsMap.status" :key="k" :label="v" :value="+k">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属部门：" class="form-half">
                <iep-dept-multiple v-model="form.dept"></iep-dept-multiple>
              </el-form-item>
              <el-form-item label="出生年月：" class="form-half">
                <IepDatePicker v-model="form.birthday" type="date" placeholder="选择日期"></IepDatePicker>
              </el-form-item>
              <el-form-item label="性别：" class="form-half">
                <el-radio-group v-model="form.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="民族：" class="form-half">
                <el-input v-model="form.nationality"></el-input>
              </el-form-item>
              <el-form-item label="政治面貌：" class="form-half">
                <iep-dict-select v-model="form.politics" dict-name="hrms_politics_face"></iep-dict-select>
              </el-form-item>
              <el-form-item label="婚姻状况：" class="form-half">
                <iep-dict-select v-model="form.marriage" dict-name="hrms_marriage_status"></iep-dict-select>
              </el-form-item>
              <el-form-item label="生育状况：" class="form-half">
                <iep-dict-select v-model="form.bear" dict-name="hrms_birth_status"></iep-dict-select>
              </el-form-item>
              <el-form-item label="外语水平：" class="form-half">
                <el-select v-model="form.language">
                  <el-option label="良好" value="良好"></el-option>
                  <el-option label="一般" value="一般"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最高学历：" class="form-half">
                <iep-dict-select v-model="form.education" dict-name="hrms_highest_educational"></iep-dict-select>
              </el-form-item>
              <el-form-item label="毕业学校：" class="form-half">
                <el-input v-model="form.university"></el-input>
              </el-form-item>
              <el-form-item label="专业：" class="form-half">
                <el-input v-model="form.profession"></el-input>
              </el-form-item>
              <el-form-item label="毕业时间：" class="form-half">
                <IepDatePicker v-model="form.graduationTime" type="date" placeholder="选择日期"></IepDatePicker>
              </el-form-item>
              <el-form-item label="推荐人：" class="form-half">
                <el-input v-model="form.referrer"></el-input>
              </el-form-item>
              <el-form-item label="外部头衔：" class="form-half">
                <el-input v-model="form.externalTitle"></el-input>
              </el-form-item>

              <!-- <el-form-item label="添加师父：">
                <iep-tag v-model="form.people"></iep-tag>
              </el-form-item> -->
              <el-form-item label="卓越标签：">
                <iep-tag v-model="form.abilityTag"></iep-tag>
              </el-form-item>
              <el-form-item label="专业标签：">
                <iep-tag v-model="form.projectTag"></iep-tag>
              </el-form-item>
              <el-form-item label="进步标签：">
                <iep-tag v-model="form.learningTag"></iep-tag>
              </el-form-item>
              <!-- <el-form-item label="" class="form-half">
                <el-input placeholder="">
                  <template slot="append">添加</template>
                </el-input>
              </el-form-item> -->

              <el-form-item label="职业规划：">
                <el-input type="textarea" v-model="form.careerPlanning"></el-input>
              </el-form-item>

              <el-form-item label="工作经历：">
                <inline-form-table :table-data="form.workExperience" :columns="workExpColumns" requestName="work_exp" type="employee_profile" :rid="form.id" @load-page="loadPage"></inline-form-table>
              </el-form-item>

              <el-form-item label="学习情况：">
                <inline-form-table :table-data="form.eduSituation" :columns="studyColumns" requestName="study" type="employee_profile" :rid="form.id" @load-page="loadPage"></inline-form-table>
              </el-form-item>

              <el-form-item label="培训情况：">
                <inline-form-table :table-data="form.trainingSituation" :columns="trainingColumns" requestName="training" type="employee_profile" :rid="form.id" @load-page="loadPage"></inline-form-table>
              </el-form-item>

              <el-form-item label="资质证书：">
                <inline-form-table :table-data="form.userCert" :columns="certificateColumns" requestName="certificate" type="employee_profile" :rid="form.id" @load-page="loadPage"></inline-form-table>
              </el-form-item>

            </div>
            <div>
              <div class="little-title">联系信息</div>
              <el-form-item label="户口类型：" class="form-half">
                <iep-dict-select v-model="form.accountTypeId" dict-name="hrms_resident_type"></iep-dict-select>
              </el-form-item>
              <el-form-item label="户籍地址：">
                <div style="display:flex;">
                  <iep-cascader style="flex:1;" v-model="form.residenceCities" prefix-url="admin/city"></iep-cascader>
                  <el-input style="flex:3;" v-model="form.residenceAddress"></el-input>
                </div>
              </el-form-item>
              <el-form-item label="现住地址：">
                <div style="display:flex;">
                  <iep-cascader style="flex:1;" v-model="form.currentCities" prefix-url="admin/city"></iep-cascader>
                  <el-input style="flex:3;" v-model="form.currentAddress"></el-input>
                </div>
              </el-form-item>
              <el-form-item label="身份证号码：" class="form-half">
                <el-input v-model="form.IDCard"></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" class="form-half">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="微信：" class="form-half">
                <el-input v-model="form.wechat"></el-input>
              </el-form-item>
              <el-form-item label="QQ：" class="form-half">
                <el-input v-model="form.qq"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：" class="form-half">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="个人主页：" class="form-half">
                <el-input v-model="form.home"></el-input>
              </el-form-item>
              <el-form-item label="应急联系人：" class="form-half">
                <el-input v-model="form.emergencyName"></el-input>
              </el-form-item>
              <el-form-item label="应急联系人电话：" class="form-half">
                <el-input v-model="form.emergencyPhone"></el-input>
              </el-form-item>
            </div>
          </el-collapse-item>
          <el-collapse-item title="劳动合同" name="2">
            <el-form-item label="劳动合同：">
              <inline-form-table :table-data="form.laborContract" :columns="laborContractColumns" requestName="labor_contract" type="employee_profile" :rid="form.id" @load-page="loadPage"></inline-form-table>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="社保福利" name="3">
            <el-form-item label="社保福利：">
              <inline-form-table :table-data="form.welfare" :columns="welfareColumns" requestName="welfare" type="employee_profile" :rid="form.id" @load-page="loadPage"></inline-form-table>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="调动情况" name="4">
            <el-form-item label="调动情况：">
              <inline-form-table :table-data="form.transfer" :columns="transferColumns" requestName="transfer" type="employee_profile" :rid="form.id" @load-page="loadPage"></inline-form-table>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="离职信息" name="5">
            <el-form-item label="离职信息：">
              <inline-form-table :table-data="form.dimission" :columns="dimissionColumns" requestName="dimission" type="employee_profile" :rid="form.id" @load-page="loadPage"></inline-form-table>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <!-- fixed footer toolbar -->
      <footer-tool-bar>
        <iep-button @click="handleGoBack">返回</iep-button>
        <iep-button type="primary" @click="handleSubmit">提交</iep-button>
      </footer-tool-bar>
    </basic-container>
  </div>
</template>
<script>
import { getEmployeeProfileById } from '@/api/hrms/employee_profile'
import { initForm, formToDto, dictsMap, rules } from '@/views/hrms/EmployeeProfile/options'
import InlineFormTable from '@/views/hrms/Components/InlineFormTable/'
import { workExpColumns, studyColumns, trainingColumns, certificateColumns, laborContractColumns, welfareColumns, transferColumns, dimissionColumns } from '@/views/hrms/Components/options'
export default {
  components: { InlineFormTable },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      activeNames: ['1', '2', '3', '4', '5'],
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      rules,
      dictsMap,
      form: initForm(),
      formRequestFn: this.record.formRequestFn,
      workExpColumns,
      studyColumns,
      trainingColumns,
      certificateColumns,
      laborContractColumns,
      welfareColumns,
      transferColumns,
      dimissionColumns,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.formRequestFn(formToDto(this.form)).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: '修改成功',
                type: 'success',
              })
              this.handleGoBack()
            } else {
              this.$message({
                message: data.msg,
                type: 'error',
              })
            }
          })
        } else {
          return false
        }
      })
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
    loadPage () {
      getEmployeeProfileById(this.record.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
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
  margin-bottom: 60px;
  .edit-card {
    .title {
      font-weight: 600;
      font-size: 16px;
    }
  }
  .inlines {
    width: 22% !important;
    box-sizing: border-box;
  }
  .padding {
    padding-right: 10px;
  }
  .inlineblock {
    width: 56%;
  }
}
.little-title {
  font-size: 16px;
  font-family: "微软雅黑";
  padding-bottom: 20px;
}
</style>
