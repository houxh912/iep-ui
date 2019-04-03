<template>
  <iep-drawer :drawer-show="drawerShow" title="员工信息" width="40%" @close="closePage">
    <!-- <p :style="[pStyle, pStyle2]"></p> -->
    <p :style="pStyle">基本信息</p>
    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="姓名：">
          <span slot="content">{{form.name}}
            <iep-img-avatar size="small" :src="form.avatar"></iep-img-avatar>
          </span>
        </IepDescriptionItem>
      </a-col>
      <a-col :span="12">
        <iep-detail-tag title="角色：" :value="form.roleName"></iep-detail-tag>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="用户名：" :content="form.userName" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="性别：" :content="form.sexName" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="工号：" :content="form.IDCard" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="员工状态：" :content="status[form.status]" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="岗位：" :content="form.positionName" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="岗位职责：" :content="form.duties" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="职务：" :content="form.job" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="职称：" :content="form.title" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <IepDescriptionItem title="所属部门：">
          <iep-detail-tag slot="content" :value="form.deptList"></iep-detail-tag>
        </IepDescriptionItem>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <IepDescriptionItem title="所属组织：">
          <iep-detail-tag slot="content" :value="舟山国脉海洋有限公司"></iep-detail-tag>
        </IepDescriptionItem>
      </a-col>
    </a-row>

    <a-divider />
    <p :style="pStyle">联系方式</p>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="QQ：" :content="form.qq" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="微信：" :content="form.wechat" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="电子邮箱：" :content="form.email" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="联系电话：" :content="form.phone" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="紧急联系人：" :content="form.emergencyName" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="紧急联系人电话：" :content="form.emergencyPhone" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="主页：" :content="form.home" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="户口类型：">
          <iep-dict-detail slot="content" :current-value="form.accountTypeId" dict-name="hrms_resident_type"></iep-dict-detail>
        </IepDescriptionItem>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="户籍地址：" :content="form.residenceCities" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem :content="form.residenceAddress" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="现住地址：" :content="form.currentCities" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem :content="form.currentAddress" />
      </a-col>
    </a-row>

    <a-divider />
    <p :style="pStyle">详细信息</p>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="入职时间：" :content="form.entryTime" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="转正时间：" :content="form.positiveTime" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="出生年月：" :content="form.birthday" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="民族：" :content="form.nationality" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="最高学历：">
          <iep-dict-detail slot="content" :current-value="form.education" dict-name="hrms_highest_educational"></iep-dict-detail>
        </IepDescriptionItem>
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="专业：" :content="form.profession" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="毕业学校：" :content="form.university" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="毕业时间：" :content="form.graduationTime" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="政治面貌：">
          <iep-dict-detail slot="content" :current-value="form.politics" dict-name="hrms_politics_face"></iep-dict-detail>
        </IepDescriptionItem>
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="外语水平：" :content="form.language" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="婚姻状况：">
          <iep-dict-detail slot="content" :current-value="form.marriage" dict-name="hrms_marriage_status"></iep-dict-detail>
        </IepDescriptionItem>
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="生育状况：">
          <iep-dict-detail slot="content" :current-value="form.bear" dict-name="hrms_birth_status"></iep-dict-detail>
        </IepDescriptionItem>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="推荐人：" :content="form.referrer" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="外部头衔：" :content="form.title" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <IepDescriptionItem title="职业规划：" :content="form.careerPlanning" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <IepDescriptionItem title="特长及优势：" :content="form.advantage" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <IepDescriptionItem title="荣誉奖励：" :content="form.honor" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <IepDescriptionItem title="其他成果：" :content="form.result" />
      </a-col>
    </a-row>

  </iep-drawer>
</template>
<script>
import { initForm, dictsMap } from '../options'
import { getEmployeeProfileById } from '@/api/hrms/employee_profile'
export default {
  data () {
    return {
      status: dictsMap.status,
      drawerShow: false,
      id: null,
      methodName: '',
      form: initForm(),
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px',
      },
      pStyle2: {
        marginBottom: '24px',
      },
    }
  },
  methods: {
    loadPage () {
      getEmployeeProfileById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
    closePage () {
      this.form = initForm()
      this.drawerShow = false
      this.$emit('load-page')
    },
  },
}
</script>
