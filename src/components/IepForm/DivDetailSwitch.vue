<template>
  <iep-div-detail :issimgle="isDetail" @dblclick.native="isDetail = !isDetail" v-bind="$attrs"></iep-div-detail>
</template>
<script>
export default {
  name: 'IepDivDetailSwitch',
  data () {
    return {
      isDetail: true,
    }
  },
}
</script>
