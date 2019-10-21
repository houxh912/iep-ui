
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
        <el-form-item label="头像：">
          <iep-avatar v-model="form.image"></iep-avatar>
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
            <el-input style="flex:1;" v-model="form.birthplaceProvince" placeholder="省"></el-input>
            <el-input style="flex:1;" v-model="form.birthplaceCity" placeholder="市"></el-input>
            <el-input style="flex:3;" v-model="form.residenceAddress" placeholder="详细地址"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="form-half" label="家庭地址：" prop="currentAddress">
          <div style="display:flex;">
            <el-input style="flex:1;" v-model="form.province" placeholder="省"></el-input>
            <el-input style="flex:1;" v-model="form.city" placeholder="市"></el-input>
            <el-input style="flex:3;" v-model="form.currentAddress" placeholder="详细地址"></el-input>
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
          <el-input v-model="form.phone"></el-input>
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
import { initForm, dictsMap, rules } from '../options'
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
      rules,
      preData: {},
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
    loadPage () {
      if (this.isEdit) {
        getDetailPageById(this.id).then(({ data }) => {
          const { politicsStatus, marriageStatus, birthStatus, residentType } = data.data
          this.preData = { politicsStatus, marriageStatus, birthStatus, residentType }
          this.form = this.$mergeByFirst(initForm(), data.data)
          this.form.politicsStatus = this.dictGroup['hrms_politics_face'][politicsStatus].label
          this.form.marriageStatus = this.dictGroup['hrms_marriage_status'][marriageStatus].label
          this.form.birthStatus = this.dictGroup['hrms_birth_status'][birthStatus].label
          this.form.residentType = this.dictGroup['hrms_resident_type'][residentType].label
        })
      }
    },
    async submitForm () {
      if (this.isEdit) {
        this.form.politicsStatus = this.preData.politicsStatus
        this.form.marriageStatus = this.preData.marriageStatus
        this.form.birthStatus = this.preData.birthStatus
        this.form.residentType = this.preData.residentType
        const { data } = await insertOrUpdate({ ...this.form, id: this.id })
        if (data.data) {
          this.$router.history.go(-1)
        } else {
          this.$message(data.msg)
        }
      } else {
        const { data } = await insertOrUpdate(this.form)
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

