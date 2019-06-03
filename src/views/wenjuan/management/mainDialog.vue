<template>
  <gov-dialog
    ref="dialog"
    width="80%"
    @open="handleOpen"
    :btnGroup="btnGroup"
    @closed="handleClosedDialog"
    :title="'创建工单'"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <layout-form>
      <gov-layout-header>
        工单类型：
        <el-select size="small" style="width:200px!important" v-model="typeValue" placeholder="请选择" @change="changeType">
          <el-option
           v-for="item in typeDic"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
        </el-select>
        参评单位：
        <el-select size="small" style="width:200px!important" v-model="deptValue" placeholder="请选择" @change="changeDept">
          <el-option
           v-for="item in deptDic"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
        </el-select>
      </gov-layout-header>
      <!-- {{projectId}} -->
      <create-work
      :treeData="treeData"
      :members="members"
      @createSucess="createSucess"
      :ids="{sectionId:sectionId,projectId:projectId,eligibleUnitsId:deptValue,workOrderType:typeValue}"></create-work>
    </layout-form>
  </gov-dialog>
</template>
<script>
/*eslint-disable*/
import mixin from '@/wenjuan/mixins/mixin'
import createWork from './compoments/createWork'
import { getGroups, getMembers, getSystemIndex } from '@/api/evaluate/management'
import { getDic, getDept } from '@/wenjuan/util/dic'
export default {
  mixins: [mixin],
  components: {createWork},
  data () {
    return {
      typeDic: getDic("EVA_PROJECT_TYPE"),
      typeValue: "",
      deptValue: "",
      deptDic: [],
      treeData: [],
      members: {},
    }
  },
  props: {
    projectId: {
      type: String,
      default: "",
    },
    sectionId: {
      type: String,
      default: "",
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
        projectId:this.projectId,
      }).then(({data})=>{
        let arr = []
        for(let item of data.data||[]){
          arr = arr.concat(item.eligibleUnitsList)
        }
        let deptDic = getDept()
        let groupData = []
        for(let id of arr){
          for(let item of deptDic){
            if(id == item.value){
              groupData.push(item)
            }
          }
        }
        this.deptDic = groupData
        this.$nextTick(()=>{
          if(!this.typeValue && this.typeDic.length >0){
            this.typeValue = this.typeDic[0].value
          }
          if(!this.deptValue && this.deptDic.length >0){
            this.deptValue = this.deptDic[0].value
          }
          getSystemIndex({projectId:this.projectId,eligibleUnitsId:this.deptValue,sectionId:this.sectionId}).then(({data})=>{
            this.treeData = data.data
          })
        })
      })
      this.getInfoMembers()
    },
    open () {
      this.$nextTick(()=>{
        this.$refs['dialog'].open()
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 弹窗关闭后
    handleClosedDialog () {
      this.initData()
      console.log("清楚缓存",this.treeData)
    },
    changeType (value) {
      console.log(value)
    },
    changeDept (value) {
      getSystemIndex({projectId:this.projectId,eligibleUnitsId:value,sectionId:this.sectionId}).then(({data})=>{
        this.treeData = data.data
      })
    },
    //后去成员信息
    getInfoMembers () {
      getMembers(this.projectId).then(({data})=>{
        this.members = {
          projectManagerId: data.data.projectManagerId, //项目经理id
          projectSupervisionId: data.data.projectSupervisionId, //项目督导id
          reviewMemberIds: data.data.reviewMemberIds ? data.data.reviewMemberIds.substring(0,data.data.reviewMemberIds.length-1).split(",") : [], //评测员ids
          projectDeptId: data.data.projectDeptId, //项目单位id
          eligibleUnitsIds: data.data.eligibleUnitsIds ? data.data.eligibleUnitsIds.substring(0,data.data.eligibleUnitsIds.length-1).split(",") : [],  //参评单位ids,
        }
        console.log("members",this.members)
      })
    },
    initData () {
      this.typeValue = ""
      this.deptValue = ""
      this.treeData = []
      this.deptDic = []
    },
    createSucess () {
      this.close()
      this.$emit("successSubmit")
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
