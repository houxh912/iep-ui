<template>
  <gov-layout-main>
    <avue-tabs
      v-model="obj"
      :data="data"
      :option="option"
      @change="change"
    >
    </avue-tabs>
    <allCustom-tab v-if="type=='allCustom'" ref="allCustom"></allCustom-tab>
    <myCustom-tab v-if="type=='myCustom'" ref="myCustom"></myCustom-tab>
    <cooperation-tab v-if="type=='cooperation'" ref="cooperation"></cooperation-tab>
  </gov-layout-main>
</template>

<script>
import mixin from '@/mixins/mixin'
import allCustomTab from './allCustom'
import myCustomTab from './myCustom'
import cooperationTab from './cooperation'

export default {
  name: 'Demand',
  mixins: [mixin],
  components: { allCustomTab, myCustomTab, cooperationTab },
  computed: {
  },
  data () {
    return {
      obj: {},
      data: [],
      type: 'allCustom',
      option:{
        column: [{
          label: '所有客户',
          prop: 'allCustom',
          icon: 'el-icon-date',
          option: {
            page: false,
            column: [],
            menuBtn: false,
          },
        }, {
          label: '我的客户',
          prop: 'myCustom',
          icon: 'el-icon-share',
          option: {
            page: false,
            column: [],
            menuBtn: false,
          },
        }, {
          label: '我协作的客户',
          prop: 'cooperation',
          icon: 'el-icon-share',
          option: {
            page: false,
            column: [],
            menuBtn: false,
          },
        }],
      },
    }
  },
  methods: {
    change (item) {
      this.type = item.prop
      this.$nextTick(() => {
        this.$refs[item.prop].getList()
      })
    },
  },
  created () {
  },
}
</script>

<style lang="scss" scoped>
</style>
