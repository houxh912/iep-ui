<template>
  <el-cascader v-model="localValue" placeholder="请选择" :options="options">
  </el-cascader>
</template>
<script>
import { getCommonList } from '@/api/common'
export default {
  name: 'IepCascader',
  props: {
    prefixUrl: {
      type: String,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      localValue: this.value,
      options: [],
    }
  },
  created () {
    getCommonList(this.prefixUrl).then(({ data }) => {
      this.options = data.data
    })
  },
  watch: {
    localValue (n) {
      this.$emit('input', n)
    },
  },
}
</script>
