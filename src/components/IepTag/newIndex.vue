<template>
  <a-select :value="value" mode="tags" style="width: 100%" :tokenSeparators="[',','；','，', ';']" @change="handleChange" @search="querySearch" :notFoundContent="fetching ? undefined : null">
    <a-spin v-if="fetching" slot="notFoundContent" size="small" />
    <a-select-option v-for="i in tagResults" :key="i">{{ i }}</a-select-option>
  </a-select>
</template>
<script>
import { getTagList } from '@/api/tms/index'
import debounce from 'lodash/debounce'
export default {
  name: 'IepTag',
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data () {
    this.querySearch = debounce(this.querySearch, 500)
    return {
      fetching: false,
      tagResults: [],
    }
  },
  created () {
    this.loadTag()
  },
  methods: {
    async loadTag (name = '') {
      const { data } = await getTagList({ name })
      this.tagResults = data.data.tags
    },
    async querySearch (query) {
      this.fetching = true
      const name = query.toLowerCase()
      const { data } = await getTagList({ name })
      this.tagResults = data.data.tags
      this.fetching = false
    },
    handleChange (value) {
      this.$emit('input', value)
    },
  },
}
</script>