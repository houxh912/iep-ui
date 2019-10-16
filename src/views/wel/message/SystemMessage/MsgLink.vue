<template>
  <div>
    {{form.content}}
    <a href="#" v-if="isShowEnterBtn" @click.prevent="handleOpen">进入</a>
  </div>
</template>
<script>
import website from '@/const/website'
import keyBy from 'lodash/keyBy'
import { mapGetters } from 'vuex'
export default {
  name: 'MsgLink',
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      ican_host: website.ican_host,
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    isShowEnterBtn () {
      if (this.form.pathType === '3') {
        return false
      } else if (!this.imsPathTypeIds.includes(this.form.pathType)) {
        return false
      } else {
        return true
      }
    },
    imsPathTypeMap () {
      const imsPathType = this.dictGroup['ims_path_type']
      return keyBy(imsPathType, 'value')
    },
    imsPathTypeIds () {
      return this.dictGroup['ims_path_type'].map(m => m.value)
    },
  },
  methods: {
    handleOpen () {
      if (this.form.pathType === '18') {
        this.$openPage(`${this.ican_host}thoughts/${this.form.pathId}.html`, 'url')
        return
      }
      const type = ['11', '12', '13', '14'].includes(this.form.pathType) ? 'url' : 'path'

      let suffixUrl = ''
      if (this.form.pathId) {
        suffixUrl = `/${this.form.pathId}`
      }
      const url = this.imsPathTypeMap[this.form.pathType].label + `${suffixUrl}`
      this.$openPage(url, type)
    },
  },
}
</script>
