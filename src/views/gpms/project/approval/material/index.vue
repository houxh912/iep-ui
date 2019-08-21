<template>
  <div>
    <basic-container class="right">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Normy'" v-slot:Normy>
          <!-- <normy v-loading="activeTab !=='Normy'" :projectId="form.id" :form="form" @createSummary="createSummary" @relateSummary="relateSummary"></normy> -->
          <relation v-loading="activeTab !=='Normy'" :projectId="form.id" :form="form" @createSummary="createSummary" @relateSummary="relateSummary"></relation>
        </template>
        <template v-if="activeTab ==='Norm'" v-slot:Norm>
          <norm v-loading="activeTab !=='Norm'" :projectId="form.id"></norm>
        </template>
        <!-- <template v-if="activeTab ==='Agreement'" v-slot:Agreement>
          <agreement v-loading="activeTab !=='Agreement'" :projectId="form.id"></agreement>
        </template> -->

      </iep-tabs>
    </basic-container>
    <relateDialog ref="relation" :projectId="form.id"></relateDialog>
  </div>
</template>

<script>
// import Normy from './Normy/'
import relation from './relation'
import Norm from './Norm/'
import relateDialog from './relateDialog'

export default {
  name: 'index',
  components: { relation, Norm, relateDialog },
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data () {
    return {
      tabList: [{
        label: '关联材料',
        value: 'Normy',
      }, {
        label: '规范性材料',
        value: 'Norm',
      },
        // {
        //   label: '合同',
        //   value: 'Agreement',
        // },{
        //   label: '过去的项目',

        // }
      ],
      activeTab: 'Normy',
    }
  },
  methods: {
    createSummary () {
      this.$emit('createSummary', { id: this.form.id, name: this.form.projectName })
    },
    relateSummary (id) {
      this.$refs['relation'].open(id)
    },
  },
}
</script>

<style scoped>
.right {
  padding: 0 20px;
}
</style>