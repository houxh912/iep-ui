<template>
  <el-select :placeholder="placeholder" v-bind="$attrs" v-on="$listeners">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
    </el-option>
  </el-select>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IepDictSelect',
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: '请选择',
    },
    dictName: {
      type: String,
      required: true,
    },
    disabledIds: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    options () {
      const allOptions = [...this.dictGroup[this.dictName]]
      allOptions.map(m => {
        if (this.disabledIds.includes(m.value)) {
          m.disabled = true
        } else {
          m.disabled = false
        }
      })
      return allOptions
    },
    ...mapGetters([
      'dictGroup',
    ]),
  },
}
</script>
