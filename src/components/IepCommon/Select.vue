<template>
  <el-select v-model="localValue" placeholder="请选择">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
import { getCommonList } from '@/api/common'
export default {
  name: 'IepSelect',
  props: {
    prefixUrl: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
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
