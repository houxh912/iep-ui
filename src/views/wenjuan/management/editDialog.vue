<template>
  <gov-dialog ref="dialog" width="80%" @open="handleOpen" :btnGroup="btnGroup" @closed="handleClosedDialog" :title="'工单详情'" :isBtnGroup="status !== dialog.textName.detail" @handleSubmit="dialogSubmit">
    <layout-form>
      <gov-layout-header>
        工单类型：
        <el-select size="small" style="width:200px!important" v-model="typeValue" placeholder="请选择" @change="changeType" :disabled="disabled">
          <el-option v-for="item in typeDic" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        参评单位：
        <el-select size="small" style="width:200px!important" v-model="deptValue" placeholder="请选择" @change="changeDept" :disabled="disabled">
          <el-option v-for="item in deptDic" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </gov-layout-header>
      <!-- {{projectId}} -->
      <work-order :formData="formData" :members="members" :ids="{projectId:projectId,sectionId:sectionId}" @close="successForm" :editable="editable"></work-order>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/views/wenjuan/mixins/mixin'
import workOrder from './compoments/workOrder'
import { getGroups, getMembers, getWorkById } from '@/api/evaluate/management'
import { getDic, getDept } from '@/views/wenjuan/util/dic'
export default {
  mixins: [mixin],
  components: { workOrder },
  data () {
    return {
      typeDic: getDic('EVA_PROJECT_TYPE'),
      typeValue: '',
      deptValue: '',
      deptDic: [],
      disabled: true,
      formData: {},
      members: {},
    }
  },
  props: {
    projectId: {
      type: String,
      default: '',
    },
    sectionId: {
      type: String,
      default: '',
    },
    editable: {
      type: Boolean,
      default: () => true,
    },
  },
  computed: {
    btnGroup () {
      return [
        {
          label: '取消', // 按钮文本
          loading: false, // 按钮加载中状态
          disabled: false, // 是否禁用按钮
          fn: 'handleCancel', // 按钮回调方法名称
        },
      ]
    },
  },
  methods: {
    // 打开时操作
    handleOpen () {
      getGroups({
        projectId: this.projectId,
      }).then(({ data }) => {
        let arr = []
        for (let item of data.data || []) {
          arr = arr.concat(item.eligibleUnitsList)
        }
        let deptDic = getDept()
        let groupData = []
        for (let id of arr) {
          for (let item of deptDic) {
            if (id == item.value) {
              groupData.push(item)
            }
          }
        }
        this.deptDic = groupData
      })
      this.getInfoMembers()
    },
    open (row) {
      if (row) {
        getWorkById(row.id).then(({ data }) => {
          // console.log("工单详情",data.data)
          this.formData = data.data
          this.typeValue = data.data.workOrderType + ''
          this.deptValue = data.data.eligibleUnitsId
        })
      }
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 弹窗关闭后
    handleClosedDialog () {
      this.initData()
    },
    changeType (value) {
      console.log(value)
    },
    initData () {
      this.typeValue = ''
      this.deptValue = ''
      this.deptDic = []
    },
    successForm () {
      this.close()
      this.$emit('successSubmit')
    },
    getInfoMembers () {
      getMembers(this.projectId).then(({ data }) => {
        this.members = {
          projectManagerId: data.data.projectManagerId, //项目经理id
          projectSupervisionId: data.data.projectSupervisionId, //项目督导id
          reviewMemberIds: data.data.reviewMemberIds ? data.data.reviewMemberIds.substring(0, data.data.reviewMemberIds.length - 1).split(',') : [], //评测员ids
          projectDeptId: data.data.projectDeptId, //项目单位id
          eligibleUnitsIds: data.data.eligibleUnitsIds ? data.data.eligibleUnitsIds.substring(0, data.data.eligibleUnitsIds.length - 1).split(',') : [],  //参评单位ids,
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
