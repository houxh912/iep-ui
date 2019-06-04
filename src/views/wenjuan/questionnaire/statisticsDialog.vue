<template>
  <gov-dialog
    ref="dialog"
    width="80%"
    :btnGroup="btnGroup"
    @open="handleOpen"
    @closed="handleClosedDialog"
    :title="'问卷统计'"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <layout-form>
      <div class="main2">
        <question-item :data="data" :question="question" @changeData="changeData" :menu-list="menuList"></question-item>
      </div>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/views/wenjuan/mixins/mixin'
import scopeMixin from './const/mixin'
import questionItem from './questionItem'
import { getDetail, getStatistic } from '@/api/evaluate/question'
export default {
  mixins: [mixin,scopeMixin],
  components: { questionItem },
  data () {
    return {
      data:{},
      menuList:[],
      question:{
        title: '',
        total: 0,
        type: '',
        data:[],
      },
    }
  },
  props: {

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
      // console.log("temp",this.temp)
      if(this.temp.id){
        getDetail(this.temp.id).then(({data})=>{
          let newArr = []
          data.data.questionDTOList.map(item=>{
            if(item.type != '10' && item.type != '11'){
              newArr.push({
                value: item.id,
                label: item.title,
              })
            }
          })
          this.menuList = newArr
          newArr.length> 0 ? this.changeData(newArr[0].value) : ''
          // console.log("data",this.menuList)
        })
      }
      // getDetail().then
    },
    open () {
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    //转化统计数据用于展示
    _getData (data) {
      let arr = []
      for(let key in data){
        if(key != 'title' && key != 'total' && key != 'type' && key != 'orderNumber' && key != 'questionId'){
          arr.push({
            value:data[key],
            name: key,
          })
        }
      }
      return arr
    },
    //获取题型
    _getType (type) {
      let str = ''
      switch (type) {
        case '1':
          str = '单选题'
          break
        case '2':
          str = '多选题'
          break
        case '3':
          str = '图片单选题'
          break
        case '4':
          str = '图片多选题'
          break
        case '5':
          str = '下拉题'
          break
        case '6':
          str = '填空题'
          break
        case '7':
          str = '多项填空题'
          break
        case '8':
          str = '打分题'
          break
        case '9':
          str = '上传题'
          break
        default:
          str = '未知题'
          break
      }
      return str
    },
    //选择统计题目
    changeData (id) {
      getStatistic(id).then(({data})=>{
        let statisticItem = data.data
        this.question = {
          title: statisticItem.title + '（' + this._getType(statisticItem.type) + '）',
          type: statisticItem.type,
          total: statisticItem.total,
          orderNumber: statisticItem.orderNumber,
          questionId: statisticItem.questionId,
          data: this._getData(statisticItem),
        }
        console.log('question',this.question)
      })

    },
    // 弹窗关闭后
    handleClosedDialog () {
      // this.data={}
      // this.menuList=[]
      // this.question={
      //   title: '',
      //   total: 0,
      //   type: '',
      //   data:[],
      // },
    },

  },
}
</script>
<style lang="scss" scoped>
  .main2{
    height: 600px;
    overflow: auto;
  }
</style>
