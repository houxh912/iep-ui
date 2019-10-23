<template>
  <basic-container>
    <iep-page-header title="机构管理"></iep-page-header>
    <iep-tabs v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='List'" v-slot:List>
        <list></list>
      </template>
      <template v-if="tabName ==='Pending'" v-slot:Pending>
        <pending></pending>
      </template>
      <template v-if="tabName ==='Extinction'" v-slot:Extinction>
        <extinction></extinction>
      </template>
    </iep-tabs>
  </basic-container>
</template>

<script>
import List from './List/'
import Pending from './Pending/'
import Extinction from './Extinction/'

export default {
  components: { List, Pending, Extinction },
  data () {
    return {
      tabName: 'List',
      tabList: [
        {
          label: '全部机构',
          value: 'List',
        }, {
          label: '待认证机构',
          value: 'Pending',
        },
        {
          label: '消亡机构',
          value: 'Extinction',
        },
      ],
    }
  },
  created () {

  },
}
</script>
