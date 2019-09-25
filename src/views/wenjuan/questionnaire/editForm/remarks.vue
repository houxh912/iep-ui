<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <h3 class="name">备注</h3>
      <div class="ti">
        <div class="ti1">内容：</div>
        <div class="ti2">
          <el-input type="textarea" style="width:100%" v-model="data.title" :maxlength="200"/>
        </div>
      </div>
    </template>
    <template v-else>
      <div>
        备注: {{data.title}}
      </div>
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
      optionList: [],
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
