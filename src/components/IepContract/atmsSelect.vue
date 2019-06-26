<template>
  <el-select filterable remote placeholder="请输入任务关键词" :remote-method="remoteMethod" :loading="loading" @change="handleChange" v-bind="$attrs" v-on="$listeners">
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
import { getAtmsListByName } from '@/api/atms/index'
export default {
  name: 'IepContractAtmsSelect',
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
      this.$emit('relation-change', value.relationList)
    },
    async remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        try {
          const { data } = await getAtmsListByName({ name: query })
          this.options = data
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
