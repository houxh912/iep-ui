<template>
  <div>
    <basic-container class="library" v-show="pageState === 'library'">
      <h1>问答库管理</h1>
      <div class="content">
        <classifies class="classifies" ref="classifies" @load_page="loadPage" @load_list="loadList"></classifies>
        <tableTpl class="table" ref="table" @handle_form="handleForm" :classList="classList"></tableTpl>
      </div>
    </basic-container>
    <formTpl ref="form" v-show="pageState === 'form'" @load_page="loadPage" :options="options"></formTpl>
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
      options: [],
      classList: {},
    }
  },
  methods: {
    handleForm (state, row) {
      this.pageState = 'form'
      this.$nextTick(() => {
        this.$refs['form'].open(state, row)
      })
    },
    loadPage (state, id) {
      this.currentId = id
      this.pageState = 'library'
      if (state) {
        this.$refs['table'].loadPage(id)
      }
    },
    loadList (list) {
      this.options = list
      let classList = new Object()
      for (let item of list) {
        classList[item.id] = item.typeName
        if (item.subType.length > 0) {
          for (let t of item.subType) {
            classList[t.id] = t.typeName
          }
        }
      }
      this.classList = classList
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