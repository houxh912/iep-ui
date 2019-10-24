<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <h3 class="name">上传题</h3>
      <el-form :model="data" ref="data" label-width="70px" class="ti">
        <el-form-item label="标题：" prop="title" :rules="[
          { required: true, message: '标题不能为空'}
        ]">
          <div class="ti2">
            <el-input style="width:250%" v-model="data.title" :maxlength="200"></el-input>
          </div>
        </el-form-item>
      </el-form>
    </template>
    <template v-else>
      <h3 style="margin:8px 0">{{index+". "}}{{data.title}}<span style="color:#DC143C;vertical-align:-2px;" v-if="data.isRequire === '1'">*</span></h3>
      <el-upload class="upload-demo" drag :limit="1" :file-list="data.answer.fileList" action="/api/question/dna_file/upload" :on-success="handleSuccess" :on-error="handleError" :headers="myHeaders" :before-upload="beforeFileUpload" :disabled="disabled">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </template>
  </div>
</template>


<script>
import { getToken } from '@/views/wenjuan/util/auth'
var token = getToken() // 要保证取到
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: () => { },
    },
    type: {
      type: String,
      default: () => 'edit',
    },
    index: {
      type: Number,
      default: () => 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      myHeaders: { Authorization: 'Bearer ' + token },
    }
  },
  created () {
    // this.data.optionList ? "" : this.data.optionList = []
  },
  methods: {
    // handleChange (file, fileList) {
    //   this.$set(this.data.answer.value,"value",fileList)
    // },
    handleSuccess (response) {
      let data = response.data
      //data.newFileName+'-'+'/api/question'+data.url
      this.$set(this.data.answer, 'value', {
        name: data.fileName,
        url: data.url,
      })
    },
    handleError () {
      this.$message.info('上传失败！')
    },
    beforeFileUpload (file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
      }
      return isLt10M
    },
  },
}
</script>
<style lang="scss" scoped>
.title {
  margin: 5px;
  // color: #909399;
  .name {
    margin: 13px 0;
    font-size: 16px;
  }
  .ti {
    display: flex;
    .ti1 {
      font-size: 14px;
      padding: 8px;
    }
    .ti2 {
      flex: 1;
    }
  }
  span {
    margin: 0px 10px 0 0;
  }
}
.mg10 {
  margin: 10px 0;
}
.textIn {
  border: none;
  width: 100px;
}
.curP {
  cursor: pointer;
}
</style>
