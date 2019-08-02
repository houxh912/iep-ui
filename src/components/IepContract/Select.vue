<template>
  <el-select filterable remote placeholder="请输入合同关键词" :remote-method="remoteMethod" :loading="loading" @change="handleChange" clearable v-bind="$attrs" v-on="$listeners">
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
import { getContractListByName } from '@/api/mlms/common'
export default {
  name: 'IepContractSelect',
  inheritAttrs: false,
  props: {
    contractName: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      options: [],
      loading: false,
    }
  },
  methods: {
    handleChange (v) {
      const value = this.options.find(m => m.id === v)
      this.$emit('relation-change', value.relationList, value.name, value)
    },
    async remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        try {
          const { data } = await getContractListByName({ name: query })
          this.options = data.data
        } catch (error) {
          console.log(error)
        } finally {
          this.loading = false
        }
      } else {
        this.options = []
      }
    },
  },
  watch: {
    contractName: function (n) {
      this.options = [{
        id: this.$attrs.value,
        name: n,
      }]
    },
  },
}
</script>
