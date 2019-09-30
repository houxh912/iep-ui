<template>
  <!-- <iep-dialog :dialog-show="dialogShow" :title="`${methodName}政策资讯`" width="500px" @close="loadPage"> -->
  <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="120px" :class="isReadonly ? 'readonly-form' : ''">
    <el-form-item label="标题" class="inputclass" prop="title">
      <el-input v-model="formData.title" :readonly="isReadonly"></el-input>
    </el-form-item>

    <el-form-item label="标签" prop="tagList">
      <mutiply-tag-select v-model="formData.tagList" :selectObjs="formData.tagsList" v-if="!isReadonly"></mutiply-tag-select>
      <el-select style="width:96.5%" v-model="formData.tagList" multiple disabled v-else>
        <el-option v-for="item in formData.tagsList" :key="item.commonId" :label="item.commonName" :value="item.commonId">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="点击量" class="formWidth" prop="views">
      <el-input-number v-model.number="formData.views" :min="1" :disabled="isReadonly"></el-input-number>
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

    <el-form-item label="发文时间" class="formWidth" prop="publishTime">
      <el-date-picker type="time" placeholder="选择日期" v-model="formData.publishTime" value-format="timestamp" format="yyyy年M月d号" :disabled="isReadonly">{{formData.publishTime | dateFormat}}</el-date-picker>
    </el-form-item>

    <el-form-item label="发文单位" class="formWidth" prop="dispatchList">
      <mutiply-select v-model="formData.dispatchList" :selectObjs="formData.dispatchsList" :options="单位options" :otherProps="orgOption" v-if="!isReadonly"></mutiply-select>
      <el-select class="selectclasss" v-model="formData.dispatchList" multiple disabled v-else>
        <el-option v-for="item in formData.dispatchsList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="联合发文单位" class="formWidth">
      <mutiply-select v-model="formData.unionList" :selectObjs="formData.unionsList" :options="单位options" :otherProps="orgOption" v-if="!isReadonly"></mutiply-select>
      <el-select class="selectclasss" v-model="formData.unionList" multiple disabled v-else>
        <el-option v-for="item in formData.unionsList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <!-- <el-form-item label="生效时间" class="formWidth" prop="effectTime">
      <el-date-picker type="date" placeholder="选择日期" v-model="formData.effectTime" value-format="yyyy-M-d HH:mm:ss" format="yyyy年M月d号" :disabled="isReadonly"></el-date-picker>
    </el-form-item>

    <el-form-item label="失效时间" class="formWidth" prop="invalidTime">
      <el-date-picker type="date" placeholder="选择日期" v-model="formData.invalidTime" value-format="yyyy-M-d HH:mm:ss" format="yyyy年M月d号" :disabled="isReadonly"></el-date-picker>
    </el-form-item> -->

    <el-form-item class="formWidth selectclasss" :label="key" v-for="(value, key) in selectFiledMap" :key="key" :prop="value.formText">
      <el-select v-model="formData[value.formText]" :placeholder="`请选择${key}`" :multiple="value.multiple" :disabled="isReadonly">
        <el-option v-for="item in dictGroup[value.dictText]" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="适用地区" class="formWidth cascaderclass" prop="regionArr">
      <el-cascader :options="options" :props="props" v-model="formData.regionArr" ref="region" clearable change-on-select :disabled="isReadonly"></el-cascader>
    </el-form-item>

    <el-form-item label="摘要" class="textoneclass" prop="summary">
      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入摘要内容" v-model="formData.summary" maxlength="1000" :readonly="isReadonly">
      </el-input>
    </el-form-item>

    <el-form-item label="正文" class="texttwoclass" v-if="!isReadonly">
      <iep-froala-editor v-model="formData.text"></iep-froala-editor>
    </el-form-item>

    <el-form-item label="正文" v-if="isReadonly">
      <div class="html">
        <iep-html v-model="formData.text"></iep-html>
      </div>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="$emit('onAudit', formData)" v-if="isAudit">审核</el-button>
      <el-button type="primary" :loading="loading" @click="handleTempSave('form')" v-if="!isReadonly || isAudit">提交</el-button>
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
import { postGeneral, putGeneral, postGeneralAndCommit, putGeneralAndCommit } from '@/api/govdata/general_policy'
//import { validGeneralTitle } from '@/api/govdata/general_policy'
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
  props: ['formData', 'isEdit', 'isReadonly', 'isAudit', 'dictGroup', 'selectFiledMap', 'isHideSubmitBtn'],
  mixins: [multiplyMixin],
  components: { MutiplyTagSelect, MutiplySelect },
  data () {
    // const checkTitle = (rule, value, callback) => {
    //   const title = this.isEdited ? this.formData.title : undefined
    //   if (!value) {
    //     return callback(new Error('标题不能为空'))
    //   }
    //   validGeneralTitle({ title: value }).then(res => {
    //     if (title !== value && !res.data.data) {
    //       callback(new Error('标题重复，已存在。'))
    //     } else {
    //       callback()
    //     }
    //   }).catch(() => {
    //     this.msg('不能检查标题是否重复，请检查你的网络链接。', 'error')
    //   })
    // }
    const allRules = {
      //title: [{ required: true, validator: checkTitle, trigger: 'blur' }],
      text: [{ required: true, message: '请输入通用政策正文' }],
      summary: [{ required: true, message: '请输入通用政策摘要' }],
      url: [{ type: 'url', message: '请输入有效的网址 如：https://www.baodu.com', trigger: 'blur' }],
      tagList: [{ type: 'array', required: true, message: '请至少选择或填写3个标签', min: 3, trigger: 'change' }],
      source: [{ required: true, message: '请输入政策来源' }],
      dispatchList: [{ type: 'array', required: true, message: '请至少选择一个发文单位', trigger: 'change' }],
      publishTime: [{ required: true, message: '请选择发文时间' }],
      generalLevel: [{ required: true, message: '请选择政策层级' }],
      generalStage: [{ required: true, message: '请选择政策阶段状态' }],
      generalFormality: [{ required: true, message: '请选择发文形式' }],
      target: [{ required: true, message: '请选择政策适用对象' }],
      theme: [{ required: true, message: '请选择政策主题' }],
      industry: [{ required: true, message: '请选择政策适用行业' }],
      scale: [{ required: true, message: '请选择政策适用规模' }],
      regionArr: [{ required: true, message: '请选择政策适用地区' }],
    }
    return {
      isShow: false,
      isEdited: this.isEdit,
      disabled: false,
      loading: false,
      orgOption,
      addressData: [],
      rules: this.isReadonly ? {} : allRules,
      单位options: {
        name: '单位',
        labelName: '单位名称',
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

  },
  methods: {
    _processForm (rows) {
      rows.target = this.encodeSplitStr(rows.target)
      rows.industry = this.encodeSplitStr(rows.industry)
      rows.scale = this.encodeSplitStr(rows.scale)
      rows.theme = this.encodeSplitStr(rows.theme)
      rows.region = this.$refs['region'].currentLabels.join(',')
      rows.regionList = []
    },

    /**
     * 提交
     */
    handleSubmit (formName) {
      this.loading = true
      const submitForm = JSON.parse(JSON.stringify(this.formData))
      submitForm.file = submitForm.attachments ? submitForm.attachments.url : ''
      this._processForm(submitForm)

      this.$refs[formName].validate((valid) => {
        if (valid) {
          const requestFun = this.isEdited ? putGeneralAndCommit : postGeneralAndCommit
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
     * 验证标题是否重复
     * 默认的验证规则跟新开发的暂存和提交审核有冲突
     */
    // async validTitle (title) {
    //   const { data } = await validGeneralTitle(title)
    //   if (this.defaultTitle !== title && !data.data) {
    //     this.msg('标题重复，已存在。', 'warning')
    //     this.disabled = true
    //   } else {
    //     this.disabled = false
    //   }
    // },


    /**
     * 暂存
     */
    async handleTempSave (formName) {
      this.loading = true
      const submitForm = JSON.parse(JSON.stringify(this.formData))
      submitForm.file = submitForm.attachments ? submitForm.attachments.url : ''
      this._processForm(submitForm)

      this.$refs[formName].validateField(('title'))
      if (!submitForm.title) {
        this.msg('标题不能为空', 'warning')
        return false
      }

      const requestFun = this.isEdited ? putGeneral : postGeneral
      requestFun(submitForm).then(res => {
        if (!this.isEdited) {
          this.formData.id = res.data.msg ? Number(res.data.msg) : this.formData.id
          this.formData.title = submitForm.title
          this.isEdited = true
        }
        // this.msg('保存成功!', 'success')
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
<style scoped>
.el-form-item--small.el-form-item {
  margin-left: -15px;
}
.formWidth {
  display: inline-block;
  width: 50%;
}
.inputclass >>> .el-input {
  width: 96.5%;
}
.textoneclass >>> .el-textarea {
  width: 97%;
}
.texttwoclass >>> #app {
  width: 97%;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 353px;
}
.selectclasss >>> .el-input {
  width: 170%;
}
.el-select__tags >>> .style {
  width: 170%;
}
.cascaderclass >>> .el-input {
  width: 169%;
}
.tagselected >>> .el-input {
  width: 168%;
}
.html {
  margin-right: 24px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
.html >>> .fr-view[data-v-5eb9c662] {
  padding: 10px;
  resize: vertical;
  color: #000;
  overflow-x: auto;
}
</style>
