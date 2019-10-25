
<template>
  <div>
    <basic-container>
      <iep-page-header :title="`${methodName}机构`" :backOption="backOption"></iep-page-header>
      <el-form class="form-detail" :model="form" size="small" ref="form" :rules="rules" label-width="120px">
        <el-form-item class="form-half" label="机构名称：" prop="orgName">
          <el-input v-model="form.orgName"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="机构简称：">
          <el-input v-model="form.orgAbrName"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="社会信用代码：">
          <el-input v-model="form.creditCode"></el-input>
        </el-form-item>
        <el-form-item label="营业执照：" prop="license">
          <iep-avatar v-model="form.license"></iep-avatar>
        </el-form-item>
        <el-form-item label="LOGO：" prop="logo">
          <iep-avatar v-model="form.logo"></iep-avatar>
        </el-form-item>
        <el-form-item class="form-half" label="成立时间：">
          <iep-date-picker v-model="form.createTime" type="date" placeholder="选择日期">
          </iep-date-picker>
        </el-form-item>
        <!-- <el-form-item class="form-half" label="标签：" prop="tagKeyWords">
          <iep-tag v-model="form.tagKeyWords"></iep-tag>
        </el-form-item> -->
        <el-form-item class="form-half" label="机构分类：">
          <el-select v-model="form.type">
            <el-option v-for="(v,k) in dictsMap.type" :key="k+v" :label="v" :value="+k">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-half" label="机构层级：">
          <el-input-number v-model="form.level" :min="1" :max="9"></el-input-number>
        </el-form-item>
        <el-form-item class="form-half" label="行业：">
          <el-select v-model="form.line">
            <el-option v-for="(v,k) in dictGroup['POLICY_INDUSTRY'].map(m=>m.label)" :key="k+v" :label="v" :value="+k">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-half" label="机构官网：">
          <el-input v-model="form.orgUrl"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="联系人：">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="联系电话：">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="传真：">
          <el-input v-model="form.fax"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="邮箱：">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item class="form-half" label="机构住址：">
          <!-- <iep-cascader v-model="form.adress" prefix-url="admin/city" clearable></iep-cascader> -->
          <div style="display:flex;">
            <div style="display:flex;">
              <el-input style="flex:1;" v-model="form.province" placeholder="省"></el-input>
              <el-input style="flex:1;" v-model="form.city" placeholder="市"></el-input>
              <el-input style="flex:3;" v-model="form.address" placeholder="详细地址"></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="机构简介" prop="describe">
          <el-input type="textarea" v-model="form.introduction"></el-input>
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
import { addPage, updatePage, getDetailPage } from '@/api/crms/organization_list'
import { mapGetters } from 'vuex'

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
      preData: {},
      preType: '',
      preLine: '',
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
    isEdit () {
      return this.id !== 0 ? true : false
    },
    methodName () {
      return this.isEdit ? '修改' : '新增'
    },
    ...mapGetters([
      'dictGroup',
    ]),
  },
  methods: {
    loadPage () {
      if (this.isEdit) {
        getDetailPage(this.id).then(({ data }) => {
          const { type, line } = data.data
          this.preType = type
          this.preLine = line
          this.form = this.$mergeByFirst(initForm(), data.data)
          this.form.type = this.dictsMap.type[type]
          this.form.line = this.dictGroup['POLICY_INDUSTRY'][line].label
        })
      }
    },
    async submitForm () {
      if (this.isEdit) {
        if (this.form.type === this.dictsMap.type[this.preType]) this.form.type = this.preType
        if (this.form.line === this.dictGroup['POLICY_INDUSTRY'][this.preLine].label) this.form.line = this.preLine
        const { data } = await updatePage(this.form)
        if (data.data) {
          this.$router.history.go(-1)
        } else {
          this.$message(data.msg)
        }
      } else {
        const { data } = await addPage(this.form)
        if (data.data) {
          this.$router.history.go(-1)
        } else {
          this.$message(data.msg)
        }
      }

    },
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

