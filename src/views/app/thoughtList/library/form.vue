<template>
  <div class="head">
    <el-form :model="formData" :rules="rules" ref="form" label-width="0px" class="input">
      <el-form-item class="item-content" prop="content">
        <el-input @click.native="handleCancal" id="keyupStart" ref="content" type="textarea" rows="5" :placeholder="subjectPlaceholder" v-model="formData.content" class="textarea" maxlength="1000" @keyup.native="handleKeyup"></el-input>
        <div class="yincang">
          {{formData.content}}
          <el-autocomplete
            ref="autocomplete"
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
            placement="top-end"
          ></el-autocomplete>
        </div>
      </el-form-item>
      <div class="img-list" v-if="formData.images.length > 0">
        <div v-for="(item, index) in formData.images" :key="index" class="avatar">
          <div class="close" @click="handleDeleteImage(index)"><i class="el-icon-close"></i></div>
          <iep-img :src="item"></iep-img>
        </div>
        <el-upload
          v-if="formData.images.length < 9"
          class="avatar-uploader"
          action="/api/admin/file/upload/avatar"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          accept="image/*"
          ref="upload">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="button-list">
        <div class="func" @click="handleImage" v-if="formData.images.length === 0 && transmitId === -1">
          <el-upload
            action="/api/admin/file/upload/avatar"
            :show-file-list="false"
            :headers="headers"
            :on-success="handleAvatarSuccess"
            accept="image/*"
            :before-upload="beforeUpload"
            ref="upload">
            <div class="func"><i class="icon-tupian"></i><p>图片</p></div>
          </el-upload>
        </div>
        <div class="func" v-if="formData.images.length > 0 && transmitId === -1">
          <i class="icon-tupian"></i><p>图片</p>
        </div>
        <div class="func" @click="handleAnt">
          <i class="symbol">@</i><p>提醒</p>
        </div>
        <div class="func" @click="handleSubject">
          <i class="symbol">#</i><p>话题</p>
        </div>
        <div class="label">
          <label>说说标签：</label>
          <iep-tag v-model="formData.tags"></iep-tag>
        </div>
        <iep-button type="primary" class="submit" @click="handleSubmit('form')" :loading="loadState">发布</iep-button>
      </div>
      <div class="button-list">
        <div class="switch">
          <p>是否开放：</p>
          <el-radio-group v-model="formData.status">
            <el-radio :label="item.value" v-for="(item, index) in dictMaps.status" :key="index">{{item.label}}</el-radio>
          </el-radio-group>
          <!-- <el-switch
            class="el-switch"
            v-model="formData.status"
            active-color="#13ce66"
            inactive-color="#bbb"
            :active-value="0"
            :inactive-value="1">
          </el-switch> -->
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { thoughtsCreate } from '@/api/cpms/thoughts'
import { addBellBalanceRuleByNumber } from '@/api/fams/balance_rule'
import store from '@/store'
import { getSubjectList, getName } from './util'
import keyup from './keyup'
import { uploadIdCard } from '@/api/file'
import image from '@/mixins/image'

var initForm = () => {
  return {
    content: '',
    status: 0,
    images: [],
    tags: [],
  }
}

const dictMaps = {
  status: [
    {
      label: '生态开放',
      value: 0,
    }, {
      label: '不开放',
      value: 1,
    }, {
      label: '对组织开放',
      value: 2,
    }, {
      label: '对联盟开放',
      value: 3,
    },
  ],
}

const rules = {
  content: { required: true, message: '必填', trigger: 'change' },
}

export default {
  mixins: [ keyup, image ],
  props: {
    subject: {
      type: String,
      default: '',
    },
    transmitId: {
      type: Number,
      default: -1,
    },
  },
  data () {
    return {
      subjectPlaceholder: '工作之余，分享下今天的感受吧~',
      formData: initForm(),
      rules,
      limit: 3,
      loadState: false,
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      dictMaps,
    }
  },
  methods: {
    handleAvatarSuccess (row) {
      this.formData.images.push(row.data.url)
    },
    // 上传图片
    handleImage () {
      this.$refs['upload'].submit()
    },
    resetForm () {
      this.formData = initForm()
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    handleDeleteImage (index) {
      this.formData.images.splice(index, 1)
    },
    handleSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadState = true
          // 判断是否是转发
          if (this.transmitId > -1) {
            this.formData.transmitId = this.transmitId
          }
          // 判断说说中是否存在话题
          let subjectObj = getSubjectList(this.formData.content)
          if (subjectObj.type) {
            this.formData.topics = subjectObj.list.map(m => m.name)
          }
          // 判断说说中是否存在人名
          let nameObj = getName(this.formData.content)
          if (nameObj.type) {
            this.formData.nameList = nameObj.list.map(m => m.name)
          }
          thoughtsCreate(this.formData).then(({ data }) => {
            if (data.data) {
              // 判断是否公开，不公开(1)的说说没有奖励
              if (this.formData.status === 1) {
                this.resetForm()
                this.loadState = false
                this.$emit('load-page')
              } else {
                addBellBalanceRuleByNumber('SHUOSHUO').then(({data}) => {
                  this.resetForm()
                  this.$message.success(`恭喜您发表了一篇说说，${data.msg}，继续努力`)
                  this.loadState = false
                  this.$emit('load-page')
                })
              }
            } else {
              this.loadState = false
              this.$message.error(data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    isSubject () {
      let subject = ''
      if (this.subject) {
        subject = this.subject
      } else {
        subject = '工作之余，分享下今天的感受吧~'
      }
      this.subjectPlaceholder = subject
      initForm = () => {
        return {
          content: this.subject,
          status: 0,
          images: [],
          tags: [],
        }
      }
      this.formData = initForm()
    },
    // 图片上传前回调
    beforeUpload (file) {
      this.imgPreview(file)
      return false
    },
    // 图片的真正上传
    imageUpload (file) {
      // 此时可以自行将文件上传至服务器
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      uploadIdCard(file, config).then(({ data }) => {
        console.log('data: ', data)
        this.formData.images.push(data.data.url)
      })
    },
  },
  created () {
    this.isSubject()
  },
  watch: {
    subject () {
      this.isSubject()
    },
  },
}
</script>

<style lang="scss" scoped>
.head {
  text-align: center;
  .input {
    width: 100%;
    margin: auto;
    .img-list {
      display: flex;
      flex-wrap: wrap;
      .avatar-uploader {
        display: inline-block;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader:hover {
        border-color: #409EFF;
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
        position: relative;
        margin-right: 20px;
        .close {
          position: absolute;
          z-index: 100;
          right: -10px;
          top: -10px;
          width: 20px;
          height: 20px;
          font-size: 20px !important;
          background-color: #ddd;
          color: #fff;
          border-radius: 50%;
          line-height: 18px;
          cursor: pointer;
          &:hover {
            color: #fff;
            background-color: #e27474;
          }
        }
      }
    }
    .textarea {
      margin-bottom: 15px;
    }
    .button-list {
      position: relative;
      display: flex;
      padding: 0 0 10px;
      .func {
        display: flex;
        cursor: pointer;
        .symbol {
          font-size: 16px;
        }
        p {
          margin: 0 35px 0 5px;
        }
      }
      .switch {
        display: flex;
        padding-top: 4px;
        p {
          line-height: 18px;
          margin: 0;
        }
      }
      .label {
        margin-left: 25px;
        max-width: 600px;
        min-width: 320px;
        display: flex;
        text-align: left;
        label {
          line-height: 26px;
          width: 110px;
        }
      }
      .submit {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.item-content {
  position: relative;
  height: 120px;
}
.item-content .textarea {
  position: absolute;
  height: 120px;
  top: 0;
  left: 0;
  z-index: 10;
}
.yincang {
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
  opacity: 0;
  z-index: 0;
}
</style>
<style scoped>
.yincang >>> .el-input__inner {
  /* width: 10px; */
  padding: 0;
}
.yincang >>> .el-autocomplete {
  width: 160px;
}
</style>

