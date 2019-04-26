<template>
  <el-select placeholder="请选择" v-bind="$attrs" v-on="$listeners">
    <el-option v-for="item in dictGroup[this.dictName]" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'IepDictSelect',
  inheritAttrs: false,
  props: {
    dictName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
  },
}
</script>
