<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="hover">
      <div slot="header" class="title">
        <span>{{methodName}}指示</span>
      </div>
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <el-form-item label="主题：" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="内容：" required>
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="属性：" required>
          <el-checkbox label="不允许评论" name="type" v-model="checked"></el-checkbox>
        </el-form-item>
        <el-form-item class="object-con" label="对象：" required>
          <!-- <el-button class="object">杨冰之<i class="iconfont icon-shanchu1"></i></el-button>
          <el-button class="object">杨冰之<i class="iconfont icon-shanchu1"></i></el-button>
          <el-input class="input-name" placeholder="请输入名字" v-model="input4">
            <template slot="append">添加</template>
          </el-input>
          <el-button class="add"><i class="iconfont icon-renwuzengjia"></i></el-button> -->
          <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
          <el-button class="add"><i class="iconfont icon-renwuzengjia"></i></el-button>
        </el-form-item>
        <el-form-item label="">
          <iep-button type="primary" @click="handleSubmit">发布</iep-button>
          <iep-button>取消</iep-button>
        </el-form-item>
      </el-form>
    </el-card>
    <footer-tool-bar>
      <iep-button @click="handleGoBack">返回</iep-button>
    </footer-tool-bar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getTalentPoolById } from '@/api/hrms/talent_pool'
import FooterToolBar from '@/components/FooterToolbar'
import { initForm, workExpColumns, studyColumns, trainingColumns, certificateColumns } from '../options'
import { mergeByFirst } from '@/util/util'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  components: { FooterToolBar },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      certificateColumns,
      trainingColumns,
      studyColumns,
      workExpColumns,
      activeNames: ['1'],
      methodName: '新增',
      form: initForm(),
      formRequestFn: () => { },
      checked: true,
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
  },
  created () {
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.id) {
      getTalentPoolById(this.id).then(({ data }) => {
        this.form = mergeByFirst(initForm(), data.data)
      })
    }
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(
        this.$refs.saveTagInput.$refs.input.focus())
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
  },
}
</script>
<style scoped>
.edit-wrapper >>> .el-collapse-item__wrap {
  padding: 30px 70px 0 70px;
  border: none;
}
.edit-wrapper >>> .el-collapse {
  border: none;
}
.edit-wrapper >>> .el-collapse-item__header {
  background-color: #f8f8f8;
  font-size: 15px;
  font-weight: 700;
  padding-left: 20px;
  margin: 5px;
  border-radius: 5px;
  border: none;
}
.object-con >>> .el-form-item__content {
  display: flex;
  justify-content: flex-start;
}
</style>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag,
.add {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 140px;
  margin-left: 10px;
  vertical-align: bottom;
}
.edit-wrapper {
  margin: 5px 5px 50px 5px;
  .el-form {
    margin-right: 20%;
    margin-top: 50px;
  }
  .edit-card {
    .title {
      font-weight: 600;
      font-size: 16px;
    }
    .object {
      position: relative;
      margin: 0 15px 10px 0;
      height: 32px;
      font-size: 14px;
      i {
        position: relative;
        top: 0;
        right: 0;
        display: inline-block;
        margin-left: 5px;
        padding: 2px;
        font-size: 12px;
        text-align: center;
        background: none;
        border-radius: 50%;
        -webkit-transition: all 0.8s ease-out;
      }
    }
    .input-name {
      margin: 0 15px 10px 0;
      max-width: 260px;
    }
    .add {
      height: 32px;
      i {
        font-size: 20px;
      }
    }
  }
}
</style>
