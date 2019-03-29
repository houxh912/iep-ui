<template>
  <basic-container>
    <div class="edit-wrapper">
      <el-card class="edit-card" shadow="hover">
        <div slot="header" class="title">
          <span>{{methodName}}开票通知</span>
        </div>
        <el-form ref="form" :model="form" label-width="120px" size="small">
          <h4 class="sub-title">购买方信息</h4>
          <el-col :span="12">
            <el-form-item label="名称：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税人识别号：">
              <el-input v-model="form.num1"></el-input>
            </el-form-item>
          </el-col>
          <el-form-item label="地址：">
            <el-input v-model="form.add"></el-input>
          </el-form-item>
          <el-col :span="12">
            <el-form-item label="电话号码：">
              <el-col :span="6">
                <el-input v-model="form.subNum"></el-input>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="16">
                <el-input v-model="form.num"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户行及账户：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-form-item label="发票邮寄地址：">
            <el-input v-model="form.add2"></el-input>
          </el-form-item>
          <h4 class="sub-title">货物或应税劳务、服务名称</h4>
          <el-col :span="12">
            <el-form-item label="名称：">
              <el-select v-model="form.name2" placeholder="请选择">
                <el-option label="名称一"></el-option>
                <el-option label="名称二"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税率：">
              <el-input v-model="form.num1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位：">
              <el-input v-model="form.unit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金额：">
              <el-input v-model="form.sum"></el-input>
            </el-form-item>
          </el-col>
          <el-form-item label="关联项目：">
            <el-input v-model="input4">
              <template slot="append" class="add" :on-preview="handlePreview">
                <el-upload class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess">
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </template>
            </el-input>
          </el-form-item>
          <h4 class="sub-title">销售方</h4>
          <el-col :span="12">
            <el-form-item label="纳税人识别号：">
              <span>9133050333322111MA</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话：">
              <span>0571-85668888</span>
            </el-form-item>
          </el-col>
          <el-form-item label="地址：">
            <span>杭州西湖区</span>
          </el-form-item>
          <el-form-item label="开户行及账号：">
            <span>中国建设银行杭州西湖支行</span><span class="num">63332222222222222222</span>
          </el-form-item>
          <el-form-item label="经营范围：">
            <span>电子商务技术开发，船舶电子商务平台建设，电子商务技术开发，船舶电子商务平台建设，电子商务技术开发，船舶电子商务平台建设，电子商务技术开发，船舶电子商务平台建设</span>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input placeholder="请输入备注" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="">
            <iep-button type="primary" @click="handleSubmit">提交</iep-button>
            <iep-button>存为草稿</iep-button>
            <iep-button>取消</iep-button>
          </el-form-item>
        </el-form>
      </el-card>
      <footer-tool-bar>
        <iep-button @click="handleGoBack">返回</iep-button>
      </footer-tool-bar>
    </div>
  </basic-container>
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
      input4: '',
      certificateColumns,
      trainingColumns,
      studyColumns,
      workExpColumns,
      activeNames: ['1'],
      methodName: '新增',
      form: initForm(),
      formRequestFn: () => { },
      checked: true,
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
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    handleSubmit () { },
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
.edit-wrapper {
  .sub-title {
    margin-bottom: 10px;
    font-weight: 700;
  }
  .line {
    text-align: center;
  }
  .add {
    cursor: pointer;
  }
  .num {
    margin-left: 10px;
  }
}
.el-button + .el-button {
  margin-left: 10px;
}
.edit-wrapper {
  margin: 5px 5px 50px 5px;
  .el-form {
    margin-right: 20%;
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
      margin: 0 15px 10px 0;
      height: 32px;
      i {
        font-size: 20px;
        line-height: 12px;
      }
    }
  }
}
</style>
