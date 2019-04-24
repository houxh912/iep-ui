<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="员工信息管理"></page-header>
      <el-form ref="form" class="form-detail" :rules="rules" :model="form" label-width="150px" size="small">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <i class="header-icon el-icon-info"></i> 员工信息
            </template>
            <div>
              <div class="little-title">基础信息</div>
              <el-form-item class="form-half">
                <span slot="label">
                  姓名
                  <iep-tip content="请务必根据本人身份证上的姓名全称填写">
                  </iep-tip>
                  ：
                </span>
                <iep-div-detail :value="form.name"></iep-div-detail>
              </el-form-item>
              <el-form-item label="用户名：" class="form-half">
                <iep-div-detail :value="form.userName"></iep-div-detail>
              </el-form-item>
              <el-form-item label="所属组织：" class="form-half">
                <iep-tag-detail :value="form.orgList"></iep-tag-detail>
              </el-form-item>
              <el-form-item label="资产所属公司：" class="form-half">
                <iep-div-detail :value="form.deptQm"></iep-div-detail>
              </el-form-item>
              <el-form-item prop="avatar" class="">
                <span slot="label">
                  头像
                  <iep-tip content="请务必根据以下说明上传头像：1.照片必须为本人真实、正面、静态、采用蓝、白、灰底1年内的证件照；2.上传尺寸为宽300像素*高300像素">
                  </iep-tip>
                  ：
                </span>
                <iep-avatar v-model="form.avatar"></iep-avatar>
              </el-form-item>
              <el-form-item label="角色：">
                <iep-tag-detail :value="form.roleName"></iep-tag-detail>
              </el-form-item>
              <el-form-item label="工号：" prop="staffId" class="form-half">
                <el-input v-model="form.staffId"></el-input>
              </el-form-item>
              <el-form-item label="岗位：" prop="position" class="form-half">
                <iep-cascader v-model="form.position" prefix-url="hrms/post_type"></iep-cascader>
              </el-form-item>
              <el-form-item label="对外头衔：" prop="socialRela" class="form-half">
                <el-input v-model="form.socialRela"></el-input>
              </el-form-item>
              <el-form-item label="职务：" prop="jobId" class="form-half">
                <iep-select prefix-url="hrms/job_system" v-model="form.jobId"></iep-select>
              </el-form-item>
              <el-form-item label="职称：" prop="titleId" class="form-half">
                <iep-select prefix-url="hrms/title_system" v-model="form.titleId"></iep-select>
              </el-form-item>
              <el-form-item label="入职时间：" prop="entryTime" class="form-half">
                <IepDatePicker v-model="form.entryTime" type="date" placeholder="选择日期"></IepDatePicker>
              </el-form-item>
              <el-form-item label="转正时间：" prop="positiveTime" class="form-half">
                <IepDatePicker v-model="form.positiveTime" type="date" placeholder="选择日期"></IepDatePicker>
              </el-form-item>
              <el-form-item label="员工状态：" prop="status" class="form-half">
                <el-select v-model="form.status" placeholder="请选择" clearable>
                  <el-option v-for="(v,k) in dictsMap.status" :key="k" :label="v" :value="+k">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属部门：" prop="dept" class="form-half">
                <iep-dept-multiple v-model="form.dept"></iep-dept-multiple>
              </el-form-item>
              <el-form-item label="出生年月：" prop="birthday" class="form-half">
                <IepDatePicker v-model="form.birthday" type="date" placeholder="选择日期"></IepDatePicker>
              </el-form-item>
              <el-form-item label="性别：" prop="sex" class="form-half">
                <el-radio-group v-model="form.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="nationality" class="form-half">
                <span slot="label">
                  民族
                  <iep-tip content="请务必准确填写，后缀含“族”，即汉族、满族、维吾尔族等">
                  </iep-tip>
                  ：
                </span>
                <el-input v-model="form.nationality"></el-input>
              </el-form-item>
              <el-form-item prop="politics" class="form-half">
                <span slot="label">
                  政治面貌
                  <iep-tip content="请务必根据实际情况选择">
                  </iep-tip>
                  ：
                </span>
                <iep-dict-select v-model="form.politics" dict-name="hrms_politics_face"></iep-dict-select>
              </el-form-item>
              <el-form-item prop="marriage" class="form-half">
                <span slot="label">
                  婚姻状况
                  <iep-tip content="请务必根据实际情况选择">
                  </iep-tip>
                  ：
                </span>
                <iep-dict-select v-model="form.marriage" dict-name="hrms_marriage_status"></iep-dict-select>
              </el-form-item>
              <el-form-item prop="bear" class="form-half">
                <span slot="label">
                  生育状况
                  <iep-tip content="请务必根据实际情况选择">
                  </iep-tip>
                  ：
                </span>
                <iep-dict-select v-model="form.bear" dict-name="hrms_birth_status"></iep-dict-select>
              </el-form-item>
              <el-form-item prop="language" class="form-half">
                <span slot="label">
                  外语水平
                  <iep-tip content="单选项：英语、韩语、日语、法语、德语等">
                  </iep-tip>
                  ：
                </span>
                <el-input v-model="form.language"></el-input>
              </el-form-item>
              <el-form-item prop="education" class="form-half">
                <span slot="label">
                  最高学历
                  <iep-tip content="高中及以下、专科、本科、硕士、博士及以上">
                  </iep-tip>
                  ：
                </span>
                <iep-dict-select v-model="form.education" dict-name="hrms_highest_educational"></iep-dict-select>
              </el-form-item>
              <el-form-item prop="university" class="form-half">
                <span slot="label">
                  毕业学校
                  <iep-tip content="请填写与本人最高学历对应学校全称，并确保与毕业证书中一致，而非通用简称">
                  </iep-tip>
                  ：
                </span>
                <el-input v-model="form.university"></el-input>
              </el-form-item>
              <el-form-item prop="profession" class="form-half">
                <span slot="label">
                  专业
                  <iep-tip content="请填写与本人最高学历对应的专业全称并确保与毕业证中专业一致，禁专业简称">
                  </iep-tip>
                  ：
                </span>
                <el-input v-model="form.profession"></el-input>
              </el-form-item>
              <el-form-item prop="graduationTime" class="form-half">
                <span slot="label">
                  毕业时间
                  <iep-tip content="请选择与本人最高学历对应的毕业时间，精准至年月日">
                  </iep-tip>
                  ：
                </span>
                <IepDatePicker v-model="form.graduationTime" type="date" placeholder="选择日期"></IepDatePicker>
              </el-form-item>
              <el-form-item label="外部头衔：" prop="externalTitle" class="form-half">
                <el-input v-model="form.externalTitle"></el-input>
              </el-form-item>
              <el-form-item prop="referrer" class="form-half">
                <span slot="label">
                  推荐人
                  <iep-tip content="请填写推荐您进入公司的员工全名，没有则填“无”">
                  </iep-tip>
                  ：
                </span>
                <el-input v-model="form.referrer"></el-input>
              </el-form-item>

              <!-- <el-form-item label="添加师父：">
                <iep-tag v-model="form.people"></iep-tag>
              </el-form-item> -->
              <el-form-item label="：" prop="abilityTag">
                <span slot="label">
                  卓越标签
                  <iep-tip content="请务必根据自身能力选择对应标签，如发现标签不匹配导致信用降低等">
                  </iep-tip>
                  ：
                </span>
                <iep-tag v-model="form.abilityTag"></iep-tag>
              </el-form-item>
              <el-form-item prop="projectTag">
                <span slot="label">
                  专业标签
                  <iep-tip content="请务必根据自身相关岗位进行选择，如发现标签不匹配导致信用降低等">
                  </iep-tip>
                  ：
                </span>
                <iep-tag v-model="form.projectTag"></iep-tag>
              </el-form-item>
              <el-form-item prop="learningTag">
                <span slot="label">
                  进步标签
                  <iep-tip content="请务必根据自身能力选择对应标签，如发现标签不匹配导致信用降低等">
                  </iep-tip>
                  ：
                </span>
                <iep-tag v-model="form.learningTag"></iep-tag>
              </el-form-item>
              <!-- <el-form-item label="" class="form-half">
                <el-input placeholder="">
                  <template slot="append">添加</template>
                </el-input>
              </el-form-item> -->

              <el-form-item prop="careerPlanning">
                <span slot="label">
                  职业规划
                  <iep-tip content="请清晰罗列自己未来三年的职业规划，如能详细描述更好">
                  </iep-tip>
                  ：
                </span>
                <iep-input-area v-model="form.careerPlanning"></iep-input-area>
              </el-form-item>

              <el-form-item>
                <span slot="label">
                  工作经历
                  <iep-tip content="1.请务必准确填写公司全称，忌简称；2.请务必准确填写岗位全称，忌简称；3.请务必准确填写起始时间，并精确到年月，如：2017.7-2018.6；4.请务必简要说明离职原因">
                  </iep-tip>
                  ：
                </span>
                <inline-form-table :table-data="form.workExperience" :columns="workExpColumns" requestName="work_exp" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
              </el-form-item>

              <el-form-item>
                <span slot="label">
                  学习情况
                  <iep-tip content="1.请务必准确填写学校全称，忌简称；2.请务准确必填写起始时间，并精确到年月，如：2017.7-2018.6；3.请务必简要概括学习内容，如经济管理，财务管理">
                  </iep-tip>
                  ：
                </span>
                <inline-form-table :table-data="form.eduSituation" :columns="studyColumns" requestName="study" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
              </el-form-item>

              <el-form-item>
                <span slot="label">
                  培训情况
                  <iep-tip content="1.请务必准确填写实际培训名称；2.请务必完整填写培训单位的全称；3.请准确填写培训方式，一般线下培训，线上培训等；4.请务准确必填写起始时间，并精确到年月日，如：2017.7.5-2017.7.10；">
                  </iep-tip>
                  ：
                </span>
                <inline-form-table :table-data="form.trainingSituation" :columns="trainingColumns" requestName="training" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
              </el-form-item>

              <el-form-item label="：">
                <span slot="label">
                  资质证书
                  <iep-tip content="1.请务必按照证书准确填写全称；2.请务必按照证书准确填写编号；3.请务必按照证书准确填写颁发单位全称，忌单位简称；4.请务必上传电子版证书，否则证书不做任何加分项；">
                  </iep-tip>
                  ：
                </span>
                <inline-form-table :table-data="form.userCert" :columns="certificateColumns" requestName="certificate" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
              </el-form-item>

            </div>
            <div>
              <div class="little-title">联系信息</div>
              <el-form-item label="户口类型：" prop="accountTypeId" class="form-half">
                <iep-dict-select v-model="form.accountTypeId" dict-name="hrms_resident_type"></iep-dict-select>
              </el-form-item>
              <el-form-item label="户籍地址：" prop="residenceAddress">
                <div style="display:flex;">
                  <iep-cascader style="flex:1;" v-model="form.residenceCities" prefix-url="admin/city"></iep-cascader>
                  <el-input style="flex:3;" v-model="form.residenceAddress"></el-input>
                </div>
              </el-form-item>
              <el-form-item label="现住地址：" prop="currentAddress">
                <div style="display:flex;">
                  <iep-cascader style="flex:1;" v-model="form.currentCities" prefix-url="admin/city"></iep-cascader>
                  <el-input style="flex:3;" v-model="form.currentAddress"></el-input>
                </div>
              </el-form-item>
              <el-form-item label="身份证号码：" class="form-half" prop="IDCard">
                <el-input v-model="form.IDCard"></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" class="form-half" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="微信：" class="form-half" prop="wechat">
                <el-input v-model="form.wechat"></el-input>
              </el-form-item>
              <el-form-item label="QQ：" class="form-half" prop="qq">
                <el-input v-model="form.qq"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：" class="form-half" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="个人主页：" class="form-half" prop="home">
                <el-input v-model="form.home"></el-input>
              </el-form-item>
              <el-form-item label="应急联系人：" class="form-half" prop="emergencyName">
                <el-input v-model="form.emergencyName"></el-input>
              </el-form-item>
              <el-form-item label="应急联系人电话：" class="form-half" prop="emergencyPhone">
                <el-input v-model="form.emergencyPhone"></el-input>
              </el-form-item>
            </div>
          </el-collapse-item>
          <el-collapse-item title="劳动合同" name="2">
            <inline-form-table :table-data="form.laborContract" :columns="laborContractColumns" requestName="labor_contract" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
          </el-collapse-item>
          <el-collapse-item title="社保福利" name="3">
            <inline-form-table :table-data="form.welfare" :columns="welfareColumns" requestName="welfare" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
          </el-collapse-item>
          <el-collapse-item title="调动情况" name="4">
            <inline-form-table :table-data="form.transfer" :columns="transferColumns" requestName="transfer" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
          </el-collapse-item>
          <el-collapse-item title="离职信息" name="5">
            <inline-form-table :table-data="form.dimission" :columns="dimissionColumns" requestName="dimission" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
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
    async handleSave () {
      try {
        const valid = await this.$refs['form'].validate()
        if (valid) {
          const { data } = await this.formRequestFn(formToDto(this.form))
          if (data.data) {
            this.$message({
              message: '修改成功',
              type: 'success',
            })
            return true
          } else {
            this.$message({
              message: data.msg,
              type: 'error',
            })
            return false
          }
        } else {
          return false
        }
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async handleSubmit () {
      const res = await this.handleSave()
      console.log(res)
      if (res) {
        this.handleGoBack()
      }
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
