<template>
  <div>
    <basic-container>
      <iep-page-header title="联盟成员"></iep-page-header>
      <div class="con">
        <div class="members">
          <div class="member" v-for="(item, index) in orgList" :key="index">
            <a-button class="ant" @click="handleRemoveOrg(item.value)" block>{{ item.label }}</a-button>
          </div>
          <div class="member">
            <a-button type="dashed" @click="handleAddOrg" block>添加联盟成员</a-button>
          </div>
        </div>
      </div>
    </basic-container>
    <add-org-dialog-form ref="AddOrgDialogForm" @load-page="loadPage"></add-org-dialog-form>
  </div>
</template>
<script>
import { getUnionOrgList, removeOrgById, addOrgById } from '@/api/goms/union'
import AddOrgDialogForm from './AddOrgDialogForm'
import mixins from '@/mixins/mixins'
export default {
  components: { AddOrgDialogForm },
  mixins: [mixins],
  data () {
    return {
      orgList: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleRemoveOrg (id) {
      this._handleComfirm(id, removeOrgById, '移除组织')
    },
    handleAddOrg () {
      this.$refs['AddOrgDialogForm'].formRequestFn = addOrgById
      this.$refs['AddOrgDialogForm'].dialogShow = true
    },
    loadPage () {
      getUnionOrgList().then(({ data }) => {
        this.orgList = data.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.con {
  width: 100%;
}
.members {
  display: grid;
  grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(
      100px,
      1fr
    );
  grid-gap: 20px 20px;
  margin: 0 20px;
  .member {
    width: 100%;
    text-align: center;
    .ant {
      height: 40px;
    }
  }
}
</style>
