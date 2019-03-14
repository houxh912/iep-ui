<template>
  <el-cascader v-model="localValue" :options="options" v-bind="$attrs" v-on="$listeners">
  </el-cascader>
</template>
<script>
import { getCommonList } from '@/api/common'
export default {
  name: 'IepCascader',
  inheritAttrs: false,
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
    value (n) {
      this.localValue = n
    },
    localValue (n) {
      this.$emit('input', n)
    },
  },
}
</script>
