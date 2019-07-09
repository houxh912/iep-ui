<template>
  <iep-app-layout>
    <school-top></school-top>
    <school-content></school-content>
  </iep-app-layout>
</template>

<script>
import SchoolContent from './SchoolContent/'
import SchoolTop from './SchoolTop'
export default {
  name: 'School',
  components: { SchoolContent, SchoolTop },
  data () {
    return {
    }
  },
  created () {

  },
}
</script>

