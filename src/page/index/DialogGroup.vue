<template>
  <div>
    <reward-dialog></reward-dialog>
    <new-approval></new-approval>
    <invoice-dialog></invoice-dialog>
    <billing-dialog></billing-dialog>
    <apprentice-dialog></apprentice-dialog>
    <i-can-reward-dialog></i-can-reward-dialog>
    <customer-dialog></customer-dialog>
  </div>
</template>
<script>
import RewardDialog from '@/views/fams/Components/RewardDialog.vue'
import ICanRewardDialog from '@/views/fams/Components/ICanRewardDialog.vue'
import InvoiceDialog from '@/views/fams/Components/InvoiceDialog.vue'
import BillingDialog from '@/views/fams/Components/BillingDialog.vue'
import NewApproval from '@/views/wel/approval/Components/NewApproval.vue'
import ApprenticeDialog from '@/views/cpms/Components/apprenticeDialog'
import CustomerDialog from '@/views/gpms/Components/customerDialog'
export default {
  components: { RewardDialog, NewApproval, InvoiceDialog, BillingDialog, ApprenticeDialog, ICanRewardDialog, CustomerDialog },
}
</script>
