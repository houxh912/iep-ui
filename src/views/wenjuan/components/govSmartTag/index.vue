<template>
  <el-select multiple filterable remote :remote-method="remoteMethod" v-model="smartTag" :loading="loading" reserve-keyword allow-create >
      <el-option
        v-for="item in tagResults"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
  </el-select>
    
</template>

<script>
import { selectTags } from '@/api/govSmartTag/index'
export default {
  name: 'GovSmartTag',
  data () {
    return {
      list: [],  
      tagResults: [],
      loading: false,
    }
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  computed: {
    smartTag: {
      get () {
        return typeof(this.value) == 'string' ? [] : this.value
      },
      set (value) {
        this.$emit('input', value)
      },
    },
  },  
  methods: {
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
          selectTags(query).then(({data}) => {
            this.loading = false
            this.list = data.map(item => {
              return { value: item, label: item }
            })
            this.tagResults = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1
            })
          })
      } else {
        this.tagResults = []
      }
    },
  },
}
</script>

<style scoped>

</style>
