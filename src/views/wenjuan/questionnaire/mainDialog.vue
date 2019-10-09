<template>
  <gov-dialog ref="dialog" width="90%" :btnGroup="btnGroup" @open="handleOpen" @closed="handleClosedDialog" :title="'创建问卷'" :isBtnGroup="status !== dialog.textName.detail" @handleSubmit="dialogSubmit" @handleSubmitDraft="handleSubmitDraft" @handlePreview="handlePreview">   
    <layout-form>
      <el-row class="mainContainer">
        <el-col :span="4" class="left">
          <h3 class="titleH">选择题</h3>
          <div class="leftItem" v-for="item in menu.select" :key="item" @click="addSubject(item)">
            <i :class="`iconfont ${item.icon} v1`"></i>{{item.name}}
          </div>
          <h3 class="titleH">填空题</h3>
          <div class="leftItem" v-for="item in menu.input" :key="item" @click="addSubject(item)">
            <i :class="`iconfont ${item.icon} v1`"></i>{{item.name}}
          </div>
          <h3 class="titleH">其它</h3>
          <div class="leftItem" v-for="item in menu.other" :key="item" @click="addSubject(item)">
            <i :class="`iconfont ${item.icon} v1`"></i>{{item.name}}
          </div>
          <div class="selectBtn">
            <gov-button type="primary" @click="handleChoose" plain style="width: 100%">选择模板</gov-button>
          </div>
        </el-col>
        <el-col :span="20" class="right">
          <h3 class="title">问卷设置</h3>
          <avue-form style="padding-top:20px" ref="form" v-model="form" :option="editOption"></avue-form>
          <h3 class="title">题目设置</h3>
          <div class="questionArea">
            <draggable element="div" v-model="data" :animation="100" :move="checkMove">
              <form-item v-for="(item,index) in data" :projectId="form.projectId" :key="item" :data="item" :index="index" @handleCopy="handleCopy" :list="data" :star="showGrade" @handleDelete="handleDelete"></form-item>
            </draggable>
          </div>
        </el-col>
      </el-row>
    </layout-form>
    <preview-dialog @successForm="successForm" ref="previewDialog" :content="data" :temp="form">
    </preview-dialog>
    <choose-dialog ref="chooseDialog" @copyData="copyData"></choose-dialog>
  </gov-dialog>
</template>
<script>

import mixin from '@/views/wenjuan/mixins/mixin'
import scopeMixin from './const/mixin'
import FormItem from './editForm'
import draggable from 'vuedraggable'
import previewDialog from './previewDialog'
import chooseDialog from './chooseDialog.vue'
import {
  createData,
  updateData,
  getDetail,
} from '@/api/evaluate/question'
import { getOrgList } from '@/api/admin/org'
import { getIndexIds } from './const/utils'
import { getGroupDept } from '@/api/evaluate/question'
export default {
  mixins: [mixin, scopeMixin],
  components: { FormItem, draggable, previewDialog, chooseDialog },
  data () {
    return {
      indexList: {
        before: [],
        after: [],
      },
      data: [
        {
          name: '结束语',
          type: '11',
          timeType: 1,
          logic: {},
          isShow: '1',
          optionList: [
            {
              name: '',
              type: 2,
            }, {
              name: '',
              type: 2,
            },
          ],
          isRequire: '2',
          answer: {
            value: '',
          },
        },
      ],
      menu: {
        select: [
          {
            name: '单选题',
            type: '1',
            optionList: [],
            icon: 'icon-yuan1',
            isRequire: '2',
            isShow: '1',
            logic: {},
            answer: {

            },
          }, {
            name: '多选题',
            icon: 'icon-piliang-copy',
            optionList: [],
            isRequire: '2',
            isShow: '1',
            type: '2',
            logic: {},
            answer: {
              value: [],
            },
          }, {
            name: '图片单选',
            icon: 'icon-mulu4',
            optionList: [],
            isRequire: '2',
            isShow: '1',
            type: '3',
            logic: {},
            answer: {
              values: [],
            },
          }, {
            name: '图片多选',
            icon: 'icon-daibanshixiang',
            optionList: [],
            isRequire: '2',
            isShow: '1',
            type: '4',
            logic: {},
            answer: {
              values: [],
            },
          }, {
            name: '下拉题',
            icon: 'icon-mulu1',
            optionList: [],
            type: '5',
            isRequire: '2',
            isShow: '1',
            logic: {},
            answer: {},
          },
        ],
        input: [
          {
            optionList: [],
            name: '填空题',
            icon: 'icon-shuben-zhuanye',
            type: '6',
            isRequire: '2',
            isShow: '1',
            logic: {},
            answer: {},
          }, {
            optionList: [],
            name: '多项填空',
            icon: 'icon-task',
            type: '7',
            isRequire: '2',
            isShow: '1',
            logic: {},
            answer: {},
          },
        ],
        other: [
          {
            name: '打分题',
            icon: 'icon-pingfen',
            optionList: [],
            type: '8',
            isRequire: '2',
            isShow: '1',
            logic: {},
            answer: {},
          }, {
            name: '上传题',
            icon: 'icon-cz-quxiaochehui',
            optionList: [],
            type: '9',
            isRequire: '2',
            isShow: '1',
            logic: {},
            answer: {
              fileList: [],
            },
          }, {
            name: '备注说明',
            icon: 'icon-cz-wenjianzc',
            optionList: [],
            isRequire: '2',
            isShow: '1',
            remarks: '',
            type: '10',
            logic: {},
            answer: {
              value: '',
            },
          },
          // {
          //   name:"结束语",
          //   optionList:[],
          //   type: '11',
          //   concluding: "",
          //   timeType: 1,
          //   logic: {},
          //   answer:{},
          // },
        ],
      },
    }
  },
  computed: {
    btnGroup () {
      return [
        {
          label: '预览',
          loading: false,
          disabled: false,
          fn: 'handlePreview',
          type:'primary',
        },
        {
          label: '保存',
          disabled: false,
          fn: 'handleSubmitDraft',
        },
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
      this.projectIdDic = []
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
      getOrgList('', 2).then(({ data }) => {
        this.groupDic = data.data.map(item => {
          return {
            label: item.name,
            value: item.orgId,
          }
        })
      })
      // if(status === 'edit')
      if (this.status === 'update') {
        // this.form = {...this.temp}
        // this.temp.content ? this.data = JSON.parse(this.temp.content): ""
        // this.$nextTick(()=>{
        //   this.$set(this.form,'evaDept',(this.form.evaDept||[]).split(','))
        //   console.log('form',this.form)
        // })
        getDetail(this.temp.id).then(({ data }) => {
          this.form = data.data
          this.form.isGrade == '1' ? this.$set(this.indexList, 'before', getIndexIds(this.form.questionDTOList)) : ''
          this.$set(this.form, 'evaDept', (this.form.evaDept || []).split(',').map(item => item - 0))
          this.data = this._getLogic(this.form.questionDTOList)
        })
      }
      // this.temp.content ? this.data = JSON.parse(this.temp.content): ""
    },
    open (id) {
      this.initData()
      if (id) {
        this.disabledProject = true
        this.projectId = id
        this.form = {
          type: '1',
          projectId: this.projectId,
        }
        this.getDeptsByProjectId(this.projectId)
      } else {
        this.disabledProject = false
        this.projectId = ''
      }
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },


    //保存为未发布
    handleSubmitDraft () {
      console.log('assa', this.$refs.form.validate)
      this.$refs.form.validate((valid) => {
        if (valid) {
          let resData = { ...this.form }
          resData.questionDTOList = this._setLogic(this.data)
          resData.status = '2'
          resData.type = '2'
          resData.isGrade = '1'
          resData.evaDept = resData.evaDept.join(',')
          resData.isGrade == '1' ? this.$set(this.indexList, 'after', getIndexIds(resData.questionDTOList)) : ''
          if (this.status === 'create') {
            createData(resData).then(({ data }) => {
              if (data.code === 0) {
                this.$emit('successForm', '新增成功')
                this.close()
              }
            })
          } else {
            updateData(resData).then(({ data }) => {
              if (data.code === 0) {
                this.$emit('successForm', '修改成功')
                this.close()
              }
            })
          }
        }
      })
    },
    //序列化逻辑
    _setLogic (arr) {
      let newArr = []
      for (let item of arr) {
        if (typeof item.logic === 'object') {
          item.logic = JSON.stringify(item.logic)
        }
        newArr.push(item)
      }
      return newArr
    },
    //反序列化逻辑
    _getLogic (arr) {
      let newArr = []
      for (let item of arr) {
        item.logic = JSON.parse(item.logic)
        newArr.push(item)
      }
      return newArr
    },

    //删除所有关联指标
    _deleteIndexs (arr) {
      let newArr = []
      for (let item of arr) {
        item.evaluateId ? delete item.evaluateId : ''
        item.isGrade = '2'
        if (item.optionList.length > 0) {
          for (let item2 of item.optionList) {
            item2.grade = 0
          }
        }
        newArr.push(item)
      }
      return newArr
    },

    //选择模板
    handleChoose () {
      this.$refs['chooseDialog'].open()
    },

    // 保存并发布
    dialogSubmit () {

      this.$refs.form.validate().then(() => {
        this.form.questionDTOList = this._setLogic(this.data)
        this.form.status = '1'
        this.form.evaDept = this.form.evaDept.join(',')
        if (this.status === 'create') {
          createData(this.form).then(({ data }) => {
            if (data.code === 0) {
              this.$emit('successForm', '新增成功')
              this.close()
            }
          })
        } else {
          updateData(this.form).then(({ data }) => {
            if (data.code === 0) {
              this.$emit('successForm', '修改成功')
              this.close()
            }
          })
        }

      })
    },
    // 弹窗关闭后
    handleClosedDialog () {
      if (this.status !== this.dialog.textName.detail) {
        this.$refs['form'].resetForm()
      }
      // this.resetoptionList(this.form, true)
      this.form.id = ''
      this.indexList = {
        before: [],
        after: [],
      }
      this.tableList = []
    },
    //初始化数据
    initData () {
      this.data = [
        {
          name: '结束语',
          type: '11',
          timeType: 1,
          logic: {},
          isShow: '1',
          optionList: [
            {
              name: '',
              type: 2,
            }, {
              name: '',
              type: 2,
            },
          ],
          isRequire: '2',
          answer: {
            value: '',
          },
        },
      ]
      this.form = {}
      this.showSubordinate = false
      this.projectIdDic = []
      this.createByDic = []
    },
    //拷贝模板数据
    copyData (data) {
      delete data.id
      if (this.disabledProject) {
        delete data.type
        delete data.projectId
      }
      this.form = Object.assign(this.form, data)
      this.$set(this.form, 'evaDept', (this.form.evaDept instanceof Array) ? this.form.evaDept : (this.form.evaDept || '').split(',').map(item => item - 0))
      // this.form.evaDept = (this.form.evaDept instanceof Array) ? this.form.evaDept : (this.form.evaDept||"").split(',')
      this.data = this._deleteIndexs(this._getLogic(this.form.questionDTOList))
    },
    //添加题目
    addSubject (item) {
      this.data.splice(-1, 0, JSON.parse(JSON.stringify(item)))
    },
    //测试显示数据
    showData () {
      console.log(JSON.stringify(this.data))
    },
    //复制题目
    handleCopy (index) {
      let data = this.transCopyData(JSON.parse(JSON.stringify(this.data[index])))
      this.data.splice(-1, 0, data)
    },
    //选择项目的时候关联参评单位
    getDeptsByProjectId (value) {
      getGroupDept(value).then(({ data }) => {
        if (data.code === this.SUCCESS) {
          let deptIds = []
          data.data.map(item => {
            deptIds.push(...item.eligibleUnitsList)
          })
          this.form.evaDept = deptIds
          this.$nextTick(() => {
            this.$refs['form'] ? this.$refs['form'].clearValidate() : ''
          })
        }
      })
    },
    //删除题目中的逻辑和指标关联
    transCopyData (data) {
      let obj = { ...data }
      obj.logic = {}
      delete obj.evaluateId
      obj.isGrade = '2'
      if (obj.optionList.length > 0) {
        for (let item of obj.optionList) {
          item.grade = 0
        }
      }
      return obj
    },
    //删除题目
    handleDelete (index) {
      this.data.splice(index, 1)
    },
    //预览
    handlePreview () {
      this.$refs['previewDialog'].open(1)
      // this.$refs.previewDialog.open()
    },
    //检查是否可以拖拽
    checkMove (evt) {
      // console.log(evt,originalEvent)
      let bool = true
      if (evt.draggedContext.element.type == '11' || evt.relatedContext.element.type == '11') {
        bool = false
      }
      return bool
    },
  },
}
</script>
<style lang="scss" scoped>
.mainContainer {
  .left {
    padding-right:15px;
    border-right: 1px solid #dcdfe6;
    .titleH {
      font-size: 14px;
      margin: 8px;
    }
    .leftItem {
      padding: 10px 16px;
      cursor: pointer;
      font-size: 14px;
      &:hover {
        border-color: #cb3737;
        background: #f9eae7;
        color: #cb3737;
      }
      .iconfont {
        font-size: 14px;
        margin-right: 3px;
      }
    }
    .selectBtn {
      width: 93%;
      margin: 15px auto 15px;font-size: 14px;
    }
  }
  .right {
    padding-left:15px;
    height: 580px;
    overflow: hidden;
    .title {
      font-size: 16px;
      margin: 6px 8px 0;
    }
    .questionArea {
    }
  }
}
</style>
