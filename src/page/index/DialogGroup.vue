<template>
  <div>
    <reward-dialog></reward-dialog>
    <new-approval></new-approval>
  </div>
</template>
<script>
import RewardDialog from '@/views/fams/Components/RewardDialog.vue'
import NewApproval from '@/views/wel/approval/Components/NewApproval.vue'
export default {
  components: { RewardDialog, NewApproval },
}
</script>
