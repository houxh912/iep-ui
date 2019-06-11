<template>
  <gov-dialog ref="dialog" width="90%" @open="handleOpen" :btnGroup="[]" @closed="handleClosedDialog" :title="'日常评测'" :isBtnGroup="false" @handleSubmit="dialogSubmit">
    <layout-form>
      <gov-layout-main>
        <gov-layout-header>
          <!-- 项目名称：
            <el-select size="small" style="width:200px!important" v-model="projectId" placeholder="请选择" @change="changeProject">
              <el-option
               v-for="item in projectIdDic"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
            </el-select> -->
          <div>
            <div class="c-item">
              <el-tag style="margin:10px 5px 5px 0;cursor:pointer" v-for="(item,index) in stage" :key="item.value" :type="currentStage == index ? 'default' : 'info'" @click="changeStage(index,item)">{{item.sectionName}}</el-tag>
              <span v-if="stage.length>0" style="background-color:#F2F6FC;padding:3px;vertical-align:-2px">{{stage.length>0?stage[currentStage].sectionStartTime:0}} - {{stage.length>0?stage[currentStage].sectionEndTime:0}}</span>
            </div>
          </div>
        </gov-layout-header>
        <gov-layout-body>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="工单汇总" name="first">
              <gov-layout-button-group>
                <gov-button v-if="members.reviewMemberIds && members.reviewMemberIds.indexOf(userInfo.id.toString()) > -1 && stage.length>0" type="add" @click="handleCreate" text="工单创建"></gov-button>
              </gov-layout-button-group>
              <avue-crud :option="tableOption" :data="tableList" :table-loading="tableLoading" @size-change="sizeChange" :page="pagination">
                <template slot-scope="scope" slot="menu">
                  <div class="table-btn-group">
                    <gov-button type="text" @click="handleWork(scope.row)" text="查看工单"></gov-button>
                  </div>
                </template>
              </avue-crud>
            </el-tab-pane>
            <el-tab-pane label="待我审核" name="second">
              <gov-layout-button-group>
                <gov-button v-if="members.reviewMemberIds && members.reviewMemberIds.indexOf(userInfo.id.toString()) > -1 && stage.length>0" type="add" @click="handleCreate" text="工单创建"></gov-button>
              </gov-layout-button-group>
              <avue-crud :option="tableOptionMy" :data="tableListMy" :table-loading="tableLoading" @size-change="sizeChange" :page="pagination">
                <template slot-scope="scope" slot="name">
                  {{scope.row.indexSystemRelationVO.name}}
                </template>
                <template slot-scope="scope" slot="weight">
                  {{scope.row.indexSystemRelationVO.weight}}
                </template>
                <template slot-scope="scope" slot="processState">
                  <div class="table-btn-group">
                    <gov-button type="text" @click="handleStatus(scope.row)" :text="getDicValue(scope.row.processState,'EVA_DAILY_PROCESS_STATUS')"></gov-button>
                  </div>
                </template>
              </avue-crud>
            </el-tab-pane>
          </el-tabs>
        </gov-layout-body>
        <main-dialog ref="mainDialog" @successSubmit="refreshList" :projectId="projectId" :sectionId="sectionId"></main-dialog>
        <edit-dialog ref="editDialog" @successSubmit="refreshList" :projectId="projectId" :sectionId="sectionId"></edit-dialog>
        <work-list-dialog ref="workListDialog" @successSubmit="refreshList" :projectId="projectId" :sectionId="sectionId"></work-list-dialog>
      </gov-layout-main>
    </layout-form>
  </gov-dialog>
</template>
<script>
/*eslint-disable*/
import mixin from '@/views/wenjuan/mixins/mixin'
import scopeMixin from './const/dailyMixin'
import mainDialog from './mainDialog'
import editDialog from './editDialog'
import workListDialog from './workListDialog'
import { getDic } from '@/views/wenjuan/util/dic'
import { getData } from '@/api/evaluate/projectStep'
import { getSummary, getPageByUser, getMembers } from '@/api/evaluate/management'
export default {
  components: { mainDialog, editDialog, workListDialog },
  mixins: [mixin, scopeMixin],
  data () {
    return {
      activeName: "first",
      tableList: [],
      tableListMy: [],
      projectId: "",
      sectionId: "",
      projectIdDic: [],
      stage: [],
      currentStage: 0,
      members: {},
    }
  },
  created () {

  },
  computed: {

  },

  methods: {
    initApi () {
      this.changeProject(this.projectId)
    },
    changeProject (value) {
      getData({ projectId: value }).then(({ data }) => {
        this.stage = data.data
        if (this.stage.length > 0) {
          this.changeStage(0, this.stage[0])
        } else {
          this.changeStage(0, {})
        }
      })
      this.getInfoMembers()
    },
    //后去成员信息
    getInfoMembers () {
      getMembers(this.projectId).then(({ data }) => {
        this.members = {
          projectManagerId: data.data.projectManagerId, //项目经理id
          projectSupervisionId: data.data.projectSupervisionId, //项目督导id
          reviewMemberIds: data.data.reviewMemberIds ? data.data.reviewMemberIds.substring(0, data.data.reviewMemberIds.length - 1).split(",") : [], //评测员ids
          projectDeptId: data.data.projectDeptId, //项目单位id
          eligibleUnitsIds: data.data.eligibleUnitsIds ? data.data.eligibleUnitsIds.substring(0, data.data.eligibleUnitsIds.length - 1).split(",") : [],  //参评单位ids,
        }
        console.log("members", this.members)
      })
    },
    handleClick (tab) {
      console.log(tab)
      // if(this.sectionId){
      //   this.getList()
      //   this.getListMy()
      // }
    },
    handleCreate () {
      this.$refs['mainDialog'].open()
    },
    changeStage (index, item) {
      this.currentStage = index
      if (item.id) {
        this.sectionId = item.id
        this.refreshList()
      } else {
        this.sectionId = ""
        this.tableList = []
        this.tableListMy = []
      }
    },
    //刷新列表
    refreshList () {
      this.getList()
      this.getListMy()
    },
    // 读取数据
    getList () {
      // console.log("params",params)
      // this.tableList = [{
      //   name: "哇嘎嘎嘎",
      //   createBy: "1",
      //   type: "点击改变哦",
      // }]
      this.tableLoading = true
      getSummary({ projectId: this.projectId, sectionId: this.sectionId }).then(({ data }) => {
        this.tableLoading = false
        this.tableList = data.data
      })
    },
    getListMy () {
      // console.log("params",params)
      // this.tableList = [{
      //   name: "哇嘎嘎嘎",
      //   createBy: "1",
      //   type: "点击改变哦",
      // }]
      this.tableLoading = true
      getPageByUser({ projectId: this.projectId, sectionId: this.sectionId, eligibleUnitsId: this.userInfo.deptId, userId: this.userInfo.id }).then(({ data }) => {
        // console.log(data)
        this.tableLoading = false
        this.tableListMy = data.data
        console.log("结果数据", data.data)
      })
    },
    handleWork (row) {
      this.$refs['workListDialog'].open(row)
      // console.log(row)
    },
    handleStatus (row) {
      this.$refs['editDialog'].open(row)
    },
    getDicValue (value, dic) {
      let dicArr = getDic(dic)
      for (let item of dicArr) {
        if (item.value == value) {
          return item.label
        }
      }
    },
    handleOpen () {

    },
    open (row) {
      this.projectId = row.projectId
      this.activeName = 'first'
      this.initApi()
      this.$nextTick(() => {
        this.$refs['dialog'].open()
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
  },
}
</script>
<style scoped lang="scss">
</style>
