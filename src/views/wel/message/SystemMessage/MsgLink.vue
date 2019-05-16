<template>
  <div>
    {{link.content}}
    <a href="#" v-if="isCommon" @click.prevent="handleOpen">进入</a>
  </div>
</template>
<script>
export default {
  name: 'MsgLink',
  props: {
    link: {
      type: Object,
      required: true,
    },
    imsPathType: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isCommon () {
      return this.link.pathType !== '3' ? `${this.imsPathType.label}/${this.link.pathId}` : undefined
    },
  },
  methods: {
    handleOpen () {
      this.$openPage(this.isCommon)
    },
  },
}
</script>
