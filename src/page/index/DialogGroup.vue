<template>
  <div>
    <reward-dialog></reward-dialog>
    <new-approval></new-approval>
    <invoice-dialog></invoice-dialog>
  </div>
</template>
<script>
import RewardDialog from '@/views/fams/Components/RewardDialog.vue'
import InvoiceDialog from '@/views/fams/Components/InvoiceDialog.vue'
import NewApproval from '@/views/wel/approval/Components/NewApproval.vue'
export default {
  components: { RewardDialog, NewApproval, InvoiceDialog },
}
</script>
