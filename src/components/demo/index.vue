<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" size="small" label-width="80px">
      <el-form-item label="用户:">
        <iep-contact-select v-model="form.user"></iep-contact-select>
      </el-form-item>
      <el-form-item label="用户群:">
        <iep-contact-multiple v-model="form.receivers"></iep-contact-multiple>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import IepContactSelect from '@/components/IepContact/Select'
import IepContactMultiple from '@/components/IepContact/Multiple'
export default {
  components: { IepContactSelect, IepContactMultiple },
  data () {
    return {
      form: {
        user: {
          id: 1,
          name: '哈哈',
        },
        receivers: { // 比如接收人
          unions: [],
          orgs: [],
          users: [],
        },
      },
    }
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 20px;
  margin: 10px 20px;
  width: 600px;
  border: 1px solid #eee;
}
</style>
