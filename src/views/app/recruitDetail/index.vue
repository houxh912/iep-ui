<template>
  <div class="client-detail">
    <!-- <div class="library">
      <div class="client-top">
        <p>{{title}}</p>
        <span>市场经理：{{name[0]}}</span>
        <span>协助人：{{name[1]}}</span>
      </div>
      <customer></customer>
    </div> -->
    <customerDetail :formData="formData"></customerDetail>
    <div class="piece">
      
    </div>
  </div>
</template>
<script>
import customerDetail from './Customer/'
import { getCustomerById } from '@/api/crms/customer'

export default {
  components: {
    // Customer,
    customerDetail,
  },
  data () {
    return {
      formData: {},
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.$nextTick(() => {
      this.getCustomerById(this.$route.params.id)
    })
    next()
  },
  methods: {
    getCustomerById (id) {
      getCustomerById(id).then(({ data }) => {
        this.formData = data.data
      })
    },
  },
  created () {
    let params = this.$route.params
    this.getCustomerById(params.id)
  },
}
</script>
<style lang="scss" scoped>
.client-top {
  margin-bottom: 15px;
  p {
    color: #333;
    font-size: 18px;
    margin-bottom: 8px;
  }
  span {
    margin-right: 10px;
    font-size: 14px;
  }
}
.client-detail {
  width: 1200px;
  margin: 0 auto 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 9000px) minmax(100px, 300px);
}
.ranking {
  padding: 0;
  .piece {
    .name {
      width: 100%!important;
    }
  }
}
.el-card {
  border: 0;
}
.library {
  padding-right: 20px;
  border-right: 1px solid #ebeef5;
}
</style>
<style scoped>
.breadcrumb-wrapper >>> .el-breadcrumb__inner.is-link {
  font-weight: normal;
}
</style>
