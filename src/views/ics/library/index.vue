<template>
  <div>
    <basic-container class="library" v-show="pageState === 'library'">
      <h1>问答库管理</h1>
      <div class="content">
        <classifies class="classifies" ref="classifies" @load_page="loadPage"></classifies>
        <tableTpl class="table" ref="table" @handle_form="handleForm"></tableTpl>
      </div>
    </basic-container>
    <formTpl ref="form" v-if="pageState === 'form'" @load_page="loadPage"></formTpl>
  </div>
</template>

<script>
import classifies from './classifies'
import tableTpl from './table'
import formTpl from './form'

export default {
  components: { classifies, tableTpl, formTpl },
  data () {
    return {
      currentId: 0,
      pageState: 'library',
    }
  },
  methods: {
    handleForm (state = 'create') {
      this.pageState = 'form'
      this.$nextTick(() => {
        this.$refs['form'].open(state)
      })
    },
    loadPage (state, id) {
      this.currentId = id
      this.pageState = 'library'
      if (state) {
        this.$refs['table'].loadPage(id)
      }
    },
  },
  mounted () {
    this.$refs['classifies'].loadPage()
  },
}
</script>

<style lang="scss" scoped>
.library {
  .content {
    display: flex;
    .classifies {
      width: 300px;
    }
    .table {
      flex: 1;
      margin-left: 30px;
    }
  }
}
</style>