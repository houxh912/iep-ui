<template>
  <!-- <iep-dialog :dialog-show="dialogShow" :title="`${methodName}政策资讯`" width="500px" @close="loadPage"> -->
  <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="120px" :class="isReadonly ? 'readonly-form' : ''">
    <el-form-item label="标题" prop="title" class="titleItem">
      <el-input v-model="formData.title" maxlength="255" :readonly="isReadonly"></el-input>
    </el-form-item>

    <el-form-item label="标签" prop="tagList">
      <mutiply-tag-select class="tagListItem" v-model="formData.tagList" :selectObjs="formData.tagsList" v-if="!isReadonly"></mutiply-tag-select>
      <el-select class="tagListItem" v-model="formData.tagList" multiple disabled v-else>
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

    <el-form-item label="索引号" class="formWidth" prop="reference">
      <el-input v-model="formData.reference" maxlength="255" :readonly="isReadonly"></el-input>
    </el-form-item>

    <el-form-item label="发文号" class="formWidth" prop="issue">
      <el-input v-model="formData.issue" maxlength="255" :readonly="isReadonly"></el-input>
    </el-form-item>

    <el-form-item label="发文单位" class="formWidth" prop="dispatchList">
      <mutiply-select v-if="!isReadonly || isAudit" v-model="formData.dispatchList" :selectObjs="formData.dispatchsList" :options="发文单位options" :otherProps="orgOption" :disabled="isReadonly"></mutiply-select>
      <el-select class="selectclass" v-model="formData.dispatchList" multiple disabled v-else>
        <el-option v-for="item in formData.dispatchsList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="联合发文单位" class="formWidth" prop="unionList">
      <mutiply-select v-if="!isReadonly || isAudit" v-model="formData.unionList" :selectObjs="formData.unionsList" :options="联合发文单位options" :otherProps="orgOption" :disabled="isReadonly"></mutiply-select>
      <el-select class="selectclass" v-model="formData.unionList" multiple disabled v-else>
        <el-option v-for="item in formData.unionsList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="发文时间" prop="publishTime" class="formWidth">
      <el-date-picker style="width: 317px;" type="date" placeholder="选择日期" v-model="formData.publishTime" value-format="timestamp" format="yyyy年M月d号" :disabled="isReadonly">{{formData.publishTime | dateFormat}}</el-date-picker>
    </el-form-item>

    <el-form-item label="申报开始时间" class="formWidth">
      <el-date-picker type="date" placeholder="选择日期" v-model="formData.effectTime" value-format="timestamp" format="yyyy年M月d号" style="width: 100%;" :disabled="isReadonly">{{formData.effectTime | dateFormat}}</el-date-picker>
    </el-form-item>

    <el-form-item label="申报截止时间" class="formWidth">
      <el-date-picker type="date" placeholder="选择日期" v-model="formData.invalidTime" value-format="timestamp" format="yyyy年M月d号" style="width: 100%;" :disabled="isReadonly">{{formData.invalidTime | dateFormat}}</el-date-picker>
    </el-form-item>

    <!-- <el-form-item label="标题图" class="formWidth">
      <el-input v-model="formData.explainImage" :readonly="isReadonly"></el-input>
    </el-form-item> -->

    <!-- 这里是循环选择器的组件 -->
    <el-form-item class="formWidth" :label="key" v-for="(value, key) in selectFiledMap" :key="key" :prop="value.formText">
      <el-select style="width: 317px;" v-model="formData[value.formText]" :placeholder="`请选择${key}`" :multiple="value.multiple" :disabled="isReadonly">
        <el-option v-for="item in dictGroup[value.dictText]" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="适用地区" prop="regionArr" class="formWidth">
      <el-cascader style="width: 317px;" :options="options" :props="props" v-model="formData.regionArr" ref="region" clearable change-on-select :disabled="isReadonly"></el-cascader>
    </el-form-item>

    <el-form-item label="摘要" prop="summary" class="summaryItem">
      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入摘要内容" v-model="formData.summary" :readonly="isReadonly">
      </el-input>
    </el-form-item>

    <el-form-item label="申报条件" prop="condition">
      <iep-froala-editor v-if="!isReadonly || isAudit" v-model="formData.condition" style="width: 787px;" :readonly="isReadonly"></iep-froala-editor>
      <iep-html class="htmlItem" v-else v-model="formData.condition"></iep-html>
    </el-form-item>

    <el-form-item label="扶持标准" prop="standard">
      <iep-froala-editor v-if="!isReadonly || isAudit" v-model="formData.standard" style="width: 787px;" :readonly="isReadonly"></iep-froala-editor>
      <iep-html class="htmlItem" v-else v-model="formData.standard"></iep-html>
    </el-form-item>

    <el-form-item label="办理流程" prop="process">
      <iep-froala-editor v-if="!isReadonly || isAudit" v-model="formData.process" style="width: 787px;" :readonly="isReadonly"></iep-froala-editor>
      <iep-html class="htmlItem" v-else v-model="formData.process"></iep-html>
    </el-form-item>

    <el-form-item label="材料递交要求" prop="requirement">
      <iep-froala-editor v-if="!isReadonly || isAudit" v-model="formData.requirement" style="width: 787px;" :readonly="isReadonly"></iep-froala-editor>
      <iep-html class="htmlItem" v-else v-model="formData.requirement"></iep-html>
    </el-form-item>

    <el-form-item label="正文" prop="text">
      <iep-froala-editor v-if="!isReadonly || isAudit" v-model="formData.text" style="width: 787px;" :readonly="isReadonly"></iep-froala-editor>
      <iep-html class="htmlItem" v-else v-model="formData.text"></iep-html>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="$emit('onAudit', formData)" v-if="isAudit">审核</el-button>
      <el-button type="primary" :loading="loading" @click="handleTempSave('form')" v-if="!isReadonly || isAudit">{{btnTxt}}</el-button>
      <!-- <el-button type="primary" :loading="loading" @click="handleSubmit('form')" v-if="!isReadonly && !isHideSubmitBtn && !isAudit">保存并提交</el-button> -->
      <el-button type="primary" plain @click="$emit('hideDialog', false)" v-else>关闭</el-button>
    </el-form-item>

  </el-form>
  <!-- </iep-dialog> -->
</template>
<script>
import multiplyMixin from '../multiply_mixin'
import { region } from '../region'
import { dateFormat } from '@/util/date'
import MutiplyTagSelect from '@/components/deprecated/mutiply-tag-select'
import MutiplySelect from '@/components/deprecated/mutiply-select'
import { postDeclare, putDeclare, postDeclareAndCommit, putDeclareAndCommit } from '@/api/govdata/declaration_policy'
// import { validInformationTitle}from '@/api/govdata/information'
import { getBasisPage } from '@/api/govdata/common'
import { getOrganizationPage } from '@/api/govdata/common'
const orgOption = [{
  prop: 'label',
  label: '机构分类',
}, {
  prop: 'organizationUrl',
  label: '机构网址',
}]
export default {
  props: ['formData', 'isEdit', 'isReadonly', 'isAudit', 'dictGroup', 'selectFiledMap', 'isHideSubmitBtn', 'btnTxt'],
  mixins: [multiplyMixin],
  components: { MutiplyTagSelect, MutiplySelect },
  data () {
    // var checkTitle = (rule, value, callback) => {
    //   const title = this.isEdited ? this.formData.title : undefined
    //   if (!value) {
    //     return callback(new Error('标题不能为空'))
    //   }
    //   validInformationTitle(value).then(res => {
    //     if (title !== value && !res.data.data) {
    //       callback(new Error('标题重复，已存在。'))
    //     } else {
    //       callback()
    //     }
    //   }).catch(() => {
    //     this.msg('不能检查标题是否重复，请检查你的网络链接。', 'error')
    //   })
    // }
    return {
      orgOption,
      disabled: false,
      isEdited: this.isEdit,
      isShow: false,
      loading: false,
      rules: this.isReadonly ? {} : {
        // title: [{ required: true, validator: checkTitle, trigger: 'blur' }],
        text: [{ required: true, message: '请输入政策解读正文' }],
        tagList: [{ type: 'array', required: true, message: '请至少选择或填写3个标签', min: 2, trigger: 'change' }],
        url: [{ required: true, type: 'url', message: '请输入有效的网址 如：https://www.baodu.com', trigger: 'blur' }],
        publishTime: [{ required: true, message: '请选择政策解读时间' }],
        level: [{ required: true, message: '请选择政策层级' }],
        industry: [{ required: true, message: '请选择政策适用行业' }],
        main: [{ required: true, message: '请选择政策解读主体' }],
        theme: [{ required: true, message: '请选择政策主题' }],
        source: [{ required: true, message: '请输入政策解读来源' }],
        summary: [{ required: true, message: '请输入政策摘要' }],
        // regionArr: [{ required: true, message: '请选择政策适用地区' }],
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
      政策依据options: {
        name: '政策',
        labelName: '政策名称',
        labelProp: 'title',
        valueName: '政策ID',
        valueProp: 'id',
        getRequestName: getBasisPage,
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
  filters: {
    dateFormat (time) {
      var date = new Date(time)
      return dateFormat(date, 'yyyy年MM月dd日 hh:mm:ss')
    },
  },
  created () {
    console.log('this.formData => ', this.formData)
  },
  methods: {
    // _processForm (rows) {
    //   rows.target = this.encodeSplitStr(rows.target)
    //   rows.industry = this.encodeSplitStr(rows.industry)
    //   rows.scale = this.encodeSplitStr(rows.scale)
    //   rows.theme = this.encodeSplitStr(rows.theme)
    //   rows.region = this.$refs['region'].currentLabels.join(',')
    //   rows.regionList = []
    // },
    /**
     * 保存并提交
     */
    handleSubmit (formName) {
      this.loading = true
      const submitForm = JSON.parse(JSON.stringify(this.formData))
      submitForm.file = submitForm.attachments ? submitForm.attachments.url : ''
      // this._processForm(submitForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const requestFun = this.isEdited ? putDeclareAndCommit : postDeclareAndCommit
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
      // this.formData.region = this.$refs['region'].currentLabels.join(',')
      // this.formData.regionList = []
      this.formData.theme = this.formData.theme.join(',')
      this.formData.industry = this.formData.industry.join(',')
      this.formData.scale = this.formData.scale.join(',')
      this.formData.mode = this.formData.mode.join(',')
      this.formData.formality = this.formData.formality.join(',')
      this.formData.support = this.formData.support.join(',')
      this.formData.fund = this.formData.fund.join(',')
      this.formData.target = this.formData.target.join(',')
      const submitForm = JSON.parse(JSON.stringify(this.formData))
      submitForm.file = submitForm.attachments ? submitForm.attachments.url : ''
      // this._processForm(submitForm)
      this.$refs[formName].validateField(('title'))
      if (!submitForm.title) {
        this.msg('标题不能为空', 'warning')
        return false
      }

      const requestFun = this.isEdited ? putDeclare : postDeclare
      requestFun(submitForm).then(res => {
        if (!this.isEdited) {
          this.formData.id = res.data.msg ? Number(res.data.msg) : this.formData.id
          this.formData.title = submitForm.title
          this.isEdited = true
        }
        this.submitMessage()
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
  padding-right: 35px;
}
</style>
<style scoped>
.selectclass >>> .el-input {
  width: 170%;
}
.titleItem {
  margin-right: 35px;
}
.summaryItem {
  margin-right: 35px;
}
.tagListItem {
  min-width: 315px;
}
.htmlItem {
  overflow: scroll;
  width: 787px;
  height: 310px;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 3px 15px 10px 15px;
}
</style>


