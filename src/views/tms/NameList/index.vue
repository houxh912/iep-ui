<template>
  <basic-container>
    <iep-page-header title="人名管理"></iep-page-header>
    <iep-tabs v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='Whole'" v-slot:Whole>
        <whole></whole>
      </template>
      <template v-if="tabName ==='Recycle'" v-slot:Recycle>
        <recycle></recycle>
      </template>
    </iep-tabs>
  </basic-container>
</template>

<script>
import Whole from './Whole/'
import Recycle from './Recycle/'

export default {
  components: { Whole, Recycle },
  data () {
    return {
      tabName: 'Whole',
      tabList: [
        {
          label: '全部',
          value: 'Whole',
        }, {
          label: '回收站',
          value: 'Recycle',
        },
      ],
    }
  },
  created () {

  },
}
</script>
