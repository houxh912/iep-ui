<template>
  <div class="iep-page-form">
    <basic-container>
      <iep-page-header title="发布会议"></iep-page-header>
      <el-form :model="formData" label-width="120px" ref="formName" :rules="rules">
        <el-row>
          <el-col>
            <el-form-item label="会议标题：" prop="meetingTitle">
              <el-input v-model="formData.meetingTitle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会议类型：" prop="meetingType">
              <el-select v-model="formData.meetingType">
                <el-option v-for="item in meetingTypeOption" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="会议规模：" prop="meetingScale">
              <el-input v-model="formData.meetingScale" placeholder="请输入规模人数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="开始时间：" prop="meetingTimeStart">
              <IepDatePicker v-model="formData.meetingTimeStart" :picker-options="signTimeOption" type="datetime" class="time"></IepDatePicker>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="结束时间：" prop="meetingTimeEnd">
              <IepDatePicker v-model="formData.meetingTimeEnd" :picker-options="finishTimeOption" type="datetime" class="time"></IepDatePicker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="会议地址：" prop="cityAdrss">
              <div style="display:flex;">
                <iep-cascader style="flex:2;" v-model="formData.cityAdrss" prefix-url="admin/city"></iep-cascader>
                <el-input style="flex:3;" v-model="formData.meetingAddress"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="会议分类：" prop="meetingClasses1">
              <el-checkbox-group v-model="formData.meetingClasses1">
                <el-checkbox v-for="item in this.arr" :key="item.id" :label="item.id" name="leixing">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="会议子分类：">
              <div class="tag">
                <iep-button @click="AddTags">添加子分类</iep-button>
                <el-tag v-for="tag in tags" :key="tag.id" :value="tag.id" closable @close="closeTag(tag)" class="allTag">
                  {{tag.name}}
                </el-tag>
              </div>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="会议标签：" prop="tags">
              <iep-tag v-model="formData.tags"></iep-tag>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="会议亮点：" prop="meetingHighlights">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="formData.meetingHighlights" placeholder="请填写几句会议核心亮点"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="会议详情：" prop="content">
              <iep-froala-editor v-model="formData.content"></iep-froala-editor>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="海报：" prop="attachs">
              <avatar-img v-model="formData.attachs"></avatar-img>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :offset="9">
          <iep-button class="button" type="primary" @click="draft('formName')">草稿</iep-button>
          <iep-button class="button" type="primary" @click="preview('formName')">预览 </iep-button>
          <iep-button class="button" type="primary" @click="submitForm('formName')">发布</iep-button>
        </el-col>
      </el-row>
      <tag-dialog ref="TagDialog" @tag="tag"></tag-dialog>
    </basic-container>
  </div>
</template>
<script>
import { initForm, rules } from './option'
import { mapGetters } from 'vuex'
import { postMeetingmarketing, getCodeName, getdic } from '@/api/mcms/meeting'
import AvatarImg from './IepAvatar.vue'
import TagDialog from './TagDialog.vue'
export default {
  components: { AvatarImg, TagDialog },
  data () {
    return {
      formData: initForm(),
      rules,
      arr: [],
      tags: [],
      meetingTypeOption: [{
        value: '会议',
        label: '会议',
      }, {
        value: '展会',
        label: '展会',
      }, {
        value: '沙龙',
        label: '沙龙',
      }],

      signTimeOption: {
        disabledDate: (time) => {
          if (this.formData.meetingTimeEnd) {
            return time.getTime() > +new Date(this.formData.meetingTimeEnd)
          } else {
            return time.getTime() < 0
          }
        },
      },
      finishTimeOption: {
        disabledDate: (time) => {
          if (this.formData.meetingTimeStart) {
            return time.getTime() < +new Date(this.formData.meetingTimeStart)
          } else {
            return time.getTime() < 0
          }
        },
      },
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'dictGroup',
    ]),
  },
  created () {
    this.tag()
  },
  mounted () {
    this.load()
  },
  methods: {
    //草稿
    draft (formName) {
      this.formData.meetingFlag = 4
      this.formData.sendDraft = 1
      this.submitForm(formName)
    },
    //预览
    preview (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getCodeName({ codes: this.formData.cityAdrss }).then((res) => {
            this.$router.push({
              path: '/cfms_spa/meeting_detail',
              query: {
                preview: true,
                data: this.formData,
                orgVo: { url: this.userInfo.avatar, name: this.userInfo.orgName },
                province: res.data.province,
                city: res.data.city,
              },
            })
          })
        } else {
          return false
        }
      })
    },
    load () {
      getdic({ number: 'meetingmarketing', type: 0 }).then((res) => {
        this.arr = res.data
      })
    },
    //添加标签
    AddTags () {
      this.$refs['TagDialog'].dialogShow = true
      getdic({ number: 'meetingmarketing', type: 1, source: 1, dictId: this.formData.meetingClasses1 }).then((res) => {
        this.$refs['TagDialog'].cities = res.data
      })
    },
    closeTag (tag) {
      const tags = this.tags.filter(m => m.id != tag.id)
      this.tags = tags
    },
    tag (val) {
      this.tags = val
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.formData.meetingUrl = window.location.host + '/meeting'
          this.formData.meetingUrl = 'http://home.icanvip.net/meeting'
          this.formData.meetingClasses2 = this.tags.map(m => m.id)
          postMeetingmarketing(this.formData).then((res) => {
            this.$message({
              message: res.data.msg,
              type: 'success',
            })
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style scoped>
.el-select {
  width: 100%;
}
.time {
  width: 100%;
}
.tag {
  display: flex;
}
.button {
  margin: 0 10px;
}
.allTag {
  margin: 0 10px;
}
</style>