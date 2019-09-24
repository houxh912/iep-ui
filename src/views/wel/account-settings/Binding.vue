<template>
  <div>
    <a-list itemLayout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">
            <span>{{ item.description }}</span>
            <span v-if="item.value"> : </span>
            <span>{{ item.value }}</span>
          </span>
        </a-list-item-meta>
        <template v-if="item.actions.show">
          <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
        </template>
        <template v-if="item.actions1.show">
          <a slot="actions" @click="item.actions1.callback">{{ item.actions1.title }}</a>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { unBindAccount } from '@/api/admin/sys-social-details'
export default {
  data () {
    return {
      data: [
        {
          title: '微信',
          description: '当前绑定',
          value: '无',
          actions: {
            show: true,
            title: '绑定',
            callback: () => {
              this.handleClick('wechat')
            },
          },
          actions1: {
            show: false,
            title: '解除绑定',
            callback: () => {
              this.handleUnbind('WX')
            },
          },
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  created () {
    this.data[0].value = this.userInfo.wxOpenid || '无'
    this.data[0].actions.show = this.userInfo.wxOpenid ? false : true
    this.data[0].actions1.show = this.userInfo.wxOpenid ? true : false
  },
  methods: {
    async handleUnbind (state) {
      const { data } = await unBindAccount({
        state,
      })
      if (data.data) {
        this.$message.success('解绑成功')
      } else {
        this.$message(data.msg)
      }
    },
    handleClick (thirdpart) {
      let appid, client_id, redirect_uri, url
      redirect_uri = encodeURIComponent(
        window.location.origin + '/authredirect?type=bind&redirect=' + this.$route.path
      )
      if (thirdpart === 'wechat') {
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
