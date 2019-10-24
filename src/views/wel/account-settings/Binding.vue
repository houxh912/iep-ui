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
          <a slot="actions" @click="item.bindCallback">{{item.bindText}}</a>
        </template>
        <template v-if="item.isBind">
          <a slot="actions" @click="item.unbindCallback">{{item.unbindText}}</a>
        </template>
      </a-list-item>
    </a-list>
    <mobile-dialog ref="MobileDialog" @load-page="loadPage"></mobile-dialog>
  </div>
</template>

<script>
import { getBindUserInfoList, unBindAccount } from '@/api/admin/sys-social-details'
import MobileDialog from './Components/MobileDialog'
export default {
  components: {
    MobileDialog,
  },
  data () {
    return {
      bindList: [
        {
          label: 'WX',
          value: '',
        },
      ],
      nameLabelMap: {
        'WX': {
          name: '微信',
          bindText: '绑定',
          unbindText: '解除绑定',
          bindCallback: this.handleBind,
          unbindCallback: this.handleUnbind,
        },
        'MOBILE': {
          name: '手机号',
          bindText: '绑定',
          unbindText: '更换',
          bindCallback: this.handleMobileBind,
          unbindCallback: this.handleMobileBind,
        },
      },
    }
  },
  computed: {
    bindData () {
      const nameLabelMap = this.nameLabelMap
      return this.bindList.map(m => {
        return {
          label: m.label,
          isBind: m.value ? true : false,
          name: nameLabelMap[m.label].name,
          value: m.value || '无',
          bindText: nameLabelMap[m.label].bindText,
          unbindText: nameLabelMap[m.label].unbindText,
          bindCallback: nameLabelMap[m.label].bindCallback,
          unbindCallback: nameLabelMap[m.label].unbindCallback,
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
    handleMobileBind () {
      this.$refs.MobileDialog.dialogShow = true
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
