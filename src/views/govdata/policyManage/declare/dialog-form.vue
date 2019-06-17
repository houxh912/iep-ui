<template>
  <!-- <iep-dialog :dialog-show="dialogShow" :title="`${methodName}政策资讯`" width="500px" @close="loadPage"> -->
  <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="120px">
    <el-form-item label="标题" prop="title">
      <el-input v-model="formData.title" maxlength="255" :readonly="isReadonly"></el-input>
    </el-form-item>

    <el-form-item label="标签" prop="tagList">
      <mutiply-tag-select v-model="formData.tagList" :selectObjs="formData.tagsList" v-if="!isReadonly"></mutiply-tag-select>
      <el-select v-model="formData.tagList" multiple disabled v-else>
        <el-option v-for="item in formData.tagsList" :key="item.commonId" :label="item.commonName" :value="item.commonId">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="来源" class="formWidth" prop="source">
      <el-input v-model="formData.source" maxlength="255" :readonly="isReadonly"></el-input>
    </el-form-item>

    <el-form-item label="原文链接" class="formWidth" prop="url">
      <el-input v-model="formData.url" maxlength="255" placeholder="http://或者https://" :readonly="isReadonly">
        <el-button slot="append" icon="el-icon-view" @click="handleOpenLink"></el-button>
      </el-input>
    </el-form-item>

    <el-form-item label="索引号" class="formWidth">
      <el-input v-model="formData.reference" maxlength="255" :readonly="isReadonly"></el-input>
    </el-form-item>

    <el-form-item label="发文号" class="formWidth">
      <el-input v-model="formData.issue" maxlength="255" :readonly="isReadonly"></el-input>
    </el-form-item>

    <!-- <el-form-item label="发文单位" class="formWidth" prop="dispatchList">
      <mutiply-select v-model="formData.dispatchList" :selectObjs="formData.dispatchsList" :options="发文单位options" :otherProps="orgOption" :disabled="isReadonly"></mutiply-select>
    </el-form-item>

    <el-form-item label="联合发文单位" class="formWidth">
      <mutiply-select v-model="formData.unionList" :selectObjs="formData.unionsList" :options="联合发文单位options" :otherProps="orgOption" :disabled="isReadonly"></mutiply-select>
    </el-form-item> -->

    <!-- <el-form-item label="成文时间" class="formWidth">
      <el-date-picker type="date" placeholder="选择日期" v-model="formData.writeTime" style="width: 100%;" :disabled="isReadonly"></el-date-picker>
    </el-form-item> -->

    <el-form-item label="发文时间" class="formWidth" prop="publishTime">
      <el-date-picker type="date" placeholder="选择日期" v-model="formData.publishTime" style="width: 100%;" :disabled="isReadonly"></el-date-picker>
    </el-form-item>

    <el-form-item label="申报开始时间" class="formWidth">
      <el-date-picker type="date" placeholder="选择日期" v-model="formData.effectTime" style="width: 100%;" :disabled="isReadonly"></el-date-picker>
    </el-form-item>

    <el-form-item label="申报截止时间" class="formWidth">
      <el-date-picker type="date" placeholder="选择日期" v-model="formData.invalidTime" style="width: 100%;" :disabled="isReadonly"></el-date-picker>
    </el-form-item>

    <!-- <el-form-item label="政策依据" class="formWidth">
      <mutiply-select v-model="formData.policyList" :selectObjs="formData.policysList" :options="政策依据options" :otherProps="政策依据otherProps" :disabled="isReadonly"></mutiply-select>
    </el-form-item> -->

    <!-- 这里是循环选择器的组件 -->
    <el-form-item class="formWidth" :label="key" v-for="(value, key) in selectFiledMap" :key="key" :prop="value.formText">
      <el-select v-model="formData[value.formText]" :placeholder="`请选择${key}`" :multiple="value.multiple" :disabled="isReadonly">
        <el-option v-for="item in dictGroup[value.dictText]" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="适用地区" prop="regionArr" class="formWidth">
      <el-cascader :options="options" :props="props" v-model="formData.regionArr" ref="region" clearable change-on-select :disabled="isReadonly"></el-cascader>
    </el-form-item>

    <el-form-item label="摘要" prop="summary">
      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" maxlength="1000" placeholder="请输入内容" v-model="formData.summary" :readonly="isReadonly">
      </el-input>
    </el-form-item>

    <el-form-item label="申报条件" prop="condition">
      <iep-froala-editor v-model="formData.condition" :disabled="isReadonly"></iep-froala-editor>>
    </el-form-item>

    <el-form-item label="扶持标准">
      <iep-froala-editor v-model="formData.standard" :disabled="isReadonly"></iep-froala-editor>>
    </el-form-item>

    <el-form-item label="办理流程" prop="process">
      <iep-froala-editor v-model="formData.process" :disabled="isReadonly"></iep-froala-editor>>
    </el-form-item>

    <el-form-item label="材料递交要求">
      <iep-froala-editor v-model="formData.requirement" :disabled="isReadonly"></iep-froala-editor>>
    </el-form-item>

    <el-form-item label="正文" prop="text">
      <iep-froala-editor v-model="formData.text" style="width:80%" :readonly="isReadonly"></iep-froala-editor>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="$emit('onAudit', formData)" v-if="isAudit">审核</el-button>
      <el-button type="primary" :loading="loading" @click="handleTempSave('form')" v-if="!isReadonly || isAudit">暂存</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit('form')" v-if="!isReadonly && !isHideSubmitBtn && !isAudit">保存并提交</el-button>
      <el-button type="primary" plain @click="$emit('hideDialog', false)" v-else>关闭</el-button>
    </el-form-item>

  </el-form>
  <!-- </iep-dialog> -->
</template>
<script>
import { region } from '../region'
import multiplyMixin from '../multiply_mixin'
import MutiplyTagSelect from '@/components/deprecated/mutiply-tag-select'
import {  postInformation, putInformation,validInformationTitle, postInformationAndCommit, putInformationAndCommit } from '@/api/govdata/information'
// import { getBasisPage } from '@/api/govdata/common'
import { getOrganizationPage } from '@/api/govdata/common'
// const orgOption = [{
//   prop: 'label',
//   label: '机构分类',
// }, {
//   prop: 'organizationUrl',
//   label: '机构网址',
// }]
export default {
  props: ['formData', 'isEdit', 'isReadonly', 'isAudit', 'dictGroup', 'selectFiledMap', 'isHideSubmitBtn'],
  mixins: [multiplyMixin],
  components: { MutiplyTagSelect },
  data () {
    var checkTitle = (rule, value, callback) => {
      const title = this.isEdited ? this.formData.title : undefined
      if (!value) {
        return callback(new Error('标题不能为空'))
      }
      validInformationTitle(value).then(res => {
        if (title !== value && !res.data.data) {
          callback(new Error('标题重复，已存在。'))
        } else {
          callback()
        }
      }).catch(() => {
        this.msg('不能检查标题是否重复，请检查你的网络链接。', 'error')
      })
    }
    return {
      // orgOption,
      isEdited: this.isEdit,
      isShow: false,
      loading: false,
      rules: this.isReadonly ? {} : {
        title: [{ required: true, validator: checkTitle, trigger: 'blur' }],
        text: [{ required: true, message: '请输入申报政策正文' }],
        url: [{ type: 'url', message: '请输入有效的网址 如：https://www.baodu.com', trigger: 'blur' }],
        declareTagList: [{ type: 'array', required: true, message: '请至少选择或填写3个标签', min: 3, trigger: 'change' }],
        source: [{ required: true, message: '请输入政策来源' }],
        declareDispatchList: [{ type: 'array', required: true, message: '请选择发文单位', trigger: 'change' }],
        publishTime: [{ required: true, message: '请选择发文时间' }],
        declareStyle: [{ required: true, message: '请选择政策文体' }],
        generalLevel: [{ required: true, message: '请选择政策层级' }],
        formality: [{ required: true, message: '请选择政策扶持形式' }],
        support: [{ required: true, message: '请选择政策支持方式' }],
        declareMethod: [{ required: true, message: '请选择政策申报方式' }],
        declareSpecial: [{ required: true, message: '请选择政策专项分类' }],
        scale: [{ required: true, message: '请选择政策适用规模' }],
        theme: [{ required: true, message: '请选择政策主题' }],
        // fund: [{ required: true, message: '请选择政策扶持资金规模' }],
        industry: [{ required: true, message: '请选择政策适用行业' }],
        declareStatus: [{ required: true, message: '请选择政策申报状态' }],
        target: [{ required: true, message: '请选择政策申报对象' }],
        declareAbstract: [{ required: true, message: '请输入政策摘要' }],
        condition: [{ required: true, message: '请输入政策申报条件' }],
        process: [{ required: true, message: '请输入政策办理流程' }],
        regionArr: [{ required: true, message: '请选择政策适用地区' }],
      },
        发文单位options: {
        name: '发文单位',
        labelName: '机构名',
        labelProp: 'name',
        valueName: '机构ID',
        valueProp: 'id',
        getRequestName: getOrganizationPage,
        pageLimit: 6,
      },
            联合发文单位options: {
        name: '发文单位',
        labelName: '机构名',
        labelProp: 'name',
        valueName: '机构ID',
        valueProp: 'id',
        getRequestName: getOrganizationPage,
        pageLimit: 6,
      },
      options: region,
      props: {
        value: 'code',
        label: 'name',
      },
    }
  },
  computed: {

  },
  methods: {
    handleSubmit (formName) {
      this.loading = true
      this.formData.region = this.$refs['region'].currentLabels.join(',')
      this.formData.regionList = []
      const submitForm = JSON.parse(JSON.stringify(this.formData))
      submitForm.file = submitForm.attachments ? submitForm.attachments.url : ''

      this.$refs[formName].validate((valid) => {
        if (valid) {
          const requestFun = this.isEdited ? putInformationAndCommit : postInformationAndCommit
          requestFun(submitForm).then(() => {
            this.submitMessage()
          }).catch(() => {
            this.msg('保存失败，请检查你的网络链接。', 'error')
          })
        } else {
          this.msg('填写错误或者填写不完整', 'warning')
          return false
        }
      })
    },

    /**
     * 暂存
     */
    async handleTempSave (formName) {
        this.loading = true
        this.formData.region = this.$refs['region'].currentLabels.join(',')
        this.formData.regionList = []
        const submitForm = JSON.parse(JSON.stringify(this.formData))
        submitForm.file = submitForm.attachments ? submitForm.attachments.url : ''

        this.$refs[formName].validateField(('title'))
        if (!submitForm.title) {
          this.msg('标题不能为空', 'warning')
          return false
        }

        const requestFun = this.isEdited ? putInformation : postInformation
        requestFun(submitForm).then(res => {
          if (!this.isEdited) {
            this.formData.id = res.data.msg ? Number(res.data.msg) : this.formData.id
            this.formData.title = submitForm.title
            this.isEdited = true
          }
          this.msg('保存成功!', 'success')
        }).catch(() => {
          this.msg('保存失败，请检查你的网络链接。', 'error')
        })
    },

    /**
     * 提交成功时
     */
    submitMessage () {
      this.msg('提交成功!', 'success')
      this.$emit('hideDialog', false)
    },

    /**
     * 提示语
     */
    msg (msg, type) {
      this.$message({
        message: msg,
        type: type,
      })
      this.loading = false
    },

    /**
     * 打开原文链接
     */
    handleOpenLink () {
      window.open(this.formData.url)
    },
  },
}
</script>
<style lang="scss" scoped>
.formWidth {
  display: inline-block;
  width: 50%;
}
</style>

