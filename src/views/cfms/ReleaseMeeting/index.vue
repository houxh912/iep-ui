<template>
  <div class="iep-page-form">
    <basic-container>
      <iep-page-header title="发布会议"></iep-page-header>
      <el-form :model="formData" label-width="120px" ref="formName">
        <el-row>
          <el-col>
            <el-form-item label="会议标题：">
              <el-input v-model="formData.meetingTitle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会议类型：">
              <el-select v-model="formData.meetingType">
                <el-option v-for="item in meetingTypeOption" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="会议规模：">
              <!-- <el-select v-model="formData.meetingScale">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->
              <el-input v-model="formData.meetingScale" placeholder="请输入规模人数"></el-input>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="12">
            <el-form-item label="会议时间：">
              <el-date-picker v-model="formData.value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col> -->
          <el-col :span='12'>
            <el-form-item label="开始日间：">
              <IepDatePicker v-model="formData.meetingTimeStart" :picker-options="signTimeOption" type="datetime" class="time"></IepDatePicker>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="结束时间：">
              <IepDatePicker v-model="formData.meetingTimeEnd" :picker-options="finishTimeOption" type="datetime" class="time"></IepDatePicker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="会议地址：">
              <div style="display:flex;">
                <iep-cascader style="flex:2;" v-model="formData.cityAdrss" prefix-url="admin/city"></iep-cascader>
                <el-input style="flex:3;" v-model="formData.meetingAddress"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="会议分类：">
              <!-- <el-checkbox-group v-model="formData.meetingClasses">
                <el-checkbox label="科技网络"></el-checkbox>
                <el-checkbox label="财经金融"></el-checkbox>
                <el-checkbox label="工业制造"></el-checkbox>
                <el-checkbox label="农林牧渔"></el-checkbox>
                <el-checkbox label="服务行业"></el-checkbox>
                <el-checkbox label="健康医疗"></el-checkbox>
                <el-checkbox label="教育培训"></el-checkbox>
                <el-checkbox label="学术研讨"></el-checkbox>
                <el-checkbox label="社群活动"></el-checkbox>
                <el-checkbox label=其他></el-checkbox>
              </el-checkbox-group> -->
              <el-checkbox-group v-model="formData.meetingClasses">
                <el-checkbox v-for="item in this.arr" :key="item.tagId" :label="item.tagId" name="leixing">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="会议标签：">
              <!-- <iep-tag v-model="formData.tags"></iep-tag> -->
              <div class="tag">
                <iep-button @click="AddTags">添加标签</iep-button>
                <el-tag v-for="tag in tags" :key="tag.tagId" :value="tag.tagId" closable @close="closeTag(tag)" class="allTag">
                  {{tag.name}}
                </el-tag>
              </div>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="会议亮点：">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="formData.meetingHighlights" placeholder="请填写几句会议核心亮点"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="会议详情：">
              <iep-froala-editor v-model="formData.content"></iep-froala-editor>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="海报：">
              <!-- <iep-avatar v-model="formData.attachs"></iep-avatar> -->
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
import { initForm } from './option'
import { mapGetters } from 'vuex'
import { postMeetingmarketing, getMeetingtagAlltag, getMeetingtagSontag, getCodeName } from '@/api/mcms/meeting'
import AvatarImg from './IepAvatar.vue'
import TagDialog from './TagDialog.vue'
export default {
  components: { AvatarImg, TagDialog },
  data () {
    return {
      // formData: { biaoti: '', area: [], address: '', clientTypeKey: [], tags: [], meetingContent: '', avatar: '' },
      formData: initForm(),
      arr: [],
      tagId: [],
      tagLabel: [],
      oneAddress: '',
      twoAddress: '',
      allAddress: '',
      // form: initForm(),
      options: [{
        value: '100',
        label: '100',
      }, {
        value: '200',
        label: '200',
      }, {
        value: '300',
        label: '300',
      }, {
        value: '400',
        label: '400',
      }, {
        value: '500',
        label: '500',
      }],

      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' },
        { name: '标签五', type: 'danger' },
      ],
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
      // value: '',
      // value1: '',
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
          let arr = this.formData.cityAdrss.map(m => Number(m))
          getCodeName({ codes: arr }).then((res) => {
            console.log(res)
          })
          this.$router.push({
            path: '/cfms_spa/meeting_detail',
            query: {
              preview: true,
              data: this.formData,
              orgVo: { url: this.userInfo.avatar, name: this.userInfo.orgName },
            },
          })
        } else {
          return false
        }
      })
    },
    load () {
      //一级标签
      getMeetingtagAlltag().then((res) => {
        this.arr = res.data
      })
    },
    //添加标签
    AddTags () {
      this.$refs['TagDialog'].dialogShow = true
      getMeetingtagSontag({ id: this.formData.meetingClasses }).then((res) => {
        this.$refs['TagDialog'].cities = res.data
      })
    },
    closeTag (tag) {
      const tags = this.tags.filter(m => m.tagId != tag.tagId)
      this.tags = tags
    },
    tag (val) {
      this.tags = val
    },
    submitForm (formName) {
      this.formData.meetingUrl = window.location.host + '/cfms_spa/meeting_detail'
      this.formData.tags = this.tags.map(m => m.tagId)
      this.$refs[formName].validate((valid) => {
        if (valid) {
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