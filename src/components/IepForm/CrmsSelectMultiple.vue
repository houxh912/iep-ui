<template>
  <div>
    <el-select
    v-model="selectValue"
    multiple
    filterable
    remote
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="item in options"
      :key="item.clientId"
      :label="item.clientName"
      :value="item.clientId">
    </el-option>
  </el-select>
  </div>
</template>

<script>
import { getCommonPage } from '@/api/common'

export default {
  name: 'IepCrmsSelectMultiple',
  props: {
    prefixUrl: {
      type: String,
      required: true,
    },
    option: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      selectValue: [],
      options: [],
      loading: false,
      params: {
        current: 1,
        size: 9999,
        clientName: '',
      },
    }
  },
  methods: {
    remoteMethod (val) {
      if (val == '') {
        return
      }
      this.params.clientName = val
      this.loading = true
      getCommonPage(this.prefixUrl, this.params).then(({data}) => {
        this.options = data.data.records
        this.loading = false
      })
    },
  },
  mounted () {
    this.selectValue = this.value
    this.options = this.option.map((m) => {return {clientId: m.id, clientName: m.name}})
  },
  watch: {
    selectValue (newVal) {
      this.$emit('input', newVal)
    },
    option (newVal) {
      if (newVal[0].name != undefined) {
        this.options = newVal.map((m) => {return {clientId: m.id, clientName: m.name}})
      }
      this.$nextTick(() => { this.selectValue = this.value ? this.value : [] })
    },
  },
}
</script>
