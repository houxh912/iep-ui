<template>
  <a-select ref="a-select" style="width: 100%" mode="tags" dropdownClassName="iep-contact-dropdown" :value="value" :tokenSeparators="[',','；','，',';','、']" :notFoundContent="fetching ? undefined : null" :getPopupContainer="getPopupContainer" :filterOption="filterOption" :defaultActiveFirstOption="false" @change="handleChange" @search="querySearch">
    <a-spin v-if="fetching" slot="notFoundContent" size="small" />
    <a-select-option v-for="i in filteredOptions" :key="i">{{ i }}</a-select-option>
    <div slot="dropdownRender" slot-scope="menu">
      <v-nodes :vnodes="menu" />
      <iep-divider style="margin: 4px 0;" />
      <div style="padding: 8px;">
        <a-icon type="tag" /> 共找到 {{count}} 个相关标签
      </div>
    </div>
  </a-select>
</template>
<script>
import { getTagList } from '@/api/tms/index'
import debounce from 'lodash/debounce'
import compact from 'lodash/compact'
export default {
  name: 'IepTag',
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
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
      count: 0,
    }
  },
  computed: {
    filteredOptions () {
      return this.tagResults.filter(o => !this.value.includes(o))
    },
  },
  created () {
    // this.loadTag()
  },
  methods: {
    filterOption (inputValue) {
      const name = inputValue.toLowerCase().trim()
      if (name) {
        return true
      } else {
        return false
      }
    },
    getPopupContainer () {
      return this.$refs['a-select'].$el
    },
    async loadTag (name = '') {
      const { data } = await getTagList({ name })
      this.tagResults = data.data.tags
    },
    async querySearch (query) {
      this.fetching = true
      const name = query.toLowerCase().trim()
      if (name) {
        const { data } = await getTagList({ name })
        this.tagResults = data.data.tags
        this.count = data.data.count
        this.fetching = false
      }
    },
    handleChange (value) {
      const noTrimValue = value.map(m => m.trim())
      const v = compact(noTrimValue)
      this.fetching = false
      this.tagResults = []
      this.$emit('input', v)
    },
  },
}
</script>