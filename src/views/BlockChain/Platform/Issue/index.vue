<template>
  <div>
    <basic-container>
      <iep-page-header title="能贝发币"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" @click="handleIssue()" plain>发币</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
    </basic-container>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleIssue () {

    },
  },
}
</script>
