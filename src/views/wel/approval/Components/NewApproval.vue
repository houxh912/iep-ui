<template>
  <iep-dialog :dialog-show="dialogShow" title="发起申请" width="550px" @close="close" center>
    <el-form size="small" ref="form" label-width="100px">
      <el-form-item v-for="child in applicTypeTree" :key="child.id" :label="`${child.name}：`">
        <!-- <a-checkable-tag class="tag-item" v-for="item in child.children" :key="item.id" v-model="item.checked" @change="handleChange(item.name)">{{item.name}}</a-checkable-tag> -->
        <iep-button :disabled="item.value==='7'" class="tag-item" size="mini" v-for="item in child.children" :key="item.value" :plain="!item.checked" @click="handleChange(item)">{{item.label}}</iep-button>
      </el-form-item>
    </el-form>
  </iep-dialog>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      name: '',
      formRequestFn: () => { },
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    ...mapState({
      dialogShow: state => state.hrms.approvalDialogShow,
    }),
    applicTypeTree () {
      const hrms_applic_type = this.dictGroup['hrms_applic_type']
      return [
        {
          id: 1,
          name: '人事管理',
          children: hrms_applic_type,
        },
      ]
    },
  },
  methods: {
    ...mapMutations({
      setApprovalDialogShow: 'SET_APPROVAL_DIALOG_SHOW',
    }),
    handleChange (row) {
      this.$router.push({
        path: '/hrms_spa/approval/0',
        query: {
          type: row.value,
        },
      })
      this.setApprovalDialogShow(false)
    },
    close () {
      this.setApprovalDialogShow(false)
      this.$emit('load-page')
    },
  },
}
</script>
<style lang="scss" scoped>
.tag-item {
  margin-right: 8px;
}
</style>

