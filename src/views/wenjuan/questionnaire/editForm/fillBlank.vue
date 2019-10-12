<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <h3 class="name">填空题</h3>
      <el-form :model="data" ref="data" label-width="70px" class="ti">
        <el-form-item label="标题：" prop="title" :rules="[
          { required: true, message: '标题不能为空'}
        ]">
          <div class="ti2">
            <el-input style="width:250%" v-model="data.title" :maxlength="200"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div class="mg10">
      </div>
    </template>
    <template v-else>
      <h3 style="margin:8px 0">{{(data.orderNumber||index)+". "}}{{data.title}}<span style="color:#DC143C;vertical-align:-2px;" v-if="data.isRequire === '1'">*</span></h3>
      <div>
        <el-input style="width:80%" type="textarea" v-model="data.answer.value" :disabled="disabled" :maxlength="200"></el-input>
      </div>
    </template>
  </div>
</template>


<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => { },
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
  },
}
</script>
<style lang="scss" scoped>
.title {
  margin: 5px;
  // color: #909399;
  .name {
    margin: 13px 0;
    font-size: 16px;
  }
  .ti {
    display: flex;
    .ti1 {
      font-size: 14px;
      padding: 8px;
    }
    .ti2 {
      flex: 1;
    }
  }
  span {
    margin: 0px 10px 0 0;
  }
}
.mg10 {
  margin: 10px 0;
}
.textIn {
  border: none;
  width: 100px;
}
.curP {
  cursor: pointer;
}
</style>
