<template>
  <div>
    <a-list itemLayout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">
            <span>{{ item.description }}</span>
          </span>
        </a-list-item-meta>
        <template v-if="item.actions">
          <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
        </template>
      </a-list-item>
    </a-list>
    <password-dialog ref="PasswordDialog"></password-dialog>
    <forget-dialog ref="ForgetDialog"></forget-dialog>
  </div>
</template>

<script>
import PasswordDialog from './Components/PasswordDialog'
import ForgetDialog from './Components/ForgetDialog'
export default {
  components: {
    PasswordDialog,
    ForgetDialog,
  },
  data () {
    return {
      data: [
        {
          title: '账户密码',
          description: '如当前密码为初始密码，请及时修改为强密码',
          actions: {
            title: '修改',
            callback: () => {
              this.$refs['PasswordDialog'].dialogShow = true
            },
          },
        },
        {
          title: '忘记密码?',
          description: '如果忘记密码，请及时通过手机号找回密码',
          actions: {
            title: '找回',
            callback: () => {
              this.$refs['ForgetDialog'].dialogShow = true
            },
          },
        },
        // { title: '密保问题', description: '未设置密保问题，密保问题可有效保护账户安全', value: '', actions: { title: '设置', callback: () => { this.$message.error('This is a message of error') } } },
        // { title: '备用邮箱', description: '已绑定邮箱', value: 'ant***sign.com', actions: { title: '修改', callback: () => { this.$message.warning('This is message of warning') } } },
        // { title: 'MFA 设备', description: '未绑定 MFA 设备，绑定后，可以进行二次确认', value: '', actions: { title: '绑定', callback: () => { this.$message.info('This is a normal message') } } },
      ],
    }
  },
}
</script>
