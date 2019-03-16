<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="hover">
      <div slot="header" class="title">
        <span>新建黑名单简历</span>
      </div>
      <el-form ref="form" :model="form" label-width="140px" size="small">
        <el-form-item label="姓名：" class="form-half">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别：" class="form-half">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="头像：" class="">
          <el-input v-model="form.avatar"></el-input>
        </el-form-item>
        <el-form-item label="出生年月：" class="form-half">
          <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="年龄：" class="form-half">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="外部头衔：" class="form-half">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="联系手机：" class="form-half">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" class="form-half">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="身高：" class="form-half">
          <el-input v-model="form.height"></el-input>
        </el-form-item>
        <el-form-item label="体重：" class="form-half">
          <el-input v-model="form.weight"></el-input>
        </el-form-item>
        <el-form-item label="民族：" class="form-half">
          <el-input v-model="form.nation"></el-input>
        </el-form-item>
        <el-form-item label="籍贯：" class="form-half">
          <iep-cascader v-model="form.cities" prefix-url="admin/city"></iep-cascader>
        </el-form-item>
        <el-form-item label="现住地址：">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌：" class="form-half">
          <el-select v-model="form.politics" placeholder="请选择">
            <el-option v-for="item in dictGroup['hrms_politics_face']" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="健康状况：" class="form-half">
          <el-input v-model="form.health"></el-input>
        </el-form-item>
        <el-form-item label="婚姻状况：" class="form-half">
          <el-select v-model="form.marriage" placeholder="请选择">
            <el-option v-for="item in dictGroup['hrms_marriage_status']" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生育状况：" class="form-half">
          <el-select v-model="form.bear" placeholder="请选择">
            <el-option v-for="item in dictGroup['hrms_birth_status']" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="毕业学校：" class="form-half">
          <el-input v-model="form.university"></el-input>
        </el-form-item>
        <el-form-item label="最高学历：" class="form-half">
          <el-select v-model="form.education" placeholder="请选择">
            <el-option v-for="item in dictGroup['hrms_highest_educational']" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工关系：" class="form-half">
          <el-input v-model="form.relation"></el-input>
        </el-form-item>
        <el-form-item label="推荐人：" class="form-half">
          <el-input v-model="form.referrer"></el-input>
        </el-form-item>
        <el-form-item label="应聘渠道：" class="form-half">
          <el-select v-model="form.appWay" placeholder="请选择">
            <el-option v-for="item in dictGroup['hrms_app_way']" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拉黑地区：" class="form-half">
          <el-input v-model="form.blacklistArea"></el-input>
        </el-form-item>
        <el-form-item label="拉黑原因：">
          <el-input v-model="form.blacklistReasons"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <footer-tool-bar>
      <iep-button type="info" @click="handleGoBack">返回</iep-button>
      <iep-button type="primary" @click="handleSubmit">提交</iep-button>
    </footer-tool-bar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getTalentPoolById } from '@/api/hrms/talent_pool'
import FooterToolBar from '@/components/FooterToolbar'
import { initForm, formToDto } from '../options'
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
      methodName: '新增',
      form: initForm(),
      formRequestFn: () => { },
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
    handleSubmit () {
      this.formRequestFn(formToDto(this.form)).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: `黑名单${this.methodName}成功`,
            type: 'success',
          })
          this.$emit('onGoBack')
        }
      })
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
</style>

<style lang="scss" scoped>
.edit-wrapper {
  margin: 5px 5px 50px 5px;
  .form-half {
    width: 50%;
    display: inline-block;
  }
  .edit-card {
    .title {
      font-weight: 600;
    }
  }
}
</style>
