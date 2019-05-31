<template>
  <div class="fams-person-content">
    <iep-tabs v-model="activeTab" :tab-list="tabList">
      <template v-if="activeTab ==='BasicInformation'" v-slot:BasicInformation>
        <basic-information v-loading="activeTab !=='BasicInformation'"></basic-information>
      </template>
      <template v-if="activeTab ==='InvestmentRecord'" v-slot:InvestmentRecord>
        <investment-record v-loading="activeTab !=='InvestmentRecord'"></investment-record>
      </template>
      <template v-if="activeTab ==='ShareRatio'" v-slot:ShareRatio>
        <share-ratio v-loading="activeTab !=='ShareRatio'"></share-ratio>
      </template>
      <template v-if="activeTab ==='InvestorAudit'" v-slot:InvestorAudit>
        <investor-audit v-loading="activeTab !=='InvestorAudit'"></investor-audit>
      </template>
    </iep-tabs>
  </div>
</template>

<script>
import BasicInformation from './BasicInformation/'
import InvestmentRecord from './InvestmentRecord'
import ShareRatio from './ShareRatio'
import InvestorAudit from './InvestorAudit'
export default {
  components: { BasicInformation, InvestmentRecord, ShareRatio, InvestorAudit },
  data () {
    return {
      tabList: [{
        label: '基础信息',
        value: 'BasicInformation',
      }, {
        label: '投资记录',
        value: 'InvestmentRecord',
      }, {
        label: '股份占比',
        value: 'ShareRatio',
      }, {
        label: '投资人审核',
        value: 'InvestorAudit',
      },
      ],
      activeTab: 'BasicInformation',
    }
  },
}
</script>

