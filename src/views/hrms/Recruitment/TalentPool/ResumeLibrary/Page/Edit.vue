<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="hover">
      <div slot="header" class="title">
        <span>新增简历</span>
      </div>
      <el-form ref="form" :model="form" label-width="140px" size="small">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <i class="header-icon el-icon-info"></i> 基础信息
            </template>
            <el-form-item label="姓名：" class="form-half">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别：" class="form-half">
              <el-radio-group v-model="form.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="头像：" class="">
              <el-input v-model="form.avatar"></el-input>
            </el-form-item>
            <el-form-item label="出生年月：" class="form-half">
              <el-input v-model="form.birthday"></el-input>
            </el-form-item>
            <el-form-item label="外部头衔：" class="form-half">
              <el-input v-model="form.rank"></el-input>
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
              <el-input v-model="form.national"></el-input>
            </el-form-item>
            <el-form-item label="籍贯：" class="form-half">
              <el-input v-model="form.palce"></el-input>
            </el-form-item>
            <el-form-item label="现住地址：">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="政治面貌：" class="form-half">
              <el-input v-model="form.face"></el-input>
            </el-form-item>
            <el-form-item label="健康状况：" class="form-half">
              <el-select v-model="form.health">
                <el-option label="良好" value="良好"></el-option>
                <el-option label="一般" value="一般"></el-option>
                <el-option label="不健康" value="不健康"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="婚姻状况：" class="form-half">
              <el-select v-model="form.married">
                <el-option label="未婚" value="未婚"></el-option>
                <el-option label="已婚" value="已婚"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生育状况：" class="form-half">
              <el-select v-model="form.fertility">
                <el-option label="良好" value="良好"></el-option>
                <el-option label="一般" value="一般"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="毕业学校：" class="form-half">
              <el-input v-model="form.school"></el-input>
            </el-form-item>
            <el-form-item label="最高学历：" class="form-half">
              <el-select v-model="form.educational">
                <el-option label="专科" value="专科"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="硕士" value="硕士"></el-option>
                <el-option label="博士" value="博士"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="员工关系：" class="form-half">
              <el-select v-model="form.relation">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="22"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="推荐人：" class="form-half">
              <el-input v-model="form.referees"></el-input>
            </el-form-item>
            <el-form-item label="应聘渠道：" class="form-half">
              <el-select v-model="form.source">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="22"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来源类型：" class="form-half">
              <el-select v-model="form.type">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="22"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="兴趣爱好：" class="form-half">
              <el-input v-model="form.interests"></el-input>
            </el-form-item>
            <el-form-item label="特长及优势：">
              <el-input v-model="form.specialty"></el-input>
            </el-form-item>
            <el-form-item label="荣誉奖励：">
              <el-input v-model="form.honor"></el-input>
            </el-form-item>
            <el-form-item label="其他成果：">
              <el-input v-model="form.other"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="求职意向" name="2">
            <el-form-item label="应聘岗位：" class="form-half">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="到岗时间：" class="form-half">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="应聘岗位：" class="form-half">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="到岗时间：" class="form-half">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="学习工作经历" name="3">
            <el-form-item label="学习情况：">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="工作经历：">
              <el-input type="textarea"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="培训证书情况" name="4">
            <el-form-item label="培训情况：">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="资质证书：">
              <el-input type="textarea"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="附件上传" name="5">
            <el-input type="textarea"></el-input>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </el-card>
    <!-- fixed footer toolbar -->
    <footer-tool-bar>
      <iep-button @click="handleGoBack">返回</iep-button>
      <iep-button type="primary">提交</iep-button>
    </footer-tool-bar>
  </div>
</template>
<script>
import FooterToolBar from '@/components/FooterToolbar'
export default {
  components: { FooterToolBar },
  data () {
    return {
      activeNames: ['1', '2', '3', '4', '5'],
      form: {
        name: '',
        sex: '',
      },
    }
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
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
      font-size: 16px;
    }
  }
}
</style>
