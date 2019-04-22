<template>
  <el-tooltip :content="content" :placement="placement" v-bind="$attrs" v-on="$listeners">
    <div v-if="content!==''" slot="content">{{content}}</div>
    <div v-if="content===''" slot="content">{{message}}( TA 没有填写申请理由)</div>
    <i class="el-icon-info"></i>
  </el-tooltip>
</template>
<script>
export default {
  name: 'IepTip',
  props: {
    content: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: '',
    },
    placement: {
      type: String,
      default: 'top',
    },
  },
}
</script>
