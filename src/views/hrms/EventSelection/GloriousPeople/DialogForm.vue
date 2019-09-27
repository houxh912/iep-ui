<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="580px" @close="loadDialog">
    <el-form class="form-detail" :model="form" ref="form" size="small" :rules="rules" label-width="120px">
      <el-form-item label="评选名称：" prop="selectionName">
        <el-input v-model="form.selectionName"></el-input>
      </el-form-item>
      <el-form-item label="关联指标：" prop="targetId" v-show="!customClass">
        <iep-select v-model="form.targetId" autocomplete="off" prefix-url="hrms/iephrsplendortarget" placeholder="请选择关联指标" style="width:240px;margin-right:10px;" @change="targetIdChange"></iep-select>
        <el-button @click="changeCustomClass">{{customClass==false?'自定义类':'关联指标类'}}</el-button>
      </el-form-item>
      <el-form-item label="关联指标：" v-show="customClass">
        <el-button @click="changeCustomClass">{{customClass==false?'自定义类':'关联指标类'}}</el-button>
      </el-form-item>
      <el-form-item label="对象名：" prop="user" v-show="customClass">
        <iep-contact-select v-model="form.user"></iep-contact-select>
      </el-form-item>
      <el-form-item label="优先级：" prop="priority">
        <iep-input-number v-model="form.priority" placeholder="请正确输入非负优先级" :min="1" :max="9"></iep-input-number>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示对象：" v-show="!customClass">
        <el-input v-model="form.realName" style="width:90px;margin-right:10px;" disabled></el-input>
        <el-button @click="customize">自定义</el-button>
      </el-form-item>
      <el-form-item label="简述：">
        <el-input v-model="form.describes" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
    <dialog-list ref="DialogList" @change-people="changePeople"></dialog-list>
  </iep-dialog>
</template>
<script>
import { getTargetlist, getGloriousById } from '@/api/hrms/event_selection'
import { initForm, dictsMap, rules } from './options'
import formMixins from '@/mixins/formMixins'
import DialogList from './DialogList'
// import { mapGetters } from 'vuex'
export default {
  mixins: [formMixins],
  components: { DialogList },
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
      id: '',
      targetlist: [],
      customClass: false,
    }
  },
  // },
  created () {
    this.loadDialog()
    getTargetlist().then((res) => {
      this.targetlist = res.data.data
    })
  },
  methods: {
    changeCustomClass () {
      this.customClass = !this.customClass
      if (this.customClass == false) {
        this.form.targetId = ''
      }
      else {
        this.form.targetId = 0
      }
    },
    changePeople (val) {
      this.form.realName = val.name
      this.form.targetUserId = val.id
    },
    customize () {
      let chooseType
      let chooseName = '请先选择关联指标再获取'
      for (let target of this.targetlist) {
        if (this.form.targetId === target.value) {
          chooseType = target.type
          chooseName = target.label
        }
      }
      this.$refs['DialogList'].methodName = chooseName
      this.$refs['DialogList'].type = chooseType
      this.$refs['DialogList'].dialogShow = true
      this.$refs['DialogList'].loadTypeList()
    },
    loadDialog () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    loadTypeList () {
      getGloriousById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(this.form, data.data)
        if (this.form.targetId === 0) {
          this.form.targetId = ''
          this.customClass = true
          this.form.user.name = this.form.realName
          this.form.user.id = this.form.userId
        }
        else {
          this.form.targetUserId = this.form.userId
        }
        if (this.form.sign === 1) {
          this.form.userId = ''
          this.form.targetUserId = ''
          console.log(11)
        }
      })
    },
    async submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.customClass === true) {
            this.form.targetId = 0
            this.form.userName = this.form.user.name
            this.form.userId = this.form.user.id
            this.form.targetUserName = '默认'
            this.form.targetUserId = ''
          }
          else {
            this.form.userName = this.form.targetUserName
            this.form.userId = this.form.targetUserId
          }
          if (this.form.targetUserId == '' && this.form.userId == '') {
            this.form.sign = 1
          }
          else {
            this.form.sign = 2
          }
          this.formRequestFn({ splendorId: this.id, ...this.form }).then(data => {
            if (data.data.data) {
              this.$message({
                message: `${this.methodName}成功`,
                type: 'success',
              })
              this.dialogShow = false
            }
            else {
              this.$message({
                type: 'info',
                message: `${this.methodName}失败,${data.data.msg}`,
              })
            }
          })
        }
      })
    },
    targetIdChange () {
      this.form.realName = '默认'
      this.form.targetUserId = ''
    },
  },
  // watch: {
  //   'form.user' (val) {
  //     this.form.userName = val.name
  //     this.form.userId = val.id
  //     this.form.targetId == 0
  //   },
  //   immediate: true,
  // },

}
</script>