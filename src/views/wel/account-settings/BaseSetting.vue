<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="20">
        <el-form ref="form" class="form-detail" :model="form" label-width="100px" size="small">
          <el-form-item label="姓名：" class="form-half">
            <span>{{form.name}}</span>
          </el-form-item>
          <el-form-item label="用户名：" class="form-half">
            <span>{{form.userName}}</span>
          </el-form-item>
          <el-form-item label="所属组织：" class="form-half">
            <iep-detail-tag :value="form.orgList"></iep-detail-tag>
          </el-form-item>
          <el-form-item label="工号：" class="form-half">
            <el-input v-model="form.staffId"></el-input>
          </el-form-item>
          <el-form-item label="头像：" class="">
            <iep-avatar v-model="form.avatar"></iep-avatar>
          </el-form-item>
          <el-form-item label="角色：" class="form-half">
            <iep-detail-tag :value="form.roleName"></iep-detail-tag>
          </el-form-item>
          <el-form-item label="资产所属：" class="form-half">
            <span>{{form.deptList.join('、')}}</span>
          </el-form-item>
          <el-form-item label="岗位：" class="form-half">
            <span>{{form.positionName}}</span>
          </el-form-item>
          <el-form-item label="外部头衔：" class="form-half">
            <el-input v-model="form.externalTitle"></el-input>
          </el-form-item>
          <el-form-item label="岗位职责：">
            <span>{{form.duties}}</span>
          </el-form-item>
          <el-form-item label="职务：" class="form-half">
            <span>{{form.job}}</span>
          </el-form-item>
          <el-form-item label="职称：" class="form-half">
            <span>{{form.title}}</span>
          </el-form-item>
          <el-form-item label="入职时间：" class="form-half">
            <el-input v-model="form.entryTime"></el-input>
          </el-form-item>
          <el-form-item label="转正时间：" class="form-half">
            <el-input v-model="form.positiveTime"></el-input>
          </el-form-item>
          <el-form-item label="员工状态：" class="form-half">
            <el-input v-model="form.status"></el-input>
          </el-form-item>
          <el-form-item label="所属部门：" class="form-half">
            <iep-detail-tag :value="form.deptList"></iep-detail-tag>
          </el-form-item>
          <el-form-item label="出生年月：" class="form-half">
            <el-input v-model="form.birthday"></el-input>
          </el-form-item>
          <el-form-item label="性别：" class="form-half">
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="民族：" class="form-half">
            <el-input v-model="form.nationality"></el-input>
          </el-form-item>
          <el-form-item label="政治面貌：" class="form-half">
            <iep-dict-select v-model="form.politics" dict-name="hrms_politics_face"></iep-dict-select>
          </el-form-item>
          <el-form-item label="婚姻状况：" class="form-half">
            <iep-dict-select v-model="form.marriage" dict-name="hrms_marriage_status"></iep-dict-select>
          </el-form-item>
          <el-form-item label="生育状况：" class="form-half">
            <iep-dict-select v-model="form.bear" dict-name="hrms_birth_status"></iep-dict-select>
          </el-form-item>
          <el-form-item label="外语水平：" class="form-half">
            <el-select v-model="form.language">
              <el-option label="良好" value="良好"></el-option>
              <el-option label="一般" value="一般"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最高学历：" class="form-half">
            <iep-dict-select v-model="form.education" dict-name="hrms_highest_educational"></iep-dict-select>
          </el-form-item>
          <el-form-item label="毕业学校：" class="form-half">
            <el-input v-model="form.university"></el-input>
          </el-form-item>
          <el-form-item label="专业：" class="form-half">
            <el-input v-model="form.profession"></el-input>
          </el-form-item>
          <el-form-item label="毕业时间：" class="form-half">
            <el-input v-model="form.graduationTime"></el-input>
          </el-form-item>
          <el-form-item label="推荐人：" class="form-half">
            <el-input v-model="form.referrer"></el-input>
          </el-form-item>
          <el-form-item label="外部头衔：" class="form-half">
            <el-input v-model="form.externalTitle"></el-input>
          </el-form-item>

          <!-- <el-form-item label="添加师父：">
                <iep-tag v-model="form.people"></iep-tag>
              </el-form-item> -->
          <el-form-item label="卓越标签：">
            <iep-tag v-model="form.abilityTag"></iep-tag>
          </el-form-item>
          <el-form-item label="专业标签：">
            <iep-tag v-model="form.projectTag"></iep-tag>
          </el-form-item>
          <el-form-item label="进步标签：">
            <iep-tag v-model="form.learningTag"></iep-tag>
          </el-form-item>

          <el-form-item label="职业规划：">
            <el-input type="textarea" v-model="form.careerPlanning"></el-input>
          </el-form-item>

          <el-form-item>
            <iep-button type="primary" @click="handleSubmit">提交</iep-button>
          </el-form-item>
        </el-form>

      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getEmployeeProfileSelf, putEmployeeProfile } from '@/api/hrms/employee_profile'
import { initForm } from './options'
export default {
  data () {
    return {
      // cropper
      preview: {},
      form: initForm(),
    }
  },
  created () {
    this.loadSelf()
  },
  methods: {
    handleSubmit () {
      putEmployeeProfile(this.form).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: '修改成功',
            type: 'success',
          })
          this.handleGoBack()
        } else {
          this.$message({
            message: data.msg,
            type: 'error',
          })
        }
      })
    },
    loadSelf () {
      getEmployeeProfileSelf().then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
