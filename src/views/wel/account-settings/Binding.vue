<template>
  <div>
    <a-list itemLayout="horizontal" :dataSource="bindData">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.name }}</a>
          <span slot="description">
            <span>当前绑定</span>
            <span v-if="item.value"> : </span>
            <span>{{ item.value }}</span>
          </span>
        </a-list-item-meta>
        <template v-if="!item.isBind">
          <a slot="actions" @click="item.bindCallback">绑定</a>
        </template>
        <template v-if="item.isBind">
          <a slot="actions" @click="item.unbindCallback">解除绑定</a>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { getBindUserInfoList, unBindAccount } from '@/api/admin/sys-social-details'
const nameLabelMap = {
  'WX': '微信',
}
export default {
  data () {
    return {
      bindList: [
        {
          label: 'WX',
          value: '',
        },
      ],
    }
  },
  computed: {
    bindData () {
      return this.bindList.map(m => {
        return {
          isBind: m.value ? true : false,
          name: nameLabelMap[m.label],
          value: m.value || '无',
          bindCallback: () => {
            this.handleBind(m.label)
          },
          unbindCallback: () => {
            this.handleUnbind(m.label)
          },
        }
      })
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getBindUserInfoList()
      this.bindList = data.data
    },
    async handleUnbind (state) {
      const { data } = await unBindAccount({
        state,
      })
      if (data.data) {
        this.$message.success('解绑成功')
        this.loadPage()
      } else {
        this.$message(data.msg)
      }
    },
    handleBind (thirdpart) {
      let appid, client_id, redirect_uri, url
      redirect_uri = encodeURIComponent(
        window.location.origin + '/authredirect?type=bind&redirect=' + this.$route.path
      )
      if (thirdpart === 'WX') {
        appid = this.$wxAppId
        url =
          'https://open.weixin.qq.com/connect/qrconnect?appid=' +
          appid +
          '&redirect_uri=' +
          redirect_uri +
          '&state=WX&response_type=code&scope=snsapi_login#wechat_redirect'
      } else if (thirdpart === 'tencent') {
        client_id = '101322838'
        url =
          'https://graph.qq.com/oauth2.0/authorize?response_type=code&state=QQ&client_id=' +
          client_id +
          '&redirect_uri=' +
          redirect_uri
      }
      this.$openPage(url, 'bind')
    },
  },
}
</script>
