
<template>
  <div>
    <basic-container>
      <iep-page-header :title="`${methodName}人名`" :backOption="backOption"></iep-page-header>
      <el-form class="form-detail" :model="form" size="small" ref="form" :rules="rules" label-width="120px">
        <el-form-item class="form-half" label="姓名：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="身份证号：">
          <el-input v-model="form.idCard"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="头像：">
          <iep-avatar v-model="form.image"></iep-avatar>
        </el-form-item>
        <el-form-item class="form-half" label="身份证正面：">
          <iep-avatar v-model="form.idCardFace"></iep-avatar>
        </el-form-item>
        <el-form-item label="身份证国徽面：">
          <iep-avatar v-model="form.idCardEmblem"></iep-avatar>
        </el-form-item>
        <el-form-item class="form-half" label="性别：">
          <el-select v-model="form.sex">
            <el-option v-for="(v,k) in dictsMap.sex" :key="k+v" :label="v" :value="+k">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-half" label="出生年月：">
          <el-date-picker v-model="form.birthDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="form-half" label="民族：">
          <el-input v-model="form.nation"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="政治面貌：">
          <iep-dict-select v-model="form.politicsStatus" dict-name="hrms_politics_face"></iep-dict-select>
        </el-form-item>
        <el-form-item class="form-half" label="婚姻状况：">
          <iep-dict-select v-model="form.marriageStatus" dict-name="hrms_marriage_status"></iep-dict-select>
        </el-form-item>
        <el-form-item class="form-half" label="生育状况：">
          <iep-dict-select v-model="form.birthStatus" dict-name="hrms_birth_status"></iep-dict-select>
        </el-form-item>
        <el-form-item class="form-half" label="户口类别：">
          <iep-dict-select v-model="form.residentType" dict-name="hrms_resident_type"></iep-dict-select>
        </el-form-item>
        <el-form-item class="form-half" label="户籍地址：" prop="residenceAddress">
          <div style="display:flex;">
            <iep-cascader style="flex:2;" v-model="form.residence" prefix-url="admin/city"></iep-cascader>
            <el-input style="flex:3;" v-model="form.residenceAddress"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="form-half" label="家庭地址：" prop="currentAddress">
          <div style="display:flex;">
            <iep-cascader style="flex:2;" v-model="form.current" prefix-url="admin/city"></iep-cascader>
            <el-input style="flex:3;" v-model="form.currentAddress"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="form-half" label="最高学历：">
          <iep-dict-select v-model="form.education" dict-name="hrms_highest_educational" clearable></iep-dict-select>
        </el-form-item>
        <el-form-item class="form-half" label="毕业学校：">
          <el-input v-model="form.university"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="QQ：">
          <el-input v-model="form.qq"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="专业：">
          <el-input v-model="form.major"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="联系电话：">
          <el-input v-model="form.phone" @blur="checkMobile()"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="毕业时间：">
          <el-date-picker v-model="form.graduateTime" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="form-half" label="微信：">
          <el-input v-model="form.wechat"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="邮箱：">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="外部头衔：">
          <el-input v-model="form.socialRela"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="任职机构：">
          <el-input v-model="form.agency"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="职称/职务：">
          <el-input v-model="form.job"></el-input>
        </el-form-item>
        <el-form-item label="机构简介" prop="describe">
          <el-input type="textarea" v-model="form.introduction"></el-input>
        </el-form-item>
      </el-form>
      <FooterToolBar>
        <iep-button type="primary" plain @click="submitForm()">提交</iep-button>
      </FooterToolBar>
    </basic-container>
  </div>
</template>

<script>
import { initForm, dictsMap, rules, formToDto } from '../options'
import formMixins from '@/mixins/formMixins'
import { insertOrUpdate, getDetailPageById } from '@/api/admin/name_list'
import { mapGetters } from 'vuex'
export default {
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      backOption: {
        isBack: true,
      },
      form: initForm(),
      preForm: initForm(),
      rules,
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
    isEdit () {
      return this.id !== 0 ? true : false
    },
    methodName () {
      return this.isEdit ? '修改' : '新增'
    },
    ...mapGetters([
      'dictGroup',
    ]),
  },
  methods: {
    checkMobile () {
      const partten = /^(13[0-9]|14[0-9]|15[0-9]|16[6]|18[0-9]|19[6,9]|17[0-9])\d{8}$/i
      const flag = partten.test(this.form.phone)
      if (!flag) this.$message('请输入正确的手机号码')
    },
    loadPage () {
      if (this.isEdit) {
        getDetailPageById(this.id).then(({ data }) => {
          this.form = this.$mergeByFirst(initForm(), data.data)
          this.preForm = this.$mergeByFirst(initForm(), data.data)
          const { politicsValue, marriageValue, birthValue, residentValue, educationValue, province, city, birthplaceProvince, birthplaceCity } = data.data
          this.form.politicsStatus = politicsValue
          this.form.marriageStatus = marriageValue
          this.form.birthStatus = birthValue
          this.form.residentType = residentValue
          this.form.education = educationValue
          this.form.current = [province, city]
          this.form.residence = [birthplaceProvince, birthplaceCity]
        })
      }
    },
    async submitForm () {
      if (this.isEdit) {
        if (this.preForm.politicsValue === this.form.politicsStatus) this.form.politicsStatus = this.preForm.politicsStatus
        if (this.preForm.marriageValue === this.form.marriageStatus) this.form.marriageStatus = this.preForm.marriageStatus
        if (this.preForm.birthValue === this.form.birthStatus) this.form.birthStatus = this.preForm.birthStatus
        if (this.preForm.residentValue === this.form.residentType) this.form.residentType = this.preForm.residentType
        if (this.preForm.educationValue === this.form.education) this.form.education = this.preForm.education
        const { data } = await insertOrUpdate({ ...formToDto(this.form), id: this.id })
        if (data.data) {
          this.$router.history.go(-1)
        } else {
          this.$message(data.msg)
        }
      } else {
        const { data } = await insertOrUpdate(formToDto(this.form))
        if (data.data) {
          this.$router.history.go(-1)
        } else {
          this.$message(data.msg)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  display: inline-block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  transition: 0.3s;
  &:hover .el-icon-circle-close {
    visibility: visible;
  }
}
.el-icon-circle-close {
  position: absolute;
  visibility: hidden;
  top: -7px;
  right: -7px;
  font-size: 16px;
  color: #ccc;
  &:hover {
    color: #409eff;
  }
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style scoped>
.form-detail >>> .el-input-number {
  width: 20%;
}
</style>

