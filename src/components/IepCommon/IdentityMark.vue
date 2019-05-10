<template>
  <svg class="iep2-icon" aria-hidden="true">
    <use :xlink:href="formatIcon"></use>
    <title>{{title}}</title>
  </svg>
</template>
<script>
export default {
  name: 'IepIdentityMark',
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    formatIcon () {
      return `#${this.icon}`
    },
  },
}
</script>
