<template>
  <el-button @click="back">返回建议列表</el-button>
</template>
<script>
export default {
  data () {
    return{
      back: () => {
        this.$router.push('/hrms_spa/suggestion_list')
      },
    }
  },
}
</script>

