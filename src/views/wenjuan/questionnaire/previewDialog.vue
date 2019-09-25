<template>
  <gov-dialog ref="dialog" width="80%" :btnGroup="btnGroup" @open="handleOpen" @closed="handleClosedDialog" :title="'问卷预览'" :isBtnGroup="status !== dialog.textName.detail" @handleSubmit="dialogSubmit">
    <layout-form>
      <gov-detail-form v-model="temp" :option="detailOption" border :auto-height="80">
        <template slot="remarks">
          <iep-div-detail :value="temp.remarks"></iep-div-detail>
        </template>
      </gov-detail-form>
      <div class="content">
        <div class="topic" v-for="(item,index) in questionData" :key="index">
          <single-election v-if="item.type == '1'" :data="item" :index="index-0+1" :type="statusType" :disabled="disabled" @changeDisplay="changeDisplay"></single-election>
          <multiple-election v-if="item.type == '2'" :data="item" :index="index-0+1" :type="statusType" :disabled="disabled" @changeDisplay="changeDisplay"></multiple-election>
          <img-select v-if="item.type == '3'" :data="item" :index="index-0+1" :type="statusType" :disabled="disabled" @changeDisplay="changeDisplay"></img-select>
          <multiple-img-select v-if="item.type == '4'" :data="item" :index="index-0+1" :type="statusType" :disabled="disabled" @changeDisplay="changeDisplay"></multiple-img-select>
          <select-election v-if="item.type == '5'" :data="item" :index="index-0+1" :type="statusType" :disabled="disabled" @changeDisplay="changeDisplay"></select-election>
          <fill-blank v-if="item.type == '6'" :data="item" :index="index-0+1" :type="statusType" :disabled="disabled"></fill-blank>
          <multiple-fill-blank v-if="item.type == '7'" :data="item" :index="index-0+1" :type="statusType" :disabled="disabled"></multiple-fill-blank>
          <scoring v-if="item.type == '8'" :data="item" :index="index-0+1" :type="statusType" :disabled="disabled"></scoring>
          <file-upload v-if="item.type == '9'" :data="item" :index="index-0+1" :type="statusType" :disabled="disabled"></file-upload>
          <remarks v-if="item.type == '10'" :data="item" :index="index-0+1" :type="statusType" :disabled="disabled"></remarks>
          <concluding v-if="item.type == '11'" :data="item" :index="index-0+1" :type="statusType" :disabled="disabled"></concluding>
        </div>
        <!-- <gov-button v-if="!disabled"  @click="showData()" >提交答案</gov-button> -->
      </div>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/views/wenjuan/mixins/mixin'
import scopeMixin from './const/mixin'
import singleElection from './editForm/singleElection'
import multipleElection from './editForm/multipleElection'
import imgSelect from './editForm/imgSelect'
import multipleImgSelect from './editForm/multipleImgSelect'
import selectElection from './editForm/select'
import fillBlank from './editForm/fillBlank'
import multipleFillBlank from './editForm/multipleFillBlank'
import scoring from './editForm/scoring'
import fileUpload from './editForm/fileUpload'
import remarks from './editForm/remarks'
import concluding from './editForm/concluding'
import { getDetailAnswer, answerQuestion } from '@/api/evaluate/question'
import { getOrgList } from '@/api/admin/org'
export default {
  mixins: [mixin, scopeMixin],
  components: { singleElection, multipleElection, imgSelect, multipleImgSelect, selectElection, fillBlank, multipleFillBlank, scoring, fileUpload, remarks, concluding },
  data () {
    return {
      questionData: [],
      form: {},
      priew: false, //是否静态预览
    }
  },
  props: {
    content: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: true,
    },
    statusType: {
      type: String,
      default: 'editable',
    },
  },
  computed: {
    btnGroup () {
      if (this.disabled) {
        return [
          {
            label: '取消', // 按钮文本
            loading: false, // 按钮加载中状态
            disabled: false, // 是否禁用按钮
            fn: 'handleCancel', // 按钮回调方法名称
          },
        ]
      } else {
        return [
          {
            label: '提交', // 按钮文本
            loading: false, // 按钮加载中状态
            disabled: false, // 是否禁用按钮
            type: 'primary',
            fn: 'handleSubmit', // 按钮回调方法名称
          },
          {
            label: '取消', // 按钮文本
            loading: false, // 按钮加载中状态
            disabled: false, // 是否禁用按钮
            fn: 'handleCancel', // 按钮回调方法名称
          },
        ]
      }
    },
  },
  watch: {
    'content': {
      handler (val) {
        if (this.priew) {
          this.questionData = this.bindValues(val)
        } else {
          if (this.temp.id) {
            getDetailAnswer({
              questionnaireId: this.temp.id,
              limit: 1000,
              createBy: this.userInfo.userId,
            }).then(({ data }) => {
              let outArr = []
              let dataArr = data.records
              if (dataArr.length) {
                for (let item of dataArr) {
                  for (let item2 of val) {
                    if (item.questionId == item2.id) {
                      let str = item.content
                      item2.answer = this._getAnswerData(str, item2.type)
                      item2.orderNumber ? outArr[item2.orderNumber - 1] = item2 : outArr.push(item2)
                    }
                  }
                }
              } else {
                outArr = this.bindValues(val)
              }

              this.questionData = outArr
            })
          }
        }

      },
    },
  },
  methods: {
    // 打开时操作
    handleOpen () {
      this.form = this.temp
      this.projectIdDic = []
      getOrgList('', 2).then(({ data }) => {
        this.groupDic = data.data.map(m => {
          return {
            label: m.name,
            value: m.orgId,
          }
        })
        console.log(this.groupDic)
      })
    },
    //绑定答案格式
    bindValues (arr) {
      let oldData = JSON.parse(JSON.stringify(arr))
      let newData = []
      for (let item of oldData) {
        if (item.type == '2' || item.type == '4') {
          item.answer = {
            value: [],
          }
          newData.push(item)
        } else {
          item.answer = {
            value: '',
          }
          newData.push(item)
        }
      }
      // console.log("绑定之后的数据",newData)
      return newData
    },
    open (status) {
      status ? this.priew = true : this.priew = false
      status ? this.questionData = this.bindValues(this.content) : ''
      this.$refs['dialog'].open(status)
    },
    close () {
      this.$refs['dialog'].close()
    },

    // 弹窗关闭后
    handleClosedDialog () {
      this.form = {}
      this.form.id = ''
      this.questionData = []
      window.location.hash = ''
    },
    //改变题目的显示与否
    changeDisplay (arr, value) {
      // console.log("接受到啦",arr,value)
      for (let index of arr) {
        this.$set(this.questionData[index - 1], 'isShow', value)
      }
    },
    //提交
    dialogSubmit () {
      let newArr = []
      for (let item of this.questionData) {
        newArr.push({
          questionnaireId: this.temp.id,
          isRequire: item.isRequire,
          questionId: item.id,
          content: this._getContent(item.type, item.answer),
          grade: this._getGrade(item),
          type: item.type,
        })
      }
      // console.log("结果答案",newArr,this.questionData)
      if (!this._checkRequired(newArr)) {
        this.$message.info('请填写完所有必填字段后提交')
      } else {
        if (!this._checkAllAnswer(newArr)) {
          let descipt = this.questionData[this.questionData.length - 1].optionList[1].name || '答案未全部答完，是否提前结束'
          this.$confirm(descipt, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            answerQuestion(newArr).then(() => {
              this.close()
              this.$emit('successForm')
            })
          }).catch(() => {
          })
        } else {
          let descipt = this.questionData[this.questionData.length - 1].optionList[0].name || '你已答完所有问题，是否提交'
          this.$confirm(descipt, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success',
          }).then(() => {
            answerQuestion(newArr).then(() => {
              this.close()
              this.$emit('successForm')
            })
          }).catch(() => {
          })
        }
      }
      // getDetailAnswer, answerQuestion
      // answerQuestion(newArr)
      // console.log("答案数据",newArr)
    },
    _getGrade (item) {
      let str = 0
      if (item.type == 1 || item.type == 2 || item.type == 3 || item.type == 4 || item.type == 5) {
        let answer = item.answer.value
        // console.log("阿萨大萨达",answer,item.optionList)
        if (answer) {
          for (let item2 of item.optionList) {
            if (item2.name == answer) {
              str = item2.grade
            }
          }
        }
      }
      return str
    },
    //检查是否是正常结束
    _checkAllAnswer (arr) {
      let bool = true
      for (let item of arr) {
        if (!item.content && item.type != 10 && item.type != 11) {
          bool = false
        }
      }
      return bool
    },
    //检查是否所有必填字段是否都填写
    _checkRequired (arr) {
      let bool = true
      for (let item of arr) {
        if (item.isRequire === '1' && !item.content) {
          bool = false
        }
      }
      return bool
    },
    //答案反序列化
    _getAnswerData (str, type) {
      if (type == '9') {
        try {
          let fileList = JSON.parse(str)
          return {
            fileList: fileList.value ? [fileList.value] : [],
          }
        } catch (err) {
          console.log(err)
          return {}
        }
      }
      if (type == '7' || type == '8') {
        return JSON.parse(str)
        // debugger
      }
      let obj = {}
      let arr1 = str.split(',')
      if (arr1.length > 1) {
        let dataArr = []
        for (let item of arr1) {
          let arr = []
          if (type == '3' || type == '4' || type == '9') {
            arr = [item]
          } else {
            arr = item.split('-')
          }
          if (arr.length > 1) {
            dataArr.push(arr[0])
            obj[arr[0]] = arr[1]
          } else {
            dataArr.push(arr[0])
          }
        }
        obj.value = dataArr
      } else {
        let arr = []
        if (type == '3' || type == '4' || type == '9') {
          arr = [str]
        } else {
          arr = str.split('-')
        }
        if (arr.length > 1) {
          if (type == '2' || type == '4') {
            obj.value = [arr[0]]
          } else {
            obj.value = arr[0]
          }
          obj[arr[0]] = arr[1]
        } else {
          if (type == '2' || type == '4') {
            obj.value = [arr[0]]
          } else {
            obj.value = arr[0]
          }
        }
      }
      // console.log(obj,type,arr1)
      return obj
    },
    //答案序列化
    _getContent (type, answer) {
      let strArr = []
      if (type == '9') {
        return JSON.stringify(answer)
      }
      if (type == '7') {
        let obj = { ...answer }
        delete obj.value
        return JSON.stringify(obj)
      }
      if (type == '8') {
        let obj = { ...answer }
        delete obj.value
        return JSON.stringify(obj)
      }
      if (answer.value instanceof Array && answer.value.length > 0) {
        for (let item of answer.value) {
          if (answer.hasOwnProperty(item)) {
            strArr.push(item + '-' + answer[item])
          } else {
            strArr.push(item)
          }
        }
      } else {
        if (answer.value) {
          if (answer.hasOwnProperty(answer.value)) {
            strArr.push(answer.value + '-' + answer[answer.value])
          } else {
            strArr.push(answer.value)
          }
        } else {
          for (let key in answer) {
            if (key != 'value') {
              strArr.push(key + '-' + answer[key])
            }
          }
        }

      }
      // console.log(strArr.join(','))
      return strArr.join(',')
    },
  },
}
</script>
<style scoped>
.topic {
  padding: 5px;
  margin-left: 30px;
}
</style>
