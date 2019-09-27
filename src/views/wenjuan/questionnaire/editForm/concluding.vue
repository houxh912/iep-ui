<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <h3 class="name">结束语</h3>
      <div class="ti">
        <div class="ti1">结束状态：</div>
        <div class="ti2">
          <el-select style="width:200px!important" v-model="select" placeholder="请选择">
            <el-option
              :label="'正常结束'"
              :value="0">
            </el-option>
            <el-option
              :label="'提前结束（不计入结果）'"
              :value="1">
            </el-option>
          </el-select> 时显示
        </div>
      </div>
      <div class="ti">
        <div class="ti1">内容：</div>
        <div class="ti2">
          <el-input :maxlength="200" type="textarea" style="width:80%;margin:10px 0" size="mini" v-model="data.optionList[select]['name']"/>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- <div>
        备注: {{data.remarks}}
      </div> -->
    </template>
  </div>
</template>


<script>
export default {
  components: {},
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
  },
  data () {
    return {
      select: 0,
    }
  },
  created () {
    // this.data.optionList ? "" : this.data.optionList = []
  },
  methods: {
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
