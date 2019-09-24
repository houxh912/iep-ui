<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <h3 class="name">打分题</h3>
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
              <el-input style="width:200px;border:none;text-align:center;margin-right:30px" size="mini" placeholder="请输入选项" v-model="item.name" :maxlength="200"></el-input>
              <span style="text-align:right"><i class="curP el-icon-remove-outline" @click="handleDelete(index)"></i></span>
              <div class="mg10">
                <el-rate
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
              </div>
            </div>
          </draggable>
        </div>
      </div>

      <el-button class="gray" type="text" @click="addSingle"><i class="blue el-icon-circle-plus-outline"></i>添加单个选项</el-button>
    </template>
    <template v-else>
      <h3 style="margin:8px 0">{{(data.orderNumber||index)+". "}}{{data.title}}<span style="color:#DC143C;vertical-align:-2px;" v-if="data.isRequire === '1'">*</span></h3>
      <div v-for="(item,index) in data.optionList" :key="index">
        {{item.name}}
        <div class="mg10">
          <el-rate
            v-model="data.answer[item.name]"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :disabled="disabled">
          </el-rate>
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
</style>
