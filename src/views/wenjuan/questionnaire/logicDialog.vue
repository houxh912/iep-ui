<template>
  <gov-dialog ref="dialog" width="50%" @open="handleOpen" @closed="handleClosedDialog" :title="'逻辑配置'" :isBtnGroup="status !== dialog.textName.detail" @handleSubmit="dialogSubmit">
    <layout-form>
      <el-tabs v-model="activeName">
        <el-tab-pane label="跳转逻辑设置" name="first">
          <gov-layout-button-group>
            <gov-button type="primary" @click="handleCreateJump" text="创建条件"></gov-button>
          </gov-layout-button-group>
          <div v-for="(item,index) in jumpData" :key='index' class="logicItem">
            {{index+1+'.'}} 如果本题选中
            <el-select style="width:200px!important" v-model="item.source" placeholder="请选择">
              <el-option v-for='item in answerDic' :key="item.value + (new Date()).valueOf()" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            则跳转到
            <el-select style="width:200px!important" v-model="item.target" placeholder="请选择">
              <el-option v-for='item in questionDic' :key="item.value + (new Date()).valueOf()" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <i class="ml10 el-icon-delete" @click="handleDeleteJump(index)"></i>
          </div>
        </el-tab-pane>
        <el-tab-pane label="显示逻辑设置" name="second">
          <gov-layout-button-group>
            <gov-button type="primary" @click="handleCreateDisplay" text="创建条件"></gov-button>
            <div v-for="(item,index) in displayData" :key='index' class="logicItem">
              {{index+1+'.'}} 如果本题选中
              <el-select style="width:200px!important" v-model="item.source" placeholder="请选择">
                <el-option v-for='item in answerDic' :key="item.value + (new Date()).valueOf()" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              则显示
              <el-select style="width:200px!important" v-model="item.target" placeholder="请选择" :multiple="true">
                <el-option v-for='item in questionDic' :key="item.value + (new Date()).valueOf()" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <i class="ml10 el-icon-delete" @click="handleDeleteDisplay(index)"></i>
            </div>
          </gov-layout-button-group>
        </el-tab-pane>
      </el-tabs>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/views/wenjuan/mixins/mixin'
import scopeMixin from './const/mixin'
export default {
  mixins: [mixin, scopeMixin],
  components: {},
  data () {
    return {
      activeName: 'first',
      jumpData: [],
      displayData: [],
      questionDic: [],
      answerDic: [],
    }
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  computed: {

  },
  watch: {

  },
  methods: {
    // 打开时操作
    handleOpen () {
      let dic = []
      for (let item of this.list) {
        if (item.type != '10' && item.type != '11') {
          if (this.data.orderNumber < item.orderNumber) { //只能跳转到之后的题目
            dic.push({
              value: item.orderNumber,
              label: item.title,
            })
          }
        }
      }
      this.questionDic = dic

      // console.log("阿萨大萨达",this.data)
      let answerDic = []
      for (let item of this.data.optionList) {
        answerDic.push({
          value: item.name,
          label: item.name,
        })
      }
      this.answerDic = answerDic

      // console.log("list",this.list,this.questionDic)
    },
    open () {
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 弹窗关闭后
    handleClosedDialog () {
      this.activeName = 'first'
      this.jumpData = []
      this.displayData = []
      this.answerDic = []
    },
    dialogSubmit () {
      let logic = {
        type: this.activeName == 'first' ? 'jump' : 'display',
        logic: this.activeName == 'first' ? this.jumpData : this.displayData,
      }
      let bool = true
      for (let item of logic.logic) {
        if (!item.source || !item.target) {
          bool = false
        }
      }
      if (logic.logic.length == 0) {
        logic = {}
      }
      if (bool) {
        this.$emit('setLogic', logic)
        this.close()
      } else {
        this.$message.warning('填写的信息不规范，请检查后提交！')
      }
    },
    //创建跳转逻辑
    handleCreateJump () {
      this.jumpData.push({
        source: '',
        target: '',
      })
    },
    //删除跳转逻辑
    handleDeleteJump (index) {
      this.jumpData.splice(index, 1)
      // console.log(index)
    },
    //创建显示逻辑
    handleCreateDisplay () {
      this.displayData.push({
        source: '',
        target: [],
      })
    },
    //删除显示逻辑
    handleDeleteDisplay (index) {
      this.displayData.splice(index, 1)
      // console.log(index)
    },

  },
}
</script>
<style lang="scss" scoped>
.main {
  height: 600px;
  overflow: auto;
}
.logicItem {
  margin-top: 10px;
}
.ml10 {
  margin-left: 10px;
  cursor: pointer;
}
</style>
