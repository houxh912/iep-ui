<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <h3 class="name">下拉题</h3>
      <div class="ti">
        <div class="ti1">标题：</div>
        <div class="ti2">
          <el-input style="width:80%" v-model="data.title" :maxlength="200"></el-input>
        </div>
      </div>
      <div class="ti">
        <div class="ti1">选项：</div>
        <div class="ti2">
          <draggable element="div" v-model="data.optionList" :animation="100">
            <div class="mg10" v-for="(item,index) in data.optionList" :key="index">
              <el-input style="width:200px;border:none;text-align:center;margin-right: 30px;" size="mini" placeholder="请输入下拉选项" v-model="item.name" :maxlength="200"/>
              <span style="text-align:right"><i class="curP el-icon-remove-outline" @click="handleDelete(index)"></i></span>
            </div>
          </draggable>
        </div>
      </div>
      <el-button class="gray" type="text" @click="addSingle"><i class="blue el-icon-circle-plus-outline"></i>添加单个选项</el-button>
    </template>
    <template v-else>
      <div v-if="(disabled||data.isShow == '1') ? true : false">
        <h3 :id="'a'+data.orderNumber" :name="'a'+data.orderNumber" style="margin:8px 0">{{(data.orderNumber||index)+". "}}{{data.title}}<span style="color:#DC143C;vertical-align:-2px;" v-if="data.isRequire === '1'">*</span></h3>
        <div style="width:300px">
          <el-select placeholder="请选择" v-model="data.answer.value" :disabled="disabled">
            <el-option
              v-for="(item,index) in data.optionList"
              :key="index"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
      </div>
    </template>
  </div>
</template>


<script>
import draggable from 'vuedraggable'
export default {
  components: {draggable},
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: () => 'edit',
    },
    index: {
      type: Number,
      default: () => 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      optionList: [],
    }
  },
  created () {
    // this.data.optionList ? "" : this.data.optionList = []
  },
  watch: {
    'data.answer.value': {
      deep:true,
      handler (val) {
        if(!this.disabled && val && this.data.logic != '{}'){
          let logic = JSON.parse(this.data.logic)
          if(logic.type === 'jump'){
            for(let item of logic.logic){
              if(val == item.source){
                window.location.hash = '#a'+item.target
              }
            }
          }
          if(logic.type === 'display'){
            let targetShow = []
            let targetHidden = []
            let allTaget = []
            logic.logic.map(item=>{
              allTaget.push(...item.target)
            })
            for(let item of logic.logic){
              if(val == item.source){
                targetShow.push(...item.target)
              }
            }
            targetHidden = allTaget.filter(item=>!(targetShow.indexOf(item)>-1))
            this.$emit('changeDisplay',targetShow, '1')
            this.$emit('changeDisplay',targetHidden, '2')
          }
        }
      },
    },
  },
  methods: {
    addSingle () {
      let newArr = this.data.optionList||[]
      newArr.push({
        type:1,
        name:'',
      })
      this.$set(this.data,'optionList',newArr)
    },

    handleDelete (index) {
      let newArr = this.data.optionList||[]
      newArr.splice(index,1)
      this.$set(this.data,'optionList',newArr)
    },
  },
}
</script>
<style lang="scss" scoped>
.title{
  margin: 5px;
  // color: #909399;
  .name{
    margin: 13px 0;
    font-size: 16px;
  }
  .ti{
    display: flex;
    .ti1{
      font-size: 14px;
      padding: 8px;
    }
    .ti2{
      flex: 1;
    }
  }
  span{
    margin: 0px 10px 0 0;
  }
}
.mg10{
  margin: 10px 0;
}
.textIn{
  border: none;
  width: 100px;
}
.curP{
  cursor: pointer;
}
.gray{
  color: #606266;
  font-size: 15px;
}
.blue{
  color: #3a8ee6;
  padding-right: 5px;
}
</style>
