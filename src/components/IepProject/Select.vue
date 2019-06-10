<template>
  <el-select filterable remote placeholder="请输入项目关键词" :remote-method="remoteMethod" :loading="loading" v-bind="$attrs" v-on="$listeners">
    <el-option v-for="item in contractOptions" :key="item.id" :label="item.projectName" :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
import { getProjectPage } from '@/api/gpms/select'
export default {
  name: 'IepProjectSelect',
  inheritAttrs: false,
  props: {
    projectName: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      contractOptions: [],
      loading: false,
    }
  },
  created () {
  },
  methods: {
    async remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        try {
          const { data } = await getProjectPage(query)
          console.log(data)
          this.contractOptions = data.data.records
        } catch (error) {
          console.log(error)
        } finally {
          this.loading = false
        }
      } else {
        this.contractOptions = []
      }
    },
  },
  watch: {
    projectName: function (n) {
      this.contractOptions = [{
        id: this.$attrs.value,
        projectName: n,
      }]
    },
  },
}
</script>
