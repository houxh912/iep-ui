<template>
  <iep-app-layout class="training-list">
    <training-list-top :total="total"></training-list-top>
    <training-list-content @getTotal="getTotal"></training-list-content>
  </iep-app-layout>
</template>

<script>
import TrainingListContent from './TrainingListContent'
import TrainingListTop from './TrainingListTop'
export default {
  name: 'training-list',
  components: { TrainingListContent, TrainingListTop },
  data () {
    return {
      total: 0,
    }
  },
  methods: {
    getTotal (val) {
      this.total = val
    },
  },
  created () {

  },
}
</script>

