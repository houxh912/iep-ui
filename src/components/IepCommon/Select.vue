<template>
  <el-select v-model="localValue" placeholder="请选择">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
import { getCommonList } from '@/api/common'
// const relationMap = {
//   '': '',
// }
export default {
  props: {
    prefix_url: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
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
    getCommonList(this.prefix_url).then(({ data }) => {
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
