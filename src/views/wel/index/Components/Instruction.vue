<template>
  <list-wrapper title="领导批示" :requestFunc="getInstruction">
  </list-wrapper>
</template>

<script>
import ListWrapper from './ListWrapper'
import { getInstruction } from '@/api/wel/index'
export default {
  components: {
    ListWrapper,
  },
  data () {
    return {
      ListWrapper,
      getInstruction,
    }
  },
}
</script>
