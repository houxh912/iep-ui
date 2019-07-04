<template>
  <!-- <iep-dialog :dialog-show="dialogShow" :title="`${methodName}政策资讯`" width="500px" @close="loadPage"> -->
  <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="120px">
    <el-form-item label="标题" class="inputclass" prop="title">
      <el-input v-model="formData.title" maxlength="255" :readonly="isReadonly"></el-input>
    </el-form-item>

    <el-form-item label="标签" prop="tagList">
      <mutiply-tag-select v-model="formData.tagList" :selectObjs="formData.tagsList" v-if="!isReadonly"></mutiply-tag-select>
      <el-select style="width:96.5%" v-model="formData.tagList" multiple disabled v-else>
        <el-option v-for="item in formData.tagsList" :key="item.commonId" :label="item.commonName" :value="item.commonId">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="发布时间" class="formWidth" prop="publishTime">
      <el-date-picker type="date" placeholder="选择日期" v-model="formData.publishTime" value-format="timestamp" format="yyyy年M月d号" :disabled="isReadonly">{{formData.publishTime | dateFormat}}</el-date-picker>
    </el-form-item>

    <el-form-item label="来源" class="formWidth" prop="source">
      <el-input v-model="formData.source" :readonly="isReadonly"></el-input>
    </el-form-item>

    <el-form-item label="原文链接" class="formWidth" prop="url">
      <el-input v-model="formData.url" placeholder="http://或者https://" :readonly="isReadonly">
        <el-button slot="append" icon="el-icon-view" @click="handleOpenLink"></el-button>
      </el-input>
    </el-form-item>

    <el-form-item label="适用地区" class="formWidth cascaderclass" prop="regionArr">
      <el-cascader :options="options" :props="props" v-model="formData.regionArr" ref="region" clearable change-on-select :disabled="isReadonly"></el-cascader>
    </el-form-item>

    <el-form-item label="优先级" class="formWidth" prop="priority">
      <el-input-number v-model="formData.priority" :min="1" :max="5" :disabled="isReadonly"></el-input-number>
    </el-form-item>

    <el-form-item label="摘要" class="textoneclass" prop="summary">
      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入摘要内容" v-model="formData.summary" :readonly="isReadonly">
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
      <!-- <el-button type="primary" :loading="loading" @click="handleSubmit('form')" v-if="!isReadonly && !isHideSubmitBtn && !isAudit && isShow">保存并提交</el-button> -->
      <el-button type="primary" plain @click="$emit('hideDialog', false)" v-else>关闭</el-button>
    </el-form-item>

  </el-form>
  <!-- </iep-dialog> -->
</template>

<script>
import mixins from '@/mixins/mixins'
import { region } from '../region'
import { dateFormat } from '@/util/date'
import MutiplyTagSelect from '@/components/deprecated/mutiply-tag-select'
import { postInformation, putInformation, postInformationAndCommit, putInformationAndCommit } from '@/api/govdata/information'
//import { validInformationTitle } from '@/api/govdata/information'
export default {
  props: ['formData', 'isEdit', 'isReadonly', 'isAudit', 'isHideSubmitBtn'],
  mixins: [mixins],
  components: { MutiplyTagSelect },
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
      isShow: false,
      isEdited: this.isEdit,
      loading: false,
      rules: this.isReadonly ? {} : {
        // title: [{ required: true, validator: checkTitle, trigger: 'blur' }],
        summary: [{ required: true, message: '请输入政策资讯摘要' }, { max: 200, message: '字数不超过200字', trigger: 'blur' }],
        text: [{ required: true, message: '请输入政策资讯正文' }],
        url: [{ required: true, max: 200, type: 'url', message: '请输入有效的网址 如：https://www.baodu.com', trigger: 'blur' }],
        tagList: [{ type: 'array', required: true, message: '请至少选择或填写3个标签', min: 3, trigger: 'change' }],
        publishTime: [{ required: true, message: '请选择发布时间' }],
        source: [{ required: true, message: '请输入政策来源' }],
        regionArr: [{ required: true, message: '请选择政策适用地区' }],
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
  methods: {
    /**
     * 提交保存
     */
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

<style  scoped>
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
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 351px;
}
.textoneclass >>> .el-textarea {
  width: 97% !important;
}
.texttwoclass >>> #app {
  width: 97%;
}
.cascaderclass >>> .el-input {
  width: 169%;
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

