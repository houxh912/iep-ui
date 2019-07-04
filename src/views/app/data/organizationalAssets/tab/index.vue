<template>
  <basic-container>
    <page-header :title="`组织资产-${deptData.name}`" :backOption="backOption"></page-header>
    <iep-tabs v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='dataAssets'" v-slot:dataAssets>
        <dataAssets ref="dataAssets" :orgId="orgId" :tabType="1"></dataAssets>
      </template>
      <template v-if="tabName ==='financialAssets'" v-slot:financialAssets>
        <dataAssets ref="dataAssets" :orgId="orgId" :tabType="2"></dataAssets>
      </template>
      <template v-if="tabName ==='capabilityAssets'" v-slot:capabilityAssets>
        <dataAssets ref="dataAssets" :orgId="orgId" :tabType="3"></dataAssets>
      </template>
      <template v-if="tabName ==='otherAssets'" v-slot:otherAssets>
        <dataAssets ref="dataAssets" :orgId="orgId" :tabType="4"></dataAssets>
      </template>
    </iep-tabs>
  </basic-container>
</template>

<script>
import dataAssets from './dataAssets'

export default {
  name: 'datum',
  components: { dataAssets },
  props: {
    deptData: {
      type: Object,
    },
  },
  data () {
    return {
      orgId: 0,
      tabName: 'dataAssets',
      tabList: [
        {
          label: '数据资产',
          value: 'dataAssets',
        }, {
          label: '财务资产',
          value: 'financialAssets',
        // }, {
        //   label: '能力资产',
        //   value: 'capabilityAssets',
        // }, {
        //   label: '其他资产',
        //   value: 'otherAssets',
        },
      ],
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          if (this.$route.query.id) {
            this.$router.go(-1)
          } else {
            this.$emit('load-page', true)
          }
        },
      },
    }
  },
  created () {
    if (this.$route.query.id) {
      this.orgId = this.$route.query.id
    } else {
      this.orgId = this.deptData.id
    }
  },
}
</script>
