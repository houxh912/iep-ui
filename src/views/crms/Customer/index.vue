<template>
  <keep-alive include="list">
    <component ref="component" @onEdit="handleEdit" @onGoBack="handleGoBack" @onDetail="handelDetail" @showDrawer="showDarwer" :record="record" :is="currentComponet"></component>
  </keep-alive>
</template>

<script>
// 动态切换组件
import List from './Page/List'
import Edit from './Page/Edit'
import Detail from './Page/Detail'
import { postCustomer } from '@/api/crms/customer'
export default {
  name: 'CustomerComponents',
  components: {
    List,
    Edit,
    Detail,
  },
  data () {
    return {
      currentComponet: 'List',
      record: '',
    }
  },
  created () {
    if (this.$route.query.router) {
      this.record = {
        formRequestFn: postCustomer,
        methodName: '新增',
        id: false,
        flag: this.$route.query.router,
        data: this.$route.query.data,
      }
      this.currentComponet = 'Edit'
    } else {
      this.currentComponet = 'List'
    }
  },
  methods: {
    handleEdit (record) {
      this.record = record
      this.currentComponet = 'Edit'
    },
    handelDetail (record) {
      this.record = record
      this.currentComponet = 'Detail'
    },
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'List'
      this.$nextTick(() => {
        this.$refs['component'].loadPage()
      })
    },
    showDarwer (val) {
      this.$nextTick(() => {
        this.$refs['component'].showDrawer(val)
      })
    },
  },
  watch: {
  },
}
</script>
