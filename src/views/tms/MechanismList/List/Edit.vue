
<template>
  <div>
    <basic-container>
      <iep-page-header :title="`${methodName}机构`" :backOption="backOption"></iep-page-header>
      <el-form class="form-detail" :model="form" size="small" ref="form" :rules="rules" label-width="120px">
        <el-form-item class="form-half" label="机构名称：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="机构简称：">
          <el-input v-model="form.abbreviation"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="社会信用代码：">
          <el-input v-model="form.creditCode"></el-input>
        </el-form-item>
        <el-form-item label="营业执照：">
          <iep-avatar v-model="form.license"></iep-avatar>
        </el-form-item>
        <el-form-item label="LOGO：">
          <iep-avatar v-model="form.license"></iep-avatar>
        </el-form-item>
        <el-form-item class="form-half" label="成立时间：">
          <el-date-picker v-model="form.time" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="form-half" label="标签：" prop="tagKeyWords">
          <iep-tag v-model="form.tagKeyWords"></iep-tag>
        </el-form-item>
        <el-form-item class="form-half" label="机构分类：">
          <el-select v-model="form.type"></el-select>
        </el-form-item>
        <el-form-item class="form-half" label="机构层级：">
          <el-input-number v-model="form.state" :min="1" :max="9"></el-input-number>
        </el-form-item>
        <el-form-item class="form-half" label="行业：">
          <iep-cascader v-model="form.industry" prefix-url="admin/city" clearable></iep-cascader>
        </el-form-item>
        <el-form-item class="form-half" label="机构官网：">
          <el-input v-model="form.website"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="联系人：">
          <el-input v-model="form.website"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="联系电话：">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="传真：">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="邮箱：">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="机构住址：">
          <iep-cascader v-model="form.adress" prefix-url="admin/city" clearable></iep-cascader>
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

