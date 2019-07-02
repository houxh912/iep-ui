<template>
  <component :is="currentComponet"></component>
</template>

<script>
import tables from './table'
import tab from './tab'

export default {
  components: { tables, tab },
  data () {
    return {
      currentComponet: 'tables',
    }
  },
}
</script>
