<template>
  <div>
    <search></search>
    <qualification-content></qualification-content> 
  </div>
</template>
<script>
import Search from './QualificationSearch'
import QualificationContent from './QualificationContent'
export default {
  data () {
    return {
    }
  },
  components:{
    Search,
    QualificationContent,
  },
}
</script>
<style scoped>
</style>
