<template>
  <el-select filterable remote placeholder="请输入任务关键词" :remote-method="remoteMethod" :loading="loading" @change="handleChange" clearable v-bind="$attrs" v-on="$listeners">
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
import { getAtmsListByName } from '@/api/atms/index'
export default {
  name: 'IepTaskAtmsSelect',
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
  computed: {
    id () {
      return +this.$route.params.id
    },
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
          if (this.id) {
            const { data } = await getAtmsListByName({ name: query,id:this.id })
            this.options = data
          }
          else{
            const { data } = await getAtmsListByName({ name: query,id:0 })
            this.options = data
          }
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
