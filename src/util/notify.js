import { Notification } from 'element-ui'
import router from '@/router/router'
// Notification
const notifyTypeMap = {
  3: {
    isPush: false,
    listName: 'announcementList',
    numName: 'announcementNum',
  },
  4: {
    isPush: false,
    listName: 'emailList',
    numName: 'emailNum',
  },
  5: {
    isPush: false,
    listName: 'systemMessageList',
    numName: 'systemMessageNum',
  },
  6: {
    isPush: true,
    notifyTitle: '通知消息',
    notifyDesc: '收到一条通知消息，点击查看',
    notifyPath: '/ims_spa/announcement_detail',
    listName: 'announcementList',
    numName: 'announcementNum',
  },
  7: {
    isPush: true,
    notifyTitle: '邮件',
    notifyDesc: '收到一封邮件，点击查看',
    notifyPath: '/mlms_spa/email/detail',
    listName: 'emailList',
    numName: 'emailNum',
  },
  8: {
    isPush: true,
    notifyTitle: '系统消息',
    notifyDesc: '收到一条系统消息，点击查看',
    notifyPath: '/ims_spa/system_message_detail',
    listName: 'systemMessageList',
    numName: 'systemMessageNum',
  },
}

const notifyShow = (title, message, path) => {
  let notify = Notification({
    title,
    message,
    onClick: () => {
      router.push(path)
      notify.close()
    },
  })
}

const pushNotify = (data) => {
  let body = JSON.parse(data.body)
  const notifyBody = notifyTypeMap[body.type]
  if (notifyBody.isPush) {
    notifyShow(notifyBody.notifyTitle, notifyBody.notifyDesc, `${notifyBody.notifyPath}/${body.msg[0].id}`)
  }
  return {notifyBody, body}
}

export { pushNotify }