<template>
  <div class="project-pk">
    <iep-page-header title="项目PK" :backOption="backOption"></iep-page-header>
  </div>
</template>

<script>
// import { getProjectPKList } from '@/api/prms/project_pk'
export default {
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$router.history.go(-1)
        },
      },
      formData: {},
      idList: [],
    }
  },
  created () {
    this.id = this.$route.params.id
    this.idList = [this.id]
    this.loadPage()
  },
  methods: {
    loadPage () {
      // getProjectPKList(this.idList).then(({ data }) => {
      //   this.formData = data.data
      // })
    },
  },
}
</script>

<style lang="scss" scoped>
.project-pk {
  width: 1200px;
  padding: 20px 0;
  margin: auto;
}
</style>
