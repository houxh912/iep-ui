<template>
  <a-select :value="tagsValue" mode="tags" style="width: 100%" :tokenSeparators="[',','；','，', ';']" @select="handleChange" @search="querySearch">
    <a-select-option v-for="i in tagResults" :key="i">{{ i }}</a-select-option>
  </a-select>
</template>
<script>
import { getTagList } from '@/api/tms/index'
import debounce from 'lodash/debounce'
export default {
  name: 'IepNewTag',
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data () {
    this.querySearch = debounce(this.querySearch, 200)
    return {
      tagsValue: [],
      tagList: [],
      tagResults: [],
    }
  },
  created () {
    this.loadTag()
  },
  methods: {
    async loadTag (name = '') {
      const { data } = await getTagList({ name })
      this.tagList = data.data.tags
    },
    querySearch (queryString) {
      const tagList = this.tagList
      const results = queryString ? tagList.filter(this.createFilter(queryString)) : tagList
      // 调用 callback 返回建议列表的数据
      this.tagResults = results
    },
    createFilter (query) {
      const queryToLower = query.toLowerCase()
      return (item) => {
        return (item.toLowerCase().indexOf(queryToLower) > -1)
      }
    },
    handleChange (value) {
      console.log(value)
      this.tagsValue.push(value)
    },
  },
}
</script>
