const getters = {
  // tags
  tag: state => state.tags.tag,
  tagList: state => state.tags.tagList,
  tagWel: state => state.tags.tagWel,
  // common
  website: state => state.common.website,
  isCollapse: state => state.common.isCollapse,
  screen: state => state.common.screen,
  isLock: state => state.common.isLock,
  lockPasswd: state => state.common.lockPasswd,
  windowSize: state => state.common.windowSize,
  // user
  userInfo: state => state.user.userInfo,
  noOrg: state => !state.user.userInfo.orgId,
  access_token: state => state.user.access_token,
  refresh_token: state => state.user.refresh_token,
  expires_in: state => state.user.expires_in,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  keep_login_token: state => state.user.keep_login_token,

  keyCollapse: (state, getters) => getters.screen > 1 ? getters.isCollapse : false,
  // menu
  menu: state => state.menu.menu,
  mainMenu: state => state.menu.mainMenu,
  otherMenus: state => state.menu.otherMenus,
  menusMap: state => state.menu.menusMap,
  menuPathList: state => state.menu.menuPathList,
  // cache
  dictGroup: state => state.cache.dictGroup,
  contactsPyGroup: state => state.cache.contactsPyGroup,
  famsConfig: state => state.cache.famsConfig,
  // notify 通知消息
  notify: state => key => state.notify[key],
  // im 即时聊天
  imMessage: state => key => state.im.messageMap[key],
  imMessageMore: state => key => state.im.messageMore[key],
  imUserTree: state => state.im.userTree,
  imChatList: state => state.im.chatList,
  imCurrentChatList: state => state.im.currentChatList,
  imUnread: state => key => state.im.unreadMap[key],
  imUnreadTotal: state => state.im.unreadTotal,
}
export default getters
