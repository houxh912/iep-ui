<template>
  <div class="iep-page-form">
    <basic-container>
      <iep-page-header :title="title"></iep-page-header>
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
              <el-checkbox-group v-model="formData.meetingClasses1" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="(item,index) in this.meetingMarketing" :key="item+index" :label="item.value" name="leixing">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="会议子分类：">
              <div class="tag">
                <iep-button @click="AddTags">添加子分类</iep-button>
                <el-tag v-for="tag in tags" :key="tag.value+tag.label" :value="tag.value" closable @close="closeTag(tag)" class="allTag">
                  {{tag.label}}
                </el-tag>

                <!-- <el-tag v-for="tag in tags" :key="tag.value+tag.label" :value="tag.id" closable @close="closeTag(tag)" class="allTag">
                  {{tag.name}}
                </el-tag> -->
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
        <el-col :offset="9" v-if="this.$route.query.edit == true">
          <iep-button class="button" type="primary" @click="handEdit('formName')">修改</iep-button>
        </el-col>
        <el-col :offset="9" v-else>
          <iep-button class="button" type="primary" @click="draft('formName')">存为草稿</iep-button>
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
import { postMeetingmarketing, getCodeName, getmeetingmarketing, putMeetingmarketing, getCode } from '@/api/mcms/meeting'
import AvatarImg from './IepAvatar.vue'
import TagDialog from './TagDialog.vue'
function flatten (arr) {
  return arr.reduce((result, item) => {
    return result.concat(Array.isArray(item) ? flatten(item) : item)
  }, [])
}
export default {
  components: { AvatarImg, TagDialog },
  data () {
    return {
      formData: initForm(),
      rules,
      arr: [],
      arr1: [],
      tags: [],
      title: '发布会议',
      meetingTypeOption: [{
        value: '会议',
        label: '会议',
      }, {
        value: '展会',
        label: '展会',
      }, {
        value: '沙龙',
        label: '沙龙',
      }, {
        value: '培训',
        label: '培训',
      },
      ],

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
    meetingMarketing () {
      return this.dictGroup['meetingmarketing']
    },
  },
  created () {
    this.tag()
    if (this.$route.query.edit) {
      this.title = '修改会议'
      getmeetingmarketing(this.$route.params.id).then(res => {
        this.formData.id = res.data.data.id
        this.formData.meetingType = res.data.data.meetingType
        this.formData.meetingTitle = res.data.data.meetingTitle
        this.formData.meetingScale = res.data.data.meetingScale
        this.formData.meetingTimeStart = res.data.data.meetingTimeStart
        this.formData.meetingTimeEnd = res.data.data.meetingTimeEnd
        this.formData.meetingAddress = res.data.data.meetingAddress
        this.formData.meetingHighlights = res.data.data.meetingHighlights
        this.formData.content = res.data.data.content
        this.formData.attachs = res.data.data.urls
        this.formData.cityAdrss = [res.data.data.meetingProvince, res.data.data.meetingCity]
        this.formData.meetingClasses1 = res.data.data.meetingClasses1.map(m => String(m.id))
        this.formData.meetingClasses2 = res.data.data.meetingClasses2.map(m => String(m.id))
        console.log(res.data.data.meetingClasses1.map(m => String(m.id)))
        this.formData.meetingUrl = res.data.data.meetingUrl
        this.formData.tags = res.data.data.tags.map(m => m.name)
        this.tags = res.data.data.meetingClasses2.map(m => ({ value: m.id, label: m.name }))
        console.log(this.tags)
        this.arr1 = res.data.data.meetingClasses1.map(m => String(m.id))
      })
    }
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
    //添加标签
    AddTags () {
      this.$refs['TagDialog'].dialogShow = true
      let cities = []
      let arr2 = []
      this.meetingMarketing.forEach(item => {
        if (this.arr1.includes(item.value)) {
          arr2.push(item)
        }
      })
      for (let i = 0, len = arr2.length; i < len; i++) {
        arr2[i].children ? cities.push(arr2[i].children) : cities.push(arr2[i])
      }
      const newCitys = flatten(cities)
      this.$refs['TagDialog'].cities = newCitys
    },
    closeTag (tag) {
      // const tags = this.tags.filter(m => m.label != tag.label)
      const tags = this.tags.filter(m => m.value != tag.value)
      console.log(tags, tag)

      this.tags = tags
    },
    handleCheckedCitiesChange (val) {
      console.log(val)
      this.arr1 = val
    },
    tag (val) {
      this.tags = val
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.formData.meetingUrl = window.location.host + '/meeting'
          this.formData.meetingUrl = 'http://www.icanvip.net/meeting'
          this.formData.meetingClasses2 = this.tags.map(m => m.value)
          getCode({ code: this.formData.cityAdrss[0] }).then((res) => {
            this.formData.provinceName = res.data
            getCode({ code: this.formData.cityAdrss[1] }).then((res) => {
              this.formData.cityName = res.data
              postMeetingmarketing(this.formData).then((res) => {
                this.$message({
                  message: res.data.msg,
                  type: 'success',
                })
              })
            })
          })
        } else {
          return false
        }
      })
    },
    handEdit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.formData.meetingUrl = 'http://www.home.icanvip.net/meeting'
          this.formData.meetingClasses2 = this.tags.map(m => m.value)
          getCode({ code: this.formData.cityAdrss[0] }).then((res) => {
            this.formData.provinceName = res.data
            getCode({ code: this.formData.cityAdrss[1] }).then((res) => {
              this.formData.cityName = res.data
              putMeetingmarketing(this.formData).then((res) => {
                this.$message({
                  message: res.data.msg,
                  type: 'success',
                })
              })
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