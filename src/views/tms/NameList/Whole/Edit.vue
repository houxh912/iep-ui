
<template>
  <div>
    <basic-container>
      <iep-page-header :title="`${methodName}人名`" :backOption="backOption"></iep-page-header>
      <el-form class="form-detail" :model="form" size="small" ref="form" :rules="rules" label-width="120px">
        <el-form-item class="form-half" label="姓名：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="身份证号：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="头像：">
          <iep-avatar v-model="form.head"></iep-avatar>
        </el-form-item>
        <el-form-item class="form-half" label="性别：">
          <el-select v-model="form.sex">
            <el-option v-for="(v,k) in dictsMap.sex" :key="k+v" :label="v" :value="+k">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-half" label="出生年月：">
          <el-date-picker v-model="form.time" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="form-half" label="民族：">
          <el-input v-model="form.nationality"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="政治面貌：">
          <el-input v-model="form.political"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="婚姻状况：">
          <el-input v-model="form.marital"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="生育状况：">
          <el-input v-model="form.fertility"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="户口类别：">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="户籍地址：" prop="residenceAddress">
          <div style="display:flex;">
            <iep-cascader style="flex:1;" v-model="form.residenceCities" prefix-url="admin/city"></iep-cascader>
            <el-input style="flex:3;" v-model="form.residenceAddress"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="form-half" label="家庭地址：" prop="residenceAddress">
          <div style="display:flex;">
            <iep-cascader style="flex:1;" v-model="form.homeCities" prefix-url="admin/city"></iep-cascader>
            <el-input style="flex:3;" v-model="form.homeAddress"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="form-half" label="最高学历：">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="毕业学校：">
          <el-input v-model="form.school"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="QQ：">
          <el-input v-model="form.qq"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="专业：">
          <el-input v-model="form.major"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="联系电话：">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="毕业时间：">
          <el-date-picker v-model="form.eduTime" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="form-half" label="微信：">
          <el-input v-model="form.wx"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="邮箱：">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="外部头衔：">
          <el-input v-model="form.external "></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="任职机构：">
          <el-input v-model="form.organization"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="职称/职务：">
          <el-input v-model="form.job"></el-input>
        </el-form-item>
        <el-form-item label="机构简介" prop="describe">
          <el-input type="textarea" v-model="form.describe"></el-input>
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
    }
  },
  created () {
  },
  computed: {
    isEdit () {
      return this.id ? true : false
    },
    methodName () {
      return this.isEdit ? '修改' : '新增'
    },
  },
  methods: {

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

