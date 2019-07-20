<template>
  <iep-div-detail :issimgle="isDetail" :value="row[item.prop]" :nullmsg="item.nullmsg" @dblclick.native="isDetail = !isDetail"></iep-div-detail>
</template>
<script>
export default {
  props: ['row', 'item'],
  data () {
    return {
      isDetail: true,
    }
  },
}
</script>
