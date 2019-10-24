<template>
  <div class="center">
    <div>
      <iep-img class="avatar" :src="form.avatar"></iep-img>
      <div class="name">{{form.realName}}</div>
      <operation-wrapper class="operation">
        <iep-button type="primary" @click="handleOk">接受</iep-button>
        <iep-button @click="handleNo">拒绝</iep-button>
      </operation-wrapper>
    </div>
  </div>
</template>
<script>
import { getFriendById, getFriendAgreeReject } from '@/api/admin/friend'
export default {
  data () {
    return {
      form: {
        avatar: '',
        phone: '',
        realName: '',
        username: '',
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getFriendById(this.$route.params.id)
      this.form = data.data
    },
    handleOk () {
      getFriendAgreeReject(this.$route.params.id, 1).then(({ data }) => {
        if (data.data) {
          this.$router.go(-1)
        } else {
          this.$message(data.msg)
        }
      })
    },
    handleNo () {
      getFriendAgreeReject(this.$route.params.id, 2).then(({ data }) => {
        if (data.data) {
          this.$router.go(-1)
        } else {
          this.$message(data.msg)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  .avatar {
    height: 150px;
    width: 150px;
  }
  .name {
    text-align: center;
  }
  .operation {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
