<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <h3 class="name">图片单选题</h3>
      <el-form :model="data" ref="data" label-width="70px" class="ti">
        <el-form-item label="标题：" prop="title" :rules="[
          { required: true, message: '标题不能为空'}
        ]">
          <div class="ti2">
            <el-input style="width:250%" v-model="data.title" :maxlength="200"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div class="ti">
        <div class="ti1">选项：</div>
        <div class="ti2">
          <div class="imgs">
            <div class="img" v-for="(file,index) in data.optionList" :key="index">
              <img :src="file.url" />
              <el-input style="width:130px;border:none;text-align:center" size="mini" placeholder="图片说明" v-model="file.description" :maxlength="200"></el-input>
              <i class="delete el-icon-delete" @click="handleDelete(index)"></i>
            </div>
            <div class="img">
              <el-upload class="upload-demo" action="/api/question/dna_file/upload" :on-preview="handlePreview" :on-remove="handleRemove" :headers="myHeaders" :file-list="data.optionList" :on-success="handleSuccess" :on-error="handleError" :before-upload="beforeImgUpload" :show-file-list="false" list-type="picture-card">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="(disabled||data.isShow == '1') ? true : false">
        <h3 :id="'a'+data.orderNumber" :name="'a'+data.orderNumber" style="margin:8px 0">{{(data.orderNumber||index)+". "}}{{data.title}}<span style="color:#DC143C;vertical-align:-2px;" v-if="data.isRequire === '1'">*</span></h3>
        <el-radio-group v-model="data.answer.value" :disabled="disabled">
          <div class="imgDiv" v-for="(item,index) in data.optionList" :key="index">
            <el-radio :label="item.name">
              <p>{{item.description}}</p>
              <img :src="item.url" />
            </el-radio>
          </div>
        </el-radio-group>
      </div>
    </template>
  </div>
</template>


<script>
/*eslint-disable*/
import store from '@/store'
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: () => { },
    },
    type: {
      type: String,
      default: () => "edit",
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
      myHeaders: { Authorization: 'Bearer ' + store.getters.access_token },
    }
  },
  created () {
    // this.data.optionList ? "" : this.data.optionList = []
  },
  watch: {
    'data.answer.value': {
      deep: true,
      handler (val) {
        if (!this.disabled && val && this.data.logic != "{}") {
          let logic = JSON.parse(this.data.logic)
          if (logic.type === 'jump') {
            for (let item of logic.logic) {
              if (val == item.source) {
                window.location.hash = "#a" + item.target
              }
            }
          }
          if (logic.type === 'display') {
            let targetShow = []
            let targetHidden = []
            let allTaget = []
            logic.logic.map(item => {
              allTaget.push(...item.target)
            })
            for (let item of logic.logic) {
              if (val == item.source) {
                targetShow.push(...item.target)
              }
            }
            targetHidden = allTaget.filter(item => !(targetShow.indexOf(item) > -1))
            this.$emit("changeDisplay", targetShow, "1")
            this.$emit("changeDisplay", targetHidden, "2")
          }
        }
      },
    },
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file, fileList) {
      console.log("改变了", file, fileList)
      // let newFileList = []
      // fileList.map((item)=>{
      //   newFileList.push({
      //     description: item.description,
      //     url: item.url,
      //     name: item.name,
      //     type: 1,
      //     // status: item.status,
      //   })
      // })
      // this.$set(this.data,"optionList",newFileList)
    },
    handleSuccess (response, file, fileList) {
      let data = response.data
      let newfile = {
        description: data.description,
        url: data.url,
        name: data.fileName,
        type: 1,
      }
      this.data.optionList.push(newfile)
      console.log("上传成功！", data)
    },
    handleError () {
      this.$message.info("上传失败！")
    },
    handleDelete (index) {
      let fileList = [...this.data.optionList]
      fileList.splice(index, 1)
      this.$set(this.data, "optionList", fileList)
    },
    beforeImgUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG,PNG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return (isJPG || isPNG) && isLt10M
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
.imgs {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .img {
    width: 150px;
    height: 200px;
    padding-top: 15px;
    img {
      height: 150px;
      width: 150px;
      border: 1px solid;
    }
  }
}
.delete {
  vertical-align: -2px;
  margin-left: 3px;
  cursor: pointer;
}
.mh100 {
  min-height: 100px;
  line-height: 57px;
}
.imgDiv {
  width: 150px;
  height: 200px;
  float: left;
  margin-right: 15px;
  position: relative;
  p {
    position: absolute;
    top: 157px;
    width: 150px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  img {
    width: 150px;
    height: 150px;
    border: 1px solid;
    position: absolute;
    left: 0;
    top: 0;
  }
  .se {
    width: 150px;
    text-align: center;
  }
  > .el-radio__input {
    position: absolute;
    top: 184px;
    left: 67px;
  }
  > .el-checkbox__label {
    padding-left: 0;
  }
  > .el-checkbox__input {
    position: absolute;
    top: 184px;
    left: 67px;
  }
}
</style>
