<template>
  <div class="abs iep-page-form">
    <basic-container>
      <iep-page-header :title="`${methodName}任务`"></iep-page-header>
      <el-form :model="form" :rules="rules" size="small" ref="form" label-width="200px" class="form form-detail">
        <el-form-item label='任务名称：' prop="taskName">
          <el-input v-model="form.taskName" placeholder="请填写任务名称" maxlength="50"></el-input>
        </el-form-item>

        <el-form-item label='所属任务：' prop="parentName" class="form-half">
          <span v-if="form.children.length>0" style="color:#999;">此任务已有子任务不能再添加所属任务</span>
          <iep-task-atms-select v-else v-model="form.parentId" :contractName="form.parentName"></iep-task-atms-select>
        </el-form-item>

        <!-- <el-form-item label='状态' prop="taskStatus" class="form-half">
          <iep-dict-select v-model="form.taskStatus" placeholder="未完成" dict-name="atms_task_status"></iep-dict-select>
        </el-form-item> -->

        <el-form-item label='优先级：' prop="priority" class="form-half">
          <iep-dict-select v-model="form.priority" placeholder="普通" dict-name="atms_task_priority"></iep-dict-select>
        </el-form-item>

        <el-form-item label='负责人：' prop="principals" v-if="!this.id">
          <div style="width: 200px;">
            <iep-contact-select v-model="form.principals"></iep-contact-select>
          </div>
        </el-form-item>

        <el-form-item label='协同人：' prop="assistants">
          <iep-contact-multiple-user v-model="form.assistants"></iep-contact-multiple-user>
        </el-form-item>

        <el-form-item label='执行人：' prop="executors">
          <iep-contact-multiple-user v-model="form.executors"></iep-contact-multiple-user>
        </el-form-item>

        <el-form-item label='起止时间：' prop="startEndTime" class="form-half">
          <iep-date-picker v-model="form.startEndTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </iep-date-picker>
        </el-form-item>

        <el-form-item label='标签：' prop="tagKeyWords">
          <iep-tag v-model="form.tagKeyWords"></iep-tag>
        </el-form-item>

        <el-form-item label='备注：' prop="remarks">
          <el-input v-model="form.remarks" maxlength="255" :rows="4"></el-input>
        </el-form-item>

        <el-form-item label='附件：' prop="annexList">
          <iep-upload v-model="form.annexList" :limit="limit"></iep-upload>
        </el-form-item>

        <el-form-item label='关联项目：' prop="project">
          <iep-project-select v-model="form.projectId" :projectName="form.projectName" @relation-change="handleProjectChange"></iep-project-select>
        </el-form-item>

        <el-form-item label='关联内容：' prop="materials">
          <el-button @click="handleAdd"><i class="iconfont icon-xinzeng"></i></el-button>
        </el-form-item>
        <el-form-item></el-form-item>

        <div v-for="(item, index) in relatedFormList" :key="index">
          <el-form-item :label="`${item.name}：`" v-if="form[item.list].length>0">
            <ul class="relevance-list">
              <li class="item" v-for="(t, i) in form[item.list]" :key="t.id">{{t.name}} <i class="el-icon-close" @click="closeRelation(i, item.list, item.ids)"></i></li>
            </ul>
          </el-form-item>
        </div>
      </el-form>
      <footer-tool-bar>
        <iep-button type="primary" @click="handleSubmit">保存</iep-button>
        <iep-button @click="onGoBack">取消</iep-button>
      </footer-tool-bar>
    </basic-container>
    <relation-dialog ref="relationDialog" @relativeSubmit="relativeSubmit"></relation-dialog>
  </div>
</template>

<script>
import { createAtms, getAtmsById, updateAtms } from '@/api/atms/index'
import { initForm, formToDto, rules, relatedFormList } from './options.js'
import formMixins from '@/mixins/formMixins'
import RelationDialog from './relation'
import { mapGetters } from 'vuex'
export default {
  mixins: [formMixins],
  components: { RelationDialog },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.close()
        },
      },
      form: initForm(),
      rules,
      limit: 1,
      relatedFormList,
    }
  },
  created () {
    if (this.id) {
      getAtmsById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
        this.form.startEndTime = [this.form.startTime, this.form.endTime]
        this.form.parentId == 0 ? this.form.parentId = '' : this.form.parentId
        if (this.form.projectList.length > 0) {
          this.form.projectId = this.form.projectList[0].id
          this.form.projectName = this.form.projectList[0].name
        }
      })
    } else {
      this.form = initForm(this.userInfo)
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    id () {
      return +this.$route.params.id
    },
    methodName () {
      return this.id ? '编辑' : '新增'
    },
  },
  methods: {
    handleSubmit (isPublish) {
      const submitFunction = this.id ? updateAtms : createAtms
      this.$refs['form'].validate((valid) => {
        if (valid) {
          for (let item of this.relatedFormList) {
            this.form[item.ids] = this.form[item.list].map(m => m.id)
          }
          const publish = isPublish === true ? true : false
          if (this.form.annexList.length > 0) {
            this.form.attach = this.form.annexList[0].url
          }
          if (this.form.startEndTime.length > 0) {
            this.form.startTime = this.form.startEndTime[0]
            this.form.endTime = this.form.startEndTime[1]
          }
          this.form.principal = this.form.principals.id
          delete this.form.principals
          delete this.form.summaryList
          delete this.form.materialList
          submitFunction(formToDto(this.form), publish).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: `${this.methodName}任务成功`,
                type: 'success',
              })
              this.onGoBack()
            } else {
              this.$message(data.msg)
            }
          })
        }
      })
    },
    onGoBack () {
      this.$router.history.go(-1)
    },
    handleAdd () {
      this.$refs['relationDialog'].dialogShow = true
      this.$refs['relationDialog'].loadData({
        summaryList: this.form.summaryList,
        materialList: this.form.materialList,
      })
    },
    // 添加其他关联
    relativeSubmit (list) {
      this.form = Object.assign({}, this.form, list)
    },
    // 删除关联
    closeRelation (index, list, ids) {
      this.form[list].splice(index, 1)
      this.form[ids].splice(index, 1)
    },
    handleProjectChange (v) {
      if (v) {
        this.form.protocolId = v.id
        this.form.protocolName = v.name
      }
    },
  },
}
</script>

<style scoped lang="scss">
.relevance-list {
  padding: 0;
  .item {
    list-style: none;
    height: 28px;
    i {
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
