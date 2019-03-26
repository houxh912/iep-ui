<template>
  <iep-drawer :drawer-show="drawerShow" title="员工信息" width="50%" @close="closePage">
    <!-- <p :style="[pStyle, pStyle2]"></p> -->
    <p :style="pStyle">个人信息</p>
    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="姓名：">
          <span slot="content">{{form.name}}
            <iep-img-avatar size="small" :src="form.avatar"></iep-img-avatar>
          </span>
        </IepDescriptionItem>
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="性别：" :content="form.sexName" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="身高：" :content="form.height+'cm'" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="体重：" :content="form.weight+'kg'" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="出生年月：" :content="form.birthday" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="民族：" :content="form.nation" />
      </a-col>
    </a-row>

    <a-divider />
    <p :style="pStyle">联系方式</p>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="电子邮箱：" :content="form.email" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="联系电话：" :content="form.phone" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <IepDescriptionItem title="现住地址：" :content="form.address" />
      </a-col>
    </a-row>

    <a-divider />
    <p :style="pStyle">详细信息</p>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="健康状况：" :content="form.health" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="员工关系：" :content="form.relation" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="政治面貌：">
          <iep-dict-detail slot="content" :current-value="form.politics" dict-name="hrms_politics_face"></iep-dict-detail>
        </IepDescriptionItem>
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="婚姻状况：">
          <iep-dict-detail slot="content" :current-value="form.marriage" dict-name="hrms_marriage_status"></iep-dict-detail>
        </IepDescriptionItem>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <IepDescriptionItem title="最高学历：">
          <iep-dict-detail slot="content" :current-value="form.education" dict-name="hrms_highest_educational"></iep-dict-detail>
        </IepDescriptionItem>
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="毕业学校：" :content="form.university" />
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
      <a-col :span="12">
        <IepDescriptionItem title="员工关系：" :content="form.relation" />
      </a-col>
      <a-col :span="12">
        <IepDescriptionItem title="兴趣爱好：" :content="form.hobbies" />
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
import { mergeByFirst } from '@/util/util'
import { initForm } from '../options'
import { getEmployeeProfileById } from '@/api/hrms/employee_profile'
export default {
  data () {
    return {
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
        this.form = mergeByFirst(initForm(), data.data)
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
